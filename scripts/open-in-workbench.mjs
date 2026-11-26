// 会话外部控制面板的命令行入口：把模型从对话之外送进建模工作台。
//
// 用法：
//   node scripts/open-in-workbench.mjs D:\\models\\cup.stl        # 排队给正在运行的工作台，并尝试调起视图
//   node scripts/open-in-workbench.mjs --status                   # 面板是否在监听、端口、排队数
//   node scripts/open-in-workbench.mjs --no-launch <文件>         # 只排队，不拉深链接
//   node scripts/open-in-workbench.mjs --register --yes           # 写 HKCU“打开方式”（不加 --yes 只打印计划）
//   node scripts/open-in-workbench.mjs --unregister --yes         # 撤掉上面那几项
//
// 为什么两条通道都要试：面板 HTTP 只能把文件送进“已经活着”的那个 MCP 进程，视图是否出现由宿主决定；
// qoder-cn:// 深链接能调起视图，但协议没注册时静默失败。所以先 HTTP 注册+排队，再尽力拉视图，
// 两条都不通就明确告诉用户回对话点工作台卡片——不要让人以为点了没反应是文件的错。
import { readFile, mkdir, appendFile, writeFile } from "node:fs/promises"
import { existsSync } from "node:fs"
import path from "node:path"
import os from "node:os"
import { spawnSync } from "node:child_process"
import { fileURLToPath } from "node:url"

const here = path.dirname(fileURLToPath(import.meta.url))
const PLUGIN_ROOT = path.resolve(here, "..")
const CONFIG_DIR = path.join(os.homedir(), ".qoder-model-studio")
const PANEL_FILE = process.env.MODEL_STUDIO_PANEL_FILE || path.join(CONFIG_DIR, "panel.json")
const PANEL_LOG = path.join(CONFIG_DIR, "panel.log")
const WRAPPER = path.join(CONFIG_DIR, "open-in-workbench.cmd")
const APP_ID = process.env.MODEL_STUDIO_APP_ID || "model-studio@local"
const DEEPLINK_BASE = `qoder-cn://plugins/${encodeURIComponent(APP_ID)}/app/open_viewer`
const ASSOC_EXTS = ["glb", "gltf", "obj", "stl", "ply", "3mf", "dae", "fbx"]
const PROGID = "model-studio.workbench"
const PROGID_KEY = `HKCU\\Software\\Classes\\${PROGID}`
const arg = name => process.argv.includes(`--${name}`)
const flags = { status: arg("status"), register: arg("register"), unregister: arg("unregister"), launch: !arg("no-launch"), yes: arg("yes"), fromAssoc: arg("from-association") }
const targets = process.argv.slice(2).filter(a => !a.startsWith("--"))

function reg(args) {
  return spawnSync("reg.exe", args, { encoding: "utf8", windowsHide: true })
}
function protocolRegistered() {
  if (process.platform !== "win32") return false
  return [ "HKCU\\Software\\Classes\\qoder-cn", "HKCR\\qoder-cn" ]
    .some(hive => reg(["query", hive, "/v", "URL Protocol"]).status === 0)
}
async function readPanel() {
  try { return JSON.parse(await readFile(PANEL_FILE, "utf8")) } catch { return null }
}
async function panelRequest(record, pathname, body) {
  const base = record.url || `http://127.0.0.1:${record.port}`
  const res = await fetch(`${base}${pathname}?token=${encodeURIComponent(record.token)}`, {
    method: body ? "POST" : "GET",
    headers: { "x-ms-token": record.token, ...(body ? { "content-type": "application/json" } : {}) },
    body: body ? JSON.stringify(body) : undefined,
    signal: AbortSignal.timeout(4000),
  })
  const json = await res.json().catch(() => ({}))
  if (!res.ok || json.ok === false) throw new Error(json.error || `HTTP ${res.status}`)
  return json
}
function launchDeepLink(filePath) {
  const url = `${DEEPLINK_BASE}?path=/open/${encodeURIComponent(filePath)}`
  return process.platform === "win32"
    ? spawnSync("cmd.exe", ["/c", "start", "", url], { windowsHide: true }).status === 0
    : spawnSync("xdg-open", [url], { windowsHide: true }).status === 0
}
async function log(line) {
  if (!flags.fromAssoc) return
  try {
    await mkdir(CONFIG_DIR, { recursive: true })
    await appendFile(PANEL_LOG, `${new Date().toISOString()} ${line}\n`, "utf8")
  } catch { /* 双击打开时没有控制台，日志写不进就算了 */ }
}

// Windows“打开方式”：只往 HKCU 的 OpenWithProgids 里加一个 progid，不改任何扩展名的默认程序，也不碰 HKLM。
// 注册表命令里再套一层引号容易被 reg.exe 吃掉，所以命令指向一个自己生成的 .cmd 包装脚本。
async function registryPlan(add) {
  const script = path.join(PLUGIN_ROOT, "scripts", "open-in-workbench.mjs")
  const wrapper = `@echo off\r\n"${process.execPath}" "${script}" --from-association %%1\r\n`
  const plan = add
    ? [
      { args: ["add", PROGID_KEY, "/ve", "/t", "REG_SZ", "/d", "建模工作台 3D 预览", "/f"], note: "progid 名称" },
      { args: ["add", `${PROGID_KEY}\\shell\\open\\command`, "/ve", "/t", "REG_SZ", "/d", `"${WRAPPER}" "%1"`, "/f"], note: "打开命令" },
      ...ASSOC_EXTS.map(ext => ({
        args: ["add", `HKCU\\Software\\Classes\\.${ext}\\OpenWithProgids`, "/v", PROGID, "/t", "REG_SZ", "/d", "", "/f"],
        note: `.${ext} 候选项`,
      })),
    ]
    : [
      ...ASSOC_EXTS.map(ext => ({
        args: ["delete", `HKCU\\Software\\Classes\\.${ext}\\OpenWithProgids`, "/v", PROGID, "/f"],
        note: `.${ext} 候选项`, missingOk: true,
      })),
      { args: ["delete", PROGID_KEY, "/f"], note: "progid", missingOk: true },
    ]
  return { plan, wrapper }
}

async function main() {
  if (flags.status) {
    const record = await readPanel()
    if (!record) {
      console.log(`没找到 ${PANEL_FILE}：MCP 服务器还没起过，或已在设置里关闭面板（panelEnabled=false）。`)
    } else {
      try {
        const status = await panelRequest(record, "/status")
        console.log(`面板在线：${record.url}（PID ${status.pid}，版本 ${status.version ?? "?"}）`)
        console.log(`  盘 ${status.plates ?? 0} 个 · 已注册模型 ${status.models ?? 0} 个 · 排队打开请求 ${status.pending ?? 0} 个`)
      } catch (error) {
        console.log(`面板记录在 ${record.url}（PID ${record.pid}）但没应答：${error.message}`)
        console.log("  多半是 Qoder 重启后留下的旧文件；重新打开一次建模工作台即可刷新。")
      }
    }
    console.log(`qoder-cn:// 协议：${protocolRegistered() ? "已注册（可从系统直接调起视图）" : "未注册（只能靠对话里的工作台卡片/深链接）"}`)
    return
  }

  if (flags.register || flags.unregister) {
    const add = flags.register
    const { plan, wrapper } = await registryPlan(add)
    console.log(`${add ? "注册" : "注销"}“打开方式”需要写 HKCU 注册表，共 ${plan.length} 项：`)
    for (const item of plan) console.log(`  [${item.note}] reg ${item.args.join(" ")}`)
    if (process.platform !== "win32") { console.log("当前系统不是 Windows，未做任何修改。"); return }
    if (!flags.yes) { console.log("\n未执行：确认无误后加 --yes 再跑一次。"); return }
    let failed = 0
    if (add) {
      await mkdir(CONFIG_DIR, { recursive: true })
      await writeFile(WRAPPER, wrapper, "utf8")
      console.log(`  包装脚本：${WRAPPER}`)
    }
    for (const item of plan) {
      const r = reg(item.args)
      if (r.status === 0) continue
      if (item.missingOk) { console.log(`  － ${item.note}：本来就没有，跳过。`); continue }
      console.log(`  × ${item.note}：${(r.stderr ?? "").trim().slice(0, 120)}`)
      failed++
    }
    console.log(failed ? `${failed} 项失败。` : add
      ? `已加入右键“打开方式 → 建模工作台 3D 预览”。没有改动任何扩展名的默认打开程序。`
      : "已移除自己写入的项。")
    return
  }

  if (!targets.length) {
    console.log("用法：node scripts/open-in-workbench.mjs <模型文件…>｜--status｜--register --yes｜--unregister --yes")
    process.exitCode = 2
    return
  }
  const record = await readPanel()
  for (const target of targets) {
    const file = path.resolve(target)
    if (!existsSync(file)) { console.log(`× 文件不存在：${file}`); process.exitCode = 1; continue }
    let queued = null
    if (record) {
      try { queued = await panelRequest(record, "/open", { path: file }) }
      catch (error) { console.log(`· 面板没接住（${error.message}），改走深链接。`) }
    } else {
      console.log("· 没有 panel.json，MCP 服务器未在监听，改走深链接。")
    }
    if (queued) console.log(`✓ 已送进工作台：${queued.name}（${queued.format}），排队请求 ${queued.queued} 个。`)
    if (!flags.launch) continue
    if (protocolRegistered()) {
      launchDeepLink(file)
      console.log(queued
        ? "  已请求宿主调起视图；视图打开后会导入队列里的这份文件。"
        : "  已发出 qoder-cn:// 深链接，工作台会按路径导入。")
    } else if (queued) {
      console.log("· qoder-cn:// 协议未注册，无法从系统调起视图：工作台已开着的话几秒内会导入，否则请回对话点工作台卡片。")
    } else {
      console.log("× 面板不可达且 qoder-cn:// 协议未注册：请在 Qoder 对话里让 Agent 调 open_viewer，或 open_model { path }。")
      process.exitCode = 1
    }
    await log(`open ${file} queued=${queued ? "yes" : "no"}`)
  }
}

await main()
