// 参数化图元（AI 建模 spec，Y-up、米、地面 y=0）→ three 几何 / Object3D。
// 本模块只依赖 three 核心与几个纯 JS 扩展，不碰任何浏览器 API，
// 因此浏览器 bundle 与 Node 侧几何内核可以共用同一份实现。
import * as THREE from "three"
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js"
// 显式指到 ESM 产物：包名裸解析在 Node 里会拿到 UMD/CJS，具名常量取不全。
import { ADDITION, Brush, Evaluator, INTERSECTION, REVERSE_SUBTRACTION, SUBTRACTION } from "three-bvh-csg/build/index.module.js"
import { computeBoundsTree, disposeBoundsTree } from "three-mesh-bvh"

export const SPEC_PRIMITIVES = ["box", "rounded_box", "sphere", "cylinder", "cone", "pyramid",
  "torus", "capsule", "plane", "lathe", "tube", "sweep", "extrude", "heightfield", "loft", "csg"]

// 布尔运算靠 BVH 三角求交，需要给 BufferGeometry 原型挂上 boundsTree 接口（只在真正用到 csg 时才有开销）。
if (!THREE.BufferGeometry.prototype.computeBoundsTree) {
  THREE.BufferGeometry.prototype.computeBoundsTree = computeBoundsTree
  THREE.BufferGeometry.prototype.disposeBoundsTree = disposeBoundsTree
}

const segInt = (v, d, min) => {
  const n = Math.round(Number(v ?? d))
  return Number.isFinite(n) ? Math.max(min, Math.min(256, n)) : d
}

// TubeGeometry 只生成侧面：两端是开口曲面。做渲染无所谓（端头一般埋在别的图元里），
// 但布尔把操作数当封闭实体看——开口面会让分类器把切割体的面也留在结果里（实测壶嘴漏进切割盒顶点）。
// 所以默认补两个平面端盖，把 tube 变成封闭实体；cap:0 显式要开口管时不补。
// 端盖顶点单独复制一份（不与侧壁共享），这样侧壁保持光滑法线、端面是硬边平法线。
function capTubeEnds(geometry, curve, radialSegments, tubularSegments) {
  const stride = radialSegments + 1
  const pos = geometry.attributes.position
  const nrm = geometry.attributes.normal
  const tri = Array.from(geometry.index.array)
  const positions = [], normals = []
  for (let i = 0; i < pos.count; i++) { positions.push(pos.getX(i), pos.getY(i), pos.getZ(i)); normals.push(nrm.getX(i), nrm.getY(i), nrm.getZ(i)) }
  for (const [ringIndex, t] of [[0, 0], [tubularSegments, 1]]) {
    const tangent = curve.getTangentAt(t)
    const outward = t === 0 ? tangent.clone().negate() : tangent.clone()
    const center = curve.getPointAt(t)
    const ring = []
    for (let j = 0; j < stride; j++) {
      const i = ringIndex * stride + j
      const k = positions.length / 3
      positions.push(pos.getX(i), pos.getY(i), pos.getZ(i))
      normals.push(outward.x, outward.y, outward.z)
      ring.push(k)
    }
    const c = positions.length / 3
    positions.push(center.x, center.y, center.z)
    normals.push(outward.x, outward.y, outward.z)
    for (let j = 0; j < radialSegments; j++) {
      const a = ring[j], b = ring[j + 1]
      // 扇形绕向要朝外：拿叉积和 outward 点乘决定 (c,a,b) 还是 (c,b,a)，省得靠猜环顶点顺序。
      const va = new THREE.Vector3(positions[a * 3] - center.x, positions[a * 3 + 1] - center.y, positions[a * 3 + 2] - center.z)
      const vb = new THREE.Vector3(positions[b * 3] - center.x, positions[b * 3 + 1] - center.y, positions[b * 3 + 2] - center.z)
      const flip = va.cross(vb).dot(outward) < 0
      tri.push(c, flip ? b : a, flip ? a : b)
    }
  }
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3))
  geometry.setAttribute("normal", new THREE.Float32BufferAttribute(normals, 3))
  geometry.setIndex(tri)
  geometry.computeBoundingSphere()
  return geometry
}

// 有向体积定朝向：封闭网格的有向体积为负说明三角绕向朝内。sweep 历史上就是这样
// （圆/方/闭合三种截面全负）。渲染用 DoubleSide 看不出来，但布尔把朝内实体当反面，
// 结果会漏面或漏顶点，所以在算完几何就翻回来，和 loft 用同一招。
function orientOutward(geometry) {
  if (!geometry.index) return geometry
  const pos = geometry.attributes.position
  const idx = geometry.index.array
  let vol = 0
  const v = [new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()]
  for (let i = 0; i + 2 < idx.length; i += 3) {
    for (let k = 0; k < 3; k++) v[k].fromBufferAttribute(pos, idx[i + k])
    vol += v[0].dot(v[1].clone().cross(v[2])) / 6
  }
  if (vol >= 0) return geometry
  for (let i = 0; i + 2 < idx.length; i += 3) {
    const t = idx[i + 1]
    idx[i + 1] = idx[i + 2]
    idx[i + 2] = t
  }
  geometry.index.needsUpdate = true
  geometry.computeVertexNormals()
  return geometry
}

export function specGeometry(primitive, p) {
  switch (primitive) {
    case "box":
      return new THREE.BoxGeometry(p.width ?? 1, p.height ?? 1, p.depth ?? 1,
        segInt(p.segmentsX ?? p.segments, 1, 1), segInt(p.segmentsY ?? p.segments, 1, 1), segInt(p.segmentsZ ?? p.segments, 1, 1))
    case "rounded_box": {
      const w = p.width ?? 1, h = p.height ?? 1, d = p.depth ?? 1
      const limit = Math.min(w, h, d) / 2
      const r = Math.min(Math.max(0.0005, p.radius ?? 0.1), limit * 0.99)
      return new RoundedBoxGeometry(w, h, d, segInt(p.segments, 4, 1), r)
    }
    case "sphere": {
      const ws = segInt(p.segments, 48, 3)
      return new THREE.SphereGeometry(p.radius ?? 0.5, ws, Math.max(2, Math.round(ws / 2)))
    }
    case "cylinder": {
      const r = p.radius ?? 0.5
      return new THREE.CylinderGeometry(p.radiusTop ?? r, p.radiusBottom ?? r, p.height ?? 1, segInt(p.segments, 32, 3))
    }
    case "cone":
      return new THREE.ConeGeometry(p.radius ?? 0.5, p.height ?? 1, segInt(p.segments, 32, 3))
    case "pyramid": {
      const geometry = new THREE.ConeGeometry(p.radius ?? 0.5, p.height ?? 1, 4)
      geometry.rotateY(Math.PI / 4)
      return geometry
    }
    case "torus":
      return new THREE.TorusGeometry(p.radius ?? 1, p.tube ?? 0.25, segInt(p.segments, 24, 3), segInt(p.segmentsTubular ?? p.segments, 64, 3))
    case "capsule": {
      const radius = p.radius ?? 0.5
      return new THREE.CapsuleGeometry(radius, Math.max(0.001, (p.height ?? 1.5) - radius * 2), segInt(p.segments, 12, 3), segInt(p.segmentsRadial ?? p.segments, 48, 3))
    }
    case "plane": {
      const geometry = new THREE.PlaneGeometry(p.width ?? 1, p.height ?? 1,
        segInt(p.segmentsX ?? p.segments, 1, 1), segInt(p.segmentsY ?? p.segments, 1, 1))
      geometry.rotateX(-Math.PI / 2)
      return geometry
    }
    case "lathe": {
      const pts = (p.points ?? []).map(([r, y]) => new THREE.Vector2(Math.max(0, r), y))
      if (pts.length < 2) throw new Error("lathe 图元至少需要 2 个轮廓点。")
      return new THREE.LatheGeometry(pts, segInt(p.segments, 48, 3))
    }
    case "tube": {
      const pts = (p.points ?? []).map(pt => new THREE.Vector3(pt[0], pt[1], pt[2]))
      if (pts.length < 2) throw new Error("tube 图元至少需要 2 个路径点。")
      const closed = p.closed === 1
      const curve = new THREE.CatmullRomCurve3(pts, closed, "catmullrom", 0.5)
      const tubular = segInt(p.tubularSegments ?? p.segments, 64, 4)
      const radial = segInt(p.radialSegments ?? p.segments, 16, 3)
      const geometry = new THREE.TubeGeometry(curve, tubular, p.radius ?? 0.02, radial)
      // 闭合环（closed:1）没有端面可补；cap:0 是显式要开口管（只做外观、不参与布尔）。
      if (!closed && p.cap !== 0) capTubeEnds(geometry, curve, radial, tubular)
      return geometry
    }
    case "sweep": {
      const pts = (p.points ?? []).map(pt => new THREE.Vector3(pt[0], pt[1], pt[2]))
      if (pts.length < 2) throw new Error("sweep 图元至少需要 2 个路径点。")
      const closed = p.closed === 1
      const curve = new THREE.CatmullRomCurve3(pts, closed, "catmullrom", 0.5)
      const prof = p.profile ?? {}
      const shape = prof.shape ?? "circle"
      let ring = []
      if (shape === "circle") {
        const r = prof.radius ?? 0.05
        const n = segInt(prof.segments, 16, 3)
        for (let i = 0; i < n; i++) { const a = (i / n) * Math.PI * 2; ring.push([Math.cos(a) * r, Math.sin(a) * r]) }
      } else if (shape === "rect") {
        const hw = (prof.width ?? 0.1) / 2, hh = (prof.height ?? 0.1) / 2
        ring = [[-hw, -hh], [hw, -hh], [hw, hh], [-hw, hh]]
      } else if (shape === "polygon") {
        ring = (prof.points ?? []).map(q => [q[0], q[1]])
        if (ring.length < 3) throw new Error("sweep polygon 截面至少需要 3 个点。")
      } else throw new Error("sweep 截面类型未知：" + shape)
      const steps = segInt(p.tubularSegments ?? p.segments, 32, 2)
      const frames = curve.computeFrenetFrames(steps, closed)
      const twist = THREE.MathUtils.degToRad(p.twistDeg ?? 0)
      // taper = 末端截面 / 起始截面的线性缩放比（壶嘴、喷嘴、变径管这类“沿程收细”靠它）。
      const taper = Number.isFinite(Number(p.taper)) ? Math.max(0.01, Number(p.taper)) : 1
      const np = ring.length
      const positions = []
      const idx = []
      const cols = closed ? steps : steps + 1
      for (let i = 0; i < cols; i++) {
        const t = i / steps
        const point = curve.getPointAt(Math.min(t, 1))
        const nrm = frames.normals[Math.min(i, steps)], bin = frames.binormals[Math.min(i, steps)]
        const ang = twist * t
        const ca = Math.cos(ang), sa = Math.sin(ang)
        const k = 1 + (taper - 1) * t
        for (const [px, py] of ring) {
          const nx2 = (px * ca - py * sa) * k, ny2 = (px * sa + py * ca) * k
          positions.push(
            point.x + nrm.x * nx2 + bin.x * ny2,
            point.y + nrm.y * nx2 + bin.y * ny2,
            point.z + nrm.z * nx2 + bin.z * ny2,
          )
        }
      }
      for (let i = 0; i < steps; i++) {
        for (let j = 0; j < np; j++) {
          const a = i * np + j, b = i * np + (j + 1) % np
          const c = ((i + 1) % cols) * np + j, d = ((i + 1) % cols) * np + (j + 1) % np
          idx.push(a, c, b, b, c, d)
        }
      }
      if (!closed) {
        const capStart = positions.length / 3
        const p0 = curve.getPointAt(0)
        positions.push(p0.x, p0.y, p0.z)
        for (let j = 0; j < np; j++) idx.push(capStart, j, (j + 1) % np)
        const p1 = curve.getPointAt(1)
        const capEnd = positions.length / 3
        positions.push(p1.x, p1.y, p1.z)
        const last = (cols - 1) * np
        for (let j = 0; j < np; j++) idx.push(capEnd, last + (j + 1) % np, last + j)
      }
      const geometry = new THREE.BufferGeometry()
      geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3))
      geometry.setIndex(idx)
      // 扫掠面的绕向由“路径方向 × 截面点序旋向”决定，不保证朝外：先按有向体积翻正，再算法线。
      orientOutward(geometry)
      geometry.computeVertexNormals()
      return geometry
    }
    case "extrude": {
      const pts = (p.points ?? []).map(q => new THREE.Vector2(q[0], q[1]))
      if (pts.length < 3) throw new Error("extrude 截面至少需要 3 个点。")
      const shape = new THREE.Shape(pts)
      const depth = p.depth ?? 0.1
      const bevel = p.bevel === 1
      const geometry = new THREE.ExtrudeGeometry(shape, {
        depth, bevelEnabled: bevel,
        bevelThickness: p.bevelSize ?? 0.02, bevelSize: p.bevelSize ?? 0.02,
        bevelSegments: segInt(p.bevelSegments, 2, 1), curveSegments: 12,
      })
      geometry.rotateX(Math.PI / 2)
      geometry.translate(0, depth, 0)
      return geometry
    }
    case "heightfield": {
      const w = p.width ?? 1, d = p.depth ?? 1
      const rows = p.heights ?? []
      const nz = rows.length - 1
      const nx = (rows[0] ?? []).length - 1
      if (nz < 1 || nx < 1) throw new Error("heightfield 至少需要 2x2 高度网格。")
      const positions = []
      for (let k = 0; k <= nz; k++) {
        for (let i = 0; i <= nx; i++) {
          positions.push((i / nx - 0.5) * w, rows[k][i] ?? 0, (k / nz - 0.5) * d)
        }
      }
      const idx = []
      const stride = nx + 1
      for (let k = 0; k < nz; k++) {
        for (let i = 0; i < nx; i++) {
          const a = k * stride + i
          // 绕向 (a, a+stride, a+1) 才让法线朝上：早先用 (a, a+1, a+stride) 生成的地形/波纹板
          // 整片朝下（24 个顶点没有一个朝上），DoubleSide 渲染看不出来，导出 GLB 就是反的。
          idx.push(a, a + stride, a + 1, a + 1, a + stride, a + stride + 1)
        }
      }
      const geometry = new THREE.BufferGeometry()
      geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3))
      geometry.setIndex(idx)
      geometry.computeVertexNormals()
      return geometry
    }
    case "loft": {
      const prof = (Array.isArray(p.profile) ? p.profile : [])
        .slice(0, 64).map(q => [Number(q[0]) || 0, Number(q[1]) || 0])
      if (prof.length < 3) throw new Error("loft 截面至少需要 3 个点。")
      const secs = (Array.isArray(p.sections) ? p.sections : [])
        .filter(s => s && Number.isFinite(Number(s.y))).slice(0, 24)
      if (secs.length < 2) throw new Error("loft 至少需要 2 个截面层（sections）。")
      const N = prof.length
      const pos = []
      const rings = []
      for (const s of secs) {
        const y = Number(s.y)
        const cx = Number(s.cx ?? 0), cz = Number(s.cz ?? 0)
        const base = Number(s.scale ?? 1)
        const ax = Number(s.sx ?? base), az = Number(s.sz ?? base)
        if (!Number.isFinite(ax) || !Number.isFinite(az) || Math.abs(ax) < 1e-6 || Math.abs(az) < 1e-6) {
          pos.push(cx, y, cz)
          rings.push({ point: pos.length / 3 - 1 })
          continue
        }
        const tw = (Number(s.twistDeg ?? 0) * Math.PI) / 180
        const cos = Math.cos(tw), sin = Math.sin(tw)
        const start = pos.length / 3
        for (let i = 0; i < N; i++) {
          const x = prof[i][0] * ax, z = prof[i][1] * az
          pos.push(cx + x * cos - z * sin, y, cz + x * sin + z * cos)
        }
        rings.push({ start, n: N })
      }
      const idx = []
      for (let k = 0; k + 1 < rings.length; k++) {
        const a = rings[k], b = rings[k + 1]
        if (a.point !== undefined) {
          if (b.point !== undefined) continue
          for (let i = 0; i < b.n; i++) idx.push(a.point, b.start + i, b.start + ((i + 1) % b.n))
        } else if (b.point !== undefined) {
          for (let i = 0; i < a.n; i++) idx.push(a.start + i, b.point, a.start + ((i + 1) % a.n))
        } else {
          for (let i = 0; i < N; i++) {
            const j = (i + 1) % N
            idx.push(a.start + i, a.start + j, b.start + j, a.start + i, b.start + j, b.start + i)
          }
        }
      }
      for (const [r, flip] of [[rings[0], true], [rings[rings.length - 1], false]]) {
        if (r.point !== undefined) continue
        let sx = 0, sy = 0, sz = 0
        for (let i = 0; i < r.n; i++) { const o = (r.start + i) * 3; sx += pos[o]; sy += pos[o + 1]; sz += pos[o + 2] }
        pos.push(sx / r.n, sy / r.n, sz / r.n)
        const c = pos.length / 3 - 1
        for (let i = 0; i < r.n; i++) {
          const j = (i + 1) % r.n
          if (flip) idx.push(c, r.start + j, r.start + i)
          else idx.push(c, r.start + i, r.start + j)
        }
      }
      // 有向体积定朝向：截面给点序的旋向不可预知，负体积就整体翻三角，保证法线朝外。
      let vol = 0
      for (let i = 0; i < idx.length; i += 3) {
        const A = idx[i] * 3, B = idx[i + 1] * 3, C = idx[i + 2] * 3
        vol += (pos[A] * (pos[B + 1] * pos[C + 2] - pos[B + 2] * pos[C + 1])
          + pos[A + 1] * (pos[B + 2] * pos[C] - pos[B] * pos[C + 2])
          + pos[A + 2] * (pos[B] * pos[C + 1] - pos[B + 1] * pos[C])) / 6
      }
      if (vol < 0) for (let i = 0; i < idx.length; i += 3) { const t = idx[i + 1]; idx[i + 1] = idx[i + 2]; idx[i + 2] = t }
      const geometry = new THREE.BufferGeometry()
      geometry.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3))
      geometry.setIndex(idx)
      geometry.computeVertexNormals()
      return geometry
    }
    default:
      throw new Error("未知的图元类型：" + primitive)
  }
}

// ---------- 布尔运算（csg 图元）----------
// operands 按顺序左折叠：[a,b,c] + subtract = ((a−b)−c)。操作数各自带 position/rotationDeg/scale，
// 变换直接烘进几何，所以 csg 部件本身的原点就是 base 操作数的原点。
const CSG_OPS = {
  subtract: SUBTRACTION, difference: SUBTRACTION,
  union: ADDITION, add: ADDITION, merge: ADDITION,
  intersect: INTERSECTION, intersection: INTERSECTION,
  reverse_subtract: REVERSE_SUBTRACTION, "reverse-subtract": REVERSE_SUBTRACTION,
}
// 开放曲面（非闭合）会让 BVH 布尔产生碎片，明确拒绝而不是给出脏结果。
const CSG_OPEN_PRIMITIVES = new Set(["plane", "heightfield"])
const CSG_MAX_OPERANDS = 8
const CSG_MAX_DEPTH = 1
let csgEvaluator = null
function csgRunner() {
  if (!csgEvaluator) {
    csgEvaluator = new Evaluator()
    csgEvaluator.useGroups = false
    // Evaluator 默认搬运 position/uv/normal，且要求操作数真的带 uv；参数化图元的 uv 对布尔结果毫无意义，
    // 操作数统一成 position + normal，所以把搬运清单也收窄。
    csgEvaluator.attributes = ["position", "normal"]
  }
  return csgEvaluator
}
// 布尔把操作数当封闭实体看：开放面会让三角分类器把切割体的面也留在结果里
// （实测：拿开口 tube 当切割体，结果里冒出了切割盒的顶点）。返回空串表示封闭可用。
function csgOpenness(node) {
  const p = node.params ?? {}
  if (CSG_OPEN_PRIMITIVES.has(node.primitive)) return `「${node.primitive}」本身就是开放曲面`
  if (node.primitive === "tube" && p.closed !== 1 && p.cap === 0) return "tube 设了 cap:0（开口管）"
  if (node.primitive === "lathe") {
    const pts = Array.isArray(p.points) ? p.points : []
    const first = Math.abs(Number(pts[0]?.[0]) || 0)
    const last = Math.abs(Number(pts[pts.length - 1]?.[0]) || 0)
    if (first > 1e-9 || last > 1e-9) return "lathe 轮廓首尾没有回到轴上（半径 0），回转出来是开口壳"
  }
  return ""
}

function csgOperandGeometry(node, depth) {
  if (!node || typeof node !== "object") throw new Error("csg 操作数必须是图元对象。")
  const open = csgOpenness(node)
  if (open) throw new Error(`csg 操作数不封闭：${open}，布尔会出碎片。请换成封闭图元（tube 去掉 cap:0、lathe 让首尾半径为 0）。`)
  const geometry = node.primitive === "csg"
    ? specCsgGeometry(node.params ?? {}, depth + 1)
    : specGeometry(node.primitive, node.params ?? {})
  const position = Array.isArray(node.position) ? node.position : [0, 0, 0]
  const rotationDeg = Array.isArray(node.rotationDeg) ? node.rotationDeg : [0, 0, 0]
  const scale = Array.isArray(node.scale) ? node.scale : [1, 1, 1]
  const matrix = new THREE.Matrix4().compose(
    new THREE.Vector3(Number(position[0]) || 0, Number(position[1]) || 0, Number(position[2]) || 0),
    new THREE.Quaternion().setFromEuler(new THREE.Euler(
      THREE.MathUtils.degToRad(Number(rotationDeg[0]) || 0),
      THREE.MathUtils.degToRad(Number(rotationDeg[1]) || 0),
      THREE.MathUtils.degToRad(Number(rotationDeg[2]) || 0))),
    new THREE.Vector3(...[0, 1, 2].map(i => {
      const v = Number(scale[i])
      return Number.isFinite(v) && v !== 0 ? v : 1
    })),
  )
  geometry.applyMatrix4(matrix)
  // 布尔要求所有操作数属性集完全一致（否则内部分类三角时直接崩），这里统一成 position + normal；
  // 嵌套 csg 的产物没有 uv，把普通图元的 uv 也削掉正好对齐。
  for (const key of Object.keys(geometry.attributes)) if (key !== "position" && key !== "normal") geometry.deleteAttribute(key)
  if (!geometry.attributes.normal) geometry.computeVertexNormals()
  return geometry
}
function specCsgGeometry(p, depth = 0) {
  if (depth > CSG_MAX_DEPTH) throw new Error(`csg 嵌套最多 ${CSG_MAX_DEPTH} 层。`)
  const list = Array.isArray(p.operands) ? p.operands : []
  if (list.length < 2) throw new Error("csg 图元至少需要 2 个 operands（[{primitive,params,…}, …]）。")
  if (list.length > CSG_MAX_OPERANDS) throw new Error(`csg operands 最多 ${CSG_MAX_OPERANDS} 个。`)
  const op = CSG_OPS[String(p.op ?? "subtract").toLowerCase()]
  // ADDITION 的常量值就是 0，不能用真值判断。
  if (op === undefined) throw new Error(`未知的 csg 运算「${p.op}」（可用：subtract / union / intersect / reverse_subtract）。`)
  const runner = csgRunner()
  let acc = new Brush(csgOperandGeometry(list[0], depth))
  for (let i = 1; i < list.length; i++) {
    acc = runner.evaluate(acc, new Brush(csgOperandGeometry(list[i], depth)), op)
  }
  const geometry = acc.geometry ?? acc
  geometry.deleteAttribute("color") // 顶点色只是 CSG 内部分类三角用的，别带进渲染和导出
  geometry.deleteAttribute("uv")
  // 插值出来的法线不一定单位长，先归一化：否则渲染无碍，但 GLB 导出器会重算一遍并刷屏告警。
  if (geometry.attributes.normal) geometry.normalizeNormals()
  geometry.computeBoundingSphere()
  return geometry
}
// 顶层图元取几何：csg 走布尔，其余走参数化图元。
export function specPartGeometry(part) {
  return part.primitive === "csg" ? specCsgGeometry(part.params ?? {}, 0) : specGeometry(part.primitive, part.params ?? {})
}

export function buildSpecModel(spec) {
  const parts = Array.isArray(spec.parts) ? spec.parts : []
  if (!parts.length) throw new Error("spec 模型没有图元。")
  const group = new THREE.Group()
  for (let index = 0; index < parts.length; index++) {
    const part = parts[index]
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color(part.color ?? "#9fb2c8"),
      metalness: part.metalness ?? 0.15,
      roughness: part.roughness ?? 0.55,
      side: THREE.DoubleSide,
    })
    const mesh = new THREE.Mesh(specPartGeometry(part), material)
    mesh.name = String(part.name || part.id || part.primitive)
    mesh.userData.specPartId = String(part.id ?? "")
    mesh.userData.specIndex = index
    mesh.position.fromArray(Array.isArray(part.position) ? part.position : [0, 0, 0])
    const rot = Array.isArray(part.rotationDeg) ? part.rotationDeg : [0, 0, 0]
    mesh.rotation.set(THREE.MathUtils.degToRad(rot[0]), THREE.MathUtils.degToRad(rot[1]), THREE.MathUtils.degToRad(rot[2]))
    mesh.scale.fromArray(Array.isArray(part.scale) ? part.scale : [1, 1, 1])
    mesh.visible = part.visible !== false
    group.add(mesh)
  }
  return group
}
