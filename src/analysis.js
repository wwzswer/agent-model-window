// 几何内核分析层：spec → 三角形 → 数值摘要 / 轮廓 / 重叠 / 门控 / 光栅化。
// 只依赖 three 数学与 spec.js，不含渲染器、DOM、Node 内置模块，浏览器与 Node 共用。
import * as THREE from "three"
import { buildSpecModel } from "./spec.js"

const round = (v, d = 5) => Number(Number(v).toFixed(d))
const clamp = (v, a, b) => Math.min(b, Math.max(a, v))

// ---------- 展平：一次求值，多处复用 ----------
export function flatten(spec) {
  const group = buildSpecModel(spec)
  group.updateMatrixWorld(true)
  const parts = []
  const bb = { minx: Infinity, maxx: -Infinity, miny: Infinity, maxy: -Infinity, minz: Infinity, maxz: -Infinity }
  const P = new THREE.Vector3()
  const N = new THREE.Vector3()
  const m3 = new THREE.Matrix3()
  let total = 0
  for (const mesh of group.children) {
    if (!mesh.isMesh || !mesh.geometry?.attributes?.position) continue
    const geo = mesh.geometry
    const pos = geo.attributes.position
    const nor = geo.attributes.normal
    const index = geo.index ? geo.index.array : null
    const count = index ? index.length : pos.count
    const triCount = Math.floor(count / 3)
    const tris = new Float32Array(triCount * 9)
    const nrm = nor ? new Float32Array(triCount * 9) : null
    m3.getNormalMatrix(mesh.matrixWorld)
    const pbb = { minx: Infinity, maxx: -Infinity, miny: Infinity, maxy: -Infinity, minz: Infinity, maxz: -Infinity }
    let t = 0
    for (let i = 0; i < triCount * 3; i += 3) {
      for (let k = 0; k < 3; k++) {
        const vi = index ? index[i + k] : i + k
        P.fromBufferAttribute(pos, vi).applyMatrix4(mesh.matrixWorld)
        tris[t * 9 + k * 3] = P.x; tris[t * 9 + k * 3 + 1] = P.y; tris[t * 9 + k * 3 + 2] = P.z
        if (nrm) {
          N.fromBufferAttribute(nor, vi).applyMatrix3(m3).normalize()
          nrm[t * 9 + k * 3] = N.x; nrm[t * 9 + k * 3 + 1] = N.y; nrm[t * 9 + k * 3 + 2] = N.z
        }
        for (const k2 of ["x", "y", "z"]) {
          const val = P[k2]
          if (val < pbb["min" + k2]) pbb["min" + k2] = val
          if (val > pbb["max" + k2]) pbb["max" + k2] = val
          if (val < bb["min" + k2]) bb["min" + k2] = val
          if (val > bb["max" + k2]) bb["max" + k2] = val
        }
      }
      t++
    }
    const def = spec.parts?.[mesh.userData.specIndex] ?? {}
    const col = new THREE.Color(mesh.material?.color ?? 0x9fb2c8)
    parts.push({
      id: String(mesh.userData.specPartId || def.id || mesh.name || String(parts.length)),
      name: mesh.name || def.name || "",
      primitive: def.primitive ?? "",
      tris, nrm, triCount: t, bb: pbb,
      visible: mesh.visible !== false,
      color: [Math.round(col.r * 255), Math.round(col.g * 255), Math.round(col.b * 255)],
    })
    total += t
  }
  group.traverse(o => { o.geometry?.dispose?.() })
  group.traverse(o => { o.material?.dispose?.() })
  return { parts, bb, triCount: total, empty: !parts.length || !total, finite: Number.isFinite(bb.minx) }
}

// ---------- 正交视图基 ----------
// atAxis/atSign：屏幕纵轴对应的世界轴；uAxis/uSign：横轴对应的世界轴。
export const VIEWS = {
  top: { f: [0, -1, 0], up0: [0, 0, -1], uAxis: "x", uSign: 1, atAxis: "z", atSign: -1, desc: "俯视：横=x 纵=z" },
  front: { f: [0, 0, 1], up0: [0, 1, 0], uAxis: "x", uSign: 1, atAxis: "y", atSign: 1, desc: "正视：横=x 纵=y" },
  side: { f: [-1, 0, 0], up0: [0, 1, 0], uAxis: "z", uSign: -1, atAxis: "y", atSign: 1, desc: "侧视（从 -X 看）：横=z 纵=y" },
  rear: { f: [0, 0, -1], up0: [0, 1, 0], uAxis: "x", uSign: -1, atAxis: "y", atSign: 1, desc: "背视：横=x 纵=y" },
  left: { f: [1, 0, 0], up0: [0, 1, 0], uAxis: "z", uSign: 1, atAxis: "y", atSign: 1, desc: "侧视（从 +X 看）：横=z 纵=y" },
  iso: { f: [-1, -1, -1], up0: [0, 1, 0], uAxis: null, atAxis: null, desc: "等轴测" },
}

export function viewBasis(view) {
  const v = VIEWS[view] ?? VIEWS.iso
  const f = new THREE.Vector3(...v.f).normalize()
  let up0 = new THREE.Vector3(...(v.up0 ?? [0, 1, 0]))
  let right = new THREE.Vector3().crossVectors(f, up0)
  if (right.lengthSq() < 1e-9) { up0.set(0, 0, 1); right = new THREE.Vector3().crossVectors(f, up0) }
  right.normalize()
  const up = new THREE.Vector3().crossVectors(right, f).normalize()
  return { f, right, up, meta: v }
}

// CPU 正交光栅化：深度剔除 + 三角面法线漫反射，返回 cover/depth/rgb。
export function renderView(model, view, size = 256, margin = 0.06) {
  const { f, right, up, meta } = viewBasis(view)
  const vis = model.parts.filter(p => p.visible)
  const proj = (x, y, z) => [
    x * right.x + y * right.y + z * right.z,
    x * up.x + y * up.y + z * up.z,
    x * f.x + y * f.y + z * f.z,
  ]
  let minU = Infinity, maxU = -Infinity, minV = Infinity, maxV = -Infinity
  for (const p of vis) {
    for (const px of [p.bb.minx, p.bb.maxx]) for (const py of [p.bb.miny, p.bb.maxy]) for (const pz of [p.bb.minz, p.bb.maxz]) {
      const [u, v] = proj(px, py, pz)
      if (!Number.isFinite(u) || !Number.isFinite(v)) continue
      if (u < minU) minU = u
      if (u > maxU) maxU = u
      if (v < minV) minV = v
      if (v > maxV) maxV = v
    }
  }
  if (!Number.isFinite(minU)) { minU = -1; maxU = 1; minV = -1; maxV = 1 }
  const half = Math.max(maxU - minU, maxV - minV) / 2 || 1
  const midU = (minU + maxU) / 2, midV = (minV + maxV) / 2
  const scale = (size / 2) * (1 - margin) / half
  const depth = new Float32Array(size * size).fill(Infinity)
  const rgb = new Uint8Array(size * size * 3)
  const cover = new Uint8Array(size * size)
  const light = new THREE.Vector3(-0.35, 0.85, 0.4).normalize()
  for (const p of vis) {
    for (let t = 0; t < p.triCount; t++) {
      const o = t * 9
      const a = proj(p.tris[o], p.tris[o + 1], p.tris[o + 2])
      const b = proj(p.tris[o + 3], p.tris[o + 4], p.tris[o + 5])
      const c = proj(p.tris[o + 6], p.tris[o + 7], p.tris[o + 8])
      const x0 = (a[0] - midU) * scale + size / 2, y0 = size / 2 - (a[1] - midV) * scale
      const x1 = (b[0] - midU) * scale + size / 2, y1 = size / 2 - (b[1] - midV) * scale
      const x2 = (c[0] - midU) * scale + size / 2, y2 = size / 2 - (c[1] - midV) * scale
      const lx = Math.max(0, Math.floor(Math.min(x0, x1, x2)))
      const hx = Math.min(size - 1, Math.ceil(Math.max(x0, x1, x2)))
      const ly = Math.max(0, Math.floor(Math.min(y0, y1, y2)))
      const hy = Math.min(size - 1, Math.ceil(Math.max(y0, y1, y2)))
      if (hx < lx || hy < ly) continue
      const d = (y1 - y0) * (x2 - x0) - (x1 - x0) * (y2 - y0)
      if (Math.abs(d) < 1e-9) continue
      const inv = 1 / d
      let lambert = 0.5
      if (p.nrm) {
        const nx = p.nrm[o] + p.nrm[o + 3] + p.nrm[o + 6]
        const ny = p.nrm[o + 1] + p.nrm[o + 4] + p.nrm[o + 7]
        const nz = p.nrm[o + 2] + p.nrm[o + 5] + p.nrm[o + 8]
        const len = Math.hypot(nx, ny, nz) || 1
        lambert = Math.abs((nx * light.x + ny * light.y + nz * light.z) / len)
      }
      const shade = 0.26 + 0.74 * Math.pow(lambert, 0.75)
      const cr = clamp(Math.round(p.color[0] * shade), 0, 255)
      const cg = clamp(Math.round(p.color[1] * shade), 0, 255)
      const cb = clamp(Math.round(p.color[2] * shade), 0, 255)
      for (let py = ly; py <= hy; py++) {
        const rowOff = py * size
        for (let px = lx; px <= hx; px++) {
          const qx = px + 0.5, qy = py + 0.5
          const w0 = ((y1 - qy) * (x2 - qx) - (x1 - qx) * (y2 - qy)) * inv
          if (w0 < 0 || w0 > 1) continue
          const w1 = ((qy - y0) * (x2 - x0) - (qx - x0) * (y2 - y0)) * inv
          if (w1 < 0 || w1 > 1) continue
          const w2 = 1 - w0 - w1
          if (w2 < 0 || w2 > 1) continue
          const z = w0 * a[2] + w1 * b[2] + w2 * c[2]
          const i = rowOff + px
          if (z < depth[i]) {
            depth[i] = z
            cover[i] = 1
            rgb[i * 3] = cr; rgb[i * 3 + 1] = cg; rgb[i * 3 + 2] = cb
          }
        }
      }
    }
  }
  const toWorld = (px, py) => [((px - size / 2) / scale + midU) * right.x + ((size / 2 - py) / scale + midV) * up.x,
    ((px - size / 2) / scale + midU) * right.y + ((size / 2 - py) / scale + midV) * up.y,
    ((px - size / 2) / scale + midU) * right.z + ((size / 2 - py) / scale + midV) * up.z]
  return { size, depth, rgb, cover, right, up, f, meta, scale, midU, midV, toWorld }
}

// 截面宽度序列：沿 atAxis 分箱，每箱取投影覆盖的 uAxis 跨度。
export function sectionWidths(model, view, bins = 24) {
  const meta = VIEWS[view] ?? VIEWS.iso
  if (!meta.atAxis || !meta.uAxis) return []
  const size = Math.max(128, bins * 8)
  const img = renderView(model, view, size)
  const { cover, scale, midU, midV } = img
  const A = meta.atAxis, U = meta.uAxis, sA = meta.atSign, sU = meta.uSign
  const axisMin = model.bb["min" + A], axisMax = model.bb["max" + A]
  const span = axisMax - axisMin || 1
  const rows = Array.from({ length: bins }, () => ({ min: Infinity, max: -Infinity, hit: false }))
  const inv = 1 / scale
  for (let py = 0; py < size; py++) {
    const at = sA * ((size / 2 - py) * inv + midV)
    const k = Math.floor(((at - axisMin) / span) * bins)
    if (k < 0 || k >= bins) continue
    let lo = Infinity, hi = -Infinity, any = false
    const row = py * size
    for (let px = 0; px < size; px++) {
      if (!cover[row + px]) continue
      const u = sU * ((px - size / 2) * inv + midU)
      any = true
      if (u < lo) lo = u
      if (u > hi) hi = u
    }
    if (any) {
      const r = rows[k]
      // 像素中心采样会少算半像素，向外补偿半格使宽度无偏
      r.min = Math.min(r.min, lo - 0.5 * inv)
      r.max = Math.max(r.max, hi + 0.5 * inv)
      r.hit = true
    }
  }
  return rows.map((r, i) => ({
    at: round(axisMin + span * (i + 0.5) / bins, 5),
    width: r.hit ? round(r.max - r.min, 5) : 0,
    center: r.hit ? round((r.min + r.max) / 2, 5) : null,
    min: r.hit ? round(r.min, 5) : null,
    max: r.hit ? round(r.max, 5) : null,
  }))
}

// 轮廓折线（沿 atAxis 的半宽），门控目标可直接用它采样。
export function outline(model, view, bins = 32) {
  return sectionWidths(model, view, bins).map(s => [s.at, s.width])
}

// ---------- 重叠检测 ----------
const aabbOf = t => ({
  minx: Math.min(t[0], t[3], t[6]), maxx: Math.max(t[0], t[3], t[6]),
  miny: Math.min(t[1], t[4], t[7]), maxy: Math.max(t[1], t[4], t[7]),
  minz: Math.min(t[2], t[5], t[8]), maxz: Math.max(t[2], t[5], t[8]),
})
const dot3 = (u, v) => u[0] * v[0] + u[1] * v[1] + u[2] * v[2]
const cross3 = (u, v) => [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]]
const aabbOverlap = (a, b) => !(a.maxx < b.minx || b.maxx < a.minx || a.maxy < b.miny || b.maxy < a.miny || a.maxz < b.minz || b.maxz < a.minz)

// Möller 分离轴测试：找不到分离轴即判定相交。
function triTri(a, b) {
  const ba = aabbOf(a), bbx = aabbOf(b)
  if (!aabbOverlap(ba, bbx)) return false
  const e1 = [a[3] - a[0], a[4] - a[1], a[5] - a[2]]
  const e2 = [a[6] - a[0], a[7] - a[1], a[8] - a[2]]
  const f1 = [b[3] - b[0], b[4] - b[1], b[5] - b[2]]
  const f2 = [b[6] - b[0], b[7] - b[1], b[8] - b[2]]
  const axes = [cross3(e1, f1), cross3(e1, f2), cross3(e2, f1), cross3(e2, f2), e1, e2, f1, f2]
  for (const ax of axes) {
    if (Math.abs(ax[0]) < 1e-12 && Math.abs(ax[1]) < 1e-12 && Math.abs(ax[2]) < 1e-12) continue
    const pa = [dot3([a[0], a[1], a[2]], ax), dot3([a[3], a[4], a[5]], ax), dot3([a[6], a[7], a[8]], ax)]
    const pb = [dot3([b[0], b[1], b[2]], ax), dot3([b[3], b[4], b[5]], ax), dot3([b[6], b[7], b[8]], ax)]
    if (Math.max(...pa) < Math.min(...pb) || Math.max(...pb) < Math.min(...pa)) return false
  }
  return true
}

// 返回所有 AABB 相交的部件对；exact=true 时给出真实相交三角面对数（带预算，超出退回 AABB）。
export function overlaps(model, { exact = false, budget = 150000 } = {}) {
  const vis = model.parts.filter(p => p.visible)
  const rows = []
  for (let i = 0; i < vis.length; i++) {
    for (let j = i + 1; j < vis.length; j++) {
      const a = vis[i], b = vis[j]
      if (!aabbOverlap(a.bb, b.bb)) continue
      const vol = Math.max(0, Math.min(a.bb.maxx, b.bb.maxx) - Math.max(a.bb.minx, b.bb.minx)) *
        Math.max(0, Math.min(a.bb.maxy, b.bb.maxy) - Math.max(a.bb.miny, b.bb.miny)) *
        Math.max(0, Math.min(a.bb.maxz, b.bb.maxz) - Math.max(a.bb.minz, b.bb.minz))
      const row = { a: a.id, b: b.id, mode: "aabb", overlapMm3: round(vol * 1e9, 1) }
      const cell = Math.max(1e-4, Math.max(model.bb.maxx - model.bb.minx, model.bb.maxz - model.bb.minz) / 24)
      const grid = new Map()
      for (let t = 0; t < a.triCount; t++) {
        const o = t * 9
        const bx = aabbOf([a.tris[o], a.tris[o + 1], a.tris[o + 2], a.tris[o + 3], a.tris[o + 4], a.tris[o + 5], a.tris[o + 6], a.tris[o + 7], a.tris[o + 8]])
        for (let gx = Math.floor(bx.minx / cell); gx <= Math.floor(bx.maxx / cell); gx++)
          for (let gy = Math.floor(bx.miny / cell); gy <= Math.floor(bx.maxy / cell); gy++)
            for (let gz = Math.floor(bx.minz / cell); gz <= Math.floor(bx.maxz / cell); gz++) {
              const k = gx + "," + gy + "," + gz
              const arr = grid.get(k)
              if (arr) arr.push(t); else grid.set(k, [t])
            }
      }
      let tests = 0, pairs = 0, capped = false
      if (exact) {
        outer: for (let t = 0; t < b.triCount; t++) {
          const o = t * 9
          const bx = aabbOf([b.tris[o], b.tris[o + 1], b.tris[o + 2], b.tris[o + 3], b.tris[o + 4], b.tris[o + 5], b.tris[o + 6], b.tris[o + 7], b.tris[o + 8]])
          const seen = new Set()
          for (let gx = Math.floor(bx.minx / cell); gx <= Math.floor(bx.maxx / cell); gx++)
            for (let gy = Math.floor(bx.miny / cell); gy <= Math.floor(bx.maxy / cell); gy++)
              for (let gz = Math.floor(bx.minz / cell); gz <= Math.floor(bx.maxz / cell); gz++) {
                for (const ta of grid.get(gx + "," + gy + "," + gz) ?? []) {
                  if (seen.has(ta)) continue
                  seen.add(ta)
                  if (++tests > budget) { capped = true; break outer }
                  const oa = ta * 9
                  if (triTri(
                    [a.tris[oa], a.tris[oa + 1], a.tris[oa + 2], a.tris[oa + 3], a.tris[oa + 4], a.tris[oa + 5], a.tris[oa + 6], a.tris[oa + 7], a.tris[oa + 8]],
                    [b.tris[o], b.tris[o + 1], b.tris[o + 2], b.tris[o + 3], b.tris[o + 4], b.tris[o + 5], b.tris[o + 6], b.tris[o + 7], b.tris[o + 8]])) pairs++
                }
              }
        }
        if (capped) row.mode = "aabb-capped"
        else row.mode = "exact"
        row.triPairs = pairs
        row.tests = tests
      }
      rows.push(row)
    }
  }
  return rows
}

// ---------- 数值摘要 ----------
export function summarize(model, spec, { detail = false, bins = 16 } = {}) {
  const size = [model.bb.maxx - model.bb.minx, model.bb.maxy - model.bb.miny, model.bb.maxz - model.bb.minz]
  const out = {
    bbox: {
      min: [round(model.bb.minx), round(model.bb.miny), round(model.bb.minz)],
      max: [round(model.bb.maxx), round(model.bb.maxy), round(model.bb.maxz)],
    },
    sizeMm: size.map(v => round(v * 1000, 2)),
    triCount: model.triCount,
    partCount: model.parts.length,
    ground: { minY: round(model.bb.miny, 6), maxY: round(model.bb.maxy, 6) },
    silhouette: { top: sectionWidths(model, "top", bins), side: sectionWidths(model, "side", bins) },
  }
  if (detail) {
    out.parts = model.parts.map((p, i) => ({
      id: p.id, name: p.name, primitive: p.primitive || spec.parts?.[i]?.primitive || "",
      triCount: p.triCount, visible: p.visible,
      bboxMin: [round(p.bb.minx), round(p.bb.miny), round(p.bb.minz)],
      bboxMax: [round(p.bb.maxx), round(p.bb.maxy), round(p.bb.maxz)],
      sizeMm: [round((p.bb.maxx - p.bb.minx) * 1000, 2), round((p.bb.maxy - p.bb.miny) * 1000, 2), round((p.bb.maxz - p.bb.minz) * 1000, 2)],
      center: [round((p.bb.minx + p.bb.maxx) / 2), round((p.bb.miny + p.bb.maxy) / 2), round((p.bb.minz + p.bb.maxz) / 2)],
    }))
    out.overlaps = overlaps(model, { exact: false })
    out.silhouette.topFine = sectionWidths(model, "top", 40)
    out.silhouette.sideFine = sectionWidths(model, "side", 40)
  }
  return out
}

// ---------- 门控 ----------
const sampleAt = (samples, at) => {
  if (!samples.length) return 0
  if (at <= samples[0].at) return samples[0].width
  const last = samples[samples.length - 1]
  if (at >= last.at) return last.width
  for (let i = 1; i < samples.length; i++) {
    if (samples[i].at >= at) {
      const a = samples[i - 1], b = samples[i]
      const t = (at - a.at) / ((b.at - a.at) || 1)
      return a.width + (b.width - a.width) * t
    }
  }
  return last.width
}

export function gateError(gates, measured) {
  let err = 0
  for (const r of (measured.results ?? [])) {
    if (r.ok) continue
    const m = r.measured
    if (r.gate === "dimension") {
      const axes = ["x", "y", "z"]
      axes.forEach((k, i) => {
        const t = gates.dimension?.[k]
        if (t === undefined) return
        const target = typeof t === "object" ? t.value : t
        err += Math.abs((m[i] ?? 0) - target * 1000) / 1000
      })
    } else if (r.gate.startsWith("silhouette")) err += Math.abs(m.worstErrMm ?? 0) / 1000 + (m.rms ?? 0) / 1000
    else if (r.gate === "ground") err += Math.abs(Math.min(0, m ?? 0))
    else err += 0.05
  }
  return err + 0.01 * (measured.results ?? []).filter(x => !x.ok).length
}

export function checkGates(model, spec, gates = {}, opts = {}) {
  const results = []
  const push = (name, ok, measured, expected, note) => results.push({ gate: name, ok, measured, expected, note: note ?? "" })
  const bins = opts.bins ?? 24

  if (gates.dimension) {
    const g = gates.dimension
    const size = [model.bb.maxx - model.bb.minx, model.bb.maxy - model.bb.miny, model.bb.maxz - model.bb.minz]
    const bad = []
    const exp = {}
    for (const [k, i] of [["x", 0], ["y", 1], ["z", 2]]) {
      const t = g[k]
      if (t === undefined) continue
      const target = typeof t === "object" ? t : { value: t, tol: g.tol ?? 0.002 }
      exp[k] = { value: target.value, tol: target.tol ?? 0.002 }
      const err = Math.abs(size[i] - target.value)
      if (err > (target.tol ?? 0.002)) bad.push(`${k} ${(size[i] * 1000).toFixed(1)}mm ≠ ${(target.value * 1000).toFixed(1)}±${((target.tol ?? 0.002) * 1000).toFixed(1)}mm`)
    }
    push("dimension", !bad.length, size.map(v => round(v * 1000, 2)), exp, bad.join("; "))
  }

  if (gates.ground) {
    const tol = gates.ground.tol ?? 0.0005
    const min = model.bb.miny
    push("ground", min >= -tol, round(min, 6), { minY: 0, tol },
      min < -tol ? `最低点 ${(min * 1000).toFixed(2)}mm 穿地` : "")
  }

  if (gates.silhouette) {
    for (const [key, g] of Object.entries(gates.silhouette)) {
      const view = g.view ?? "top"
      const samples = opts.samples?.[view] ?? sectionWidths(model, view, bins)
      const pts = (g.points ?? []).map(p => {
        const got = round(sampleAt(samples, p.at), 5)
        return { at: p.at, want: p.width, got, err: round(got - p.width, 5) }
      })
      const tol = g.tol ?? 0.003
      const worst = pts.reduce((m, e) => (Math.abs(e.err) > Math.abs(m?.err ?? 0) ? e : m), null)
      const rms = pts.length ? Math.sqrt(pts.reduce((s, e) => s + e.err * e.err, 0) / pts.length) : 0
      push(`silhouette:${key}`, pts.length > 0 && Math.abs(worst?.err ?? 1) <= tol,
        { worstAt: worst?.at ?? null, worstErrMm: worst ? round(worst.err * 1000, 2) : null, rmsMm: round(rms * 1000, 2) },
        { view, tol, points: pts.length },
        worst && Math.abs(worst.err) > tol
          ? `${view} @${worst.at}：实测 ${(worst.got * 1000).toFixed(1)}mm / 目标 ${(worst.want * 1000).toFixed(1)}mm，差 ${(worst.err * 1000).toFixed(1)}mm`
          : "")
    }
  }

  if (gates.clearance) {
    const g = gates.clearance
    const rows = opts.overlaps ?? overlaps(model, { exact: g.mode === "exact", budget: g.budget ?? 150000 })
    const allow = new Set((g.allow ?? []).map(a => [a.a, a.b].sort().join("|")))
    const capped = rows.filter(r => r.mode === "aabb-capped")
    // exact：真实相交三角面对数 ≥ minPairs 才算冲突；aabb：嵌入体积 ≥ minMm3 才算冲突。
    const minPairs = g.minPairs ?? 1
    const minMm3 = g.minMm3 ?? 25
    const conflicts = rows.filter(r => {
      if (allow.has([r.a, r.b].sort().join("|"))) return false
      return r.mode === "exact" ? (r.triPairs ?? 0) >= minPairs : (r.overlapMm3 ?? 0) >= minMm3
    })
    const heavy = rows.filter(r => r.triPairs !== undefined && g.maxTriPairs !== undefined && r.triPairs > g.maxTriPairs)
    push("clearance", !conflicts.length && !heavy.length,
      {
        conflicts: conflicts.map(r => `${r.a}×${r.b}(${r.mode === "exact" ? r.triPairs + "对相交面" : r.overlapMm3 + "mm³嵌入"})`),
        heavy: heavy.map(r => `${r.a}×${r.b}:${r.triPairs}`),
        contacts: rows.length - conflicts.length,
      },
      { mode: g.mode ?? "aabb", allow: allow.size, minPairs, minMm3, maxTriPairs: g.maxTriPairs ?? null },
      conflicts.length ? `未登记的实体冲突：${conflicts.map(r => `${r.a}×${r.b}`).join(", ")}`
        : capped.length ? `${capped.length} 对超出精确检测预算（已按 AABB 判定，可提高 budget）` : "")
  }

  if (gates.parts) {
    const counts = model.parts.reduce((m, p) => { m[p.primitive] = (m[p.primitive] ?? 0) + 1; return m }, {})
    const bad = Object.entries(gates.parts).filter(([k, n]) => (counts[k] ?? 0) !== n).map(([k, n]) => `${k}=${counts[k] ?? 0}≠${n}`)
    push("parts", !bad.length, counts, gates.parts, bad.join("; "))
  }

  if (gates.custom) {
    for (const [key, g] of Object.entries(gates.custom)) {
      const got = Number(g.measured)
      const ok = g.min !== undefined ? got >= g.min : g.max !== undefined ? got <= g.max : Math.abs(got - (g.value ?? 0)) <= (g.tol ?? 0)
      push(`custom:${key}`, ok, got, { value: g.value ?? null, min: g.min ?? null, max: g.max ?? null }, g.note ?? "")
    }
  }

  return { ok: results.every(r => r.ok), results }
}

// ---------- 内环搜索 ----------
const getPath = (obj, path) => path.split(".").reduce((o, k) => (o == null ? undefined : Array.isArray(o) ? o[Number(k)] : o[k]), obj)
const setPath = (obj, path, value) => {
  const keys = path.split(".")
  let o = obj
  for (let i = 0; i < keys.length - 1; i++) o = Array.isArray(o) ? o[Number(keys[i])] : o[keys[i]]
  const last = keys[keys.length - 1]
  if (Array.isArray(o)) o[Number(last)] = value
  else o[last] = value
}
const clone = obj => (typeof structuredClone === "function" ? structuredClone(obj) : JSON.parse(JSON.stringify(obj)))

// 在工具内部反复试参数：随机撒点 + 坐标细搜，只回传最优与代价，中间过程不进对话。
export function searchParams(spec, gates, { vars = [], budget = 20, bins = 16, seed = 1 } = {}) {
  let s = seed >>> 0 || 1
  const rnd = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296)
  let steps = 0
  const score = cand => {
    const model = flatten(cand)
    const res = checkGates(model, cand, gates, { bins, samples: { top: sectionWidths(model, "top", bins), side: sectionWidths(model, "side", bins) }, overlaps: [] })
    steps++
    return { ok: res.ok, err: gateError(gates, res), results: res.results }
  }
  const limit = v => { const lo = Math.min(v.min, v.max), hi = Math.max(v.min, v.max); return val => clamp(val, lo, hi) }
  let bestSpec = clone(spec)
  for (const v of vars) setPath(bestSpec, v.path, limit(v)(v.start ?? getPath(spec, v.path)))
  let best = score(bestSpec)
  for (let i = 0; i < budget && !best.ok; i++) {
    const cand = clone(spec)
    for (const v of vars) setPath(cand, v.path, limit(v)(v.min + rnd() * (v.max - v.min)))
    const sc = score(cand)
    if (sc.err < best.err) { best = sc; bestSpec = cand }
  }
  for (let round = 0; round < 3 && !best.ok; round++) {
    for (const v of vars) {
      const cur = getPath(bestSpec, v.path)
      if (typeof cur !== "number") continue
      const span = (v.max - v.min) * [0.15, 0.05, 0.015][round]
      for (const delta of [-span, span]) {
        const cand = clone(bestSpec)
        setPath(cand, v.path, limit(v)(cur + delta))
        const sc = score(cand)
        if (sc.err < best.err) { best = sc; bestSpec = cand }
      }
    }
  }
  return {
    ok: best.ok,
    err: round(best.err, 5),
    steps,
    values: vars.map(v => ({ path: v.path, from: getPath(spec, v.path), to: getPath(bestSpec, v.path) })),
    results: best.results,
    spec: bestSpec,
  }
}
