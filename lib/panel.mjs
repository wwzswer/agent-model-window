// 会话外部控制面板：在 MCP 进程里挂一个只监听 127.0.0.1 的 HTTP 端点，
// 让对话之外的入口（CLI、资源管理器“打开方式”、其它本地软件）把模型送进工作台。
// 为什么不用文件轮询：端口+令牌写在 ~/.qoder-model-studio/panel.json，调用方一次 HTTP 就能落到
// 正在运行的那个服务器进程，不用等下一次 MCP 心跳。
// 安全边界：仅回环地址、必须带令牌（恒定时间比较）、请求体 64 KB 上限、不发 CORS 头。
import { createServer } from "node:http"
import { writeFile, mkdir, readFile } from "node:fs/promises"
import crypto from "node:crypto"
import path from "node:path"
import { CONFIG_DIR } from "./adapters.mjs"

// 测试用 MODEL_STUDIO_PANEL_FILE 指向临时目录，避免冒烟测试抢写真实面板记录。
export const PANEL_FILE = process.env.MODEL_STUDIO_PANEL_FILE || path.join(CONFIG_DIR, "panel.json")
const PREFERRED_PORTS = [37621, 37622, 37623, 37624]
const MAX_BODY = 64 * 1024

const sameToken = (a, b) => {
  const x = Buffer.from(String(a ?? ""))
  const y = Buffer.from(String(b ?? ""))
  return x.length === y.length && crypto.timingSafeEqual(x, y)
}

export async function readPanelRecord() {
  try { return JSON.parse(await readFile(PANEL_FILE, "utf8")) } catch { return null }
}

function listen(server, port) {
  return new Promise((resolve, reject) => {
    const onError = error => { server.removeListener("listening", onListening); reject(error) }
    const onListening = () => { server.removeListener("error", onError); resolve() }
    server.once("error", onError)
    server.once("listening", onListening)
    server.listen({ host: "127.0.0.1", port, exclusive: true })
  })
}

/**
 * 启动控制面板。返回 { ok, port, url, file, error }（令牌只落在 panel.json，不进工具结果）。
 * 失败不抛异常：面板只是附加通道，起不来时 MCP 主链路必须照常工作。
 */
export async function startPanel({ version = "", enabled = true, port = 0, onOpen, onStatus } = {}) {
  const info = { ok: false, port: 0, url: "", token: "", file: PANEL_FILE, error: "" }
  if (!enabled) { info.error = "已在设置里关闭（panelEnabled=false）。"; return info }

  const token = crypto.randomBytes(16).toString("hex")
  const server = createServer((req, res) => {
    const reply = (code, body) => {
      res.writeHead(code, { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" })
      res.end(JSON.stringify(body))
    }
    const url = new URL(req.url, "http://127.0.0.1")
    const given = req.headers["x-ms-token"] ?? url.searchParams.get("token")
    if (!sameToken(given, token)) return reply(401, { ok: false, error: "令牌无效：请从 panel.json 取 token，用 x-ms-token 头或 ?token= 传入。" })
    if (url.pathname === "/status") return reply(200, { ok: true, version, pid: process.pid, ...(onStatus?.() ?? {}) })
    if (url.pathname !== "/open") return reply(404, { ok: false, error: "未知路径。可用：/status、/open。" })

    const submit = async raw => {
      let filePath = ""
      try {
        const parsed = raw ? JSON.parse(raw) : {}
        filePath = String(parsed.path ?? parsed.file ?? "").trim()
      } catch { return reply(400, { ok: false, error: "请求体需要是 {\"path\":\"绝对路径\"}，或用 GET /open?path=…。" }) }
      if (!filePath) return reply(400, { ok: false, error: "缺少 path。" })
      try {
        reply(200, { ok: true, ...(await onOpen(path.resolve(decodeURIComponent(filePath)))) })
      } catch (error) {
        reply(400, { ok: false, error: error?.message ?? String(error) })
      }
    }
    const queryPath = url.searchParams.get("path")
    if (queryPath) return void submit(JSON.stringify({ path: queryPath }))
    if (req.method !== "POST") return reply(405, { ok: false, error: "/open 需要 POST 请求体，或改用 GET /open?path=。" })
    let raw = ""
    req.on("data", chunk => {
      raw += chunk
      if (Buffer.byteLength(raw) > MAX_BODY) { reply(413, { ok: false, error: "请求体超过 64 KB。" }); req.destroy() }
    })
    req.on("end", () => { if (Buffer.byteLength(raw) <= MAX_BODY) void submit(raw) })
  })
  // 绑定成功之后 socket 错误不能再冒泡成未捕获异常（那会连带整个 MCP 进程退出）。
  server.on("error", () => {})

  // port>0 = 只绑这个端口；port=0/省略 = 依次试固定候选端口（占用则退临时端口）；负数 = 直接要临时端口（测试用）。
  const wanted = Number.isInteger(port) && port > 0 ? [port] : (port < 0 ? [0] : PREFERRED_PORTS)
  let listening = false
  for (const candidate of wanted) {
    try { await listen(server, candidate); listening = true; break }
    catch (error) {
      if (error?.code !== "EADDRINUSE") { info.error = error?.message ?? String(error); return info }
      const previous = await readPanelRecord()
      info.error = `端口 ${candidate} 已被占用${previous?.pid ? `（panel.json 记录的 PID ${previous.pid}）` : ""}。`
    }
  }
  if (!listening) {
    // 候选端口都被占：退回临时端口，CLI 照样能从 panel.json 读到真实端口。
    try { await listen(server, 0) } catch (error) { info.error = error?.message ?? String(error); return info }
  }
  const actual = server.address()?.port ?? 0
  try {
    await mkdir(path.dirname(PANEL_FILE), { recursive: true })
    await writeFile(PANEL_FILE, JSON.stringify({
      host: "127.0.0.1", port: actual, token, pid: process.pid, version,
      url: `http://127.0.0.1:${actual}`, updatedAt: new Date().toISOString(),
    }, null, 2), { encoding: "utf8", mode: 0o600 })
  } catch (error) { info.error = `panel.json 写入失败：${error?.message ?? error}` }
  return { ok: true, port: actual, url: `http://127.0.0.1:${actual}`, file: PANEL_FILE, error: "" }
}
