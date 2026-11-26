// 生成浏览器端页面测试 harness：模拟 Qoder 宿主协议，驱动真实查看器页面。
// 产物 build/page-test.html 通过 iframe 加载 build/viewer.injected.html。
import { writeFile, readFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")

// ---- 构造测试网格 GLB ----
// 默认 8 顶点立方体；PAGE_TEST_GRID=N（≤250）生成 N×N 起伏网格，重导出约 1 MB，用来压测分块与宿主入参上限。
const GRID = Math.max(0, Number(process.env.PAGE_TEST_GRID || 0))
let positions
let indices
if (GRID > 1) {
  const verts = GRID + 1
  positions = new Float32Array(verts * verts * 3)
  let p = 0
  for (let z = 0; z < verts; z++) {
    for (let x = 0; x < verts; x++) {
      positions[p++] = x / GRID - 0.5
      positions[p++] = 0.05 * Math.sin((x / GRID) * Math.PI * 4) * Math.cos((z / GRID) * Math.PI * 4)
      positions[p++] = z / GRID - 0.5
    }
  }
  indices = new Uint16Array(GRID * GRID * 6)
  let q = 0
  for (let z = 0; z < GRID; z++) {
    for (let x = 0; x < GRID; x++) {
      const a = z * verts + x
      indices[q++] = a; indices[q++] = a + 1; indices[q++] = a + verts + 1
      indices[q++] = a; indices[q++] = a + verts + 1; indices[q++] = a + verts
    }
  }
} else {
  positions = new Float32Array([
    -0.5, -0.5, 0.5, 0.5, -0.5, 0.5, 0.5, 0.5, 0.5, -0.5, 0.5, 0.5,
    -0.5, -0.5, -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5, -0.5, 0.5, -0.5,
  ])
  indices = new Uint16Array([
    0, 1, 2, 0, 2, 3, 5, 4, 7, 5, 7, 6, 4, 0, 3, 4, 3, 7,
    1, 5, 6, 1, 6, 2, 4, 5, 1, 4, 1, 0, 3, 2, 6, 3, 6, 7,
  ])
}
const posMin = [Infinity, Infinity, Infinity]
const posMax = [-Infinity, -Infinity, -Infinity]
for (let i = 0; i < positions.length; i++) {
  const c = i % 3
  if (positions[i] < posMin[c]) posMin[c] = positions[i]
  if (positions[i] > posMax[c]) posMax[c] = positions[i]
}
// glTF 要求 4 字节对齐：索引段（Uint16）后补零再接 POSITION
const indexBytes = indices.byteLength
const indexPad = (4 - (indexBytes % 4)) % 4
const bin = Buffer.concat([Buffer.from(indices.buffer), Buffer.alloc(indexPad), Buffer.from(positions.buffer)])
const gltf = {
  asset: { version: "2.0" }, scene: 0,
  scenes: [{ nodes: [0] }], nodes: [{ mesh: 0, name: GRID > 1 ? "Grid" : "Cube" }],
  meshes: [{ primitives: [{ attributes: { POSITION: 1 }, indices: 0 }] }],
  accessors: [
    { bufferView: 0, componentType: 5123, count: indices.length, type: "SCALAR" },
    { bufferView: 1, componentType: 5126, count: positions.length / 3, type: "VEC3", min: posMin, max: posMax },
  ],
  bufferViews: [
    { buffer: 0, byteOffset: 0, byteLength: indexBytes, target: 34963 },
    { buffer: 0, byteOffset: indexBytes + indexPad, byteLength: positions.byteLength, target: 34962 },
  ],
  buffers: [{ byteLength: bin.length }],
}
const jsonBuf = Buffer.from(JSON.stringify(gltf))
const jsonPad = Buffer.alloc((4 - jsonBuf.length % 4) % 4, 0x20)
const jsonChunk = Buffer.concat([jsonBuf, jsonPad])
const binPad = Buffer.alloc((4 - bin.length % 4) % 4)
const binChunk = Buffer.concat([bin, binPad])
const glb = Buffer.alloc(12 + 8 + jsonChunk.length + 8 + binChunk.length)
glb.write("glTF", 0, "ascii"); glb.writeUInt32LE(2, 4); glb.writeUInt32LE(glb.length, 8)
glb.writeUInt32LE(jsonChunk.length, 12); glb.writeUInt32LE(0x4e4f534a, 16); jsonChunk.copy(glb, 20)
const binHeader = 20 + jsonChunk.length
glb.writeUInt32LE(binChunk.length, binHeader); glb.writeUInt32LE(0x004e4942, binHeader + 4); binChunk.copy(glb, binHeader + 8)

const meshName = GRID > 1 ? "grid" : "cube"
const manifest = {
  id: "test", name: `${meshName}.glb`, format: "glb", payload: "binary",
  sizeBytes: glb.length, chunkSize: 2097152, chunkCount: 1,
  sourcePath: `C:/tmp/${meshName}.glb`, converted: false, converter: null,
}
const manifest2 = { ...manifest, id: "test2", name: `${meshName}2.glb`, sourcePath: `C:/tmp/${meshName}2.glb` }

// ---- AI 建模 spec 模型（高精度图元：rounded_box / lathe / tube / pyramid）----
// 可选 argv[2]：从生成的 spec 文件加载模型（工厂等）；否则用默认茶杯套件
const specOverride = process.argv[2]
const specDoc = specOverride
  ? JSON.parse(await readFile(specOverride, "utf8"))
  : {
  specVersion: 1, up: "y", name: "AI 茶杯套件", description: "高精度图元自检模型",
  parts: [
    { id: "coaster", name: "杯垫", primitive: "rounded_box", params: { width: 0.9, height: 0.05, depth: 0.9, radius: 0.02, segments: 4 }, position: [0, 0.025, 0], rotationDeg: [0, 0, 0], scale: [1, 1, 1], color: "#7a5230", metalness: 0.2, roughness: 0.6, visible: true },
    { id: "cup", name: "杯身", primitive: "lathe", params: { segments: 64, points: [[0, 0], [0.35, 0], [0.36, 0.02], [0.30, 0.35], [0.32, 0.60], [0.28, 0.62], [0.27, 0.60], [0, 0.58]] }, position: [0, 0.05, 0], rotationDeg: [0, 0, 0], scale: [1, 1, 1], color: "#e8e4d8", metalness: 0.05, roughness: 0.4, visible: true },
    { id: "handle", name: "把手", primitive: "tube", params: { radius: 0.035, tubularSegments: 64, radialSegments: 16, points: [[0.32, 0.50, 0], [0.55, 0.50, 0], [0.60, 0.28, 0], [0.32, 0.22, 0]] }, position: [0, 0.05, 0], rotationDeg: [0, 0, 0], scale: [1, 1, 1], color: "#e8e4d8", metalness: 0.05, roughness: 0.4, visible: true },
    { id: "tip", name: "方糖", primitive: "pyramid", params: { radius: 0.09, height: 0.12 }, position: [-0.55, 0.11, 0.55], rotationDeg: [0, 45, 0], scale: [1, 1, 1], color: "#9aa5b1", metalness: 0.1, roughness: 0.5, visible: true },
  ],
}
const specBytes = Buffer.from(JSON.stringify(specDoc), "utf8")
const manifestSpec = {
  id: "spec1", name: specDoc.name, format: "spec", payload: "spec",
  sizeBytes: specBytes.length, chunkSize: 2097152, chunkCount: 1,
  sourcePath: "C:/tmp/AI-spec.spec.json", converted: false, converter: null,
  revision: 1, partCount: specDoc.parts.length,
}

const harness = `<!DOCTYPE html>
<html lang="zh-CN"><head><meta charset="utf-8"><title>page-test harness</title></head>
<body style="margin:0;font:12px monospace">
<div id="log" style="height:90px;overflow:auto;background:#111;color:#8f8;padding:4px"></div>
<script>
const CALLS = []; window.__calls = CALLS;
// ?dl=<深链接 URL> 模拟宿主在 initialize 的 hostContext 里带上深链接（页面尚未 ready 时的排队路径）
window.__bootDeepLink = new URLSearchParams(location.search).get("dl") || "";
window.__manifests = { test: ${JSON.stringify(manifest)}, test2: ${JSON.stringify(manifest2)}, spec1: ${JSON.stringify(manifestSpec)} };
window.__specDoc = ${JSON.stringify(specDoc)};
const GLB_B64 = "${glb.toString("base64")}";
// iframe 在监听器注册好之后再挂上：大 harness 的父页面脚本要解析几 MB，先加载子页面会丢掉 ui/initialize。
const frame = document.createElement("iframe");
frame.id = "app"; frame.src = "./viewer.injected.html"; frame.setAttribute("style", "width:100%;height:640px;border:0");
const logEl = document.getElementById("log");
function log(text) { const d = document.createElement("div"); d.textContent = text; logEl.appendChild(d); logEl.scrollTop = logEl.scrollHeight; }
const MODELS = [{ id: "test", name: "${meshName}.glb", format: "glb" }, { id: "test2", name: "${meshName}2.glb", format: "glb" }, { id: "spec1", name: "AI 茶杯套件", format: "spec" }];
window.__pushModel = id => {
  frame.contentWindow.postMessage({ jsonrpc: "2.0", method: "ui/notifications/tool-result", params: {
    structuredContent: { model: { id }, models: MODELS, activeModelId: id },
  } }, "*");
  log("pushed model " + id);
};
// 模拟 Agent 调用 agent_create_model / agent_modify_model 后宿主转发给页面的 tool-result
window.__pushAgentCreate = () => {
  frame.contentWindow.postMessage({ jsonrpc: "2.0", method: "ui/notifications/tool-result", params: {
    structuredContent: { model: { id: "spec1" }, models: MODELS, activeModelId: "spec1", importHint: { plateName: "AI 茶杯套件" } },
  } }, "*");
  log("pushed agent_create_model");
};
window.__pushAgentModify = operations => {
  const doc = window.__specDoc;
  for (const op of operations) {
    if (op.op === "addPart") doc.parts.push(op.part);
    else if (op.op === "removePart") doc.parts = doc.parts.filter(p => p.id !== op.partId);
    else if (op.op === "setPart") { const part = doc.parts.find(p => p.id === op.partId); if (part) Object.assign(part, op.patch || {}); }
  }
  window.__manifests.spec1.revision += 1;
  window.__manifests.spec1.partCount = doc.parts.length;
  frame.contentWindow.postMessage({ jsonrpc: "2.0", method: "ui/notifications/tool-result", params: {
    structuredContent: { ok: true, model: { id: "spec1" }, models: MODELS, reloadSpecs: ["spec1"] },
  } }, "*");
  log("pushed agent_modify_model r" + window.__manifests.spec1.revision);
};
window.__pushContext = ctx => {
  frame.contentWindow.postMessage({ jsonrpc: "2.0", method: "ui/notifications/host-context-changed", params: ctx }, "*");
  log("pushed context");
};
// 宿主对 MCP App 工具入参有 1 MiB 硬校验（按 JSON.stringify(arguments) 字节数），照抄进 harness；
// ?argcap=<字节> 可临时压低上限，用来验证页面的分块降半重传。
const ARG_CAP = Number(new URLSearchParams(location.search).get("argcap")) || 1048576;
window.__argCap = ARG_CAP;
function overCap(args) { return new TextEncoder().encode(JSON.stringify(args)).length >= ARG_CAP }
window.addEventListener("message", e => {
  if (e.source !== frame.contentWindow) return;
  const m = e.data; if (!m || m.jsonrpc !== "2.0") return;
  if (m.method && m.id === undefined) {
    CALLS.push({ method: m.method, params: m.params });
    log("notif " + m.method);
    if (m.method === "ui/notifications/initialized") {
      setTimeout(() => { window.__pushModel("test"); }, 300);
    }
    return;
  }
  CALLS.push({ id: m.id, method: m.method, params: m.params });
  log("req " + m.method + (m.params?.name ? " " + m.params.name : "") + (m.params?.uri ? " " + m.params.uri : ""));
  let result = {};
  switch (m.method) {
    case "ui/initialize":
      result = { protocolVersion: "2026-01-26",
        hostCapabilities: { serverTools: {}, serverResources: {}, message: {}, updateModelContext: {}, downloadFile: {}, experimental: { "qoder/files": {} } },
        hostContext: { theme: "light", displayMode: "fullscreen", ...(window.__bootDeepLink ? { "qoder/deepLink": { url: window.__bootDeepLink } } : {}) } };
      break;
    case "tools/call": {
      const n = m.params.name, a = m.params.arguments || {};
      if (/^upload_(import|export)_chunk$/.test(n) && overCap(a)) {
        window.__capRejects = (window.__capRejects || 0) + 1;
        log("REJECT " + n + " 入参超宿主上限");
        frame.contentWindow.postMessage({ jsonrpc: "2.0", id: m.id, error: { code: -32602, message: "MCP App 工具参数过大。" } }, "*");
        return;
      }
      if (n === "open_viewer") result = { content: [], structuredContent: { models: [], activeModelId: null, workspace: { plates: [], activePlateId: null } } };
      else if (n === "pending_open_requests") result = { content: [], structuredContent: { requests: (window.__externalOpens || []).splice(0) } };
      else if (n === "load_local_file") result = { content: [], structuredContent: { model: { id: "test2" }, models: MODELS, activeModelId: "test2", workspace: { plates: [], activePlateId: null } } };
      else if (n === "upload_import_chunk") {
        window.__chunkArgBytes = (window.__chunkArgBytes || []).concat(new TextEncoder().encode(JSON.stringify(a)).length);
        window.__importChunks = window.__importChunks || {};
        const key = a.uploadId + "/" + a.fileName;
        (window.__importChunks[key] = window.__importChunks[key] || []).push({ index: a.index, total: a.total, data: a.data, final: a.final });
        result = { content: [], structuredContent: { ok: true, complete: Boolean(a.final), sizeBytes: 1 } };
      }
      else if (n === "commit_import") {
        window.__committedImport = a;
        result = { content: [], structuredContent: { model: { id: "test2" }, models: MODELS, activeModelId: "test2", workspace: { plates: [], activePlateId: null } } };
      }
      else if (n === "update_workspace_state") result = { content: [], structuredContent: { ok: true, plateCount: (a.workspace?.plates ?? []).length } };
      else if (n === "upload_export_chunk") result = { content: [], structuredContent: { ok: true, complete: Boolean(a.final), sizeBytes: 1 } };
      else if (n === "save_export_to_path") result = { content: [], structuredContent: { path: "C:/tmp/out.glb", sizeBytes: 1 } };
      else result = { content: [], structuredContent: {} };
      break;
    }
    case "resources/read": {
      const uri = m.params.uri;
      const id = (uri.slice("model://".length).split("/")[0]) || "";
      if (uri.endsWith("/manifest")) result = { contents: [{ uri, mimeType: "application/json", text: JSON.stringify(window.__manifests[id] ?? window.__manifests.test) }] };
      else if (id === "spec1") {
        const bytes = new TextEncoder().encode(JSON.stringify(window.__specDoc));
        let bin = ""; for (const b of bytes) bin += String.fromCharCode(b);
        result = { contents: [{ uri, mimeType: "application/json", blob: btoa(bin) }] };
      }
      else result = { contents: [{ uri, mimeType: "model/gltf-binary", blob: GLB_B64 }] };
      break;
    }
    default: result = {};
  }
  frame.contentWindow.postMessage({ jsonrpc: "2.0", id: m.id, result }, "*");
});
document.body.appendChild(frame);
</script>
</body></html>`

// 输出路径：argv[3] 或 PAGE_TEST_OUT（默认 build/page-test.html）
const outPath = process.argv[3] ? path.resolve(process.argv[3]) : path.resolve(process.env.PAGE_TEST_OUT || path.join(root, "build", "page-test.html"))
await writeFile(outPath, harness)
// 确认注入产物存在
await readFile(path.join(root, "build", "viewer.injected.html"))
console.log(path.basename(outPath) + " written;", meshName + ".glb bytes:", glb.length, GRID > 1 ? `(网格 ${GRID}×${GRID}，压测分块)` : "")