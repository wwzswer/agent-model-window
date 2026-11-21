// 协议冒烟测试：真实子进程 stdio JSON-RPC + 临时模型文件。
// 不启动浏览器；页面渲染需在 Qoder 中人工验证。
import { spawn } from "node:child_process"
import { writeFile, readFile, mkdir, rm, stat } from "node:fs/promises"
import { existsSync } from "node:fs"
import path from "node:path"
import os from "node:os"
import { fileURLToPath } from "node:url"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const tmp = path.join(os.tmpdir(), "model-studio-smoke-" + Date.now())
await mkdir(tmp, { recursive: true })

let failures = 0
function check(name, ok, detail = "") {
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? "  — " + detail : ""}`)
  if (!ok) failures++
}

// ---- JSON-RPC 客户端 ----
const child = spawn(process.execPath, [path.join(root, "server.mjs")], { stdio: ["pipe", "pipe", "pipe"] })
let buffer = ""
const pending = new Map()
let seq = 0
child.stdout.on("data", chunk => {
  buffer += chunk.toString()
  let end
  while ((end = buffer.indexOf("\n")) !== -1) {
    const line = buffer.slice(0, end); buffer = buffer.slice(end + 1)
    if (!line.trim()) continue
    const message = JSON.parse(line)
    const task = pending.get(message.id)
    if (task) { pending.delete(message.id); task(message) }
  }
})
let stderrText = ""
child.stderr.on("data", d => { stderrText += d.toString() })
function rpc(method, params) {
  const id = ++seq
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => { pending.delete(id); reject(new Error("timeout: " + method)) }, 30000)
    pending.set(id, message => { clearTimeout(timer); resolve(message) })
    child.stdin.write(JSON.stringify({ jsonrpc: "2.0", id, method, params }) + "\n")
  })
}
const call = async (name, args = {}) => {
  const response = await rpc("tools/call", { name, arguments: args })
  if (response.error) throw new Error(response.error.message)
  return response.result
}

try {
  // ---- initialize / tools / resources ----
  const init = await rpc("initialize", {
    protocolVersion: "2025-11-25",
    capabilities: { extensions: { "io.modelcontextprotocol/ui": { mimeTypes: ["text/html;profile=mcp-app"] } } },
    clientInfo: { name: "smoke", version: "0.0.0" },
  })
  check("initialize 协商", init.result?.protocolVersion === "2025-11-25")
  check("settings 扩展声明", init.result?.capabilities?.extensions?.["qoder/settings"]?.readTool === "settings_read")

  const toolList = (await rpc("tools/list", {})).result.tools
  const names = toolList.map(t => t.name)
  check("工具齐全", ["open_model", "export_model", "list_models", "get_workspace", "get_model_info", "list_adapters", "agent_create_model", "agent_modify_model", "open_viewer", "load_local_file", "upload_import_chunk", "commit_import", "update_workspace_state", "upload_export_chunk", "save_export_to_path", "settings_read", "settings_update"].every(n => names.includes(n)))
  const openViewer = toolList.find(t => t.name === "open_viewer")
  check("入口声明 global+thread", JSON.stringify(openViewer._meta["qoder/ui"].entrypoints) === JSON.stringify([{ type: "global" }, { type: "thread" }]))
  check("写操作仅 App 可见", toolList.filter(t => t._meta?.ui?.visibility?.includes("app")).length >= 6)
  check("占位工具存在", names.includes("agent_create_model") && names.includes("agent_modify_model"))
  const createTool = toolList.find(t => t.name === "agent_create_model")
  check("AI 建模不再是占位", createTool.title.includes("AI 生成模型") && !createTool.description.includes("not_implemented"))

  const uiRead = await rpc("resources/read", { uri: "ui://model-studio/viewer.html" })
  const ui = uiRead.result?.contents?.[0]
  check("UI 资源 mime", ui?.mimeType === "text/html;profile=mcp-app")
  check("UI 资源大小 < 4MiB", Buffer.byteLength(ui?.text ?? "", "utf8") < 4 * 1024 * 1024, `${(Buffer.byteLength(ui?.text ?? "", "utf8") / 1024).toFixed(0)} KB`)
  check("UI 显示偏好 fullscreen", ui?._meta?.["qoder/ui"]?.preferredDisplayMode === "fullscreen")
  check("UI 已注入脚本", ui?.text?.includes("canvasHost") && !ui?.text?.includes("/* APP_SCRIPT */"))

  // ---- STL 加载与分块传输 ----
  // 二进制 STL：1 个三角形
  const stl = Buffer.alloc(84 + 50)
  stl.write("smoke triangle", 0)
  stl.writeUInt32LE(1, 80)
  const off = 84
  const floats = [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0]
  floats.forEach((v, i) => stl.writeFloatLE(v, off + i * 4))
  const stlPath = path.join(tmp, "triangle.stl")
  await writeFile(stlPath, stl)

  const opened = await call("open_model", { path: stlPath })
  check("open_model 成功", !opened.isError && opened.structuredContent?.model?.format === "stl")
  const modelId = opened.structuredContent.model.id

  const manifest = JSON.parse((await rpc("resources/read", { uri: `model://${modelId}/manifest` })).result.contents[0].text)
  check("manifest 正确", manifest.chunkCount === 1 && manifest.sizeBytes === stl.length && manifest.payload === "binary")
  const chunk = (await rpc("resources/read", { uri: `model://${modelId}/data/0` })).result.contents[0]
  check("分块数据一致", Buffer.from(chunk.blob, "base64").equals(stl))

  // ---- OBJ + MTL bundle ----
  const objPath = path.join(tmp, "quad.obj")
  const mtlPath = path.join(tmp, "quad.mtl")
  await writeFile(mtlPath, "newmtl mat\nKd 0.8 0.2 0.2\n")
  await writeFile(objPath, "mtllib quad.mtl\nv 0 0 0\nv 1 0 0\nv 1 1 0\nv 0 1 0\nusemtl mat\nf 1 2 3 4\n")
  const objOpened = await call("open_model", { path: objPath })
  const objId = objOpened.structuredContent?.model?.id
  check("OBJ 注册为 bundle", objOpened.structuredContent?.model?.format === "obj")
  const objManifest = JSON.parse((await rpc("resources/read", { uri: `model://${objId}/manifest` })).result.contents[0].text)
  check("OBJ bundle 标记", objManifest.payload === "bundle")
  const objBytes = Buffer.from((await rpc("resources/read", { uri: `model://${objId}/data/0` })).result.contents[0].blob, "base64")
  const bundle = JSON.parse(objBytes.toString("utf8"))
  check("OBJ bundle 含 MTL", bundle.kind === "obj" && bundle.mtl?.text?.includes("newmtl mat"))

  // ---- 沙箱拖拽导入：字节分块上传 + 提交注册 ----
  const dropMid = Math.ceil(stl.length / 2)
  await call("upload_import_chunk", { uploadId: "smoke-drop", fileName: "dropped.stl", index: 0, total: 2, data: stl.subarray(0, dropMid).toString("base64"), final: false })
  const dropUp = await call("upload_import_chunk", { uploadId: "smoke-drop", fileName: "dropped.stl", index: 1, total: 2, data: stl.subarray(dropMid).toString("base64"), final: true })
  check("拖拽分块组装", dropUp.structuredContent?.complete === true && dropUp.structuredContent?.sizeBytes === stl.length)
  const committed = await call("commit_import", { uploadId: "smoke-drop", mainFile: "dropped.stl" })
  check("commit_import 注册", !committed.isError && committed.structuredContent?.model?.format === "stl")
  const dropId = committed.structuredContent?.model?.id
  const dropBytes = Buffer.from((await rpc("resources/read", { uri: `model://${dropId}/data/0` })).result.contents[0].blob, "base64")
  check("拖拽模型字节一致", dropBytes.equals(stl))
  const dropInfo = await call("get_model_info", { modelId: dropId })
  check("拖拽源文件位于导入暂存目录", /[\\/]imports[\\/]/.test(dropInfo.structuredContent?.sourcePath ?? ""))
  const badCommit = await call("commit_import", { uploadId: "smoke-drop" })
  check("重复提交报错", badCommit.isError === true)
  await call("upload_import_chunk", { uploadId: "smoke-missing", fileName: "x.stl", index: 0, total: 2, data: stl.subarray(0, dropMid).toString("base64"), final: false })
  const missingChunk = await call("upload_import_chunk", { uploadId: "smoke-missing", fileName: "x.stl", index: 1, total: 2, data: "", final: true })
  check("缺块提交被拒绝", missingChunk.isError === true)

  // ---- 盘工作区同步 ----
  const plateId = "plate-1"
  const workspace = {
    plates: [{
      id: plateId, name: "盘 1", visible: true,
      items: [{ id: "item-1", modelId, name: "triangle", position: [1, 2, 3], rotationDeg: [0, 45, 0], scale: [2, 2, 2], visible: true }],
    }],
    activePlateId: plateId,
  }
  const wsSaved = await call("update_workspace_state", { workspace })
  check("update_workspace_state 保存", wsSaved.structuredContent?.ok === true && wsSaved.structuredContent?.plateCount === 1)
  const wsRead = await call("get_workspace", {})
  check("get_workspace 读回", wsRead.structuredContent?.workspace?.plates?.[0]?.items?.[0]?.position?.[1] === 2)
  const info = await call("get_model_info", { modelId })
  check("模型引用盘可读回", info.structuredContent?.references?.[0]?.plateId === plateId)
  const badWs = await call("update_workspace_state", { workspace: { plates: [{ id: "x", name: "x", items: [{ id: "i", modelId, position: [0, "a", 0], rotationDeg: [0, 0, 0], scale: [1, 1, 1] }] }] } })
  check("非法变换被拒绝", badWs.isError === true)

  // ---- 分块上传导出 + export_model ----
  const jsonChunk = Buffer.from(JSON.stringify({ asset: { version: "2.0" } }))
  const padded = Buffer.concat([jsonChunk, Buffer.alloc((4 - jsonChunk.length % 4) % 4, 0x20)])
  const glb = Buffer.alloc(12 + 8 + padded.length)
  glb.write("glTF", 0, "ascii"); glb.writeUInt32LE(2, 4); glb.writeUInt32LE(glb.length, 8)
  glb.writeUInt32LE(padded.length, 12); glb.writeUInt32LE(0x4e4f534a, 16)
  padded.copy(glb, 20)
  // 按原始字节切块上传（base64 字符切块会破坏解码）
  const mid = Math.ceil(glb.length / 2)
  await call("upload_export_chunk", { plateId, uploadId: "smoke-1", index: 0, total: 2, data: glb.subarray(0, mid).toString("base64"), final: false })
  const finalUp = await call("upload_export_chunk", { plateId, uploadId: "smoke-1", index: 1, total: 2, data: glb.subarray(mid).toString("base64"), final: true })
  check("分块上传组装", finalUp.structuredContent?.complete === true && finalUp.structuredContent?.sizeBytes === glb.length)

  const outPath = path.join(tmp, "exported.glb")
  const exported = await call("export_model", { plateId, outputPath: outPath })
  check("export_model 落盘", !exported.isError && existsSync(outPath))
  check("导出内容一致", (await readFile(outPath)).equals(glb))
  const byModel = await call("export_model", { modelId, outputPath: path.join(tmp, "by-model.glb") })
  check("按 modelId 定位盘导出", !byModel.isError && byModel.structuredContent?.plateId === plateId)
  const info2 = await call("get_model_info", { modelId })
  check("导出缓存状态", info2.structuredContent?.exportCaches?.some(c => c.plateId === plateId && c.sizeBytes === glb.length))

  // 源文件保护：outputPath 指向源文件时自动改名（先为 OBJ 所在盘建立导出缓存）
  const plate2 = "plate-2"
  await call("update_workspace_state", { workspace: { plates: [...workspace.plates, { id: plate2, name: "盘 2", visible: true, items: [{ id: "item-2", modelId: objId, name: "quad", position: [0, 0, 0], rotationDeg: [0, 0, 0], scale: [1, 1, 1], visible: true }] }], activePlateId: plate2 } })
  await call("upload_export_chunk", { plateId: plate2, uploadId: "smoke-obj", index: 0, total: 1, data: glb.toString("base64"), final: true })
  const guard = await call("export_model", { plateId: plate2, outputPath: objPath })
  check("不覆盖源文件", guard.structuredContent?.path !== objPath && /\.glb$/.test(guard.structuredContent?.path ?? ""))
  // 删除盘后导出缓存随之清理
  await call("update_workspace_state", { workspace })
  const info3 = await call("get_model_info", { modelId: objId })
  check("删盘清理导出缓存", !(info3.structuredContent?.exportCaches ?? []).some(c => c.plateId === plate2))

  // ---- 设置 / 适配器 / 占位 ----
  const settings = await call("settings_read", {})
  check("settings_read schema+values", settings.structuredContent?.schema?.properties?.blenderPath && "blenderPath" in (settings.structuredContent?.values ?? {}))
  const adapters = await call("list_adapters", {})
  check("list_adapters 含 Blender 条目", adapters.structuredContent?.adapters?.some(a => a.id === "blender"))
  // ---- AI 建模：spec 生成 / 校验 / 修改 ----
  const created = await call("agent_create_model", {
    name: "小桌", description: "一张小桌",
    parts: [
      { id: "top", primitive: "box", params: { width: 1.2, height: 0.06, depth: 0.7 }, position: [0, 0.72, 0] },
      { primitive: "cylinder", params: { radius: 0.04, height: 0.7 }, position: [0.52, 0.35, 0.27] },
      { primitive: "cylinder", params: { radius: 0.04, height: 0.7 }, position: [-0.52, 0.35, 0.27] },
      { primitive: "cylinder", params: { radius: 0.04, height: 0.7 }, position: [0.52, 0.35, -0.27] },
      { primitive: "cylinder", params: { radius: 0.04, height: 0.7 }, position: [-0.52, 0.35, -0.27] },
    ],
  })
  check("agent_create_model 生成", !created.isError && created.structuredContent?.model?.format === "spec" && created.structuredContent?.importHint?.plateName === "小桌")
  const specId = created.structuredContent?.model?.id
  const specManifest = JSON.parse((await rpc("resources/read", { uri: `model://${specId}/manifest` })).result.contents[0].text)
  check("spec manifest 元数据", specManifest.payload === "spec" && specManifest.revision === 1 && specManifest.partCount === 5)
  const specJson = JSON.parse(Buffer.from((await rpc("resources/read", { uri: `model://${specId}/data/0` })).result.contents[0].blob, "base64").toString("utf8"))
  check("spec 内容可读回", specJson.name === "小桌" && specJson.parts.length === 5 && specJson.parts[0].id === "top")
  check("生成文件落盘", existsSync(created.structuredContent.model.sourcePath))
  const badPrimitive = await call("agent_create_model", { parts: [{ primitive: "diamond" }] })
  check("不支持图元被拒绝", badPrimitive.isError === true)
  const badParam = await call("agent_create_model", { parts: [{ primitive: "box", params: { width: -1 } }] })
  check("非法参数被拒绝", badParam.isError === true)
  const noParts = await call("agent_create_model", { parts: [] })
  check("空 parts 被拒绝", noParts.isError === true)

  // ---- 高精度图元：rounded_box / lathe / tube / pyramid ----
  const precise = await call("agent_create_model", {
    name: "精度演示", parts: [
      { id: "coaster", primitive: "rounded_box", params: { width: 0.9, height: 0.05, depth: 0.9, radius: 0.02, segments: 4 }, position: [0, 0.025, 0] },
      { id: "cup", primitive: "lathe", params: { segments: 64, points: [[0, 0], [0.35, 0], [0.36, 0.02], [0.30, 0.35], [0.32, 0.60], [0.28, 0.62], [0.27, 0.60], [0, 0.58]] }, position: [0, 0.05, 0] },
      { id: "handle", primitive: "tube", params: { radius: 0.03, tubularSegments: 48, radialSegments: 12, points: [[0.32, 0.45, 0], [0.55, 0.45, 0], [0.58, 0.25, 0], [0.32, 0.20, 0]] }, position: [0, 0.05, 0] },
      { id: "tip", primitive: "pyramid", params: { radius: 0.25, height: 0.3 }, position: [0.6, 0.2, 0.6] },
    ],
  })
  check("高精度图元通过校验", !precise.isError && precise.structuredContent?.model?.format === "spec")
  const preciseJson = JSON.parse(Buffer.from((await rpc("resources/read", { uri: `model://${precise.structuredContent?.model?.id}/data/0` })).result.contents[0].blob, "base64").toString("utf8"))
  check("lathe/tube points 原样持久化", preciseJson.parts.find(p => p.id === "cup")?.params?.points?.length === 8 && preciseJson.parts.find(p => p.id === "handle")?.params?.points?.[1]?.length === 3)
  const setLathe = await call("agent_modify_model", { modelId: precise.structuredContent?.model?.id, operations: [{ op: "setPart", partId: "cup", params: { segments: 48, points: [[0, 0], [0.3, 0], [0.3, 0.5], [0, 0.5]] } }] })
  check("setPart 保留 points", !setLathe.isError)
  const badRounded = await call("agent_create_model", { parts: [{ primitive: "rounded_box", params: { width: 0.2, height: 0.2, depth: 0.2, radius: 0.5 } }] })
  check("圆角半径超限被拒绝", badRounded.isError === true)
  const badLathe = await call("agent_create_model", { parts: [{ primitive: "lathe", params: { points: [[0.1, 0]] } }] })
  check("lathe 点数不足被拒绝", badLathe.isError === true)
  const badTube = await call("agent_create_model", { parts: [{ primitive: "tube", params: { points: [[0, 0, 0], [1, "x", 0]] } }] })
  check("tube 非法点被拒绝", badTube.isError === true)

  // 盘对象级操作 + spec 图元级修改
  const wsSpec = { plates: [{ id: plateId, name: "盘 1", visible: true, items: [...workspace.plates[0].items, { id: "item-spec", modelId: specId, name: "小桌", position: [0, 0, 0], rotationDeg: [0, 0, 0], scale: [1, 1, 1], visible: true }] }], activePlateId: plateId }
  await call("update_workspace_state", { workspace: wsSpec })
  const modified = await call("agent_modify_model", { modelId: specId, operations: [
    { op: "addPart", part: { id: "drawer", primitive: "box", params: { width: 0.5, height: 0.12, depth: 0.5 }, position: [0, 0.6, 0], color: "#B87333" } },
    { op: "setPart", partId: "top", position: [0, 0.8, 0] },
    { op: "removePart", partId: "part-3" },
    { op: "moveItem", itemId: "item-spec", position: [2, 0, 0] },
    { op: "setItemVisible", itemId: "item-1", visible: false },
  ] })
  check("agent_modify_model 执行", !modified.isError && modified.structuredContent?.reloadSpecs?.[0] === specId)
  const modifiedManifest = JSON.parse((await rpc("resources/read", { uri: `model://${specId}/manifest` })).result.contents[0].text)
  check("revision 与图元数更新", modifiedManifest.revision === 2 && modifiedManifest.partCount === 5)
  const specJson2 = JSON.parse(Buffer.from((await rpc("resources/read", { uri: `model://${specId}/data/0` })).result.contents[0].blob, "base64").toString("utf8"))
  check("图元修改生效", specJson2.parts.some(p => p.id === "drawer") && specJson2.parts.find(p => p.id === "top")?.position?.[1] === 0.8 && !specJson2.parts.some(p => p.id === "part-3") && specJson2.parts.find(p => p.id === "drawer")?.color === "#b87333")
  const wsAfter = (await call("get_workspace", {})).structuredContent?.workspace
  check("对象级修改进工作区", wsAfter?.plates?.[0]?.items?.find(i => i.id === "item-spec")?.position?.[0] === 2 && wsAfter?.plates?.[0]?.items?.find(i => i.id === "item-1")?.visible === false)
  const addItemOp = await call("agent_modify_model", { operations: [{ op: "addItem", modelId: specId, plateId, name: "小桌副本", position: [4, 0, 0] }] })
  const wsAfter2 = (await call("get_workspace", {})).structuredContent?.workspace
  check("addItem 摆放已有模型", !addItemOp.isError && wsAfter2?.plates?.[0]?.items?.some(i => i.name === "小桌副本" && i.modelId === specId))
  const badOp = await call("agent_modify_model", { modelId: specId, operations: [{ op: "explode" }] })
  check("未知操作被拒绝", badOp.isError === true)
  const nonSpec = await call("agent_modify_model", { modelId, operations: [{ op: "addPart", part: { primitive: "box" } }] })
  check("非 spec 模型图元操作被拒绝", nonSpec.isError === true)
  const badItem = await call("agent_modify_model", { operations: [{ op: "moveItem", itemId: "nope", position: [1, 2, 3] }] })
  check("不存在对象被拒绝", badItem.isError === true)
  await call("update_workspace_state", { workspace })

  // ---- 错误路径 ----
  const missing = await call("open_model", { path: path.join(tmp, "nope.glb") })
  check("缺失文件报错", missing.isError === true)
  const unsupported = await call("open_model", { path: await (async () => { const p = path.join(tmp, "part.step"); await writeFile(p, "ISO-10303-21;"); return p })() })
  check("未配置适配器时 STEP 给出指引", unsupported.isError && /适配器|Blender/.test(unsupported.content[0].text))
  const badChunk = await call("upload_export_chunk", { plateId, uploadId: "smoke-bad", index: 0, total: 1, data: Buffer.from("not a glb").toString("base64"), final: true })
  check("非法 GLB 被拒绝", badChunk.isError === true)

  check("服务器 stderr 无崩溃", !/Error:|TypeError|ReferenceError/.test(stderrText), stderrText.slice(0, 200))
} catch (error) {
  failures++
  console.log("FAIL  冒烟测试异常 — " + (error?.stack || error))
} finally {
  child.stdin.end()
  child.kill()
  await rm(tmp, { recursive: true, force: true })
}

console.log(failures === 0 ? "\nSMOKE OK" : `\nSMOKE FAILED (${failures})`)
process.exit(failures === 0 ? 0 : 1)