// 通过 GitHub REST API 发布插件仓库。
// 为什么不用 git push：本会话网络只放行 api.github.com，github.com 的 git transport 与 raw.githubusercontent.com
// 在 TLS 握手阶段就被中间网关掐断（详见 README「开发与验证」）。API 发布同样能产出一次干净提交。
//
// 用法：
//   GH_TOKEN=<fine-grained token，Contents: Read and write> node scripts/github-push.mjs
//   node scripts/github-push.mjs --dry-run                # 只比对差异，不写任何东西（无需 token）
//   node scripts/github-push.mjs --owner u --repo r --branch main --message "..."
//   node scripts/github-push.mjs --prune                  # 顺带删除远端有、本地不发布的文件（默认不删）
import { readFileSync, statSync } from "node:fs"
import { createHash } from "node:crypto"
import { fileURLToPath } from "node:url"
import path from "node:path"
import { releaseEntries } from "./release-files.mjs"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const arg = (name, fallback) => {
  const i = process.argv.indexOf("--" + name)
  return i > -1 ? (process.argv[i + 1] && !process.argv[i + 1].startsWith("--") ? process.argv[i + 1] : true) : fallback
}
const owner = arg("owner", "wwzswer")
const repo = arg("repo", "agent-model-window")
const branch = arg("branch", "main")
const dryRun = Boolean(arg("dry-run", false))
const prune = Boolean(arg("prune", false))
const token = process.env.GH_TOKEN || process.env.GITHUB_TOKEN || (typeof arg("token", "") === "string" ? arg("token", "") : "")
const version = JSON.parse(readFileSync(path.join(root, ".qoder-plugin", "plugin.json"), "utf8")).version
const message = arg("message", `model-studio ${version}`) || `model-studio ${version}`
const authorName = process.env.GIT_AUTHOR_NAME || arg("author", "wwzswer")
const authorEmail = process.env.GIT_AUTHOR_EMAIL || (typeof arg("author", "") === "string" ? "" : "") || "wwzswer@163.com"
const API = "https://api.github.com"

const headers = { "User-Agent": "model-studio-release", Accept: "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28" }
if (token) headers.authorization = `Bearer ${token}`

async function api(method, url, body, attempt = 0) {
  const res = await fetch(url, {
    method,
    headers: { ...headers, ...(body ? { "content-type": "application/json" } : {}) },
    body: body ? JSON.stringify(body) : undefined,
  })
  if (res.status === 403 || res.status === 429) {
    const reset = res.headers.get("x-ratelimit-reset")
    const wait = res.headers.get("retry-after")
    if (attempt < 2 && (res.status === 429 || (reset && Number(reset) - Date.now() / 1000 < 60) || wait)) {
      const ms = wait ? Number(wait) * 1000 : Math.max(1000, Number(reset) * 1000 - Date.now())
      console.log(`…限流，等待 ${Math.ceil(ms / 1000)}s 后重试`)
      await new Promise(r => setTimeout(r, Math.min(ms, 65000)))
      return api(method, url, body, attempt + 1)
    }
  }
  const text = await res.text()
  if (!res.ok) throw new Error(`${method} ${url} → ${res.status} ${text.slice(0, 300)}`)
  return text ? JSON.parse(text) : {}
}

// git blob sha 与 GitHub 的 tree 条目一致，可用来跳过未变化的文件（省 API 调用）。
const gitBlobSha = buf => createHash("sha1").update(`blob ${buf.length}\u0000`).update(buf).digest("hex")

const entries = releaseEntries(root)
const local = entries.map(rel => {
  const buf = readFileSync(path.join(root, rel))
  return { rel, sha: gitBlobSha(buf), size: buf.length, text: null }
})
console.log(`本地发布 ${local.length} 个文件，${(local.reduce((a, b) => a + b.size, 0) / 1024 / 1024).toFixed(2)} MB`)

const ref = await api("GET", `${API}/repos/${owner}/${repo}/git/ref/heads/${branch}`)
const commitSha = ref.object.sha
const commit = await api("GET", `${API}/repos/${owner}/${repo}/git/commits/${commitSha}`)
const remoteTree = await api("GET", `${API}/repos/${owner}/${repo}/git/trees/${commit.tree.sha}?recursive=1`)
const remote = new Map(remoteTree.tree.filter(t => t.type === "blob").map(t => [t.path, t]))
console.log(`远端 ${branch} @ ${commitSha.slice(0, 7)}（${remote.size} 个文件）`)

const added = [], modified = [], unchanged = []
for (const f of local) {
  const r = remote.get(f.rel)
  if (!r) added.push(f)
  else if (r.sha !== f.sha) modified.push(f)
  else unchanged.push(f)
}
const gone = [...remote.keys()].filter(p => !local.some(f => f.rel === p))
console.log(`新增 ${added.length} · 修改 ${modified.length} · 未变 ${unchanged.length}${gone.length ? ` · 远端独有 ${gone.length}: ${gone.join(", ")}` : ""}`)
for (const f of [...added, ...modified]) console.log(`  ${added.includes(f) ? "A" : "M"} ${f.rel} (${(f.size / 1024).toFixed(0)} KB)`)
if (dryRun) {
  console.log("\nDRY RUN：未写入。")
  process.exit(0)
}
if (!token) {
  console.error("\n需要写权限：GH_TOKEN=<fine-grained PAT，仓库 agent-model-window 的 Contents: Read and write>。")
  console.error("先跑 --dry-run 可看差异。")
  process.exit(2)
}

const changed = [...added, ...modified]
if (!changed.length && !prune) {
  console.log("没有变化，无需提交。")
  process.exit(0)
}

// 预检：把分支 ref “更新”成它当前指向的提交——内容不变、不产生提交，但能提前判定令牌有没有写权限，
// 免得建完 20 多个 blob 才被拒。fine-grained 令牌最常见的坑就是 Contents 只有 read-only。
if (!arg("no-preflight", false)) {
  try {
    await api("PATCH", `${API}/repos/${owner}/${repo}/git/refs/heads/${branch}`, { sha: commitSha, force: false })
    console.log("预检：令牌具备写权限。")
  } catch (err) {
    const msg = String(err?.message ?? err)
    if (/403/.test(msg)) {
      console.error("\n令牌没有写权限（GitHub: Resource not accessible by personal access token）。")
      console.error("fine-grained 令牌需要：Repository access 含本仓库 + Repository permissions → Contents: Read and write。")
      console.error("注意“只有 Contents: read-only 时，公开仓库的读接口依然 200”，别被读成功误导。")
      process.exit(3)
    }
    console.log("预检未通过但不阻断：" + msg.slice(0, 120))
  }
}

let pushed = null
try {
  // 路线 1：Git Data API（blob → tree → commit → ref），未变化的文件直接沿用 base_tree。
  const tree = []
  for (const f of changed) {
    const buf = readFileSync(path.join(root, f.rel))
    const blob = await api("POST", `${API}/repos/${owner}/${repo}/git/blobs`, { content: buf.toString("base64"), encoding: "base64" })
    tree.push({ path: f.rel, mode: "100644", type: "blob", sha: blob.sha })
    await new Promise(r => setTimeout(r, 120))
  }
  if (prune) for (const p of gone) tree.push({ path: p, mode: "100644", type: "blob", sha: null })
  const newTree = await api("POST", `${API}/repos/${owner}/${repo}/git/trees`, { base_tree: commit.tree.sha, tree })
  const newCommit = await api("POST", `${API}/repos/${owner}/${repo}/git/commits`, {
    message,
    parents: [commitSha],
    tree: newTree.sha,
    author: { name: authorName, email: authorEmail, date: new Date().toISOString() },
  })
  const updated = await api("PATCH", `${API}/repos/${owner}/${repo}/git/refs/heads/${branch}`, { sha: newCommit.sha, force: false })
  pushed = updated.object?.sha ?? newCommit.sha
} catch (err) {
  const msg = String(err?.message ?? err)
  if (/403/.test(msg)) {
    console.log(`\nGit Data API 被拒：${msg.slice(0, 120)}`)
    console.log("改用 Create-a-commit 接口（单次调用提交全部文件，fine-grained 令牌更吃这一套）…")
  } else throw err
}

if (!pushed) {
  // 路线 2：POST /repos/{owner}/{repo}/commits —— 一次调用产出一次提交，不依赖 git/blobs。
  const files = changed.map(f => {
    const buf = readFileSync(path.join(root, f.rel))
    const entry = { path: f.rel, content: buf.toString("base64"), mode: "100644" }
    if (remote.has(f.rel)) entry.sha = remote.get(f.rel).sha   // 乐观并发：远端 blob 变了就报错而不是静默覆盖
    return entry
  })
  const created = await api("POST", `${API}/repos/${owner}/${repo}/commits`, {
    branch,
    message,
    author: { name: authorName, email: authorEmail, date: new Date().toISOString() },
    files,
  })
  pushed = created.sha
}

console.log(`\n已推送 ${branch}：${commitSha.slice(0, 7)} → ${String(pushed).slice(0, 7)}`)
console.log(`提交：${message}｜条目变更 ${changed.length}${prune && gone.length ? `｜删除 ${gone.length}` : ""}｜https://github.com/${owner}/${repo}/tree/${branch}`)
