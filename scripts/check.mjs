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

for (const rel of ["server.mjs", "lib/adapters.mjs", "lib/blender_convert.py", "lib/panel.mjs", "scripts/open-in-workbench.mjs", "ui/viewer.html", "ui/viewer.bundle.js", "README.md", "examples/adapters.example.json"]) {
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

// 版本一致性 + 内核产物（0.6 起 server 侧工具依赖 lib/geometry.node.mjs）
const version = manifest.version
const serverText = await readFile(path.join(root, "server.mjs"), "utf8")
const hostText = await readFile(path.join(root, "src", "host.js"), "utf8")
const kernelText = await readFile(path.join(root, "src", "kernel.mjs"), "utf8")
const serverVersion = /SERVER_INFO\s*=\s*{[^}]*version:\s*"([^"]+)"/.exec(serverText)?.[1]
const hostVersion = /appInfo:\s*{\s*name:\s*"model-studio",\s*version:\s*"([^"]+)"/.exec(hostText)?.[1]
const kernelVersion = /KERNEL_VERSION\s*=\s*"([^"]+)"/.exec(kernelText)?.[1]
const bundledKernel = existsSync(path.join(root, "lib", "geometry.node.mjs"))
  ? await readFile(path.join(root, "lib", "geometry.node.mjs"), "utf8")
  : ""
check("服务端内核产物存在 lib/geometry.node.mjs", bundledKernel.length > 0, `${(bundledKernel.length / 1024).toFixed(0)} KB`)
check("四处版本号一致", version === serverVersion && version === hostVersion && version === kernelVersion,
  `plugin=${version} server=${serverVersion} host=${hostVersion} kernel-src=${kernelVersion}`)
check("打包内核导出 KERNEL_VERSION 且版本同步", /KERNEL_VERSION/.test(bundledKernel) && bundledKernel.includes(`"${version}"`))
for (const tool of ["inspect_model", "check_gates", "optimize_params", "snapshot_model", "revert_model", "save_model_glb"]) {
  check(`工具已声明 ${tool}`, new RegExp(`name:\\s*"${tool}"`).test(serverText))
}
const skillTools = ["inspect_model", "check_gates", "optimize_params", "revert_model", "save_model_glb"]
check("Skill 覆盖新工具", skillTools.every(t => skill.includes(t)), skillTools.filter(t => !skill.includes(t)).join(","))
const readme = await readFile(path.join(root, "README.md"), "utf8")
check("README 介绍内核与验收闭环", readme.includes("几何内核") && readme.includes("inspect_model"))

// 宿主对 MCP App 工具入参有 1 MiB 硬校验（JSON.stringify(arguments) 字节数），
// 页面分块上传的 base64 必须留够 JSON 开销，否则每次编辑同步都报“工具参数过大”。
const mainText = await readFile(path.join(root, "src", "main.js"), "utf8")
const chunkRaw = Number(/CHUNK_RAW_LIMIT\s*=\s*([\d_]+)/.exec(mainText)?.[1]?.replace(/_/g, ""))
const argsBytes = Math.ceil(chunkRaw / 3) * 4 + 4096
check("页面分块大小在宿主入参上限内", chunkRaw > 0 && argsBytes < 1024 * 1024, `块 ${chunkRaw} B → 参数约 ${(argsBytes / 1024).toFixed(0)} KB`)
check("页面取走外部打开请求", mainText.includes("pending_open_requests"))
for (const tool of ["panel_status", "pending_open_requests"]) {
  check(`外部面板工具已声明 ${tool}`, new RegExp(`name:\\s*"${tool}"`).test(serverText))
}
check("README 交代外部控制面板", readme.includes("外部控制面板") && readme.includes("open-in-workbench"))
check("Skill 交代外部入口话术", skill.includes("panel_status") || skill.includes("open-in-workbench"))

// 布尔建模（0.8 起）：内核、服务端校验、文档三处都得提到 csg，漏一处就是“工具能做但没人知道”
const specText = await readFile(path.join(root, "src", "spec.js"), "utf8")
check("服务端图元表含 csg", /const PRIMITIVE_KINDS = \[[^\]]*"csg"/.test(serverText))
check("内核源码实现 csg 布尔", specText.includes("specCsgGeometry") && specText.includes("three-bvh-csg"))
check("打包内核带 csg 分支", bundledKernel.includes("csg operands") || bundledKernel.includes("\\u672A\\u77E5\\u7684 csg"))
check("文档交代布尔能力", skill.includes("csg {op:") && readme.includes("布尔 csg"))
check("页面图元说明含布尔", html.includes("/ 布尔"))

console.log(failures === 0 ? "\nCHECK OK" : `\nCHECK FAILED (${failures})`)
process.exit(failures === 0 ? 0 : 1)