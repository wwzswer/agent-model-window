// 可选集成测试：需要本机安装 Blender。验证版本探测与真实转换（OBJ / .blend -> GLB）。
// 用法: node scripts/blender-test.mjs "C:/Program Files/Blender Foundation/Blender 5.2/blender.exe"
import { writeFile, readFile, mkdir, rm } from "node:fs/promises"
import { existsSync } from "node:fs"
import path from "node:path"
import os from "node:os"
import { spawn } from "node:child_process"
import { fileURLToPath } from "node:url"
import { detectBlender, convertToGlb } from "../lib/adapters.mjs"

const blenderPath = process.argv[2]
if (!blenderPath || !existsSync(blenderPath)) {
  console.log("SKIP  未提供有效的 Blender 路径")
  process.exit(0)
}
const config = { blenderPath, adaptersFile: "", conversionTimeoutSec: 180 }
const tmp = path.join(os.tmpdir(), "model-studio-blender-" + Date.now())
await mkdir(tmp, { recursive: true })
let failures = 0
const check = (name, ok, detail = "") => {
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? "  — " + detail : ""}`)
  if (!ok) failures++
}

try {
  const info = await detectBlender(blenderPath)
  check("版本探测", Boolean(info?.version), info?.version ?? "null")

  // OBJ -> GLB
  const objPath = path.join(tmp, "shape.obj")
  await writeFile(objPath, "v 0 0 0\nv 1 0 0\nv 1 1 0\nv 0 1 0\nf 1 2 3 4\n")
  const objResult = await convertToGlb(config, objPath, "obj")
  const objGlb = await readFile(objResult.glbPath)
  check("OBJ 经 Blender 转 GLB", objGlb.toString("ascii", 0, 4) === "glTF", objResult.converter)

  // 用 Blender 生成 .blend，再走 .blend 转换路径
  const blendPath = path.join(tmp, "scene.blend")
  const makeScript = path.join(tmp, "make_blend.py")
  await writeFile(makeScript, [
    "import bpy",
    "bpy.ops.wm.read_factory_settings(use_empty=True)",
    "bpy.ops.mesh.primitive_cube_add(location=(0,0,0))",
    "bpy.ops.mesh.primitive_torus_add(location=(2,0,0))",
    `bpy.ops.wm.save_as_mainfile(filepath=r"${blendPath}")`,
  ].join("\n"))
  await new Promise(resolve => {
    const child = spawn(blenderPath, ["--background", "--factory-startup", "--python", makeScript], { windowsHide: true })
    child.on("close", resolve)
    setTimeout(() => { try { child.kill() } catch {} ; resolve() }, 120000)
  })
  check("测试 .blend 已生成", existsSync(blendPath))
  if (existsSync(blendPath)) {
    const blendResult = await convertToGlb(config, blendPath, "blend")
    const blendGlb = await readFile(blendResult.glbPath)
    check(".blend 转 GLB", blendGlb.toString("ascii", 0, 4) === "glTF", blendResult.converter)
    const jsonLen = blendGlb.readUInt32LE(12)
    const json = JSON.parse(blendGlb.toString("utf8", 20, 20 + jsonLen))
    check("GLB 含两个物体", (json.meshes?.length ?? 0) >= 2, `meshes=${json.meshes?.length}`)
    // 缓存命中
    const cached = await convertToGlb(config, blendPath, "blend")
    check("转换缓存命中", cached.cached === true)
  }
} catch (error) {
  failures++
  console.log("FAIL  异常 — " + (error?.stack || error))
} finally {
  await rm(tmp, { recursive: true, force: true })
}
console.log(failures === 0 ? "\nBLENDER TEST OK" : `\nBLENDER TEST FAILED (${failures})`)
process.exit(failures === 0 ? 0 : 1)