// 建模工作台 MCP 服务器 v0.3（stdio，无第三方运行时依赖）。
// 职责：模型文件注册与分块传输、盘（plate）工作区存储、按盘统一 GLB 导出、
//       建模软件适配调度、插件设置；AI 建模/修改基于参数化图元规格（spec JSON）。
import { readFile, writeFile, mkdir, stat, readdir, rm } from "node:fs/promises"
import { existsSync } from "node:fs"
import { execFileSync } from "node:child_process"
import path from "node:path"
import crypto from "node:crypto"
import { fileURLToPath } from "node:url"
import {
  PLUGIN_ROOT, CACHE_DIR, loadConfig, saveConfig, SETTINGS_SCHEMA, listAdapters, convertToGlb,
} from "./lib/adapters.mjs"

const SERVER_INFO = { name: "model-studio", version: "0.3.2" }
const UI_URI = "ui://model-studio/viewer.html"
const BROWSER_FORMATS = ["glb", "gltf", "obj", "stl", "ply", "fbx", "3mf", "dae"]
const IMPORT_EXTENSIONS = [...BROWSER_FORMATS, "blend", "abc", "usd", "usda", "usdc", "usdz", "x3d", "wrl", "step", "stp", "iges", "igs", "brep"]
const IMPORT_DIR = path.join(CACHE_DIR, "imports")
const RESOURCE_CHUNK = 2 * 1024 * 1024
const MAX_FILE_BYTES = 150 * 1024 * 1024
const MAX_EXPORT_BYTES = 200 * 1024 * 1024
const MAX_MODELS = 24
const MAX_LINE_BYTES = 8 * 1024 * 1024

const bundleText = (await readFile(path.join(PLUGIN_ROOT, "ui", "viewer.bundle.js"), "utf8")).replaceAll("</script", "<\\/script")
const html = (await readFile(path.join(PLUGIN_ROOT, "ui", "viewer.html"), "utf8")).replace("/* APP_SCRIPT */", () => bundleText)

// ---------- 状态 ----------
const models = new Map()
const uploads = new Map()
const imports = new Map() // uploadId -> { dir, files: Map(name -> { total, chunks, size }), size, createdAt }
const exportCaches = new Map() // plateId -> { bytes, updatedAt }
let workspace = { plates: [], activePlateId: null }
let activeModelId = null
let offersApps = false

function summary(model) {
  return {
    id: model.id, name: model.name, format: model.format, sizeBytes: model.sizeBytes,
    sourcePath: model.sourcePath, converted: model.converted, converter: model.converter ?? null,
  }
}
const modelList = () => [...models.values()].map(summary)
function resolveModel(id) {
  const model = id ? models.get(id) : models.get(activeModelId)
  if (!model) throw new Error(id ? `模型 ${id} 不存在或已被清理，请重新加载。` : "当前没有已加载模型，请先调用 open_model。")
  return model
}
function resolvePlate({ plateId, modelId } = {}) {
  if (plateId) {
    const plate = workspace.plates.find(p => p.id === plateId)
    if (!plate) throw new Error(`盘 ${plateId} 不存在。`)
    return plate
  }
  if (modelId) {
    const plate = workspace.plates.find(p => p.items.some(i => i.modelId === modelId))
    if (plate) return plate
  }
  const plate = workspace.plates.find(p => p.id === workspace.activePlateId) ?? workspace.plates[0]
  if (!plate) throw new Error("工作区还没有盘。请先在建模视图中导入模型。")
  return plate
}
function evictIfNeeded() {
  while (models.size > MAX_MODELS) {
    const oldest = [...models.values()].sort((a, b) => a.createdAt - b.createdAt)[0]
    models.delete(oldest.id)
    if (activeModelId === oldest.id) activeModelId = null
  }
}
function cleanupUploads() {
  const now = Date.now()
  for (const [id, upload] of uploads) if (now - upload.createdAt > 15 * 60 * 1000) uploads.delete(id)
  for (const [id, session] of imports) if (now - session.createdAt > 15 * 60 * 1000) imports.delete(id)
}
const safeFileName = name => {
  const base = path.basename(String(name ?? "").replaceAll("\\", "/"))
  if (!base || base === "." || base === ".." || /[\u0000-\u001f]/.test(base)) throw new Error("文件名无效。")
  return base.slice(0, 200)
}

// 真实桌面目录可能被重定向（如 D:\Desktop），向系统解析一次后缓存
let cachedDesktop
function userDesktop() {
  if (cachedDesktop !== undefined) return cachedDesktop
  cachedDesktop = ""
  if (process.platform === "win32") {
    try {
      const out = execFileSync("powershell.exe", ["-NoProfile", "-Command", "[Environment]::GetFolderPath('Desktop')"], { timeout: 8000, windowsHide: true }).toString("utf8").trim()
      if (out && path.isAbsolute(out)) cachedDesktop = out
    } catch { /* 回退 */ }
  }
  if (!cachedDesktop) cachedDesktop = path.join(process.env.USERPROFILE || process.env.HOME || "", "Desktop")
  if (!existsSync(cachedDesktop)) cachedDesktop = ""
  return cachedDesktop
}

// ---------- 文件注册 ----------
const extOf = file => path.extname(file).toLowerCase().replace(/^\./, "")

async function readCompanion(baseDir, uri, collected, missing) {
  if (/^data:/i.test(uri) || /^https?:/i.test(uri)) return
  const clean = decodeURIComponent(uri.split("?")[0])
  const file = path.resolve(baseDir, clean)
  if (!file.startsWith(path.resolve(baseDir))) { missing.push(uri + "（超出源目录，已跳过）"); return }
  try {
    const bytes = await readFile(file)
    const mime = /\.(png|jpe?g|webp|gif|bmp)$/i.test(file)
      ? "image/" + (/\.png$/i.test(file) ? "png" : /\.webp$/i.test(file) ? "webp" : /\.gif$/i.test(file) ? "gif" : "jpeg")
      : "application/octet-stream"
    collected[clean] = { mime, data: bytes.toString("base64") }
  } catch { missing.push(uri) }
}

async function buildGltfBundle(file) {
  const dir = path.dirname(file)
  const text = await readFile(file, "utf8")
  const json = JSON.parse(text)
  const resources = {}, missing = []
  for (const buffer of json.buffers ?? []) if (buffer.uri) await readCompanion(dir, buffer.uri, resources, missing)
  for (const image of json.images ?? []) if (image.uri) await readCompanion(dir, image.uri, resources, missing)
  if (missing.length) throw new Error(`glTF 引用的外部文件缺失：${missing.join(", ")}`)
  return Buffer.from(JSON.stringify({ kind: "gltf", main: text, resources }), "utf8")
}

async function buildObjBundle(file) {
  const dir = path.dirname(file)
  const text = await readFile(file, "utf8")
  const resources = {}, missing = []
  let mtl = null
  const mtlLibs = [...text.matchAll(/^\s*mtllib\s+(.+)$/gm)].map(m => m[1].trim())
  for (const lib of mtlLibs) {
    const mtlPath = path.resolve(dir, lib)
    if (!existsSync(mtlPath)) { missing.push(lib); continue }
    const mtlText = await readFile(mtlPath, "utf8")
    mtl = { name: lib, text: mtlText }
    const textureKeys = /^\s*(?:map_Kd|map_Ks|map_Ka|map_Ns|map_d|map_bump|bump|disp|decal|norm|refl)\s+(?:-\S+\s+)*(.+)$/gm
    for (const match of mtlText.matchAll(textureKeys)) await readCompanion(dir, match[1].trim(), resources, missing)
  }
  if (missing.length) throw new Error(`OBJ/MTL 引用的文件缺失：${missing.join(", ")}`)
  return Buffer.from(JSON.stringify({ kind: "obj", main: text, mtl, resources }), "utf8")
}

async function registerFile(inputPath) {
  const file = path.resolve(String(inputPath ?? ""))
  let info
  try { info = await stat(file) } catch { throw new Error(`文件不存在：${file}`) }
  if (!info.isFile()) throw new Error(`不是普通文件：${file}`)
  if (info.size > MAX_FILE_BYTES) throw new Error(`文件超过 ${MAX_FILE_BYTES / 1048576} MB 限制。`)
  const ext = extOf(file)
  if (!ext) throw new Error("无法识别文件扩展名。")

  let bytes, format = ext, payload = "binary", converted = false, converter = null
  if (BROWSER_FORMATS.includes(ext)) {
    if (ext === "gltf") { bytes = await buildGltfBundle(file); payload = "bundle" }
    else if (ext === "obj") { bytes = await buildObjBundle(file); payload = "bundle" }
    else bytes = await readFile(file)
  } else {
    const config = await loadConfig()
    const result = await convertToGlb(config, file, ext)
    bytes = await readFile(result.glbPath)
    format = "glb"; converted = true; converter = result.converter
  }
  if (bytes.length > MAX_FILE_BYTES) throw new Error("解析/转换后的数据超过大小限制。")

  const id = crypto.randomUUID()
  models.set(id, {
    id, name: path.basename(file), format, payload, bytes,
    sizeBytes: bytes.length, sourcePath: file, converted, converter, createdAt: Date.now(),
  })
  activeModelId = id
  evictIfNeeded()
  return models.get(id)
}

// ---------- 参数化图元规格（AI 建模） ----------
const PRIMITIVE_KINDS = ["box", "rounded_box", "sphere", "cylinder", "cone", "pyramid", "torus", "capsule", "plane", "lathe", "tube"]
const GENERATED_DIR = path.join(CACHE_DIR, "generated")
const MAX_PARTS = 200

function paramValue(v, min, max, label) {
  const n = Number(v)
  if (!Number.isFinite(n) || n < min || n > max) throw new Error(`${label} 必须是 ${min}–${max} 内的数值。`)
  return n
}
function validatePointList(raw, dims, label) {
  if (!Array.isArray(raw) || raw.length < 2 || raw.length > 64) throw new Error(`${label} 必须是 2–64 个点。`)
  return raw.map((pt, i) => {
    if (!Array.isArray(pt) || pt.length !== dims || pt.some(v => !Number.isFinite(Number(v)))) throw new Error(`${label}：第 ${i + 1} 个点必须是 ${dims} 个有限数值 [${Array.from({ length: dims }, (_, k) => "xyz"[k]).join(",")}]。`)
    return pt.map((v, k) => paramValue(v, -10000, 10000, `${label} 第 ${i + 1} 点第 ${k + 1} 维`))
  })
}
function validateColor(value) {
  const s = String(value).trim().replace(/^#?/, "#")
  if (!/^#[0-9a-fA-F]{3,8}$/.test(s)) throw new Error("color 必须是 #rrggbb 形式的颜色。")
  return s.toLowerCase()
}
function validatePart(raw, index) {
  if (!raw || typeof raw !== "object") throw new Error(`图元 ${index + 1} 无效。`)
  if (!PRIMITIVE_KINDS.includes(raw.primitive)) throw new Error(`图元 ${index + 1}：不支持的 primitive「${raw.primitive}」（可用：${PRIMITIVE_KINDS.join("/")}）。`)
  const id = String(raw.id ?? `part-${index + 1}`).slice(0, 64)
  const params = {}
  let points = null
  if (raw.primitive === "lathe") points = validatePointList(raw.params?.points, 2, `图元「${id}」points（[半径, 高度]）`)
  else if (raw.primitive === "tube") points = validatePointList(raw.params?.points, 3, `图元「${id}」points（路径点 [x,y,z]）`)
  if (raw.params !== undefined) {
    if (typeof raw.params !== "object" || raw.params === null || Array.isArray(raw.params)) throw new Error(`图元「${id}」：params 必须是对象。`)
    const keys = Object.keys(raw.params)
    if (keys.length > 12) throw new Error(`图元「${id}」：params 参数过多。`)
    for (const key of keys) {
      if (key === "points") continue
      const isSegments = /segments[a-zA-Z]?/i.test(key)
      params[key] = paramValue(raw.params[key], isSegments ? 3 : 0.0001, isSegments ? 256 : 10000, `图元「${id}」参数 ${key}`)
    }
  }
  if (points) params.points = points
  if (raw.primitive === "rounded_box") {
    const w = params.width ?? 1, h = params.height ?? 1, d = params.depth ?? 1
    const r = params.radius ?? 0.1
    const limit = Math.min(w, h, d) / 2
    if (r >= limit) throw new Error(`图元「${id}」：rounded_box 的 radius(${r}) 必须小于最小边长的一半(${limit})。`)
  }
  const part = {
    id,
    name: String(raw.name ?? id).slice(0, 64),
    primitive: raw.primitive,
    params,
    position: raw.position ?? [0, 0, 0],
    rotationDeg: raw.rotationDeg ?? [0, 0, 0],
    scale: raw.scale ?? [1, 1, 1],
    color: raw.color === undefined ? "#9fb2c8" : validateColor(raw.color),
    metalness: raw.metalness === undefined ? 0.15 : paramValue(raw.metalness, 0, 1, `图元「${id}」metalness`),
    roughness: raw.roughness === undefined ? 0.55 : paramValue(raw.roughness, 0, 1, `图元「${id}」roughness`),
    visible: raw.visible !== false,
  }
  if (!num3(part.position) || !num3(part.rotationDeg) || !num3(part.scale)) throw new Error(`图元「${id}」：position/rotationDeg/scale 必须是三个有限数值。`)
  for (const v of [...part.position, ...part.rotationDeg, ...part.scale]) if (Math.abs(v) > 1e6) throw new Error(`图元「${id}」：变换数值过大。`)
  return part
}
function validateParts(parts) {
  if (!Array.isArray(parts) || parts.length < 1 || parts.length > MAX_PARTS) throw new Error(`parts 必须是 1–${MAX_PARTS} 个图元。`)
  const out = parts.map(validatePart)
  const seen = new Set()
  for (const p of out) {
    if (seen.has(p.id)) throw new Error(`图元 id「${p.id}」重复。`)
    seen.add(p.id)
  }
  return out
}

function registerSpec(displayName, file, spec) {
  const jsonText = JSON.stringify(spec)
  const bytes = Buffer.from(jsonText, "utf8")
  const id = crypto.randomUUID()
  models.set(id, {
    id, name: displayName, format: "spec", payload: "spec", bytes,
    sizeBytes: bytes.length, sourcePath: file, converted: false, converter: null,
    spec, revision: 1, createdAt: Date.now(),
  })
  activeModelId = id
  evictIfNeeded()
  return models.get(id)
}

// ---------- 工作区校验 ----------
const num3 = v => Array.isArray(v) && v.length === 3 && v.every(n => Number.isFinite(n))
function validateWorkspace(input) {
  if (!input || typeof input !== "object" || !Array.isArray(input.plates)) throw new Error("workspace.plates 必须是数组。")
  if (input.plates.length > 50) throw new Error("盘数量超过 50 上限。")
  const plates = input.plates.map(plate => {
    if (!plate || typeof plate.id !== "string" || typeof plate.name !== "string") throw new Error("盘缺少 id/name。")
    if (!Array.isArray(plate.items) || plate.items.length > 500) throw new Error("盘内对象数量无效（≤500）。")
    const items = plate.items.map(item => {
      if (!item || typeof item.id !== "string" || typeof item.modelId !== "string") throw new Error("对象缺少 id/modelId。")
      if (!num3(item.position) || !num3(item.rotationDeg) || !num3(item.scale)) throw new Error("对象变换必须是三个有限数值。")
      return {
        id: item.id, modelId: item.modelId, name: String(item.name ?? "对象").slice(0, 128),
        position: item.position, rotationDeg: item.rotationDeg, scale: item.scale,
        visible: item.visible !== false,
      }
    })
    return { id: plate.id, name: plate.name.slice(0, 64), visible: plate.visible !== false, items }
  })
  const activePlateId = plates.some(p => p.id === input.activePlateId) ? input.activePlateId : (plates[0]?.id ?? null)
  return { plates, activePlateId }
}

// ---------- 按盘导出 ----------
function plateExportBytes(plate) {
  const cached = exportCaches.get(plate.id)
  if (cached) return cached.bytes
  // 单对象、未编辑的原始 GLB 可直接复用源数据
  if (plate.items.length === 1) {
    const item = plate.items[0]
    const model = models.get(item.modelId)
    const identity = item.position.every(v => v === 0) && item.rotationDeg.every(v => v === 0) && item.scale.every(v => v === 1)
    if (model && model.format === "glb" && !model.converted && identity && item.visible) return model.bytes
  }
  throw new Error("该盘还没有可用的 GLB 导出缓存。请打开建模视图，等待页面自动同步后重试。")
}

async function writePlateExport(plate, outputPath) {
  const bytes = plateExportBytes(plate)
  const firstModel = models.get(plate.items[0]?.modelId)
  let target
  if (outputPath) {
    target = path.resolve(String(outputPath))
    if (!path.isAbsolute(target)) throw new Error("outputPath 必须是绝对路径。")
  } else {
    let dir = firstModel ? path.dirname(firstModel.sourcePath) : process.cwd()
    // 拖拽导入/AI 生成的文件落在缓存目录：默认导出到桌面（存在时）或用户目录
    const lower = dir.toLowerCase()
    if (lower.startsWith(IMPORT_DIR.toLowerCase()) || lower.startsWith(GENERATED_DIR.toLowerCase())) {
      const desktop = userDesktop()
      dir = desktop || (process.env.USERPROFILE || process.env.HOME || process.cwd())
    }
    const base = plate.name.replace(/[^\w\u4e00-\u9fa5.-]+/g, "_") || "plate"
    target = path.join(dir, `${base}.glb`)
  }
  const sources = plate.items.map(i => models.get(i.modelId)?.sourcePath.toLowerCase()).filter(Boolean)
  if (sources.includes(target.toLowerCase())) {
    const parsed = path.parse(target)
    target = path.join(parsed.dir, `${parsed.name}.model-studio.glb`)
  }
  if (!/\.glb$/i.test(target)) target += ".glb"
  await mkdir(path.dirname(target), { recursive: true })
  await writeFile(target, bytes)
  return { path: target, sizeBytes: bytes.length }
}

// ---------- 工具定义 ----------
const emptySchema = { type: "object", properties: {}, additionalProperties: false }
const pathSchema = {
  type: "object",
  properties: { path: { type: "string", description: "模型文件的本地绝对路径" } },
  required: ["path"], additionalProperties: false,
}
const tools = [
  {
    name: "open_model", title: "预览模型",
    description: "加载本地 3D 模型文件并自动打开建模工作台导入。浏览器端直接支持 glb/gltf/obj/stl/ply/fbx/3mf/dae；其他格式（.blend、STEP 等）经配置的 Blender 或自定义适配器转换。导入时页面会询问并入当前盘或新建盘（首个模型默认新建盘）。",
    inputSchema: pathSchema,
    annotations: { readOnlyHint: true, openWorldHint: false },
    _meta: { ui: { resourceUri: UI_URI } },
  },
  {
    name: "export_model", title: "导出 GLB",
    description: "把一个盘（含其中所有对象与用户编辑）统一导出为 GLB。plateId 省略时用当前盘；也可传 modelId 导出该模型所在的盘。outputPath 省略时保存到首个对象源文件同目录、以盘名命名。不会覆盖源文件。",
    inputSchema: {
      type: "object",
      properties: {
        plateId: { type: "string" },
        modelId: { type: "string", description: "导出该模型所在的盘" },
        outputPath: { type: "string", description: "输出绝对路径（.glb）" },
      },
      additionalProperties: false,
    },
    annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: true },
  },
  {
    name: "list_models", title: "模型列表",
    description: "列出已加载的模型文件资源与当前盘工作区概览。",
    inputSchema: emptySchema, annotations: { readOnlyHint: true },
  },
  {
    name: "get_workspace", title: "盘工作区",
    description: "读取完整盘工作区：每个盘的对象及其位置/旋转/缩放/可见性。用于了解用户在窗口中的摆放与编辑。",
    inputSchema: emptySchema, annotations: { readOnlyHint: true },
  },
  {
    name: "get_model_info", title: "模型详情",
    description: "查看模型文件元信息，以及它被哪些盘引用、对应变换如何。",
    inputSchema: {
      type: "object",
      properties: { modelId: { type: "string", description: "省略时使用最近加载的模型" } },
      additionalProperties: false,
    },
    annotations: { readOnlyHint: true },
  },
  {
    name: "list_adapters", title: "建模软件适配",
    description: "列出已配置的建模软件适配器（Blender 及自定义软件）、可用性与检测到的版本。",
    inputSchema: emptySchema, annotations: { readOnlyHint: true },
  },
  {
    name: "agent_create_model", title: "AI 生成模型",
    description: "由 Qoder Agent 用参数化图元组合生成基础 3D 模型（规格化程序建模，无需外部服务）。图元：box{width,height,depth}、rounded_box{width,height,depth,radius}（圆角，radius<最小边长一半）、sphere{radius}、cylinder{radiusTop,radiusBottom,height}、cone{radius,height}、pyramid{radius,height}（四棱锥）、torus{radius,tube}、capsule{radius,height}、plane{width,height}、lathe{points:[[半径,y],…2–64]}（轮廓绕 Y 轴旋转：杯/瓶/底座，端点半径 0 封闭）、tube{points:[[x,y,z],…2–64],radius}（沿路径管道：把手/扶手/线缆，closed:1 成环）。精度：segments 控制细分（球默认 48、圆柱/圆锥 32、环面管向 64、旋转 48、管道 64×16，上限 256），球冠/圆柱端面等有明细需求时显式加大。坐标约定 Y-up、单位米、地面 y=0。每个图元可带 position/rotationDeg/scale/color(#rrggbb)/metalness/roughness/visible。成功后工作台自动导入（用户选择并入当前盘或新建盘）。适合桌椅、杯子、塔、机器雏形等组合体；复杂曲面/雕刻请改用外部建模软件产出 GLB 再 open_model。",
    inputSchema: {
      type: "object",
      properties: {
        name: { type: "string", maxLength: 64, description: "模型名称（也用作建议盘名），如「茶杯」" },
        description: { type: "string", maxLength: 500, description: "文字描述，记录在规格文件里" },
        parts: { type: "array", minItems: 1, maxItems: 200, description: "图元列表" },
      },
      required: ["parts"], additionalProperties: false,
    },
    annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: false },
    _meta: { ui: { resourceUri: UI_URI } },
  },
  {
    name: "agent_modify_model", title: "AI 修改模型",
    description: "按操作列表修改场景。spec 图元操作（需 modelId 指向 agent_create_model 生成的模型）：{op:addPart,part}、{op:removePart,partId}、{op:setPart,partId,可改 primitive/params/position/rotationDeg/scale/color/metalness/roughness/visible/name}。盘对象操作（任何模型）：{op:moveItem|rotateItem|scaleItem,itemId,position|rotationDeg|scale}、{op:setItemVisible,itemId,visible}、{op:removeItem,itemId}、{op:addItem,modelId,plateId?,transform?}。返回更新后的模型与工作区，工作台自动刷新，导出 GLB 包含修改。",
    inputSchema: {
      type: "object",
      properties: {
        modelId: { type: "string", description: "图元操作目标：AI 生成的 spec 模型 id" },
        operations: { type: "array", minItems: 1, maxItems: 100, description: "操作列表，按序执行" },
      },
      required: ["operations"], additionalProperties: false,
    },
    annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false },
    _meta: { ui: { resourceUri: UI_URI } },
  },
  // ---- 仅 App 页面可见 ----
  {
    name: "open_viewer", title: "建模视图",
    description: "打开建模工作台独立视图：盘大纲、预览、编辑与导出。",
    inputSchema: emptySchema, annotations: { readOnlyHint: true },
    _meta: { ui: { resourceUri: UI_URI, visibility: ["app"] }, "qoder/ui": { entrypoints: [{ type: "global" }, { type: "thread" }] } },
  },
  {
    name: "load_local_file", title: "加载本地文件",
    description: "页面专用：读取并注册本地模型文件（拖拽/对话区链接/路径输入），必要时调用建模软件转换。",
    inputSchema: pathSchema, annotations: { readOnlyHint: true },
    _meta: { ui: { visibility: ["app"] } },
  },
  {
    name: "upload_import_chunk", title: "上传导入块",
    description: "页面专用：沙箱页面拖入文件时按文件分块上传字节；final=true 时该文件落盘到导入暂存目录。",
    inputSchema: {
      type: "object",
      properties: {
        uploadId: { type: "string" }, fileName: { type: "string" },
        index: { type: "integer", minimum: 0 }, total: { type: "integer", minimum: 1, maximum: 200 },
        data: { type: "string" }, final: { type: "boolean" },
      },
      required: ["uploadId", "fileName", "index", "total", "data", "final"], additionalProperties: false,
    },
    annotations: { readOnlyHint: false, idempotentHint: true },
    _meta: { ui: { visibility: ["app"] } },
  },
  {
    name: "commit_import", title: "提交拖拽导入",
    description: "页面专用：把已上传的拖拽文件注册为模型（mainFile 省略时自动选择首个受支持格式），返回与 load_local_file 相同结构。",
    inputSchema: {
      type: "object",
      properties: { uploadId: { type: "string" }, mainFile: { type: "string" } },
      required: ["uploadId"], additionalProperties: false,
    },
    annotations: { readOnlyHint: false, idempotentHint: false },
    _meta: { ui: { visibility: ["app"] } },
  },
  {
    name: "update_workspace_state", title: "同步盘工作区",
    description: "页面专用：保存盘与对象变换，供 Agent 通过 get_workspace 读取。",
    inputSchema: {
      type: "object",
      properties: { workspace: { type: "object" } },
      required: ["workspace"], additionalProperties: false,
    },
    annotations: { readOnlyHint: false, idempotentHint: true },
    _meta: { ui: { visibility: ["app"] } },
  },
  {
    name: "upload_export_chunk", title: "上传导出块",
    description: "页面专用：分块上传某个盘的 GLB 导出；final=true 时组装为该盘的导出缓存。",
    inputSchema: {
      type: "object",
      properties: {
        plateId: { type: "string" }, uploadId: { type: "string" },
        index: { type: "integer", minimum: 0 }, total: { type: "integer", minimum: 1, maximum: 200 },
        data: { type: "string" }, final: { type: "boolean" },
      },
      required: ["plateId", "uploadId", "index", "total", "data", "final"], additionalProperties: false,
    },
    annotations: { readOnlyHint: false, idempotentHint: true },
    _meta: { ui: { visibility: ["app"] } },
  },
  {
    name: "save_export_to_path", title: "导出到路径",
    description: "页面专用：把某个盘的导出缓存写入指定绝对路径。",
    inputSchema: {
      type: "object",
      properties: { plateId: { type: "string" }, outputPath: { type: "string" } },
      required: ["outputPath"], additionalProperties: false,
    },
    annotations: { readOnlyHint: false, idempotentHint: true },
    _meta: { ui: { visibility: ["app"] } },
  },
  {
    name: "settings_read", title: "建模工作台设置",
    description: "读取插件设置（Blender 路径、自定义适配器、转换超时）。",
    inputSchema: emptySchema, annotations: { readOnlyHint: true },
    _meta: { ui: { resourceUri: UI_URI, visibility: ["app"] }, "qoder/ui": { entrypoints: [{ type: "settings" }] } },
  },
  {
    name: "settings_update", title: "更新设置",
    description: "部分更新插件设置；只传需要修改的字段。",
    inputSchema: {
      type: "object",
      properties: { set: { type: "object" } },
      required: ["set"], additionalProperties: false,
    },
    annotations: { readOnlyHint: false, idempotentHint: true },
    _meta: { ui: { visibility: ["app"] } },
  },
]

// ---------- 工具实现 ----------
const modelLoadResult = model => ({
  content: [{ type: "text", text: `已加载「${model.name}」（${model.format.toUpperCase()}，${(model.sizeBytes / 1024).toFixed(0)} KB${model.converted ? "，经 " + model.converter + " 转换" : ""}）。建模工作台将导入该模型：已有盘时可选择并入当前盘或新建盘。` }],
  structuredContent: { model: summary(model), models: modelList(), activeModelId: model.id, workspace },
})

async function callTool(name, args) {
  switch (name) {
    case "open_model":
    case "load_local_file": {
      const model = await registerFile(args.path)
      return modelLoadResult(model)
    }
    case "upload_import_chunk": {
      cleanupUploads()
      if (typeof args.uploadId !== "string" || !args.uploadId) throw new Error("uploadId 无效。")
      const fileName = safeFileName(args.fileName)
      if (typeof args.data !== "string" || !args.data.length || args.data.length > 3_000_000) throw new Error("数据块无效或过大。")
      if (!Number.isInteger(args.index) || !Number.isInteger(args.total) || args.index < 0 || args.index >= args.total || args.total > 200) throw new Error("分块序号无效。")
      let session = imports.get(args.uploadId)
      if (!session) {
        session = { dir: path.join(IMPORT_DIR, args.uploadId.replace(/[^\w-]+/g, "_")), files: new Map(), size: 0, createdAt: Date.now() }
        imports.set(args.uploadId, session)
      }
      let file = session.files.get(fileName)
      if (!file) {
        file = { total: args.total, chunks: new Map(), size: 0 }
        session.files.set(fileName, file)
      }
      if (file.total !== args.total) throw new Error("同一文件的分块数不一致。")
      if (!file.chunks.has(args.index)) {
        const bytes = Buffer.from(args.data, "base64")
        session.size += bytes.length
        if (session.size > MAX_FILE_BYTES) throw new Error(`拖拽导入超过 ${MAX_FILE_BYTES / 1048576} MB 限制。`)
        file.chunks.set(args.index, bytes)
        file.size += bytes.length
      }
      if (!args.final) return { content: [{ type: "text", text: `${fileName} 块 ${args.index + 1}/${args.total} 已接收。` }], structuredContent: { ok: true, complete: false } }
      const parts = []
      for (let i = 0; i < args.total; i++) {
        const part = file.chunks.get(i)
        if (!part) throw new Error(`缺少 ${fileName} 的块 ${i}，请重新拖入。`)
        parts.push(part)
      }
      await mkdir(session.dir, { recursive: true })
      await writeFile(path.join(session.dir, fileName), Buffer.concat(parts, file.size))
      file.chunks.clear()
      return { content: [{ type: "text", text: `${fileName} 上传完成。` }], structuredContent: { ok: true, complete: true, sizeBytes: file.size } }
    }
    case "commit_import": {
      const session = imports.get(args.uploadId)
      if (!session) throw new Error("导入会话不存在或已过期，请重新拖入文件。")
      const names = [...session.files.keys()]
      let main = args.mainFile ? safeFileName(args.mainFile) : null
      if (main && !session.files.has(main)) throw new Error("mainFile 不在已上传文件中。")
      if (!main) main = names.find(n => IMPORT_EXTENSIONS.includes(extOf(n)))
      if (!main) throw new Error("拖入的文件中没有受支持的模型格式。")
      imports.delete(args.uploadId)
      // 清理 7 天前的导入暂存目录
      try {
        for (const entry of await readdir(IMPORT_DIR)) {
          const dir = path.join(IMPORT_DIR, entry)
          try {
            const info = await stat(dir)
            if (info.isDirectory() && Date.now() - info.mtimeMs > 7 * 86400_000) await rm(dir, { recursive: true, force: true })
          } catch { /* 忽略 */ }
        }
      } catch { /* 忽略 */ }
      const model = await registerFile(path.join(session.dir, main))
      return modelLoadResult(model)
    }
    case "open_viewer":
      return {
        content: [{ type: "text", text: workspace.plates.length ? `建模工作台已打开：${workspace.plates.length} 个盘。` : "建模工作台已打开。拖入模型文件、点击对话区模型链接或让 AI 调用 open_model 开始。" }],
        structuredContent: { models: modelList(), activeModelId: activeModelId, workspace },
      }
    case "list_models":
      return {
        content: [{ type: "text", text: `模型资源 ${models.size} 个；盘 ${workspace.plates.length} 个。` }],
        structuredContent: { models: modelList(), activeModelId: activeModelId, workspace },
      }
    case "get_workspace":
      return {
        content: [{ type: "text", text: JSON.stringify(workspace, null, 2) }],
        structuredContent: { workspace, models: modelList() },
      }
    case "get_model_info": {
      const model = resolveModel(args.modelId)
      const references = workspace.plates
        .map(p => ({ plateId: p.id, plateName: p.name, items: p.items.filter(i => i.modelId === model.id) }))
        .filter(r => r.items.length)
      const info = { ...summary(model), references, exportCaches: workspace.plates.filter(p => exportCaches.has(p.id)).map(p => ({ plateId: p.id, plateName: p.name, sizeBytes: exportCaches.get(p.id).bytes.length, updatedAt: exportCaches.get(p.id).updatedAt })) }
      return { content: [{ type: "text", text: JSON.stringify(info, null, 2) }], structuredContent: info }
    }
    case "export_model": {
      const plate = resolvePlate(args)
      const result = await writePlateExport(plate, args.outputPath)
      return {
        content: [{ type: "text", text: `盘「${plate.name}」已统一导出为 GLB：${result.path}（${(result.sizeBytes / 1024).toFixed(0)} KB，${plate.items.length} 个对象）。` }],
        structuredContent: { ...result, plateId: plate.id, plateName: plate.name },
      }
    }
    case "list_adapters": {
      const adapters = await listAdapters(await loadConfig())
      return { content: [{ type: "text", text: JSON.stringify(adapters, null, 2) }], structuredContent: { adapters, browserFormats: BROWSER_FORMATS } }
    }
    case "agent_create_model": {
      const parts = validateParts(args.parts)
      const name = String(args.name ?? "").trim().slice(0, 64) || "AI 模型"
      const spec = { specVersion: 1, up: "y", name, description: String(args.description ?? "").slice(0, 500), parts }
      await mkdir(GENERATED_DIR, { recursive: true })
      const safe = name.replace(/[^\w\u4e00-\u9fa5.-]+/g, "_") || "model"
      const file = path.join(GENERATED_DIR, `${safe}-${Date.now().toString(36)}.spec.json`)
      await writeFile(file, JSON.stringify(spec, null, 1), "utf8")
      const model = registerSpec(name, file, spec)
      return {
        content: [{ type: "text", text: `已用 ${parts.length} 个图元生成模型「${name}」（规格 ${(model.sizeBytes / 1024).toFixed(1)} KB）。建模工作台将导入该模型，用户可选择并入当前盘或新建盘。可随时用 agent_modify_model 调整图元，export_model 导出 GLB。` }],
        structuredContent: { model: summary(model), models: modelList(), activeModelId: model.id, workspace, importHint: { plateName: name } },
      }
    }
    case "agent_modify_model": {
      const operations = Array.isArray(args.operations) ? args.operations : []
      if (operations.length < 1 || operations.length > 100) throw new Error("operations 必须是 1–100 个操作。")
      const specModel = args.modelId ? resolveModel(args.modelId) : null
      let specChanged = false
      const touchedItems = new Set()
      const findItem = itemId => {
        for (const plate of workspace.plates) {
          const item = plate.items.find(i => i.id === itemId)
          if (item) return { plate, item }
        }
        throw new Error(`对象「${itemId}」不在任何盘中（可先用 get_workspace 查看）。`)
      }
      for (const op of operations) {
        if (!op || typeof op !== "object" || typeof op.op !== "string") throw new Error("每个操作必须是含 op 字段的对象。")
        switch (op.op) {
          case "addPart":
          case "removePart":
          case "setPart": {
            if (!specModel) throw new Error(`${op.op} 需要 modelId 指向 AI 生成的模型。`)
            if (specModel.format !== "spec") throw new Error(`模型「${specModel.name}」不是 AI 生成的图元模型，无法编辑图元；可改用 moveItem/rotateItem/scaleItem 等对象操作。`)
            const parts = specModel.spec.parts
            if (op.op === "addPart") {
              if (parts.length >= MAX_PARTS) throw new Error(`图元数量已达 ${MAX_PARTS} 上限。`)
              const part = validatePart(op.part, parts.length)
              if (parts.some(p => p.id === part.id)) part.id = `part-${Math.random().toString(36).slice(2, 8)}`
              parts.push(part)
            } else if (op.op === "removePart") {
              const idx = parts.findIndex(p => p.id === op.partId)
              if (idx === -1) throw new Error(`图元「${op.partId}」不存在。`)
              if (parts.length === 1) throw new Error("模型至少需要保留一个图元。")
              parts.splice(idx, 1)
            } else {
              const idx = parts.findIndex(p => p.id === op.partId)
              if (idx === -1) throw new Error(`图元「${op.partId}」不存在。`)
              parts[idx] = validatePart({ ...parts[idx], ...op, id: parts[idx].id }, idx)
            }
            specChanged = true
            break
          }
          case "moveItem":
          case "rotateItem":
          case "scaleItem": {
            const { item } = findItem(String(op.itemId ?? ""))
            const field = op.op === "moveItem" ? "position" : op.op === "rotateItem" ? "rotationDeg" : "scale"
            if (!num3(op[field])) throw new Error(`${op.op} 的 ${field} 必须是三个有限数值。`)
            for (const v of op[field]) if (Math.abs(v) > 1e6) throw new Error("对象变换数值过大。")
            item[field] = op[field]
            touchedItems.add(item.id)
            break
          }
          case "setItemVisible": {
            const { item } = findItem(String(op.itemId ?? ""))
            item.visible = op.visible !== false
            touchedItems.add(item.id)
            break
          }
          case "removeItem": {
            const { plate, item } = findItem(String(op.itemId ?? ""))
            plate.items = plate.items.filter(i => i.id !== item.id)
            touchedItems.add(item.id)
            break
          }
          case "addItem": {
            const model = resolveModel(String(op.modelId ?? ""))
            const plate = op.plateId ? workspace.plates.find(p => p.id === op.plateId) : (workspace.plates.find(p => p.id === workspace.activePlateId) ?? workspace.plates[0])
            if (!plate) throw new Error("还没有盘：请先导入或生成一个模型。")
            if (plate.items.length >= 500) throw new Error("盘内对象已达 500 上限。")
            const item = {
              id: String(op.itemId ?? `agent-${crypto.randomUUID()}`).slice(0, 64),
              modelId: model.id, name: String(op.name ?? model.name).slice(0, 128),
              position: op.position ?? [0, 0, 0], rotationDeg: op.rotationDeg ?? [0, 0, 0], scale: op.scale ?? [1, 1, 1],
              visible: op.visible !== false,
            }
            if (!num3(item.position) || !num3(item.rotationDeg) || !num3(item.scale)) throw new Error("addItem 的变换必须是三个有限数值。")
            plate.items.push(item)
            touchedItems.add(item.id)
            break
          }
          default: throw new Error(`未知操作：${op.op}`)
        }
      }
      if (specChanged) {
        specModel.spec.parts.forEach(validatePart)
        const jsonText = JSON.stringify(specModel.spec)
        await writeFile(specModel.sourcePath, jsonText, "utf8")
        specModel.bytes = Buffer.from(jsonText, "utf8")
        specModel.sizeBytes = specModel.bytes.length
        specModel.revision = (specModel.revision ?? 1) + 1
      }
      const changed = [
        specChanged ? `模型「${specModel.name}」更新到 r${specModel.revision}` : null,
        touchedItems.size ? `调整了 ${touchedItems.size} 个盘对象` : null,
      ].filter(Boolean).join("，") || "无实际变更"
      return {
        content: [{ type: "text", text: `已执行 ${operations.length} 个操作：${changed}。工作台将自动刷新，export_model 导出会包含这些修改。` }],
        structuredContent: {
          ok: true,
          ...(specModel ? { model: summary(specModel) } : {}),
          models: modelList(), activeModelId, workspace,
          ...(specChanged ? { reloadSpecs: [specModel.id] } : {}),
        },
      }
    }
    case "update_workspace_state": {
      workspace = validateWorkspace(args.workspace)
      for (const plateId of [...exportCaches.keys()]) {
        if (!workspace.plates.some(p => p.id === plateId)) exportCaches.delete(plateId)
      }
      return { content: [{ type: "text", text: "盘工作区已保存。" }], structuredContent: { ok: true, plateCount: workspace.plates.length } }
    }
    case "upload_export_chunk": {
      cleanupUploads()
      const plate = workspace.plates.find(p => p.id === args.plateId)
      if (!plate) throw new Error("盘不存在，请先同步工作区。")
      if (typeof args.data !== "string" || !args.data.length || args.data.length > 3_000_000) throw new Error("数据块无效或过大。")
      if (!Number.isInteger(args.index) || !Number.isInteger(args.total) || args.index < 0 || args.index >= args.total || args.total > 200) throw new Error("分块序号无效。")
      let upload = uploads.get(args.uploadId)
      if (!upload) {
        upload = { plateId: plate.id, total: args.total, chunks: new Map(), createdAt: Date.now() }
        uploads.set(args.uploadId, upload)
      }
      if (upload.plateId !== plate.id || upload.total !== args.total) throw new Error("uploadId 与盘/分块数不一致。")
      upload.chunks.set(args.index, Buffer.from(args.data, "base64"))
      if (!args.final) return { content: [{ type: "text", text: `块 ${args.index + 1}/${args.total} 已接收。` }], structuredContent: { ok: true, complete: false } }
      const parts = []
      let size = 0
      for (let i = 0; i < args.total; i++) {
        const part = upload.chunks.get(i)
        if (!part) throw new Error(`缺少块 ${i}，请重新导出。`)
        parts.push(part); size += part.length
      }
      uploads.delete(args.uploadId)
      if (size > MAX_EXPORT_BYTES) throw new Error("导出超过大小限制。")
      const bytes = Buffer.concat(parts, size)
      if (bytes.length < 12 || bytes.toString("ascii", 0, 4) !== "glTF") throw new Error("导出内容不是有效 GLB。")
      exportCaches.set(plate.id, { bytes, updatedAt: Date.now() })
      return { content: [{ type: "text", text: `盘「${plate.name}」GLB 缓存已更新（${(size / 1024).toFixed(0)} KB）。` }], structuredContent: { ok: true, complete: true, sizeBytes: size } }
    }
    case "save_export_to_path": {
      const plate = resolvePlate({ plateId: args.plateId })
      const result = await writePlateExport(plate, args.outputPath)
      return { content: [{ type: "text", text: `已保存：${result.path}` }], structuredContent: result }
    }
    case "settings_read": {
      const values = await loadConfig()
      return {
        content: [],
        structuredContent: {
          schema: SETTINGS_SCHEMA, values,
          layout: [{
            kind: "group", title: "建模软件适配",
            items: [
              { kind: "property", property: "blenderPath" },
              { kind: "property", property: "adaptersFile" },
              { kind: "property", property: "conversionTimeoutSec" },
              { kind: "tool", tool: "list_adapters", title: "检测已配置软件" },
            ],
          }],
        },
      }
    }
    case "settings_update": {
      const values = await saveConfig(args.set)
      return { content: [], structuredContent: { values } }
    }
    default:
      throw new Error(`未知工具：${name}`)
  }
}

// ---------- 资源 ----------
function listResources() {
  const resources = [{ uri: UI_URI, name: "建模工作台", mimeType: "text/html;profile=mcp-app" }]
  for (const model of models.values()) resources.push({ uri: `model://${model.id}/manifest`, name: `${model.name} 清单`, mimeType: "application/json" })
  return resources
}

function readResource(uri) {
  if (uri === UI_URI) {
    return {
      contents: [{
        uri, mimeType: "text/html;profile=mcp-app", text: html,
        _meta: { "qoder/ui": { availableDisplayModes: ["inline", "fullscreen"], preferredDisplayMode: "fullscreen" } },
      }],
    }
  }
  const match = /^model:\/\/([^/]+)\/(manifest|data(?:\/(\d+))?)$/.exec(uri)
  if (!match) throw new Error("资源不存在：" + uri)
  const model = models.get(match[1])
  if (!model) throw new Error("模型不存在或已被清理，请重新加载。")
  if (match[2] === "manifest") {
    const manifest = {
      id: model.id, name: model.name, format: model.format, payload: model.payload,
      sizeBytes: model.sizeBytes, chunkSize: RESOURCE_CHUNK,
      chunkCount: Math.max(1, Math.ceil(model.sizeBytes / RESOURCE_CHUNK)),
      sourcePath: model.sourcePath, converted: model.converted, converter: model.converter ?? null,
    }
    if (model.format === "spec") { manifest.revision = model.revision ?? 1; manifest.partCount = model.spec.parts.length }
    return { contents: [{ uri, mimeType: "application/json", text: JSON.stringify(manifest) }] }
  }
  const index = Number(match[3] ?? 0)
  const start = index * RESOURCE_CHUNK
  if (start >= model.sizeBytes && model.sizeBytes > 0) throw new Error("块序号越界。")
  const slice = model.bytes.subarray(start, start + RESOURCE_CHUNK)
  return { contents: [{ uri, mimeType: model.format === "glb" ? "model/gltf-binary" : "application/octet-stream", blob: slice.toString("base64") }] }
}

// ---------- JSON-RPC ----------
const reply = message => process.stdout.write(`${JSON.stringify({ jsonrpc: "2.0", ...message })}\n`)
const toolError = text => ({ isError: true, content: [{ type: "text", text }] })

async function handle(request) {
  if (!request || request.jsonrpc !== "2.0" || typeof request.method !== "string") {
    reply({ id: null, error: { code: -32600, message: "Invalid request" } }); return
  }
  if (request.id === undefined) return
  if (typeof request.id !== "string" && typeof request.id !== "number") {
    reply({ id: null, error: { code: -32600, message: "Invalid request identifier" } }); return
  }
  const { id, method, params = {} } = request
  const fail = (code, message) => reply({ id, error: { code, message } })
  if (!params || typeof params !== "object" || Array.isArray(params)) return fail(-32602, "Parameters must be an object")
  try {
    switch (method) {
      case "initialize": {
        const mimeTypes = params.capabilities?.extensions?.["io.modelcontextprotocol/ui"]?.mimeTypes
        offersApps = Array.isArray(mimeTypes) && mimeTypes.includes("text/html;profile=mcp-app")
        return reply({
          id, result: {
            protocolVersion: ["2024-11-05", "2025-03-26", "2025-06-18", "2025-11-25"].includes(params.protocolVersion) ? params.protocolVersion : "2025-11-25",
            capabilities: {
              tools: {}, resources: {},
              extensions: { "qoder/settings": { readTool: "settings_read", updateTool: "settings_update" } },
            },
            serverInfo: SERVER_INFO,
          },
        })
      }
      case "ping": return reply({ id, result: {} })
      case "tools/list":
        return reply({ id, result: { tools: offersApps ? tools : tools.filter(tool => !tool._meta?.["qoder/ui"]?.entrypoints) } })
      case "resources/list": return reply({ id, result: { resources: listResources() } })
      case "resources/read": {
        try { return reply({ id, result: readResource(String(params.uri ?? "")) }) }
        catch (error) { return fail(-32602, error.message) }
      }
      case "tools/call": {
        const args = params.arguments ?? {}
        if (!args || typeof args !== "object" || Array.isArray(args)) return fail(-32602, "Tool arguments must be an object")
        if (!tools.some(t => t.name === params.name)) return reply({ id, result: toolError(`未知工具：${params.name}`) })
        try { return reply({ id, result: await callTool(params.name, args) }) }
        catch (error) { return reply({ id, result: toolError(error?.message || String(error)) }) }
      }
      default: return fail(-32601, "Method not supported")
    }
  } catch (error) {
    return fail(-32603, error?.message || "Internal error")
  }
}

let buffer = Buffer.alloc(0)
process.stdin.on("data", chunk => {
  buffer = Buffer.concat([buffer, chunk])
  let end
  while ((end = buffer.indexOf(10)) !== -1) {
    const line = buffer.subarray(0, end)
    buffer = buffer.subarray(end + 1)
    if (line.length > MAX_LINE_BYTES) { process.stderr.write("model-studio: request too large\n"); process.exit(1) }
    if (!line.toString("utf8").trim()) continue
    try { void handle(JSON.parse(line.toString("utf8"))) }
    catch { reply({ id: null, error: { code: -32700, message: "Invalid JSON" } }) }
  }
  if (buffer.length > MAX_LINE_BYTES) { process.stderr.write("model-studio: request too large\n"); process.exit(1) }
})
process.stdin.on("end", () => process.exit(0))