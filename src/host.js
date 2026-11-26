// MCP App 页面协议客户端：仅接受来自父容器的消息，按宿主能力启用功能。
// 参照 Qoder MCP Apps 宿主规范（协议版本 2026-01-26）。

export function createHost(handlers = {}) {
  const pending = new Map()
  let sequence = 0
  let ready = false
  let closed = false
  let capabilities = {}
  let context = {}
  const listeners = { drop: [] }

  // 按方法分级超时：小请求快速失败、大字节请求给足时间，避免"一律 60s"造成的假死或误超时。
  const METHOD_TIMEOUTS = {
    "ui/initialize": 20000,
    "tools/call": 90000,
    "resources/read": 120000,
    "ui/message": 20000,
    "ui/update-model-context": 15000,
    "ui/download-file": 300000,
    "qoder/files/pick": 300000,
    "qoder/files/subscribe-drop": 20000,
    "qoder/files/open": 20000,
  }
  // 需要内核算一遍或转换文件的重工具单独放宽
  const TOOL_TIMEOUTS = {
    agent_create_model: 180000,
    agent_modify_model: 180000,
    optimize_params: 300000,
    export_model: 240000,
    save_model_glb: 180000,
    load_local_file: 300000,
    upload_import_chunk: 60000,
    upload_export_chunk: 60000,
    commit_import: 120000,
    inspect_model: 120000,
    check_gates: 180000,
  }

  const send = message => window.parent.postMessage({ jsonrpc: "2.0", ...message }, "*")

  function request(method, params, timeoutMs = METHOD_TIMEOUTS[method] ?? 60000) {
    if (closed) return Promise.reject(new Error("页面已关闭，请重新打开应用。"))
    if (pending.size >= 8) return Promise.reject(new Error("请求过多，请稍后再试。"))
    const id = `ms-${++sequence}`
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        pending.delete(id)
        reject(new Error(`请求超时（${method}，${Math.round(timeoutMs / 1000)}s）：结果未确认，请重试。`))
      }, timeoutMs)
      pending.set(id, { resolve, reject, timer })
      try { send({ id, method, params }) }
      catch { clearTimeout(timer); pending.delete(id); reject(new Error("无法连接宿主，请重新打开应用。")) }
    })
  }

  function receive(event) {
    if (event.source !== window.parent || closed) return
    const message = event.data
    if (!message || message.jsonrpc !== "2.0" || typeof message !== "object") return
    if (!message.method && pending.has(message.id)) {
      const task = pending.get(message.id)
      if (!("error" in message) && !("result" in message)) return
      pending.delete(message.id)
      clearTimeout(task.timer)
      if (message.error) task.reject(new Error(message.error.message || "宿主未完成请求。"))
      else task.resolve(message.result)
      return
    }
    switch (message.method) {
      case "ui/notifications/tool-result":
        handlers.onToolResult?.(message.params ?? {})
        break
      case "ui/notifications/tool-cancelled":
        handlers.onToolCancelled?.()
        break
      case "ui/notifications/host-context-changed":
        applyContext(message.params ?? {})
        break
      case "qoder/files/notifications/selected":
        for (const fn of listeners.drop) fn(message.params ?? {})
        break
      case "ping":
        if (message.id !== undefined) send({ id: message.id, result: {} })
        break
      case "ui/resource-teardown":
        if (message.id !== undefined) send({ id: message.id, result: {} })
        dispose()
        break
      default:
        if (message.id !== undefined) send({ id: message.id, error: { code: -32601, message: "Method not supported" } })
    }
  }

  function applyContext(value) {
    context = { ...context, ...value }
    handlers.onHostContext?.(context)
  }

  function dispose() {
    if (closed) return
    closed = true
    ready = false
    for (const task of pending.values()) { clearTimeout(task.timer); task.reject(new Error("页面已关闭。")) }
    pending.clear()
    window.removeEventListener("message", receive)
    window.removeEventListener("pagehide", dispose)
    handlers.onTeardown?.()
  }

  window.addEventListener("message", receive)
  window.addEventListener("pagehide", dispose)

  async function connect() {
    if (window.parent === window) throw new Error("请在 Qoder 中打开本插件；直接打开 HTML 无法连接宿主。")
    const result = await request("ui/initialize", {
      protocolVersion: "2026-01-26",
      appInfo: { name: "model-studio", version: "0.8.0" },
      appCapabilities: { availableDisplayModes: ["inline", "fullscreen"] },
    }, 20000)
    if (closed) return
    if (result?.protocolVersion !== "2026-01-26") throw new Error("宿主协议版本不匹配，请更新 Qoder 客户端。")
    capabilities = result.hostCapabilities ?? {}
    applyContext(result.hostContext ?? {})
    send({ method: "ui/notifications/initialized", params: {} })
    ready = Boolean(capabilities.serverTools)
    handlers.onReady?.({ ready, capabilities, context })
  }

  return {
    connect,
    dispose,
    get ready() { return ready && !closed },
    get closed() { return closed },
    get capabilities() { return capabilities },
    get context() { return context },
    callTool(name, args = {}, timeoutMs) {
      return request("tools/call", { name, arguments: args }, timeoutMs ?? TOOL_TIMEOUTS[name] ?? METHOD_TIMEOUTS["tools/call"])
    },
    async readResource(uri) {
      const result = await request("resources/read", { uri })
      const content = result?.contents?.[0]
      if (!content) throw new Error("资源读取失败：" + uri)
      return content
    },
    sendMessage(content, meta) { return request("ui/message", { role: "user", content, ...(meta ? { _meta: meta } : {}) }) },
    updateModelContext(payload) { return request("ui/update-model-context", payload) },
    downloadFile(contents, options = {}) { return request("ui/download-file", { contents, ...options }) },
    pickFiles(extensions) { return request("qoder/files/pick", { extensions }) },
    subscribeDrop(extensions) { return request("qoder/files/subscribe-drop", { extensions }) },
    onDrop(fn) { listeners.drop.push(fn) },
    openFile(path) { return request("qoder/files/open", { path }) },
    requestSize(height) {
      if (!closed && context.displayMode === "inline" && height > 0) {
        send({ method: "ui/notifications/size-changed", params: { height: Math.ceil(height) } })
      }
    },
  }
}