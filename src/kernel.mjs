// Node 侧几何内核入口：被 build/build-node.mjs 打包成 lib/geometry.node.mjs 供 server.mjs 使用。
// 分析层（src/analysis.js）不依赖 Node/DOM；这里补上 Node 侧能力：PNG 编码、GLB 直出、求值缓存、统一门面。
import { deflateSync } from "node:zlib"
import { createHash } from "node:crypto"
import {
  flatten, summarize, checkGates, gateError, renderView, sectionWidths, overlaps, searchParams, VIEWS,
} from "./analysis.js"
import { buildSpecModel, specGeometry, SPEC_PRIMITIVES } from "./spec.js"

export const KERNEL_VERSION = "0.9.0"
const round = (v, d = 5) => Number(Number(v).toFixed(d))

// ---------- 求值缓存：同一份 spec 只展开一次 ----------
const cache = new Map()
const CACHE_MAX = 8

export function specHash(spec) {
  return createHash("sha1").update(stableJson(spec)).digest("hex").slice(0, 16)
}

function stableJson(value) {
  const norm = v => {
    if (Array.isArray(v)) return "[" + v.map(norm).join(",") + "]"
    if (v && typeof v === "object") return "{" + Object.keys(v).sort().map(k => JSON.stringify(k) + ":" + norm(v[k])).join(",") + "}"
    if (typeof v === "number") return Number.isFinite(v) ? String(Math.round(v * 1e6) / 1e6) : "null"
    return JSON.stringify(v ?? null)
  }
  return norm(value)
}

export function modelOf(spec, { refresh = false } = {}) {
  const key = specHash(spec)
  if (!refresh && cache.has(key)) {
    const hit = cache.get(key)
    cache.delete(key)
    cache.set(key, hit)
    return { ...hit, key, cached: true }
  }
  const model = flatten(spec)
  model.key = key
  cache.set(key, model)
  while (cache.size > CACHE_MAX) cache.delete(cache.keys().next().value)
  return { ...model, key, cached: false }
}

export function cacheStats() {
  return { size: cache.size, max: CACHE_MAX }
}
export function clearCache() {
  cache.clear()
}

// ---------- PNG 编码（node:zlib，无第三方依赖） ----------
function crc32(buf) {
  if (!crc32.table) {
    crc32.table = new Int32Array(256)
    for (let n = 0; n < 256; n++) {
      let c = n
      for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
      crc32.table[n] = c
    }
  }
  let c = 0xffffffff
  for (let i = 0; i < buf.length; i++) c = crc32.table[(c ^ buf[i]) & 0xff] ^ (c >>> 8)
  return (c ^ 0xffffffff) >>> 0
}

export function pngFromRgb(size, rgb, bg = null) {
  const stride = size * 3 + 1
  const raw = Buffer.alloc(size * stride)
  for (let y = 0; y < size; y++) {
    raw[y * stride] = 0 // filter: none
    for (let x = 0; x < size; x++) {
      const i = y * size + x
      const o = y * stride + 1 + x * 3
      const empty = rgb[i * 3] === 0 && rgb[i * 3 + 1] === 0 && rgb[i * 3 + 2] === 0
      const px = bg && empty ? bg : null
      raw[o] = px ? px[0] : rgb[i * 3]
      raw[o + 1] = px ? px[1] : rgb[i * 3 + 1]
      raw[o + 2] = px ? px[2] : rgb[i * 3 + 2]
    }
  }
  const chunks = []
  const push = (type, data) => {
    const len = Buffer.alloc(4)
    len.writeUInt32BE(data.length)
    const body = Buffer.concat([Buffer.from(type, "ascii"), data])
    const crc = Buffer.alloc(4)
    crc.writeUInt32BE(crc32(body))
    chunks.push(len, body, crc)
  }
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(size, 0)
  ihdr.writeUInt32BE(size, 4)
  ihdr[8] = 8; ihdr[9] = 2; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0
  push("IHDR", ihdr)
  push("IDAT", deflateSync(raw, { level: 6 }))
  push("IEND", Buffer.alloc(0))
  return Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), ...chunks])
}

// 描出覆盖区边缘，轮廓是否走形一眼可见。
function edgeTint(img) {
  const { size, cover, rgb } = img
  const out = Uint8Array.from(rgb)
  for (let y = 1; y < size - 1; y++) {
    for (let x = 1; x < size - 1; x++) {
      const i = y * size + x
      if (!cover[i]) continue
      if (cover[i - 1] && cover[i + 1] && cover[i - size] && cover[i + size]) continue
      out[i * 3] = 235; out[i * 3 + 1] = 70; out[i * 3 + 2] = 70
    }
  }
  return out
}

// ---------- 观察 ----------
//  clearance 门怎么量，以门自己的声明为准：mode:"exact" 要真实三角求交，不能被调用方的
//  默认 exact:false 降级成 AABB 粗判——壶嘴×壶盖那种“包围盒贴面但实体不交”会被误报成冲突。
function overlapOpts(gates, { exact = false, budget = 150000 } = {}) {
  const cg = gates?.clearance
  return {
    exact: Boolean(exact || cg?.mode === "exact"),
    budget: Math.max(budget, Number(cg?.budget) || 0),
  }
}

export function inspect(spec, { mode = "summary", views = [], size = 256, bins = 16, gates = null, exactOverlap = false } = {}) {
  const model = modelOf(spec)
  if (model.empty) throw new Error("spec 未产生任何三角形。")
  const wantGates = gates ?? spec.gates
  const detail = mode === "full"
  const out = {
    kernel: KERNEL_VERSION,
    hash: model.key,
    cached: model.cached,
    mode,
    numeric: summarize(model, spec, { detail, bins }),
  }
  if (wantGates) {
    const samples = { top: sectionWidths(model, "top", 32), side: sectionWidths(model, "side", 32) }
    const res = checkGates(model, spec, wantGates, { samples, overlaps: overlaps(model, overlapOpts(wantGates, { exact: exactOverlap })) })
    out.gates = res
    out.gateError = round(gateError(wantGates, res), 5)
  }
  if (views.length) {
    out.images = views.map(view => {
      if (!VIEWS[view]) throw new Error("未知视图 " + view + "，可用：" + Object.keys(VIEWS).join("/"))
      const img = renderView(model, view, size)
      const png = pngFromRgb(size, img.rgb, [250, 250, 252])
      return { view, size, desc: VIEWS[view].desc, bytes: png.length, base64: png.toString("base64") }
    })
  }
  if (mode === "outline") out.outline = { top: sectionWidths(model, "top", 40), side: sectionWidths(model, "side", 40) }
  return out
}

export function outlinePng(spec, view = "top", size = 320) {
  const model = modelOf(spec)
  const img = renderView(model, view, size)
  const png = pngFromRgb(size, edgeTint(img), [250, 250, 252])
  return { view, size, bytes: png.length, base64: png.toString("base64") }
}

export function check(spec, gates, { bins = 24, exact = false, budget = 150000 } = {}) {
  const model = modelOf(spec)
  const want = gates ?? spec.gates ?? {}
  const samples = { top: sectionWidths(model, "top", bins), side: sectionWidths(model, "side", bins) }
  const res = checkGates(model, spec, want, { bins, samples, overlaps: overlaps(model, overlapOpts(want, { exact, budget })) })
  return {
    ...res,
    err: round(gateError(want, res), 5),
    hash: model.key,
    sizeMm: [
      round((model.bb.maxx - model.bb.minx) * 1000, 2),
      round((model.bb.maxy - model.bb.miny) * 1000, 2),
      round((model.bb.maxz - model.bb.minz) * 1000, 2),
    ],
  }
}

export function optimize(spec, { gates, vars, budget = 20, bins = 16, seed = 1 } = {}) {
  const g = gates ?? spec.gates
  if (!g) throw new Error("optimize 需要 gates（或 spec.gates）作为目标函数。")
  if (!vars?.length) throw new Error("optimize 需要 vars：[{path, min, max, start}]。")
  const r = searchParams(spec, g, { vars, budget, bins, seed })
  const final = check(r.spec, g, { bins })
  return { ok: r.ok, err: r.err, steps: r.steps, values: r.values, results: final.results, check: final, hash: specHash(r.spec), spec: r.spec }
}

// ---------- spec → GLB 直出 ----------
function installBrowserShims() {
  if (globalThis.FileReader) return
  class FileReaderShim {
    #done(value) {
      this.result = value
      const e = { target: this }
      this.onload?.(e)
      this.onloadend?.(e)
    }
    readAsArrayBuffer(blob) { blob.arrayBuffer().then(b => this.#done(b)) }
    readAsText(blob) { blob.text().then(t => this.#done(t)) }
    readAsDataURL(blob) {
      blob.arrayBuffer().then(b => this.#done("data:application/octet-stream;base64," + Buffer.from(b).toString("base64")))
    }
  }
  globalThis.FileReader = FileReaderShim
}

export async function toGlbMulti(entries) {
  installBrowserShims()
  const THREE = await import("three")
  const { GLTFExporter } = await import("three/examples/jsm/exporters/GLTFExporter.js")
  const root = new THREE.Group()
  root.name = "model-studio-plate"
  for (const entry of entries) {
    const node = buildSpecModel(entry.spec)
    node.name = String(entry.name ?? "item")
    const pos = Array.isArray(entry.position) ? entry.position : [0, 0, 0]
    const rot = Array.isArray(entry.rotationDeg) ? entry.rotationDeg : [0, 0, 0]
    const scl = Array.isArray(entry.scale) ? entry.scale : [1, 1, 1]
    node.position.fromArray(pos)
    node.rotation.set(THREE.MathUtils.degToRad(rot[0]), THREE.MathUtils.degToRad(rot[1]), THREE.MathUtils.degToRad(rot[2]))
    node.scale.fromArray(scl)
    node.visible = entry.visible !== false
    root.add(node)
  }
  const glb = await new GLTFExporter().parseAsync(root, { binary: true, onlyVisible: false })
  root.traverse(o => { o.geometry?.dispose?.(); o.material?.dispose?.() })
  return Buffer.from(glb)
}

export async function toGlb(spec) {
  return toGlbMulti([{ spec, name: spec?.name ?? "model" }])
}

export { summarize, checkGates, gateError, renderView, sectionWidths, overlaps, searchParams, flatten, VIEWS, buildSpecModel, specGeometry, SPEC_PRIMITIVES }

// ---------- 直接运行：node src/kernel.mjs <cmd> <spec.json> ----------
if (process.argv[1]?.replace(/\\/g, "/").endsWith("src/kernel.mjs")) {
  const [,, cmd, file] = process.argv
  const spec = file ? JSON.parse((await import("node:fs")).readFileSync(file, "utf8")) : null
  if (cmd === "inspect") console.log(JSON.stringify(inspect(spec, { mode: "full", bins: 20 }), null, 2))
  else if (cmd === "check") console.log(JSON.stringify(check(spec, spec.gates), null, 2))
  else if (cmd === "png") {
    const fs = await import("node:fs")
    const r = outlinePng(spec, "top", 320)
    fs.writeFileSync(file.replace(/\.json$/, "-top.png"), Buffer.from(r.base64, "base64"))
    console.log("png", r.bytes, "bytes")
  } else console.log(JSON.stringify({ KERNEL_VERSION, primitives: SPEC_PRIMITIVES, views: Object.keys(VIEWS) }, null, 2))
}
