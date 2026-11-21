// 插件静态检查：清单、Skill frontmatter、组件路径、UI 预算、MCP 配置。
import { readFile, stat } from "node:fs/promises"
import { existsSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
let failures = 0
const check = (name, ok, detail = "") => {
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? "  — " + detail : ""}`)
  if (!ok) failures++
}

const manifest = JSON.parse(await readFile(path.join(root, ".qoder-plugin", "plugin.json"), "utf8"))
check("清单可解析", Boolean(manifest.name && manifest.version && manifest.displayName))
check("名称 kebab-case 且与目录一致", /^[a-z0-9]+(-[a-z0-9]+)*$/.test(manifest.name) && path.basename(root) === manifest.name)

const skillPath = path.join(root, "skills", "model-studio", "SKILL.md")
const skill = await readFile(skillPath, "utf8")
const fm = /^---\r?\n([\s\S]*?)\r?\n---/.exec(skill)
check("Skill frontmatter 存在", Boolean(fm))
check("Skill name 与目录一致", /name:\s*model-studio/.test(fm?.[1] ?? ""))
check("Skill description 非空", /description:\s*.{10,}/.test(fm?.[1] ?? ""))

for (const rel of ["server.mjs", "lib/adapters.mjs", "lib/blender_convert.py", "ui/viewer.html", "ui/viewer.bundle.js", "README.md", "examples/adapters.example.json"]) {
  check(`组件存在 ${rel}`, existsSync(path.join(root, rel)))
}

const html = await readFile(path.join(root, "ui", "viewer.html"), "utf8")
const bundle = await readFile(path.join(root, "ui", "viewer.bundle.js"), "utf8")
const injected = html.replace("/* APP_SCRIPT */", () => bundle.replaceAll("</script", "<\\/script"))
const size = Buffer.byteLength(injected, "utf8")
check("注入后 HTML < 4MiB", size < 4 * 1024 * 1024, `${(size / 1024).toFixed(0)} KB`)
check("bundle 为 IIFE 且无外部 import", !/^\s*import\s/m.test(bundle) && bundle.length > 100000)

const mcpPath = path.join(root, ".mcp.json")
if (existsSync(mcpPath)) {
  const mcp = JSON.parse(await readFile(mcpPath, "utf8"))
  const server = mcp.mcpServers?.["model-studio"]
  check(".mcp.json 顶层 mcpServers", Boolean(mcp.mcpServers))
  check("服务器 command/args 有效", Boolean(server?.command && Array.isArray(server?.args)))
  check("无机器特定绝对路径", !JSON.stringify(mcp).includes("C:\\\\Users") && !JSON.stringify(mcp).includes("/Users/"))
} else {
  console.log("WARN  .mcp.json 尚未生成（等待 Node.js 运行时选择）")
}

// 敏感内容扫描
const sensitive = []
for (const rel of ["server.mjs", "lib/adapters.mjs", ".qoder-plugin/plugin.json", "skills/model-studio/SKILL.md"]) {
  const text = await readFile(path.join(root, rel), "utf8")
  if (/(api[_-]?key|secret|token|password)\s*[:=]\s*["'][A-Za-z0-9]{16,}/i.test(text)) sensitive.push(rel)
}
check("无凭据/密钥", sensitive.length === 0, sensitive.join(","))

console.log(failures === 0 ? "\nCHECK OK" : `\nCHECK FAILED (${failures})`)
process.exit(failures === 0 ? 0 : 1)