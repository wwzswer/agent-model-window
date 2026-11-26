// 构建脚本：把 Node 侧几何内核打包成自包含 ESM，供 server.mjs 直接 import（插件运行时不需要 node_modules）。
// 仅在构建期使用 esbuild；产物 lib/geometry.node.mjs 把 three 一并内联。
import { build } from "esbuild"
import { stat, mkdir } from "node:fs/promises"
import { fileURLToPath, pathToFileURL } from "node:url"
import path from "node:path"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const outfile = path.join(root, "lib", "geometry.node.mjs")

await mkdir(path.join(root, "lib"), { recursive: true })

await build({
  entryPoints: [path.join(root, "src", "kernel.mjs")],
  absWorkingDir: path.join(root, "build"),
  nodePaths: [path.join(root, "build", "node_modules")],
  bundle: true,
  minify: true,
  format: "esm",
  platform: "node",
  target: ["node18"],
  external: ["node:*"],
  outfile,
  legalComments: "none",
  logLevel: "warning",
  banner: { js: "// 由 build/build-node.mjs 生成：three + 几何内核内联，server.mjs 直接 import。" },
})

const bytes = (await stat(outfile)).size
console.log(`node kernel: ${(bytes / 1024).toFixed(0)} KB -> ${path.relative(root, outfile)}`)
const mod = await import(pathToFileURL(outfile).href)
const probe = {
  exports: Object.keys(mod).sort(),
  version: mod.KERNEL_VERSION,
  primitives: mod.SPEC_PRIMITIVES?.length ?? 0,
  views: Object.keys(mod.VIEWS ?? {}).join("/"),
}
// 冒烟：一个最小 spec 必须能求值、出图、过门控
const spec = {
  units: "m",
  parts: [
    { id: "top", primitive: "box", params: { width: 0.06, height: 0.01, depth: 0.1 }, position: [0, 0.035, 0], color: "#7f93ad" },
    { id: "pad", primitive: "cylinder", params: { radiusTop: 0.02, radiusBottom: 0.02, height: 0.02, radialSegments: 24 }, position: [0, 0.02, 0.02], color: "#48566b" },
  ],
  gates: {
    dimension: { x: 0.06, y: 0.03, z: 0.1, tol: 0.001 },
    ground: { tol: 0.0005 },
    silhouette: { plan: { view: "top", tol: 0.001, points: [{ at: 0, width: 0.06 }] } },
    clearance: { allow: [{ a: "top", b: "pad", reason: "垫块坐在面板上" }], mode: "aabb" },
  },
}
const numeric = mod.inspect(spec, { mode: "summary", bins: 12 })
const png = mod.inspect(spec, { mode: "summary", views: ["top", "side"], size: 128 })
const gate = mod.check(spec, undefined, { bins: 16 })
const glb = await mod.toGlb(spec)
console.log(JSON.stringify({
  ...probe,
  sizeMm: numeric.numeric.sizeMm,
  tris: numeric.numeric.triCount,
  gateOk: gate.ok,
  gates: gate.results.map(r => `${r.gate}:${r.ok ? "PASS" : "FAIL"}`),
  pngBytes: png.images.map(i => `${i.view}:${i.bytes}`).join(" "),
  glbBytes: glb.length,
  cached: mod.modelOf(spec).cached,
}, null, 2))
if (!numeric.numeric.triCount || !gate.results.length || !gate.ok || glb.length < 800 || png.images.some(i => i.bytes < 200)) {
  console.error("ERROR: node kernel smoke failed")
  process.exit(1)
}
console.log("node kernel build ok")
