// 插件发布清单：pack.mjs（打 ZIP）与 github-push.mjs（推仓库）共用，保证安装包与仓库内容一致。
import { readdirSync, statSync, existsSync } from "node:fs"
import path from "node:path"

const DIRS = [".qoder-plugin", "lib", "ui", "src", "scripts", "skills", "docs", "examples"]
const ROOT_FILES = [".gitignore", ".mcp.json", "server.mjs", "README.md"]
const BUILD_FILES = ["build.mjs", "build-node.mjs", "package.json", "package-lock.json"]
const EXCLUDE_NAMES = /^(viewer\.injected\.html|page-test.*|.*\.bak|\.DS_Store|mouse-.*|variant-.*)$/
const EXCLUDE_EXT = /\.(glb|gltf|png|zip|map)$/i

function walk(dir, prefix, out) {
  for (const name of readdirSync(dir).sort()) {
    if (name === "node_modules" || name.startsWith(".")) continue
    const full = path.join(dir, name)
    const rel = prefix ? `${prefix}/${name}` : name
    if (EXCLUDE_NAMES.test(name)) continue
    if (statSync(full).isDirectory()) walk(full, rel, out)
    else if (!EXCLUDE_EXT.test(name)) out.push(rel)
  }
  return out
}

/** 返回排序后的发布条目（相对插件根、正斜杠）。 */
export function releaseEntries(root) {
  const entries = []
  for (const d of DIRS) if (existsSync(path.join(root, d))) walk(path.join(root, d), d, entries)
  for (const f of ROOT_FILES) if (existsSync(path.join(root, f))) entries.push(f)
  for (const f of BUILD_FILES) if (existsSync(path.join(root, "build", f))) entries.push(`build/${f}`)
  return entries.sort()
}
