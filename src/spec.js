// 参数化图元（AI 建模 spec，Y-up、米、地面 y=0）→ three 几何 / Object3D。
// 本模块只依赖 three 核心与 RoundedBoxGeometry，不碰任何浏览器 API，
// 因此浏览器 bundle 与 Node 侧几何内核可以共用同一份实现。
import * as THREE from "three"
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js"

export const SPEC_PRIMITIVES = ["box", "rounded_box", "sphere", "cylinder", "cone", "pyramid",
  "torus", "capsule", "plane", "lathe", "tube", "sweep", "extrude", "heightfield"]

const segInt = (v, d, min) => {
  const n = Math.round(Number(v ?? d))
  return Number.isFinite(n) ? Math.max(min, Math.min(256, n)) : d
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
      const curve = new THREE.CatmullRomCurve3(pts, p.closed === 1, "catmullrom", 0.5)
      return new THREE.TubeGeometry(curve, segInt(p.tubularSegments ?? p.segments, 64, 4), p.radius ?? 0.02, segInt(p.radialSegments ?? p.segments, 16, 3))
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
        for (const [px, py] of ring) {
          const nx2 = px * ca - py * sa, ny2 = px * sa + py * ca
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
          idx.push(a, a + 1, a + stride, a + 1, a + stride + 1, a + stride)
        }
      }
      const geometry = new THREE.BufferGeometry()
      geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3))
      geometry.setIndex(idx)
      geometry.computeVertexNormals()
      return geometry
    }
    default:
      throw new Error("未知的图元类型：" + primitive)
  }
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
    const mesh = new THREE.Mesh(specGeometry(part.primitive, part.params ?? {}), material)
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
