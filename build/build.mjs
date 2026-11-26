// 构建脚本：把 src/ 打包为自包含 IIFE，供 server.mjs 内联进 viewer.html。
// 仅构建时使用；插件运行时不依赖 npm 包。
import { build } from "esbuild"
import { readFile, writeFile, stat } from "node:fs/promises"
import { fileURLToPath } from "node:url"
import path from "node:path"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const outfile = path.join(root, "ui", "viewer.bundle.js")

await build({
  entryPoints: [path.join(root, "src", "main.js")],
  absWorkingDir: path.join(root, "build"),
  nodePaths: [path.join(root, "build", "node_modules")],
  bundle: true,
  minify: true,
  format: "iife",
  target: ["es2020"],
  outfile,
  legalComments: "none",
  logLevel: "info",
})

const bytes = (await stat(outfile)).size
const html = await readFile(path.join(root, "ui", "viewer.html"), "utf8")
const bundleText = (await readFile(outfile, "utf8")).replaceAll("</script", "<\\/script")
const injected = html.replace("/* APP_SCRIPT */", () => bundleText)
const htmlSize = Buffer.byteLength(injected, "utf8")
console.log(`bundle: ${(bytes / 1024).toFixed(0)} KB; injected html: ${(htmlSize / 1024).toFixed(0)} KB`)
if (htmlSize > 3_800_000) {
  console.error("ERROR: injected HTML exceeds the 4 MiB resource-response budget")
  process.exit(1)
}
// 供 smoke 测试使用的注入产物
await writeFile(path.join(root, "build", "viewer.injected.html"), injected)
console.log("build ok")