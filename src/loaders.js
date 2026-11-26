// 多格式解析：浏览器端 three.js 加载器，统一输出 THREE.Object3D。
import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js"
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js"
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js"
import { PLYLoader } from "three/examples/jsm/loaders/PLYLoader.js"
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js"
import { ThreeMFLoader } from "three/examples/jsm/loaders/3MFLoader.js"
import { ColladaLoader } from "three/examples/jsm/loaders/ColladaLoader.js"
import { buildSpecModel } from "./spec.js"

export const BROWSER_FORMATS = ["glb", "gltf", "obj", "stl", "ply", "fbx", "3mf", "dae"]

const defaultMaterial = () => new THREE.MeshStandardMaterial({ color: 0x9fb2c8, metalness: 0.15, roughness: 0.55 })

function base64ToBytes(b64) {
  const bin = atob(b64)
  const out = new Uint8Array(bin.length)
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i)
  return out
}

function makeBlobManager(resources) {
  const urls = new Map()
  for (const [rel, entry] of Object.entries(resources ?? {})) {
    const bytes = base64ToBytes(entry.data)
    const url = URL.createObjectURL(new Blob([bytes], { type: entry.mime || "application/octet-stream" }))
    urls.set(rel, url)
    try { urls.set(decodeURIComponent(rel), url) } catch { /* ignore */ }
  }
  const manager = new THREE.LoadingManager()
  manager.setURLModifier(url => {
    if (urls.has(url)) return urls.get(url)
    const clean = url.split("?")[0]
    if (urls.has(clean)) return urls.get(clean)
    try {
      const dec = decodeURIComponent(clean)
      if (urls.has(dec)) return urls.get(dec)
    } catch { /* ignore */ }
    return url
  })
  return { manager, revoke: () => { for (const url of new Set(urls.values())) URL.revokeObjectURL(url) } }
}

function parseAsync(loader, data, path, manager) {
  return new Promise((resolve, reject) => {
    try {
      if (manager) loader.manager = manager
      loader.parse(data, path ?? "", resolve, reject)
    } catch (error) { reject(error) }
  })
}

function meshFromGeometry(geometry, name) {
  if (!geometry.attributes.normal) geometry.computeVertexNormals()
  const mesh = new THREE.Mesh(geometry, defaultMaterial())
  mesh.name = name
  return mesh
}

// manifest: { format, payload: "binary"|"bundle", name }
// bytes: 原始字节（binary）或 bundle JSON 的 UTF-8 字节
export async function parseModel(manifest, bytes) {
  const format = String(manifest.format || "").toLowerCase()
  const name = manifest.name || "model"
  let object = null
  let revoke = null

  if (manifest.payload === "spec") {
    const spec = JSON.parse(new TextDecoder().decode(bytes))
    object = buildSpecModel(spec)
  } else if (manifest.payload === "bundle") {
    const bundle = JSON.parse(new TextDecoder().decode(bytes))
    const made = makeBlobManager(bundle.resources)
    revoke = made.revoke
    if (bundle.kind === "gltf") {
      const loader = new GLTFLoader(made.manager)
      const gltf = await parseAsync(loader, typeof bundle.main === "string" ? bundle.main : JSON.stringify(bundle.main), "")
      object = gltf.scene
    } else if (bundle.kind === "obj") {
      const objLoader = new OBJLoader(made.manager)
      if (bundle.mtl) {
        const mtlLoader = new MTLLoader(made.manager)
        const materials = mtlLoader.parse(bundle.mtl.text, "")
        materials.preload()
        objLoader.setMaterials(materials)
      }
      object = objLoader.parse(bundle.main)
    } else {
      throw new Error("未知的 bundle 类型：" + bundle.kind)
    }
  } else {
    const text = () => new TextDecoder().decode(bytes)
    const buffer = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength)
    switch (format) {
      case "glb": {
        const gltf = await parseAsync(new GLTFLoader(), buffer, "")
        object = gltf.scene
        break
      }
      case "gltf": {
        const gltf = await parseAsync(new GLTFLoader(), text(), "")
        object = gltf.scene
        break
      }
      case "obj":
        object = new OBJLoader().parse(text())
        break
      case "stl":
        object = meshFromGeometry(new STLLoader().parse(buffer), name)
        break
      case "ply": {
        const geometry = new PLYLoader().parse(buffer)
        // PLYLoader 在存在 face 元素时生成索引；无索引即点云
        if (geometry.index) {
          object = meshFromGeometry(geometry, name)
        } else {
          const box = new THREE.Box3().setFromBufferAttribute(geometry.attributes.position)
          const size = box.getSize(new THREE.Vector3()).length() || 1
          const points = new THREE.Points(geometry, new THREE.PointsMaterial({ size: size / 400, vertexColors: Boolean(geometry.attributes.color) }))
          points.name = name
          object = points
        }
        break
      }
      case "fbx":
        object = new FBXLoader().parse(buffer, "")
        break
      case "3mf":
        object = new ThreeMFLoader().parse(buffer)
        break
      case "dae":
        object = new ColladaLoader().parse(text(), "").scene
        break
      default:
        throw new Error("浏览器端不支持的格式：" + format)
    }
  }

  if (!object) throw new Error("解析结果为空。")
  const root = new THREE.Group()
  root.name = name
  root.add(object)
  if (revoke) setTimeout(revoke, 30000) // 纹理异步解码完成后释放 blob URL
  return root
}

export function computeStats(root) {
  let triangles = 0, vertices = 0, meshes = 0, points = 0
  root.traverse(node => {
    if (node.isMesh && node.geometry) {
      meshes++
      const g = node.geometry
      const pos = g.attributes.position
      if (pos) vertices += pos.count
      triangles += g.index ? g.index.count / 3 : (pos ? pos.count / 3 : 0)
    } else if (node.isPoints && node.geometry?.attributes.position) {
      points++
      vertices += node.geometry.attributes.position.count
    }
  })
  return { triangles: Math.round(triangles), vertices, meshes, points }
}

export function disposeObject(root) {
  root.traverse(node => {
    if (node.geometry) node.geometry.dispose()
    const materials = Array.isArray(node.material) ? node.material : node.material ? [node.material] : []
    for (const material of materials) {
      for (const value of Object.values(material)) {
        if (value && value.isTexture) value.dispose()
      }
      material.dispose()
    }
  })
}