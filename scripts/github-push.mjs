// 通过 GitHub REST API 发布插件仓库。
// 为什么不用 git push：本会话网络只放行 api.github.com，github.com 的 git transport 与 raw.githubusercontent.com
// 在 TLS 握手阶段就被中间网关掐断（详见 README「开发与验证」）。API 发布同样能产出一次干净提交。
//
// 用法：
//   GH_TOKEN=<fine-grained token，Contents: Read and write> node scripts/github-push.mjs
//   node scripts/github-push.mjs --dry-run                # 只比对差异，不写任何东西（无需 token）
//   node scripts/github-push.mjs --owner u --repo r --branch main --message "..."
//   node scripts/github-push.mjs --prune                  # 顺带删除远端有、本地不发布的文件（默认不删）
//   node scripts/github-push.mjs --no-tag --no-release    # 只推文件，不动 tag / Release
//   node scripts/github-push.mjs --tag-only               # 不提交文件，只把版本号 tag/Release 补在当前分支提交上
// 版本号默认一起发布：提交推上分支后，在同一个提交上打 v<version> 注解 tag，并建同名 Release；
// 若本地已有 pack.mjs 产出的 model-studio-<version>.zip，会作为 Release 附件上传——uploads.github.com
// 实测可达（和 raw.githubusercontent.com 不一样），失败也只降级为“有 Release 没附件”。
// 全流程幂等：tag/Release/附件都已存在就逐条跳过，所以 --tag-only 可以反复跑补档。
import { readFileSync, statSync, existsSync } from "node:fs"
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
const noTag = Boolean(arg("no-tag", false))
const noRelease = Boolean(arg("no-release", false))
const token = process.env.GH_TOKEN || process.env.GITHUB_TOKEN || (typeof arg("token", "") === "string" ? arg("token", "") : "")
const version = JSON.parse(readFileSync(path.join(root, ".qoder-plugin", "plugin.json"), "utf8")).version
const message = arg("message", `model-studio ${version}`) || `model-studio ${version}`
const customTag = arg("tag-name", null)
const tagName = typeof customTag === "string" && customTag ? customTag : `v${version}`
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

// 只补版本号：不读本地文件、不产生提交，把 tag / Release 打在分支当前提交上。
// 用于“文件早就推了、tag 忘了发”这类补档，也用于确认 tag 名与 zip 是否齐备。
if (arg("tag-only", false)) {
  if (!token) { console.error("--tag-only 需要写权限令牌。"); process.exit(2) }
  await publishTag(commitSha)
  process.exit(0)
}

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
  const zip = path.join(path.dirname(root), `model-studio-${version}.zip`)
  console.log(`\n版本号：${version} → tag ${tagName}${noTag ? "（已禁用）" : ""}｜Release ${noRelease ? "（已禁用）" : tagName}${existsSync(zip) ? `＋附件 ${path.basename(zip)}` : "（本地无 zip，附件跳过）"}`)
  console.log("DRY RUN：未写入。")
  process.exit(0)
}
if (!token) {
  console.error("\n需要写权限：GH_TOKEN=<fine-grained PAT，仓库 agent-model-window 的 Contents: Read and write>。")
  console.error("先跑 --dry-run 可看差异。")
  process.exit(2)
}

const changed = [...added, ...modified]

// 版本号一起上：注解 tag + Release + 安装包资源。tag 指向本次提交；同名 tag 已存在时不动它——
// 版本号没升就重复发布说明 plugin.json 忘了改，静默挪 tag 会让别人 clone 到 v0.6.0 却拿到另一份内容。
async function publishTag(sha) {
  if (noTag) return
  let existing = null
  try { existing = await api("GET", `${API}/repos/${owner}/${repo}/git/ref/tags/${tagName}`) } catch { /* 还没有 tag，正常 */ }
  if (existing) {
    // 注解 tag 的 ref 指向 tag 对象而不是提交，要比版本就得先解引用。
    let at = existing.object?.sha ?? ""
    if (existing.object?.type === "tag") at = (await api("GET", `${API}/repos/${owner}/${repo}/git/tags/${at}`)).object?.sha ?? at
    console.log(at === sha ? `tag ${tagName} 已指向 ${sha.slice(0, 7)}。`
      : `tag ${tagName} 已在别处（${at.slice(0, 7)}），不移动它——重复发布请先升 plugin.json 的 version。`)
  } else {
    const tag = await api("POST", `${API}/repos/${owner}/${repo}/git/tags`, {
      tag: tagName, message: `model-studio ${version}`, object: sha, type: "commit",
      tagger: { name: authorName, email: authorEmail, date: new Date().toISOString() },
    })
    await api("POST", `${API}/repos/${owner}/${repo}/git/refs`, { ref: `refs/tags/${tagName}`, sha: tag.sha })
    console.log(`已打 tag ${tagName} → ${sha.slice(0, 7)}`)
  }
  if (noRelease) return
  let release
  try {
    release = await api("POST", `${API}/repos/${owner}/${repo}/releases`, {
      tag_name: tagName, name: `model-studio ${version}`,
      body: `Qoder 插件「建模工作台」${version}。安装：设置 → 插件 → 本地 ZIP 导入下方附件。\n\n提交：\`${sha.slice(0, 7)}\``,
      draft: false, prerelease: false,
    })
    console.log(`Release ${tagName}：${release.html_url ?? release.url}`)
  } catch (err) {
    // 422 多半是“tag 打成功、附件没传完”留下的半成品，拿现成 Release 继续补附件；其余错误才放弃。
    if (!/422/.test(String(err?.message ?? err))) { console.log("Release 未创建：" + String(err?.message ?? err).slice(0, 140)); return }
    release = await api("GET", `${API}/repos/${owner}/${repo}/releases/tags/${tagName}`)
    console.log(`Release ${tagName} 已存在（${release.html_url ?? ""}），继续补附件。`)
  }
  const zip = path.join(path.dirname(root), `model-studio-${version}.zip`)
  if (!existsSync(zip)) { console.log(`未找到 ${path.basename(zip)}，先跑 node scripts/pack.mjs 就能把安装包一并传到 Release。`); return }
  // upload_url 是 {"...assets{?name,label}"} 模板，必须整段花括号换掉；留着 {name} 或 {?name,label} 会被当成路径而 400。
  const uploadUrl = (release.upload_url || "").split("{")[0] + `?name=${encodeURIComponent(path.basename(zip))}`
  if (!uploadUrl.startsWith("https://")) { console.log("Release 没有可用 upload_url，跳过附件。"); return }
  const already = (release.assets ?? []).find(a => a.name === path.basename(zip))
  if (already) { console.log(`附件已在：${already.name}（${(already.size / 1024).toFixed(0)} KB）→ ${already.browser_download_url ?? ""}`); return }
  try {
    const res = await fetch(uploadUrl, {
      method: "POST", headers: { ...headers, "content-type": "application/octet-stream" },
      body: readFileSync(zip),
    })
    const text = await res.text()
    if (!res.ok) throw new Error(`${res.status} ${text.slice(0, 160)}`)
    const a = JSON.parse(text)
    console.log(`附件已上传：${a.name}（${(a.size / 1024).toFixed(0)} KB）${a.browser_download_url ? " → " + a.browser_download_url : ""}`)
  } catch (err) {
    console.log("附件上传失败：" + String(err?.message ?? err).slice(0, 160))
  }
}

if (!changed.length && !prune) {
  console.log("文件没有变化，无需新提交。")
  await publishTag(commitSha)
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
await publishTag(String(pushed))
