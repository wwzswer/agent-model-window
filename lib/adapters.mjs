// 建模软件适配层：Blender 多版本适配 + 可配置的外部转换器。
// 所有转换产物统一为 GLB，交给浏览器端查看器渲染。
import { readFile, writeFile, mkdir, stat } from "node:fs/promises"
import { existsSync } from "node:fs"
import path from "node:path"
import os from "node:os"
import crypto from "node:crypto"
import { spawn } from "node:child_process"
import { fileURLToPath } from "node:url"

const LIB_DIR = path.dirname(fileURLToPath(import.meta.url))
export const PLUGIN_ROOT = path.resolve(LIB_DIR, "..")
export const CONFIG_DIR = path.join(os.homedir(), ".qoder-model-studio")
export const CACHE_DIR = path.join(CONFIG_DIR, "cache")
const CONFIG_FILE = path.join(CONFIG_DIR, "config.json")

export const CONFIG_DEFAULTS = { blenderPath: "", adaptersFile: "", conversionTimeoutSec: 120, panelEnabled: true, panelPort: 0 }

export const SETTINGS_SCHEMA = {
  type: "object",
  properties: {
    blenderPath: { type: "string", title: "Blender 可执行文件路径", description: "例如 C:/Program Files/Blender Foundation/Blender 4.2/blender.exe；留空表示不启用 Blender 转换。" },
    adaptersFile: { type: "string", title: "自定义适配器配置文件", description: "JSON 文件绝对路径，用于接入 FreeCAD 等其他建模软件，格式见插件 examples/adapters.example.json。" },
    conversionTimeoutSec: { type: "integer", title: "格式转换超时（秒）", minimum: 10, maximum: 600 },
    panelEnabled: { type: "boolean", title: "启用外部控制面板", description: "在 127.0.0.1 开一个本地 HTTP 端点，让 CLI / 资源管理器“打开方式”把模型送进工作台。关闭后外部入口只能走对话深链接。" },
    panelPort: { type: "integer", title: "控制面板端口", minimum: 0, maximum: 65535, description: "0 表示自动选用 37621-37624，都被占用时退回临时端口。" },
  },
}

export async function loadConfig() {
  try {
    const raw = JSON.parse(await readFile(CONFIG_FILE, "utf8"))
    return { ...CONFIG_DEFAULTS, ...pickKnown(raw) }
  } catch {
    return { ...CONFIG_DEFAULTS }
  }
}

function pickKnown(raw) {
  const out = {}
  if (typeof raw.blenderPath === "string") out.blenderPath = raw.blenderPath
  if (typeof raw.adaptersFile === "string") out.adaptersFile = raw.adaptersFile
  if (Number.isInteger(raw.conversionTimeoutSec)) out.conversionTimeoutSec = Math.min(600, Math.max(10, raw.conversionTimeoutSec))
  if (typeof raw.panelEnabled === "boolean") out.panelEnabled = raw.panelEnabled
  if (Number.isInteger(raw.panelPort) && raw.panelPort >= 0 && raw.panelPort <= 65535) out.panelPort = raw.panelPort
  return out
}

export async function saveConfig(set) {
  const current = await loadConfig()
  const next = { ...current, ...pickKnown(set ?? {}) }
  await mkdir(CONFIG_DIR, { recursive: true })
  await writeFile(CONFIG_FILE, JSON.stringify(next, null, 2), "utf8")
  blenderVersionCache.delete(next.blenderPath)
  return next
}

// ---------- Blender 版本探测（缓存） ----------
const blenderVersionCache = new Map()

function runProcess(command, args, timeoutMs) {
  return new Promise(resolve => {
    let stdout = "", stderr = "", settled = false
    let child
    try { child = spawn(command, args, { windowsHide: true }) }
    catch (error) { resolve({ code: -1, stdout, stderr: String(error?.message || error) }); return }
    const timer = setTimeout(() => { if (!settled) { settled = true; try { child.kill("SIGKILL") } catch {} ; resolve({ code: -1, stdout, stderr: `转换超时（>${Math.round(timeoutMs / 1000)}s），已终止进程。` }) } }, timeoutMs)
    child.stdout?.on("data", d => { stdout += d.toString(); if (stdout.length > 2_000_000) stdout = stdout.slice(-1_000_000) })
    child.stderr?.on("data", d => { stderr += d.toString(); if (stderr.length > 2_000_000) stderr = stderr.slice(-1_000_000) })
    child.on("error", error => { if (!settled) { settled = true; clearTimeout(timer); resolve({ code: -1, stdout, stderr: String(error?.message || error) }) } })
    child.on("close", code => { if (!settled) { settled = true; clearTimeout(timer); resolve({ code, stdout, stderr }) } })
  })
}

export async function detectBlender(executable) {
  if (!executable) return null
  if (blenderVersionCache.has(executable)) return blenderVersionCache.get(executable)
  let info = null
  if (existsSync(executable)) {
    const { stdout, stderr, code } = await runProcess(executable, ["--version"], 15000)
    const match = /Blender\s+(\d+)\.(\d+)(?:\.(\d+))?/i.exec(stdout + "\n" + stderr)
    if (code === 0 && match) {
      info = { version: `${match[1]}.${match[2]}${match[3] ? "." + match[3] : ""}`, major: Number(match[1]), minor: Number(match[2]) }
    }
  }
  blenderVersionCache.set(executable, info)
  return info
}

// Blender 内置适配器可导入的扩展名（浏览器端已支持的格式不会走这里）
export const BLENDER_EXTENSIONS = ["blend", "abc", "usd", "usda", "usdc", "usdz", "x3d", "wrl", "obj", "fbx", "stl", "ply", "dae", "gltf", "glb"]

async function loadCustomAdapters(config) {
  if (!config.adaptersFile) return []
  let raw
  try { raw = JSON.parse(await readFile(config.adaptersFile, "utf8")) }
  catch (error) { throw new Error(`无法读取自定义适配器配置 ${config.adaptersFile}：${error.message}`) }
  const list = Array.isArray(raw) ? raw : raw.adapters
  if (!Array.isArray(list)) throw new Error("自定义适配器配置应为 {\"adapters\": [...]} 或数组。")
  const out = []
  for (const entry of list) {
    if (!entry || typeof entry !== "object") continue
    const { id, name, executable, extensions, type, args, script } = entry
    if (typeof id !== "string" || typeof executable !== "string" || !Array.isArray(extensions) || !extensions.length) {
      throw new Error("适配器条目缺少 id / executable / extensions 字段。")
    }
    if (!["command", "script"].includes(type)) throw new Error(`适配器 ${id} 的 type 必须是 "command" 或 "script"。`)
    if (!Array.isArray(args)) throw new Error(`适配器 ${id} 缺少 args 数组。`)
    out.push({
      id, name: typeof name === "string" ? name : id, executable,
      extensions: extensions.map(e => String(e).toLowerCase().replace(/^\./, "")),
      type, args: args.map(String), script: typeof script === "string" ? script : "",
      baseDir: path.dirname(path.resolve(config.adaptersFile)),
    })
  }
  return out
}

export async function listAdapters(config) {
  const blenderInfo = await detectBlender(config.blenderPath)
  const result = [{
    id: "blender", name: "Blender", builtIn: true,
    configured: Boolean(config.blenderPath),
    available: Boolean(blenderInfo),
    version: blenderInfo?.version ?? null,
    versionSupported: blenderInfo ? blenderInfo.major > 2 || (blenderInfo.major === 2 && blenderInfo.minor >= 80) : null,
    extensions: BLENDER_EXTENSIONS,
    note: blenderInfo ? null : (config.blenderPath ? "无法执行该路径或未检测到版本号，请检查路径。" : "未配置 Blender 路径。"),
  }]
  let custom = []
  try { custom = await loadCustomAdapters(config) }
  catch (error) { result.push({ id: "_error", name: "自定义适配器加载失败", error: error.message }) }
  for (const adapter of custom) {
    result.push({
      id: adapter.id, name: adapter.name, builtIn: false, configured: true,
      available: existsSync(adapter.executable), version: null,
      extensions: adapter.extensions, type: adapter.type,
    })
  }
  return result
}

function fillTemplate(template, vars) {
  return template.replace(/\{(\w+)\}/g, (whole, key) => (key in vars ? vars[key] : whole))
}

async function isGlb(file) {
  try {
    const fd = await readFile(file)
    return fd.length > 12 && fd.toString("ascii", 0, 4) === "glTF"
  } catch { return false }
}

// 将输入文件经适配软件转换为 GLB；返回 { glbPath, converter }
export async function convertToGlb(config, inputPath, ext) {
  const timeoutMs = (config.conversionTimeoutSec || 120) * 1000
  const outDir = path.join(CACHE_DIR, "conversions")
  await mkdir(outDir, { recursive: true })
  const hash = crypto.createHash("sha1").update(inputPath + "|" + (await stat(inputPath)).mtimeMs).digest("hex").slice(0, 10)
  const base = path.basename(inputPath).replace(/\.[^.]+$/, "").replace(/[^\w.-]+/g, "_")
  const glbPath = path.join(outDir, `${base}-${hash}.glb`)
  const reportPath = path.join(outDir, `${base}-${hash}.report.json`)

  // 命中缓存：同一文件同一修改时间直接复用
  if (existsSync(glbPath) && await isGlb(glbPath)) {
    return { glbPath, converter: "缓存", cached: true }
  }

  if (BLENDER_EXTENSIONS.includes(ext) && config.blenderPath) {
    const info = await detectBlender(config.blenderPath)
    if (!info) throw new Error(`Blender 不可用（${config.blenderPath}）。请在设置中检查路径。`)
    if (info.major < 2 || (info.major === 2 && info.minor < 80)) {
      throw new Error(`检测到 Blender ${info.version}；glTF 导出需要 Blender 2.80 及以上，请升级或改用其他适配器。`)
    }
    const script = path.join(LIB_DIR, "blender_convert.py")
    const args = ["--background", "--factory-startup", "--python", script, "--", inputPath, glbPath, reportPath]
    const { code, stderr } = await runProcess(config.blenderPath, args, timeoutMs)
    let report = null
    try { report = JSON.parse(await readFile(reportPath, "utf8")) } catch { /* ignore */ }
    if (report && report.ok === false) throw new Error(`Blender ${info.version} 转换失败：${report.error}`)
    if (code !== 0 || !existsSync(glbPath)) {
      throw new Error(`Blender 转换失败（退出码 ${code}）。${stderr.slice(-600)}`)
    }
    if (!(await isGlb(glbPath))) throw new Error("Blender 输出不是有效 GLB 文件。")
    return { glbPath, converter: `Blender ${info.version}` }
  }

  const custom = await loadCustomAdapters(config)
  const adapter = custom.find(a => a.extensions.includes(ext))
  if (!adapter) {
    throw new Error(
      `格式 .${ext} 需要外部建模软件转换，当前没有可用适配器。` +
      `请在插件设置中配置 Blender 路径（支持 .blend 等），或配置自定义适配器（如 FreeCAD 支持 STEP/IGES）。`
    )
  }
  if (!existsSync(adapter.executable)) throw new Error(`适配器 ${adapter.name} 的可执行文件不存在：${adapter.executable}`)

  const vars = { input: inputPath, output: glbPath, report: reportPath }
  if (adapter.type === "script") {
    const scriptPath = path.isAbsolute(adapter.script) ? adapter.script : path.resolve(adapter.baseDir, adapter.script || `${adapter.id}_convert.py`)
    if (!existsSync(scriptPath)) throw new Error(`适配器脚本不存在：${scriptPath}`)
    vars.script = scriptPath
  }
  const args = adapter.args.map(arg => fillTemplate(arg, vars))
  const { code, stderr } = await runProcess(adapter.executable, args, timeoutMs)
  let report = null
  try { report = JSON.parse(await readFile(reportPath, "utf8")) } catch { /* ignore */ }
  if (report && report.ok === false) throw new Error(`${adapter.name} 转换失败：${report.error}`)
  if (code !== 0 || !existsSync(glbPath)) throw new Error(`${adapter.name} 转换失败（退出码 ${code}）。${stderr.slice(-600)}`)
  if (!(await isGlb(glbPath))) throw new Error(`${adapter.name} 输出不是有效 GLB 文件。`)
  return { glbPath, converter: adapter.name }
}