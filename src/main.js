// 建模工作台 v0.2：盘工作区 + 多格式预览 + 简单编辑 + 坐标球 + 统一 GLB 导出。
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import { TransformControls } from "three/examples/jsm/controls/TransformControls.js"
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js"
import { createHost } from "./host.js"
import { parseModel, computeStats } from "./loaders.js"

const $ = id => document.getElementById(id)
const PICK_EXTENSIONS = ["glb", "gltf", "obj", "stl", "ply", "fbx", "3mf", "dae", "blend", "step", "stp", "iges", "igs", "abc", "usd", "x3d"]
// 宿主对 MCP App 工具入参有 1 MiB 硬校验（按 JSON.stringify(arguments) 的字节数计），超限直接报“工具参数过大”。
// base64 每 3 字节膨胀成 4，所以 700 KB 原始数据约等于 0.89 MiB 参数，余量给 plateId/uploadId 等字段。
const CHUNK_RAW_LIMIT = 700_000
let chunkRaw = CHUNK_RAW_LIMIT
const uid = () => (globalThis.crypto?.randomUUID ? crypto.randomUUID() : `id-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`)

const state = {
  registry: [],
  templates: new Map(),      // modelId -> { root, manifest, stats }
  workspace: { plates: [], activePlateId: null },
  mode: "preview",
  transformMode: "translate",
  selection: null,           // { plateId, itemId }
  upAxis: "y",
  hostTheme: "light",
  themeOverride: "auto",
  dirty: false,
  exporting: false,
  sync: "idle",
  lastDeepLink: null,
  lastDrop: { path: null, at: 0 },
  importHint: null,          // agent_create_model 建议盘名 { plateName }
}

let renderer, scene, camera, orbit, transform, transformHelper, raycaster, gridHelper, worldGroup, boxHelper
let hemiLight, keyLight, fillLight
let gizmoScene, gizmoCamera, gizmoPickables = [], gizmoRings = [], gizmoHover = null
const plateGroups = new Map()
const itemNodes = new Map()
const collapsedPlates = new Set()
let stateTimer = null, exportTimer = null
let downInfo = null, suppressClick = false
let importQueue = [], dialogBusy = false

// ---------- 基础工具 ----------
function bytesToBase64(bytes) {
  let bin = ""
  const step = 0x8000
  for (let i = 0; i < bytes.length; i += step) bin += String.fromCharCode.apply(null, bytes.subarray(i, i + step))
  return btoa(bin)
}
function base64ToBytes(b64) {
  const bin = atob(b64)
  const out = new Uint8Array(bin.length)
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i)
  return out
}
// 分块推送字节。块大小由宿主上限反推，但上限是宿主内部常量、版本可能变，所以被拒时把块折半重发；
// 服务端在分块数变化时重置该上传会话，所以同一个 uploadId 可以安全地换块大小重来。
async function pushChunks(toolName, makeArgs, bytes, onProgress) {
  for (let retry = 0; ; retry++) {
    try {
      const total = Math.max(1, Math.ceil(bytes.length / chunkRaw))
      for (let i = 0; i < total; i++) {
        onProgress?.(i + 1, total)
        toolResult(await host.callTool(toolName, makeArgs({
          index: i,
          total,
          data: bytesToBase64(bytes.subarray(i * chunkRaw, (i + 1) * chunkRaw)),
          final: i === total - 1,
        })))
      }
      return
    } catch (error) {
      const msg = String(error?.message ?? error)
      if (retry < 4 && chunkRaw > 64_000 && /过大|too large/i.test(msg)) {
        chunkRaw = Math.max(64_000, Math.floor(chunkRaw / 2))
        setStatus(`宿主入参上限更小，块降为 ${(chunkRaw / 1024).toFixed(0)} KB 重传…`)
        continue
      }
      throw error
    }
  }
}
function setStatus(text, error = false) {
  const el = $("statusText")
  el.textContent = text
  el.dataset.error = String(error)
}
function setSync(value) {
  state.sync = value
  const labels = { idle: "未加载", pending: "有改动", syncing: "同步中…", synced: "已同步", error: "同步失败" }
  const el = $("syncBadge")
  el.textContent = labels[value] ?? value
  el.dataset.state = value
}
function toolResult(result) {
  if (!result || result.isError) throw new Error(result?.content?.find(c => c.type === "text")?.text || "工具调用失败。")
  return result.structuredContent ?? {}
}
function fmtSize(n) {
  if (!Number.isFinite(n)) return "-"
  if (n > 1048576) return (n / 1048576).toFixed(1) + " MB"
  if (n > 1024) return (n / 1024).toFixed(1) + " KB"
  return n + " B"
}
function toast(text, options = {}) {
  const el = document.createElement("div")
  el.className = "toast" + (options.error ? " error" : "")
  const span = document.createElement("span")
  span.textContent = text
  el.appendChild(span)
  let timer
  const remove = () => { clearTimeout(timer); el.remove() }
  if (options.action) {
    const btn = document.createElement("button")
    btn.type = "button"
    btn.textContent = options.action.label
    btn.addEventListener("click", () => { remove(); options.action.fn() })
    el.appendChild(btn)
  }
  $("toasts").appendChild(el)
  timer = setTimeout(remove, options.action ? 6500 : 3500)
}
const activePlate = () => state.workspace.plates.find(p => p.id === state.workspace.activePlateId) ?? state.workspace.plates[0] ?? null
const findItem = (plateId, itemId) => {
  const plate = state.workspace.plates.find(p => p.id === plateId)
  return plate ? { plate, item: plate.items.find(i => i.id === itemId) ?? null } : { plate: null, item: null }
}
const round = (v, n = 4) => Number(v.toFixed(n))

// ---------- 宿主 ----------
const host = createHost({
  onReady({ ready }) {
    if (!ready) setStatus("当前宿主不提供工具调用，页面只读。", true)
    if (!host.capabilities.message) { $("askAiBtn").hidden = true; $("aiBox").hidden = true }
    if (!host.capabilities.downloadFile) $("downloadGlbBtn").disabled = true
    const filesCap = host.capabilities.experimental?.["qoder/files"]
    if (filesCap?.drop) {
      host.subscribeDrop(PICK_EXTENSIONS).catch(() => {})
      host.onDrop(params => {
        const path = params.files?.[0]?.path
        if (path) void loadLocalFile(path)
        else if (params.error) setStatus("拖放失败：" + params.error, true)
      })
    }
    handleDeepLink(host.context)
    if (host.context.displayMode === "inline") host.requestSize(560)
  },
  onHostContext(context) {
    if (context.theme) { state.hostTheme = context.theme; applyTheme(currentTheme()) }
    handleDeepLink(context)
    if (context.displayMode === "inline") host.requestSize(560)
  },
  onToolResult(result) {
    const data = result?.structuredContent
    if (!data) return
    if (Array.isArray(data.models)) renderRegistry(data.models)
    if (data.importHint?.plateName) state.importHint = data.importHint
    if (data.workspace && !state.dirty) void adoptWorkspace(data.workspace)
    if (data.model?.id) enqueueImport(data.model.id, { auto: true })
    if (Array.isArray(data.reloadSpecs)) void reloadSpecTemplates(data.reloadSpecs)
  },
  onToolCancelled() {
    $("loadingOverlay").hidden = true
    setStatus("加载已取消。")
  },
  onTeardown() {
    if (renderer) renderer.setAnimationLoop(null)
  },
})

function applyRoute(route) {
  if (route.startsWith("/open/")) {
    let filePath = route.slice("/open/".length)
    try { filePath = decodeURIComponent(filePath) } catch { /* 已解码或含字面 %，按原样使用 */ }
    if (filePath) void loadLocalFile(filePath)
    return
  }
  if (route.startsWith("/model/")) {
    let id = route.slice("/model/".length)
    try { id = decodeURIComponent(id) } catch { /* 同上 */ }
    if (id) enqueueImport(id)
    return
  }
  // 无 path 参数、/recent、/workbench：只刷新服务器状态并导入最近注册的模型，用户不需要给路径
  void syncFromServer()
}

let pendingRoute = null

function handleDeepLink(context) {
  const url = context?.["qoder/deepLink"]?.url
  if (!url || url === state.lastDeepLink) return
  state.lastDeepLink = url
  let route
  try { route = new URL(url).searchParams.get("path") ?? "" } catch { return }
  if (host.ready) applyRoute(route)
  else pendingRoute = route
}

// 拉取服务器模型注册表与盘工作区，并导入最近注册的模型：点击对话区工作台链接即走这里，不需要任何文件路径
async function syncFromServer() {
  if (!host.ready) return
  try {
    const data = toolResult(await host.callTool("open_viewer", {}))
    if (Array.isArray(data.models)) renderRegistry(data.models)
    if (data.workspace && !state.dirty) await adoptWorkspace(data.workspace)
    if (data.activeModelId) enqueueImport(data.activeModelId, { auto: true })
  } catch (error) {
    setStatus(error?.message || String(error), true)
  }
}

// 外部控制面板（CLI / 资源管理器“打开方式”）排队的打开请求：视图在场就取走并导入，
// 视图没在场时请求留在服务器队列里，下次打开工作台自动加载。
let openPollTimer = null
function startOpenRequestPoll() {
  if (openPollTimer) return
  openPollTimer = setInterval(async () => {
    if (!host.ready || dialogBusy || state.exporting) return
    try {
      const data = toolResult(await host.callTool("pending_open_requests", {}))
      for (const request of data.requests ?? []) void loadLocalFile(request.path)
    } catch { /* 服务器版本没有该工具或瞬时失败：下一轮再试，不打扰用户 */ }
  }, 2500)
}

// ---------- 三维场景 ----------
function initThree() {
  const hostEl = $("canvasHost")
  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1
  applyQuality("mid")
  hostEl.appendChild(renderer.domElement)
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(50, 1, 0.01, 100000)
  camera.position.set(3, 2.2, 3.6)

  hemiLight = new THREE.HemisphereLight(0xffffff, 0x445566, 1.1)
  keyLight = new THREE.DirectionalLight(0xffffff, 1.6)
  keyLight.position.set(6.5, 10, 4.6)
  fillLight = new THREE.DirectionalLight(0xffffff, 0.5)
  fillLight.position.set(-6, 3, -5)
  scene.add(hemiLight, keyLight, fillLight)

  worldGroup = new THREE.Group()
  worldGroup.name = "__world__"
  scene.add(worldGroup)

  gridHelper = new THREE.GridHelper(10, 20, 0x8899aa, 0x556677)
  gridHelper.material.transparent = true
  gridHelper.material.opacity = 0.35
  scene.add(gridHelper)

  orbit = new OrbitControls(camera, renderer.domElement)
  orbit.enableDamping = true
  orbit.dampingFactor = 0.08

  transform = new TransformControls(camera, renderer.domElement)
  transformHelper = transform.getHelper ? transform.getHelper() : transform
  transformHelper.visible = false
  scene.add(transformHelper)
  transform.addEventListener("dragging-changed", event => {
    orbit.enabled = !event.value
    if (event.value) suppressClick = true
  })
  transform.addEventListener("objectChange", () => {
    const node = selectedNode()
    if (node) { syncItemFromNode(node); updateTransformFields() }
    markDirty()
  })
  transform.addEventListener("mouseUp", () => scheduleSync())

  raycaster = new THREE.Raycaster()
  raycaster.params.Line = { threshold: 0.08 }
  renderer.domElement.addEventListener("pointerdown", onPointerDown)
  renderer.domElement.addEventListener("pointerup", onPointerUp)
  renderer.domElement.addEventListener("contextmenu", onContextMenu)

  buildGizmo()
  bindGizmoHit()

  const resize = () => {
    const w = hostEl.clientWidth, h = hostEl.clientHeight
    if (w > 0 && h > 0) {
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
  }
  new ResizeObserver(resize).observe(hostEl)
  resize()
  renderer.setAnimationLoop(() => {
    orbit.update()
    renderer.render(scene, camera)
    renderGizmo()
  })
}

function currentTheme() {
  return state.themeOverride === "auto" ? state.hostTheme : state.themeOverride
}
function applyTheme(theme) {
  document.documentElement.dataset.theme = theme
  if (!scene) return
  const dark = theme === "dark"
  scene.background = new THREE.Color(dark ? 0x10151c : 0xe8edf2)
  hemiLight.groundColor.set(dark ? 0x223344 : 0x8899aa)
  gridHelper.material.color.set(dark ? 0x667788 : 0x556677)
  if (state.selection) refreshBoxHelper()
}
function applyQuality(level) {
  const cap = { low: 1, mid: 1.5, high: 2 }[level] ?? 1.5
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, cap))
  const hostEl = $("canvasHost")
  if (hostEl.clientWidth > 0) renderer.setSize(hostEl.clientWidth, hostEl.clientHeight, false)
}

// ---------- 坐标球 ----------
function letterSprite(text) {
  const canvas = document.createElement("canvas")
  canvas.width = canvas.height = 64
  const ctx = canvas.getContext("2d")
  ctx.font = "700 42px system-ui, sans-serif"
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"
  ctx.fillStyle = "#ffffff"
  ctx.fillText(text, 32, 34)
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, depthTest: false, transparent: true }))
  sprite.scale.setScalar(0.24)
  sprite.renderOrder = 999
  return sprite
}
function buildGizmo() {
  gizmoScene = new THREE.Scene()
  gizmoCamera = new THREE.OrthographicCamera(-1.5, 1.5, 1.5, -1.5, 0.1, 20)
  const axes = [
    { dir: new THREE.Vector3(1, 0, 0), color: 0xef4444, letter: "X" },
    { dir: new THREE.Vector3(0, 1, 0), color: 0x22c55e, letter: "Y" },
    { dir: new THREE.Vector3(0, 0, 1), color: 0x3b82f6, letter: "Z" },
  ]
  gizmoScene.add(new THREE.Mesh(new THREE.SphereGeometry(0.07, 16, 12), new THREE.MeshBasicMaterial({ color: 0x94a3b8 })))
  for (const axis of axes) {
    const lineGeo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), axis.dir.clone()])
    gizmoScene.add(new THREE.Line(lineGeo, new THREE.LineBasicMaterial({ color: axis.color })))
    const ball = new THREE.Mesh(new THREE.SphereGeometry(0.16, 20, 14), new THREE.MeshBasicMaterial({ color: axis.color }))
    ball.position.copy(axis.dir)
    ball.userData.axis = axis.dir.clone()
    gizmoScene.add(ball)
    gizmoPickables.push(ball)
    const letter = letterSprite(axis.letter)
    letter.position.copy(axis.dir)
    gizmoScene.add(letter)

    const negDir = axis.dir.clone().negate()
    const negGeo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), negDir])
    gizmoScene.add(new THREE.Line(negGeo, new THREE.LineBasicMaterial({ color: axis.color, transparent: true, opacity: 0.3 })))
    const ringPts = []
    for (let i = 0; i < 32; i++) {
      const a = (i / 32) * Math.PI * 2
      ringPts.push(new THREE.Vector3(Math.cos(a) * 0.12, Math.sin(a) * 0.12, 0))
    }
    const ring = new THREE.LineLoop(
      new THREE.BufferGeometry().setFromPoints(ringPts),
      new THREE.LineBasicMaterial({ color: axis.color, transparent: true, opacity: 0.55 }),
    )
    ring.position.copy(negDir)
    ring.userData.axis = negDir
    gizmoScene.add(ring)
    gizmoPickables.push(ring)
    gizmoRings.push(ring)
  }
}
function renderGizmo() {
  const enabled = $("ctlGizmo").checked
  $("gizmoHit").hidden = !enabled
  if (!enabled) return
  const hostEl = $("canvasHost")
  const w = hostEl.clientWidth, h = hostEl.clientHeight
  if (w < 140 || h < 140) return
  const size = 120, x = w - size - 8, y = h - size - 8
  const viewDir = camera.position.clone().sub(orbit.target)
  if (viewDir.lengthSq() < 1e-8) viewDir.set(1, 0.7, 1)
  gizmoCamera.position.copy(viewDir.normalize().multiplyScalar(6))
  gizmoCamera.up.copy(camera.up)
  gizmoCamera.lookAt(0, 0, 0)
  for (const ring of gizmoRings) ring.quaternion.copy(gizmoCamera.quaternion)
  for (const target of gizmoPickables) {
    const goal = target === gizmoHover ? 1.3 : 1
    target.scale.lerp(new THREE.Vector3(goal, goal, goal), 0.25)
  }
  renderer.autoClear = false
  renderer.setScissorTest(true)
  renderer.setScissor(x, y, size, size)
  renderer.setViewport(x, y, size, size)
  renderer.clearDepth()
  renderer.render(gizmoScene, gizmoCamera)
  renderer.setScissorTest(false)
  renderer.setViewport(0, 0, w, h)
  renderer.autoClear = true
}
function gizmoRaycast(event) {
  const rect = $("gizmoHit").getBoundingClientRect()
  const pointer = new THREE.Vector2(
    ((event.clientX - rect.left) / rect.width) * 2 - 1,
    -((event.clientY - rect.top) / rect.height) * 2 + 1,
  )
  raycaster.setFromCamera(pointer, gizmoCamera)
  const hits = raycaster.intersectObjects(gizmoPickables, false)
  return hits[0]?.object ?? null
}
function bindGizmoHit() {
  const hit = $("gizmoHit")
  hit.addEventListener("pointermove", event => { gizmoHover = gizmoRaycast(event) })
  hit.addEventListener("pointerleave", () => { gizmoHover = null })
  hit.addEventListener("click", event => {
    const target = gizmoRaycast(event)
    if (target?.userData.axis) snapView(target.userData.axis)
  })
  hit.addEventListener("keydown", event => {
    const map = { x: [1, 0, 0], y: [0, 1, 0], z: [0, 0, 1] }
    const key = event.key.toLowerCase()
    if (map[key]) {
      event.preventDefault()
      snapView(new THREE.Vector3(...map[key]).multiplyScalar(event.shiftKey ? -1 : 1))
    }
  })
}
function snapView(dir) {
  const dist = Math.max(camera.position.distanceTo(orbit.target), 0.5)
  camera.position.copy(orbit.target).addScaledVector(dir.clone().normalize(), dist)
  camera.up.set(0, 1, 0)
  if (Math.abs(dir.y) > 0.99) camera.up.set(0, 0, dir.y > 0 ? -1 : 1)
  orbit.update()
}

// ---------- 视图 ----------
function sceneBox() {
  const box = new THREE.Box3()
  for (const group of plateGroups.values()) if (group.visible) box.expandByObject(group)
  return box.isEmpty() ? null : box
}
function fitView() {
  const box = sceneBox()
  if (!box) return
  const sphere = box.getBoundingSphere(new THREE.Sphere())
  const r = Math.max(sphere.radius, 0.001)
  const dist = (r / Math.sin(THREE.MathUtils.degToRad(camera.fov / 2))) * 1.15
  const dir = camera.position.clone().sub(orbit.target).normalize()
  if (dir.lengthSq() < 0.5) dir.set(1, 0.7, 1).normalize()
  orbit.target.copy(sphere.center)
  camera.position.copy(sphere.center).addScaledVector(dir, dist)
  camera.near = dist / 1000
  camera.far = dist * 100
  camera.updateProjectionMatrix()
  gridHelper.scale.setScalar(Math.max(r * 0.4, 0.1))
  gridHelper.position.set(sphere.center.x, box.min.y, sphere.center.z)
  orbit.update()
}
function setView(preset) {
  const dirs = { front: [0, 0, 1], top: [0, 1, 0.0001], side: [1, 0, 0], iso: [1, 0.8, 1] }
  snapView(new THREE.Vector3(...(dirs[preset] ?? dirs.iso)))
  fitView()
}
function setUpAxis(axis) {
  state.upAxis = axis
  worldGroup.rotation.set(axis === "z" ? -Math.PI / 2 : 0, 0, 0)
  $("upAxisBtn").textContent = axis === "z" ? "Z 向上" : "Y 向上"
  $("upAxisBtn").setAttribute("aria-pressed", String(axis === "z"))
  fitView()
}
function setWireframe(on) {
  worldGroup.traverse(node => {
    const materials = Array.isArray(node.material) ? node.material : node.material ? [node.material] : []
    for (const m of materials) if ("wireframe" in m) m.wireframe = on
  })
}

// ---------- 模板与导入 ----------
async function ensureTemplate(modelId) {
  if (state.templates.has(modelId)) return state.templates.get(modelId)
  $("loadingOverlay").hidden = false
  $("loadingText").textContent = "读取模型清单…"
  try {
    const manifest = JSON.parse((await host.readResource(`model://${modelId}/manifest`)).text)
    const chunks = []
    let received = 0
    for (let i = 0; i < manifest.chunkCount; i++) {
      $("loadingText").textContent = `传输模型数据 ${i + 1}/${manifest.chunkCount}（${fmtSize(received)} / ${fmtSize(manifest.sizeBytes)}）`
      const content = await host.readResource(`model://${modelId}/data/${i}`)
      if (!content.blob) throw new Error("模型数据块缺失。")
      const bytes = base64ToBytes(content.blob)
      chunks.push(bytes)
      received += bytes.length
    }
    const total = new Uint8Array(received)
    let offset = 0
    for (const c of chunks) { total.set(c, offset); offset += c.length }
    $("loadingText").textContent = "解析模型…"
    const root = await parseModel(manifest, total)
    const entry = { root, manifest, stats: computeStats(root) }
    state.templates.set(modelId, entry)
    return entry
  } finally {
    $("loadingOverlay").hidden = true
  }
}

// AI 修改 spec 模型后：丢弃缓存模板、重新拉取解析，再同步场景与大纲
async function reloadSpecTemplates(ids) {
  let changed = false
  for (const id of ids) {
    if (!state.templates.has(id)) continue
    state.templates.delete(id)
    await ensureTemplate(id)
    changed = true
  }
  if (!changed) return
  rebuildScene()
  renderTree()
  updateSummary()
  updateStatsBar()
  markDirty()
  scheduleSync()
  toast("AI 已更新图元模型，场景已刷新。")
}

function createPlate(name) {  const plate = { id: uid(), name: name || `盘 ${state.workspace.plates.length + 1}`, visible: true, items: [] }
  state.workspace.plates.push(plate)
  state.workspace.activePlateId = plate.id
  return plate
}
function addItem(plate, modelId) {
  const template = state.templates.get(modelId)
  const item = {
    id: uid(), modelId, name: template.manifest.name,
    position: [0, 0, 0], rotationDeg: [0, 0, 0], scale: [1, 1, 1], visible: true,
  }
  plate.items.push(item)
  state.workspace.activePlateId = plate.id
  rebuildScene()
  renderTree()
  updateSummary()
  updateStatsBar()
  $("emptyState").hidden = true
  const node = itemNodes.get(item.id)
  if (node) selectNode(node)
  if (plate.items.length === 1 && state.workspace.plates.length === 1) {
    if (["stl", "ply"].includes(template.manifest.format) && state.upAxis !== "z") setUpAxis("z")
    fitView()
  }
  markDirty()
  scheduleSync()
  return item
}

function enqueueImport(modelId, { auto = false } = {}) {
  if (auto) {
    const referenced = state.workspace.plates.some(p => p.items.some(i => i.modelId === modelId))
    if (referenced || importQueue.includes(modelId)) return
  }
  importQueue.push(modelId)
  void processImportQueue()
}
async function processImportQueue() {
  if (dialogBusy) return
  dialogBusy = true
  try {
    while (importQueue.length) {
      const modelId = importQueue.shift()
      try {
        const template = await ensureTemplate(modelId)
        if (!state.workspace.plates.length) {
          const plate = createPlate(state.importHint?.plateName || "盘 1")
          state.importHint = null
          addItem(plate, modelId)
          toast(`已导入「${template.manifest.name}」，自动新建「${plate.name}」。`)
        } else {
          const choice = await showImportDialog(template.manifest)
          if (!choice) { toast(`已取消导入「${template.manifest.name}」。`); setStatus(`已取消导入「${template.manifest.name}」。`); continue }
          let plate
          if (choice.merge) plate = activePlate() ?? createPlate()
          else plate = createPlate(choice.name)
          addItem(plate, modelId)
          toast(`已导入「${template.manifest.name}」到「${plate.name}」。`)
        }
        setStatus(`已导入「${template.manifest.name}」（${template.manifest.format.toUpperCase()}${template.manifest.converted ? "，经 " + template.manifest.converter + " 转换" : ""}）`)
      } catch (error) {
        toast("导入失败：" + (error?.message || error), { error: true })
        setStatus("导入失败：" + (error?.message || error), true)
      }
    }
  } finally {
    dialogBusy = false
  }
}
function showImportDialog(manifest) {
  return new Promise(resolve => {
    $("importModelName").textContent = manifest.name
    $("importMergeBtn").textContent = `并入当前盘「${activePlate()?.name ?? "盘 1"}」`
    $("newPlateName").value = state.importHint?.plateName || `盘 ${state.workspace.plates.length + 1}`
    $("importDialog").hidden = false
    $("importMergeBtn").focus()
    const done = value => {
      state.importHint = null
      $("importDialog").hidden = true
      $("importMergeBtn").removeEventListener("click", onMerge)
      $("importNewBtn").removeEventListener("click", onNew)
      $("importCancelBtn").removeEventListener("click", onCancel)
      resolve(value)
    }
    const onMerge = () => done({ merge: true })
    const onNew = () => done({ merge: false, name: $("newPlateName").value.trim() || `盘 ${state.workspace.plates.length + 1}` })
    const onCancel = () => done(null)
    $("importMergeBtn").addEventListener("click", onMerge)
    $("importNewBtn").addEventListener("click", onNew)
    $("importCancelBtn").addEventListener("click", onCancel)
  })
}

const dropKey = p => String(p ?? "").replace(/^.*[\\/]/, "").toLowerCase()

async function loadLocalFile(path) {
  if (!host.ready) { setStatus("宿主连接未就绪。", true); return }
  const now = Date.now()
  if (dropKey(state.lastDrop.path) === dropKey(path) && now - state.lastDrop.at < 4000) return
  state.lastDrop = { path, at: now }
  setStatus("正在读取文件…")
  $("loadingOverlay").hidden = false
  $("loadingText").textContent = "读取并注册文件（必要时调用建模软件转换）…"
  try {
    const data = toolResult(await host.callTool("load_local_file", { path }))
    if (Array.isArray(data.models)) renderRegistry(data.models)
    if (data.model?.id) enqueueImport(data.model.id)
  } catch (error) {
    setStatus(error?.message || String(error), true)
    toast("加载失败：" + (error?.message || error), { error: true })
  } finally {
    $("loadingOverlay").hidden = true
  }
}

// 沙箱页面拖拽导入：读取 File 字节 → 分块上传 → 服务器注册（不依赖 File.path）
async function uploadDroppedFiles(files) {
  if (!host.ready) { setStatus("宿主连接未就绪。", true); return }
  const usable = files.filter(f => f.size > 0)
  if (!usable.length) { toast("拖入的文件为空。", { error: true }); return }
  if (usable.length > 32) { toast("一次拖入文件过多（≤32 个）。", { error: true }); return }
  const totalSize = usable.reduce((sum, f) => sum + f.size, 0)
  if (totalSize > 150 * 1024 * 1024) { toast("拖入文件超过 150 MB 限制。", { error: true }); return }
  const main = usable.find(f => PICK_EXTENSIONS.includes(f.name.split(".").pop().toLowerCase()))
  if (!main) { toast("拖入文件中没有受支持的模型格式。", { error: true }); return }
  const now = Date.now()
  if (dropKey(state.lastDrop.path) === dropKey(main.name) && now - state.lastDrop.at < 4000) return
  state.lastDrop = { path: main.name, at: now }
  const uploadId = uid()
  $("loadingOverlay").hidden = false
  setStatus(`正在上传拖入文件（${usable.length} 个）…`)
  try {
    let done = 0
    for (const file of usable) {
      const bytes = new Uint8Array(await file.arrayBuffer())
      await pushChunks("upload_import_chunk",
        part => ({ uploadId, fileName: file.name, ...part }),
        bytes,
        (i, total) => { $("loadingText").textContent = `上传 ${file.name}（${done + 1}/${usable.length}）块 ${i}/${total}` })
      done++
    }
    $("loadingText").textContent = "注册模型（必要时调用建模软件转换）…"
    const data = toolResult(await host.callTool("commit_import", { uploadId, mainFile: main.name }))
    if (Array.isArray(data.models)) renderRegistry(data.models)
    if (data.model?.id) enqueueImport(data.model.id)
  } catch (error) {
    setStatus("拖拽导入失败：" + (error?.message || error), true)
    toast("拖拽导入失败：" + (error?.message || error), { error: true })
  } finally {
    $("loadingOverlay").hidden = true
  }
}

async function adoptWorkspace(workspace) {
  if (!workspace || !Array.isArray(workspace.plates)) return
  const ids = [...new Set(workspace.plates.flatMap(p => p.items.map(i => i.modelId)))]
  const bad = new Set()
  for (const id of ids) {
    try { await ensureTemplate(id) }
    catch { bad.add(id) }
  }
  if (bad.size) {
    workspace = {
      ...workspace,
      plates: workspace.plates.map(p => ({ ...p, items: p.items.filter(i => !bad.has(i.modelId)) })),
    }
    toast("部分模型数据已失效，对应对象已从盘中移除。", { error: true })
  }
  state.workspace = workspace
  if (!workspace.plates.some(p => p.id === workspace.activePlateId)) workspace.activePlateId = workspace.plates[0]?.id ?? null
  rebuildScene()
  renderTree()
  updateSummary()
  updateStatsBar()
  $("emptyState").hidden = workspace.plates.length > 0
  if (state.selection) {
    const node = itemNodes.get(state.selection.itemId)
    if (node) selectNode(node)
    else deselect()
  }
  if (workspace.plates.length) fitView()
}

// ---------- 场景重建 ----------
function rebuildScene() {
  const livePlates = new Set()
  const liveItems = new Set()
  for (const plate of state.workspace.plates) {
    livePlates.add(plate.id)
    let group = plateGroups.get(plate.id)
    if (!group) {
      group = new THREE.Group()
      group.name = plate.name
      plateGroups.set(plate.id, group)
      worldGroup.add(group)
    }
    group.name = plate.name
    group.visible = plate.visible
    for (const item of plate.items) {
      liveItems.add(item.id)
      let node = itemNodes.get(item.id)
      if (!node) {
        const template = state.templates.get(item.modelId)
        if (!template) continue
        node = template.root.clone(true)
        node.userData = { itemId: item.id, plateId: plate.id, modelId: item.modelId }
        itemNodes.set(item.id, node)
        group.add(node)
      }
      if (node.parent !== group) group.add(node)
      node.name = item.name
      node.position.fromArray(item.position)
      node.rotation.set(...item.rotationDeg.map(THREE.MathUtils.degToRad))
      node.scale.fromArray(item.scale)
      node.visible = item.visible
    }
  }
  for (const [itemId, node] of [...itemNodes]) {
    if (!liveItems.has(itemId)) {
      node.parent?.remove(node)
      itemNodes.delete(itemId)
    }
  }
  for (const [plateId, group] of [...plateGroups]) {
    if (!livePlates.has(plateId)) {
      worldGroup.remove(group)
      plateGroups.delete(plateId)
    }
  }
  if (boxHelper) boxHelper.update()
}

// ---------- 大纲 ----------
function renderTree() {
  const tree = $("plateTree")
  tree.innerHTML = ""
  if (!state.workspace.plates.length) {
    const empty = document.createElement("p")
    empty.className = "muted tree-empty"
    empty.textContent = "还没有盘。拖入模型文件或点击“打开文件”，第一个模型会自动新建盘。"
    tree.appendChild(empty)
    return
  }
  for (const plate of state.workspace.plates) {
    const wrap = document.createElement("div")
    wrap.className = "plate" + (plate.id === state.workspace.activePlateId ? " active" : "") + (collapsedPlates.has(plate.id) ? " collapsed" : "")
    wrap.dataset.plateId = plate.id

    const head = document.createElement("div")
    head.className = "plate-head"
    head.setAttribute("role", "treeitem")
    head.tabIndex = 0
    const caret = document.createElement("button")
    caret.type = "button"
    caret.className = "plate-caret"
    caret.textContent = collapsedPlates.has(plate.id) ? "▸" : "▾"
    caret.setAttribute("aria-label", "展开 / 收起 " + plate.name)
    caret.addEventListener("click", event => {
      event.stopPropagation()
      if (collapsedPlates.has(plate.id)) collapsedPlates.delete(plate.id)
      else collapsedPlates.add(plate.id)
      renderTree()
    })
    const eye = document.createElement("input")
    eye.type = "checkbox"
    eye.className = "eye"
    eye.checked = plate.visible
    eye.setAttribute("aria-label", `切换盘 ${plate.name} 可见性`)
    eye.addEventListener("click", event => event.stopPropagation())
    eye.addEventListener("change", () => {
      plate.visible = eye.checked
      const group = plateGroups.get(plate.id)
      if (group) group.visible = plate.visible
      if (!plate.visible && state.selection?.plateId === plate.id) deselect()
      markDirty(); scheduleSync()
    })
    const name = document.createElement("span")
    name.className = "plate-name"
    name.textContent = plate.name
    name.title = "双击重命名；右键更多操作"
    name.addEventListener("dblclick", event => { event.stopPropagation(); startRenamePlate(plate, name) })
    head.append(caret, eye, name)
    if (plate.id === state.workspace.activePlateId) {
      const badge = document.createElement("span")
      badge.className = "plate-badge"
      badge.textContent = "当前"
      head.appendChild(badge)
    }
    head.addEventListener("click", () => setActivePlate(plate.id))
    head.addEventListener("keydown", event => { if (event.key === "Enter") setActivePlate(plate.id) })
    head.addEventListener("contextmenu", event => {
      event.preventDefault()
      event.stopPropagation()
      setActivePlate(plate.id)
      openPlateMenu(event.clientX, event.clientY, plate)
    })
    wrap.appendChild(head)

    const items = document.createElement("div")
    items.className = "plate-items"
    items.setAttribute("role", "group")
    plate.items.forEach(item => {
      const row = document.createElement("div")
      row.className = "item-row" + (state.selection?.itemId === item.id ? " selected" : "") + (item.visible ? "" : " hidden-item")
      row.dataset.itemId = item.id
      row.setAttribute("role", "treeitem")
      row.tabIndex = 0
      const itemEye = document.createElement("input")
      itemEye.type = "checkbox"
      itemEye.className = "eye"
      itemEye.checked = item.visible
      itemEye.setAttribute("aria-label", `切换 ${item.name} 可见性`)
      itemEye.addEventListener("click", event => event.stopPropagation())
      itemEye.addEventListener("change", () => setItemVisible(plate, item, itemEye.checked))
      const label = document.createElement("span")
      label.className = "item-name"
      label.textContent = item.name
      row.append(itemEye, label)
      const pick = () => {
        setActivePlate(plate.id)
        const node = itemNodes.get(item.id)
        if (node) selectNode(node)
      }
      row.addEventListener("click", pick)
      row.addEventListener("keydown", event => { if (event.key === "Enter") pick() })
      row.addEventListener("contextmenu", event => {
        event.preventDefault()
        event.stopPropagation()
        pick()
        openItemMenu(event.clientX, event.clientY)
      })
      items.appendChild(row)
    })
    if (!plate.items.length) {
      const empty = document.createElement("p")
      empty.className = "muted tree-empty"
      empty.textContent = "空盘：导入模型时选择并入此盘。"
      items.appendChild(empty)
    }
    wrap.appendChild(items)
    tree.appendChild(wrap)
  }
}
function startRenamePlate(plate, nameEl) {
  const input = document.createElement("input")
  input.type = "text"
  input.className = "rename-input"
  input.value = plate.name
  input.setAttribute("aria-label", "重命名盘")
  nameEl.replaceWith(input)
  input.focus()
  input.select()
  let done = false
  const commit = () => {
    if (done) return
    done = true
    const value = input.value.trim()
    if (value) { plate.name = value; markDirty(); scheduleSync() }
    renderTree()
    updateSummary()
  }
  input.addEventListener("blur", commit)
  input.addEventListener("keydown", event => {
    if (event.key === "Enter") commit()
    if (event.key === "Escape") { done = true; renderTree() }
    event.stopPropagation()
  })
  input.addEventListener("click", event => event.stopPropagation())
}
function setActivePlate(plateId) {
  if (state.workspace.activePlateId === plateId) return
  state.workspace.activePlateId = plateId
  renderTree()
  updateSummary()
  updateStatsBar()
  markDirty()
  scheduleSync()
}
function setItemVisible(plate, item, visible) {
  item.visible = visible
  const node = itemNodes.get(item.id)
  if (node) node.visible = visible
  if (!visible && state.selection?.itemId === item.id) deselect()
  renderTree()
  markDirty()
  scheduleSync()
}
function updateSummary() {
  const plate = activePlate()
  const el = $("plateSummary")
  if (!plate) {
    el.textContent = "暂无盘。导入第一个模型时会自动新建。"
    return
  }
  let triangles = 0
  for (const item of plate.items) triangles += state.templates.get(item.modelId)?.stats.triangles ?? 0
  el.innerHTML = ""
  const table = document.createElement("table")
  const rows = [
    ["名称", plate.name],
    ["对象", `${plate.items.length} 个`],
    ["三角面", triangles.toLocaleString()],
    ["可见", plate.visible ? "是" : "否"],
  ]
  for (const [k, v] of rows) {
    const tr = document.createElement("tr")
    const td1 = document.createElement("td"); td1.textContent = k
    const td2 = document.createElement("td"); td2.textContent = v
    tr.append(td1, td2)
    table.appendChild(tr)
  }
  el.appendChild(table)
}
function updateStatsBar() {
  const plate = activePlate()
  if (!plate) {
    $("statsText").textContent = "支持 GLB / glTF / OBJ / STL / PLY / FBX / 3MF / DAE，配置 Blender 后支持更多格式"
    return
  }
  let triangles = 0
  for (const item of plate.items) triangles += state.templates.get(item.modelId)?.stats.triangles ?? 0
  $("statsText").textContent = `${state.workspace.plates.length} 盘 · 当前「${plate.name}」${plate.items.length} 对象 · ${triangles.toLocaleString()} 三角面`
}
function renderRegistry(models) {
  state.registry = models ?? []
  const select = $("modelSelect")
  select.innerHTML = ""
  const placeholder = document.createElement("option")
  placeholder.value = ""
  placeholder.textContent = state.registry.length ? "再次导入已加载模型…" : "暂无已加载模型"
  select.appendChild(placeholder)
  for (const m of state.registry) {
    const option = document.createElement("option")
    option.value = m.id
    option.textContent = `${m.name}（${m.format.toUpperCase()}）`
    select.appendChild(option)
  }
}

// ---------- 选择 ----------
function selectedNode() {
  return state.selection ? itemNodes.get(state.selection.itemId) ?? null : null
}
function refreshBoxHelper() {
  const node = selectedNode()
  if (boxHelper) { scene.remove(boxHelper); boxHelper.dispose?.(); boxHelper = null }
  if (!node) return
  boxHelper = new THREE.BoxHelper(node, currentTheme() === "dark" ? 0xe879f9 : 0xc026d3)
  scene.add(boxHelper)
}
function selectNode(node) {
  if (!node?.userData?.itemId) return
  state.selection = { plateId: node.userData.plateId, itemId: node.userData.itemId }
  if (state.mode === "edit") {
    transform.attach(node)
    transformHelper.visible = true
  }
  refreshBoxHelper()
  const { plate, item } = findItem(state.selection.plateId, state.selection.itemId)
  $("transformPanel").hidden = false
  $("noSelection").hidden = true
  $("pinBadge").hidden = false
  $("propsName").value = item?.name ?? node.name
  $("propsPlate").textContent = `盘 · ${plate?.name ?? "?"}`
  $("propsVisible").checked = item?.visible !== false
  const stats = state.templates.get(node.userData.modelId)?.stats
  $("propsStats").textContent = stats ? `${stats.triangles.toLocaleString()} 三角面 · ${stats.meshes} 网格${stats.points ? " · " + stats.points + " 点云" : ""}` : ""
  updateTransformFields()
  for (const row of document.querySelectorAll(".item-row")) row.classList.toggle("selected", row.dataset.itemId === node.userData.itemId)
}
function deselect() {
  state.selection = null
  transform.detach()
  transformHelper.visible = false
  if (boxHelper) { scene.remove(boxHelper); boxHelper.dispose?.(); boxHelper = null }
  $("transformPanel").hidden = true
  $("noSelection").hidden = false
  $("pinBadge").hidden = true
  for (const row of document.querySelectorAll(".item-row")) row.classList.remove("selected")
}
function canvasPointer(event) {
  const rect = renderer.domElement.getBoundingClientRect()
  return new THREE.Vector2(
    ((event.clientX - rect.left) / rect.width) * 2 - 1,
    -((event.clientY - rect.top) / rect.height) * 2 + 1,
  )
}
function pickItemNode(event) {
  raycaster.setFromCamera(canvasPointer(event), camera)
  const targets = [...itemNodes.values()].filter(n => n.visible && n.parent?.visible)
  const hits = raycaster.intersectObjects(targets, true)
  if (!hits.length) return null
  let node = hits[0].object
  while (node && !node.userData?.itemId) node = node.parent
  return node ?? null
}
function onPointerDown(event) {
  if (event.button !== 0) { downInfo = null; return }
  if (transform.dragging || transform.axis) { downInfo = null; return }
  suppressClick = false
  downInfo = { x: event.clientX, y: event.clientY }
}
function onPointerUp(event) {
  if (!downInfo || event.button !== 0) return
  const moved = Math.hypot(event.clientX - downInfo.x, event.clientY - downInfo.y)
  downInfo = null
  // 拖动视角（ orbit ）不改变选择；只有原地点击才选中 / 取消选中
  if (moved > 5 || suppressClick || transform.dragging) return
  const node = pickItemNode(event)
  if (node) selectNode(node)
  else deselect()
}
function onContextMenu(event) {
  event.preventDefault()
  const node = pickItemNode(event)
  if (node) {
    selectNode(node)
    openItemMenu(event.clientX, event.clientY)
  } else {
    closeMenu()
  }
}

// ---------- 右键菜单 ----------
function closeMenu() { $("ctxMenu").hidden = true }
function openMenu(x, y, entries) {
  const menu = $("ctxMenu")
  menu.innerHTML = ""
  for (const entry of entries) {
    if (entry.separator) { menu.appendChild(document.createElement("hr")); continue }
    if (entry.labelOnly) {
      const label = document.createElement("div")
      label.className = "ctx-label"
      label.textContent = entry.label
      menu.appendChild(label)
      continue
    }
    const btn = document.createElement("button")
    btn.type = "button"
    btn.textContent = entry.label
    if (entry.danger) btn.className = "danger"
    btn.addEventListener("click", () => { closeMenu(); entry.fn() })
    menu.appendChild(btn)
  }
  menu.hidden = false
  const rect = menu.getBoundingClientRect()
  menu.style.left = Math.min(x, window.innerWidth - rect.width - 8) + "px"
  menu.style.top = Math.min(y, window.innerHeight - rect.height - 8) + "px"
}
function openItemMenu(x, y) {
  const node = selectedNode()
  if (!node) return
  const { item } = findItem(state.selection.plateId, state.selection.itemId)
  openMenu(x, y, [
    { label: "设置原点", labelOnly: true },
    { label: "到几何中心", fn: () => setOrigin("geometry") },
    { label: "到底面中心", fn: () => setOrigin("bottom") },
    { label: "到世界原点", fn: () => setOrigin("world") },
    { separator: true },
    { label: "复制", fn: duplicateSelected },
    { label: item?.visible === false ? "显示" : "隐藏", fn: () => {
      const { plate, item } = findItem(state.selection.plateId, state.selection.itemId)
      if (plate && item) setItemVisible(plate, item, !item.visible)
    } },
    { label: "重置变换", fn: resetSelected },
    { separator: true },
    { label: "删除", danger: true, fn: deleteSelected },
  ])
}
function openPlateMenu(x, y, plate) {
  openMenu(x, y, [
    { label: "设为当前盘", fn: () => setActivePlate(plate.id) },
    { label: "重命名", fn: () => {
      const nameEl = document.querySelector(`.plate[data-plate-id="${plate.id}"] .plate-name`)
      if (nameEl) startRenamePlate(plate, nameEl)
    } },
    { label: "新建盘", fn: () => { createPlate(); rebuildScene(); renderTree(); updateSummary(); updateStatsBar(); markDirty(); scheduleSync() } },
    { separator: true },
    { label: "删除盘", danger: true, fn: () => deletePlate(plate) },
  ])
}

// ---------- 编辑操作 ----------
function syncItemFromNode(node) {
  const { item } = findItem(node.userData.plateId, node.userData.itemId)
  if (!item) return
  item.position = node.position.toArray().map(v => round(v))
  item.rotationDeg = [node.rotation.x, node.rotation.y, node.rotation.z].map(v => round(THREE.MathUtils.radToDeg(v), 2))
  item.scale = node.scale.toArray().map(v => round(v))
  item.visible = node.visible
}
function setOrigin(kind) {
  const node = selectedNode()
  if (!node) return
  node.updateWorldMatrix(true, true)
  const box = new THREE.Box3().setFromObject(node)
  if (box.isEmpty()) { toast("对象没有可计算的几何体。", { error: true }); return }
  const center = box.getCenter(new THREE.Vector3())
  const target = kind === "geometry" ? center
    : kind === "bottom" ? new THREE.Vector3(center.x, box.min.y, center.z)
    : new THREE.Vector3(0, 0, 0)
  // 保持几何体世界位置不变：先反向偏移子节点，再把节点原点移到目标
  const localTarget = node.worldToLocal(target.clone())
  for (const child of node.children) child.position.sub(localTarget)
  const parent = node.parent
  parent.updateWorldMatrix(true, false)
  node.position.copy(parent.worldToLocal(target.clone()))
  node.updateMatrixWorld(true)
  syncItemFromNode(node)
  updateTransformFields()
  if (boxHelper) boxHelper.update()
  markDirty()
  scheduleSync()
  const labels = { geometry: "几何中心", bottom: "底面中心", world: "世界原点" }
  toast(`原点已设置到${labels[kind]}。`)
}
function duplicateSelected() {
  if (!state.selection) return
  const { plate, item } = findItem(state.selection.plateId, state.selection.itemId)
  if (!plate || !item) return
  const copy = {
    ...item, id: uid(), name: `${item.name} 副本`,
    position: [...item.position], rotationDeg: [...item.rotationDeg], scale: [...item.scale],
  }
  plate.items.splice(plate.items.indexOf(item) + 1, 0, copy)
  rebuildScene()
  renderTree()
  updateSummary()
  updateStatsBar()
  const node = itemNodes.get(copy.id)
  if (node) selectNode(node)
  markDirty()
  scheduleSync()
  toast("已粘贴至相同位置")
}
function deleteSelected() {
  if (!state.selection) return
  const { plate, item } = findItem(state.selection.plateId, state.selection.itemId)
  if (!plate || !item) return
  const index = plate.items.indexOf(item)
  plate.items.splice(index, 1)
  deselect()
  rebuildScene()
  renderTree()
  updateSummary()
  updateStatsBar()
  markDirty()
  scheduleSync()
  toast(`已删除「${item.name}」。`, {
    action: {
      label: "撤销",
      fn: () => {
        plate.items.splice(Math.min(index, plate.items.length), 0, item)
        rebuildScene(); renderTree(); updateSummary(); updateStatsBar()
        const node = itemNodes.get(item.id)
        if (node) selectNode(node)
        markDirty(); scheduleSync()
      },
    },
  })
}
function deletePlate(plate) {
  const index = state.workspace.plates.indexOf(plate)
  const wasActive = state.workspace.activePlateId === plate.id
  if (state.selection?.plateId === plate.id) deselect()
  state.workspace.plates.splice(index, 1)
  if (wasActive) state.workspace.activePlateId = state.workspace.plates[0]?.id ?? null
  rebuildScene()
  renderTree()
  updateSummary()
  updateStatsBar()
  $("emptyState").hidden = state.workspace.plates.length > 0
  markDirty()
  scheduleSync()
  toast(`已删除盘「${plate.name}」（${plate.items.length} 个对象）。`, {
    action: {
      label: "撤销",
      fn: () => {
        state.workspace.plates.splice(Math.min(index, state.workspace.plates.length), 0, plate)
        if (wasActive) state.workspace.activePlateId = plate.id
        rebuildScene(); renderTree(); updateSummary(); updateStatsBar()
        $("emptyState").hidden = true
        markDirty(); scheduleSync()
      },
    },
  })
}
function resetSelected() {
  const node = selectedNode()
  if (!node) return
  node.position.set(0, 0, 0)
  node.rotation.set(0, 0, 0)
  node.scale.set(1, 1, 1)
  syncItemFromNode(node)
  updateTransformFields()
  if (boxHelper) boxHelper.update()
  markDirty()
  scheduleSync()
  toast("已重置所选对象变换。")
}
function setMode(mode) {
  state.mode = mode
  $("modePreview").setAttribute("aria-pressed", String(mode === "preview"))
  $("modeEdit").setAttribute("aria-pressed", String(mode === "edit"))
  $("editBar").hidden = mode !== "edit"
  const node = selectedNode()
  if (mode === "edit" && node) { transform.attach(node); transformHelper.visible = true }
  else { transform.detach(); transformHelper.visible = false }
}
function setTransformMode(mode) {
  state.transformMode = mode
  transform.setMode(mode)
  for (const [id, m] of [["moveBtn", "translate"], ["rotateBtn", "rotate"], ["scaleBtn", "scale"]]) {
    $(id).setAttribute("aria-pressed", String(m === mode))
  }
}
function updateTransformFields() {
  const node = selectedNode()
  if (!node) return
  const deg = THREE.MathUtils.radToDeg
  const values = {
    px: node.position.x, py: node.position.y, pz: node.position.z,
    rx: deg(node.rotation.x), ry: deg(node.rotation.y), rz: deg(node.rotation.z),
    sx: node.scale.x, sy: node.scale.y, sz: node.scale.z,
  }
  for (const [id, value] of Object.entries(values)) {
    const el = $(id)
    if (document.activeElement !== el) el.value = Number(value.toFixed(3))
  }
  if (boxHelper) boxHelper.update()
}
function applyTransformFields() {
  const node = selectedNode()
  if (!node) return
  const num = id => { const v = parseFloat($(id).value); return Number.isFinite(v) ? v : 0 }
  node.position.set(num("px"), num("py"), num("pz"))
  node.rotation.set(THREE.MathUtils.degToRad(num("rx")), THREE.MathUtils.degToRad(num("ry")), THREE.MathUtils.degToRad(num("rz")))
  if ($("uniformScale").checked) {
    const s = Math.max(num("sx"), 0.001)
    node.scale.set(s, s, s)
  } else {
    node.scale.set(Math.max(num("sx"), 0.001), Math.max(num("sy"), 0.001), Math.max(num("sz"), 0.001))
  }
  syncItemFromNode(node)
  if (boxHelper) boxHelper.update()
  markDirty()
  scheduleSync()
}

// ---------- 同步与导出 ----------
function markDirty() { state.dirty = true; setSync("pending") }
function scheduleSync() {
  clearTimeout(stateTimer)
  clearTimeout(exportTimer)
  stateTimer = setTimeout(() => void syncWorkspace(), 900)
  exportTimer = setTimeout(() => void exportAndCache(), 2400)
}
async function syncWorkspace() {
  if (!host.ready || !state.workspace.plates.length) return
  try {
    await host.callTool("update_workspace_state", { workspace: state.workspace })
  } catch (error) {
    setSync("error")
    setStatus("工作区同步失败：" + (error?.message || error), true)
  }
}
async function buildPlateGlb(plate) {
  const group = new THREE.Group()
  group.name = plate.name
  for (const item of plate.items) {
    const node = itemNodes.get(item.id)
    if (!node) continue
    const clone = node.clone(true)
    clone.userData = {}
    group.add(clone)
  }
  if (!group.children.length) throw new Error("当前盘没有可导出的对象。")
  const result = await new GLTFExporter().parseAsync(group, { binary: true, onlyVisible: false })
  return new Uint8Array(result)
}
async function uploadExport(bytes, plateId, uploadId) {
  await pushChunks("upload_export_chunk", part => ({ plateId, uploadId, ...part }), bytes)
}
// 纯 spec 盘的 GLB 由服务端内核按 spec + 对象变换组装，页面不必把字节搬回服务器（入参只有 1 MiB）。
function isSpecOnlyPlate(plate) {
  return plate.items.length > 0 && plate.items.every(i => state.templates.get(i.modelId)?.manifest?.format === "spec")
}
async function exportAndCache() {
  const plate = activePlate()
  if (!plate || !plate.items.length || !host.ready || state.exporting) return
  state.exporting = true
  setSync("syncing")
  try {
    await syncWorkspace()
    if (isSpecOnlyPlate(plate)) {
      state.dirty = false
      setSync("synced")
      setStatus(`盘「${plate.name}」改动已同步，导出由服务端内核组装。`)
      return
    }
    const bytes = await buildPlateGlb(plate)
    await uploadExport(bytes, plate.id, `${plate.id}-${Date.now()}`)
    state.dirty = false
    setSync("synced")
    setStatus(`盘「${plate.name}」已同步（GLB ${fmtSize(bytes.length)}，块 ${Math.ceil(bytes.length / chunkRaw)} × ${(chunkRaw / 1024).toFixed(0)} KB）。`)
  } catch (error) {
    setSync("error")
    setStatus("GLB 导出同步失败：" + (error?.message || error), true)
  } finally {
    state.exporting = false
    if (state.dirty) scheduleSync()
  }
}
async function downloadGlb() {
  const plate = activePlate()
  if (!plate) { setStatus("先导入一个模型再导出。", true); return }
  if (!host.capabilities.downloadFile) { setStatus("当前宿主不支持文件下载，请使用“保存到路径”。", true); return }
  try {
    setStatus("正在生成 GLB…")
    const bytes = await buildPlateGlb(plate)
    if (bytes.length > 16 * 1024 * 1024) { setStatus("GLB 超过 16 MB 下载限制，请使用“保存到路径”。", true); return }
    const fileName = plate.name.replace(/[^\w\u4e00-\u9fa5.-]+/g, "_") + ".glb"
    const result = await host.downloadFile([{
      type: "resource",
      resource: { uri: `model://export/${fileName}`, mimeType: "model/gltf-binary", blob: bytesToBase64(bytes) },
    }])
    if (result?.isError) setStatus("已取消保存。")
    else setStatus(`已保存 ${fileName}（${fmtSize(bytes.length)}）。`)
  } catch (error) {
    setStatus("下载失败：" + (error?.message || error), true)
  }
}
async function saveToPath() {
  const plate = activePlate()
  const outputPath = $("savePathInput").value.trim()
  if (!plate) { setStatus("先导入一个模型再导出。", true); return }
  if (!outputPath) { setStatus("请输入保存路径（绝对路径，.glb 结尾）。", true); return }
  $("saveDialog").hidden = true
  try {
    setStatus("正在导出并写入文件…")
    setSync("syncing")
    await syncWorkspace()
    // 全 spec 的盘由服务端内核按 spec + 对象变换直接组装，不必把字节回传（宿主入参有 1 MiB 上限）。
    if (!isSpecOnlyPlate(plate)) await uploadExport(await buildPlateGlb(plate), plate.id, `${plate.id}-save-${Date.now()}`)
    const data = toolResult(await host.callTool("save_export_to_path", { plateId: plate.id, outputPath }))
    state.dirty = false
    setSync("synced")
    setStatus(`已导出 GLB：${data.path}（${fmtSize(data.sizeBytes)}）`)
    toast(`盘「${plate.name}」已导出：${data.path}`)
  } catch (error) {
    setSync("error")
    setStatus("保存失败：" + (error?.message || error), true)
  }
}

// ---------- 与 Agent 协作 ----------
async function askAi() {
  const plate = activePlate()
  if (!plate || !plate.items.length) { setStatus("先导入一个模型，再向 AI 提问。", true); return }
  const lines = [
    `请基于建模工作台当前盘「${plate.name}」继续工作。plateId: ${plate.id}。`,
    ...plate.items.map(item => {
      const manifest = state.templates.get(item.modelId)?.manifest
      return `- 对象「${item.name}」modelId: ${item.modelId}；源文件: ${manifest?.sourcePath ?? "未知"}；位置 [${item.position.join(", ")}]，旋转° [${item.rotationDeg.join(", ")}]，缩放 [${item.scale.join(", ")}]。`
    }),
    `工作区共 ${state.workspace.plates.length} 个盘。可调用 get_workspace 查看完整工作区，export_model（plateId: ${plate.id}）将当前盘统一导出为 GLB。`,
  ]
  try {
    await host.sendMessage([{ type: "text", text: lines.join("\n"), _meta: { "qoder/title": `盘 · ${plate.name}` } }])
    setStatus("已发送到对话。")
  } catch (error) {
    setStatus("发送未确认，请在会话中检查是否已送达：" + (error?.message || error), true)
  }
}

// ---------- 渲染控制 ----------
const RENDER_DEFAULTS = { ctlKey: 1.6, ctlAngle: 35, ctlAmbient: 1.1, ctlExposure: 1, ctlFov: 50, ctlSpin: 0 }
function applyRenderControls() {
  const val = id => parseFloat($(id).value)
  keyLight.intensity = val("ctlKey")
  const angle = THREE.MathUtils.degToRad(val("ctlAngle"))
  keyLight.position.set(Math.cos(angle) * 8, 10, Math.sin(angle) * 8)
  hemiLight.intensity = val("ctlAmbient")
  renderer.toneMappingExposure = val("ctlExposure")
  camera.fov = val("ctlFov")
  camera.updateProjectionMatrix()
  const spin = val("ctlSpin")
  orbit.autoRotate = spin > 0
  orbit.autoRotateSpeed = spin
  $("ctlKeyOut").textContent = val("ctlKey").toFixed(2)
  $("ctlAngleOut").textContent = Math.round(val("ctlAngle")) + "°"
  $("ctlAmbientOut").textContent = val("ctlAmbient").toFixed(2)
  $("ctlExposureOut").textContent = val("ctlExposure").toFixed(2)
  $("ctlFovOut").textContent = Math.round(val("ctlFov")) + "°"
  $("ctlSpinOut").textContent = spin.toFixed(1)
  gridHelper.visible = $("ctlGrid").checked
  setWireframe($("ctlWire").checked)
}
function resetRenderControls() {
  for (const [id, value] of Object.entries(RENDER_DEFAULTS)) $(id).value = value
  $("ctlQuality").value = "mid"
  $("ctlGrid").checked = true
  $("ctlWire").checked = false
  $("ctlGizmo").checked = true
  applyQuality("mid")
  applyRenderControls()
}

// ---------- 事件绑定 ----------
function bindUi() {
  $("modePreview").addEventListener("click", () => setMode("preview"))
  $("modeEdit").addEventListener("click", () => setMode("edit"))
  $("outlinerToggle").addEventListener("click", () => {
    const collapsed = document.body.classList.toggle("outliner-collapsed")
    $("outlinerToggle").setAttribute("aria-pressed", String(!collapsed))
  })
  $("propsToggle").addEventListener("click", () => {
    const hidden = document.body.classList.toggle("props-hidden")
    $("propsToggle").setAttribute("aria-pressed", String(!hidden))
  })
  $("newPlateBtn").addEventListener("click", () => {
    const plate = createPlate()
    rebuildScene(); renderTree(); updateSummary(); updateStatsBar()
    $("emptyState").hidden = true
    markDirty(); scheduleSync()
    toast(`已新建「${plate.name}」。`)
  })
  $("modelSelect").addEventListener("change", event => {
    if (event.target.value) enqueueImport(event.target.value)
    event.target.value = ""
  })

  $("openFileBtn").addEventListener("click", async () => {
    const filesCap = host.capabilities.experimental?.["qoder/files"]
    if (filesCap?.pick) {
      try {
        const result = await host.pickFiles(PICK_EXTENSIONS)
        if (result?.files?.[0]?.path) await loadLocalFile(result.files[0].path)
      } catch (error) { setStatus("选择文件失败：" + (error?.message || error), true) }
    } else {
      $("pathWrap").hidden = !$("pathWrap").hidden
      if (!$("pathWrap").hidden) $("pathInput").focus()
    }
  })
  $("pathLoadBtn").addEventListener("click", () => {
    const p = $("pathInput").value.trim()
    if (p) void loadLocalFile(p)
  })
  $("pathInput").addEventListener("keydown", event => {
    if (event.key === "Enter") { const p = event.target.value.trim(); if (p) void loadLocalFile(p) }
  })
  $("emptyOpenBtn").addEventListener("click", () => $("openFileBtn").click())

  // 桌面拖拽导入（宿主拖放通知之外的原生兜底）
  let dragDepth = 0
  document.addEventListener("dragenter", event => {
    if (![...(event.dataTransfer?.types ?? [])].includes("Files")) return
    event.preventDefault()
    dragDepth++
    $("dropOverlay").hidden = false
  })
  document.addEventListener("dragover", event => {
    if ([...(event.dataTransfer?.types ?? [])].includes("Files")) event.preventDefault()
  })
  document.addEventListener("dragleave", event => {
    if (![...(event.dataTransfer?.types ?? [])].includes("Files")) return
    dragDepth = Math.max(0, dragDepth - 1)
    if (dragDepth === 0) $("dropOverlay").hidden = true
  })
  document.addEventListener("drop", event => {
    if (![...(event.dataTransfer?.types ?? [])].includes("Files")) return
    event.preventDefault()
    dragDepth = 0
    $("dropOverlay").hidden = true
    const files = [...(event.dataTransfer.files ?? [])]
    if (!files.length) return
    // Electron 宿主可能直接给出路径；沙箱 iframe 中 File.path 不存在，改走字节上传
    if (files[0].path) void loadLocalFile(files[0].path)
    else void uploadDroppedFiles(files)
  })

  $("fitBtn").addEventListener("click", fitView)
  for (const [id, preset] of [["frontBtn", "front"], ["topBtn", "top"], ["sideBtn", "side"], ["isoBtn", "iso"]]) {
    $(id).addEventListener("click", () => setView(preset))
  }
  $("upAxisBtn").addEventListener("click", () => setUpAxis(state.upAxis === "y" ? "z" : "y"))

  $("moveBtn").addEventListener("click", () => setTransformMode("translate"))
  $("rotateBtn").addEventListener("click", () => setTransformMode("rotate"))
  $("scaleBtn").addEventListener("click", () => setTransformMode("scale"))
  $("dupBtn").addEventListener("click", duplicateSelected)
  $("resetSelBtn").addEventListener("click", resetSelected)
  for (const id of ["px", "py", "pz", "rx", "ry", "rz", "sx", "sy", "sz"]) {
    $(id).addEventListener("change", applyTransformFields)
  }
  $("uniformScale").addEventListener("change", () => {
    if ($("uniformScale").checked && selectedNode()) {
      const s = selectedNode().scale.x
      $("sy").value = Number(s.toFixed(3)); $("sz").value = Number(s.toFixed(3))
      applyTransformFields()
    }
  })
  $("propsName").addEventListener("change", () => {
    if (!state.selection) return
    const { item } = findItem(state.selection.plateId, state.selection.itemId)
    const node = selectedNode()
    const value = $("propsName").value.trim()
    if (item && value) {
      item.name = value
      if (node) node.name = value
      renderTree()
      markDirty(); scheduleSync()
    }
  })
  $("propsVisible").addEventListener("change", () => {
    if (!state.selection) return
    const { plate, item } = findItem(state.selection.plateId, state.selection.itemId)
    if (plate && item) setItemVisible(plate, item, $("propsVisible").checked)
  })
  $("originGeometryBtn").addEventListener("click", () => setOrigin("geometry"))
  $("originBottomBtn").addEventListener("click", () => setOrigin("bottom"))
  $("originWorldBtn").addEventListener("click", () => setOrigin("world"))
  $("propsDupBtn").addEventListener("click", duplicateSelected)
  $("propsResetBtn").addEventListener("click", resetSelected)
  $("propsDeleteBtn").addEventListener("click", deleteSelected)
  $("propsDeselectBtn").addEventListener("click", deselect)

  for (const id of Object.keys(RENDER_DEFAULTS)) $(id).addEventListener("input", applyRenderControls)
  $("ctlQuality").addEventListener("change", () => applyQuality($("ctlQuality").value))
  $("ctlTheme").addEventListener("change", () => {
    state.themeOverride = $("ctlTheme").value
    applyTheme(currentTheme())
  })
  for (const id of ["ctlGrid", "ctlWire", "ctlGizmo"]) $(id).addEventListener("change", applyRenderControls)
  $("ctlResetView").addEventListener("click", fitView)
  $("ctlResetRender").addEventListener("click", resetRenderControls)

  $("exportBtn").addEventListener("click", () => {
    if (!activePlate()?.items.length) { setStatus("先导入一个模型再导出。", true); return }
    $("exportMenu").hidden = !$("exportMenu").hidden
  })
  $("downloadGlbBtn").addEventListener("click", () => { $("exportMenu").hidden = true; void downloadGlb() })
  $("savePathBtn").addEventListener("click", () => {
    $("exportMenu").hidden = true
    const plate = activePlate()
    if (!$("savePathInput").value && plate) {
      const manifest = state.templates.get(plate.items[0]?.modelId)?.manifest
      const dir = manifest?.sourcePath ? manifest.sourcePath.replace(/[\\/][^\\/]+$/, "") : ""
      const base = plate.name.replace(/[^\w\u4e00-\u9fa5.-]+/g, "_")
      $("savePathInput").value = dir ? `${dir}/${base}.glb` : `${base}.glb`
    }
    $("saveDialog").hidden = false
    $("savePathInput").focus()
  })
  $("saveConfirmBtn").addEventListener("click", () => void saveToPath())
  $("saveCancelBtn").addEventListener("click", () => { $("saveDialog").hidden = true })
  document.addEventListener("click", event => {
    if (!$("exportMenu").hidden && !event.target.closest("#exportMenu") && !event.target.closest("#exportBtn")) $("exportMenu").hidden = true
    if (!$("ctxMenu").hidden && !event.target.closest("#ctxMenu")) closeMenu()
  })
  window.addEventListener("blur", closeMenu)

  $("askAiBtn").addEventListener("click", () => void askAi())

  async function sendAiRequest(text) {
    if (!host.ready) { setStatus("宿主连接未就绪，无法发送到对话。", true); return }
    if (!host.capabilities.message) { setStatus("当前宿主不支持从页面发送消息，请直接在对话中描述需求。", true); return }
    try {
      await host.sendMessage([{ type: "text", text, _meta: { "qoder/title": "AI 建模请求" } }])
      setStatus("已发送建模请求到对话，等待 Agent 调用工具生成。")
      toast("已发送到对话。")
    } catch (error) {
      setStatus("发送失败：" + (error?.message || error), true)
    }
  }
  $("aiCreateBtn").addEventListener("click", () => {
    const desc = $("aiPromptInput").value.trim()
    if (!desc) { setStatus("请先在 AI 建模输入框描述想要的模型。", true); $("aiPromptInput").focus(); return }
    void sendAiRequest(`请在建模工作台中用 agent_create_model 生成一个 3D 模型。需求描述：${desc}\n请用参数化图元（box/rounded_box/sphere/cylinder/cone/pyramid/torus/capsule/plane/lathe/tube/sweep/extrude/heightfield/loft/csg）组合表达，Y-up、单位米、地面 y=0；回转体（杯/瓶/罐/塔）优先用 lathe，圆管/把手用 tube，任意截面沿路径扫掠（型材/梁/异形扶手/变径管）用 sweep（profile 换 circle/rect/polygon，taper 让末端收细，twistDeg 沿程扭转），平面轮廓拉伸实体（法兰/支架/带孔板）用 extrude，地形/波纹/弧面薄壳用 heightfield，轮廓不变但沿程缩放/扭转的壳体用 loft，需要开孔/掏腔/切角/熔接时用 csg 图元（{op:"subtract",operands:[基础实体, 切割体…]}；操作数必须是封闭实体——tube 默认带端盖可直接用，同一条路径的粗管减细管就是空心管）。生成后简要说明各图元的作用与整体尺寸。`)
  })
  $("aiModifyBtn").addEventListener("click", () => {
    const desc = $("aiPromptInput").value.trim()
    const plate = activePlate()
    if (!plate?.items.length) { setStatus("当前盘没有对象，无法请求 AI 修改。", true); return }
    if (!desc) { setStatus("请先在 AI 建模输入框描述修改要求。", true); $("aiPromptInput").focus(); return }
    const target = plate.items[0]
    const manifest = state.templates.get(target.modelId)?.manifest
    const isSpec = manifest?.format === "spec"
    if (isSpec) {
      void sendAiRequest(`请用 agent_modify_model 修改建模工作台 AI 生成模型「${manifest.name}」（modelId: ${target.modelId}，spec 图元模型，可用 addPart/removePart/setPart 编辑图元）。当前盘「${plate.name}」有 ${plate.items.length} 个对象。修改需求：${desc}`)
    } else {
      void sendAiRequest(`请用 agent_modify_model 对工作台当前盘「${plate.name}」（plateId: ${plate.id}）的对象做变换级修改（moveItem/rotateItem/scaleItem/setItemVisible）。该对象「${target.name}」modelId: ${target.modelId} 为外部模型，非 AI 图元模型，不能编辑内部图元。修改需求：${desc}`)
    }
  })

  window.addEventListener("keydown", event => {
    const tag = event.target?.tagName
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "d") {
      if (tag !== "INPUT" && tag !== "TEXTAREA" && state.selection) { event.preventDefault(); duplicateSelected() }
      return
    }
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || event.ctrlKey || event.metaKey || event.altKey) return
    if (event.key === "Escape") { closeMenu(); deselect(); return }
    if (event.key === "f" || event.key === "F") { fitView(); return }
    if (event.key === "Delete" || event.key === "Backspace") { if (state.selection) deleteSelected(); return }
    if (state.mode !== "edit") return
    switch (event.key.toLowerCase()) {
      case "g": setTransformMode("translate"); break
      case "r": setTransformMode("rotate"); break
      case "s": setTransformMode("scale"); break
    }
  })
}

// ---------- 启动 ----------
async function main() {
  bindUi()
  try { initThree() }
  catch {
    $("emptyState").hidden = true
    $("webglError").hidden = false
    setStatus("无法初始化 WebGL，请检查显卡驱动或远程桌面设置。", true)
    return
  }
  applyTheme("light")
  setMode("preview")
  setTransformMode("translate")
  setSync("idle")
  applyRenderControls()
  renderTree()
  updateSummary()
  updateStatsBar()
  try {
    await host.connect()
    if (!host.ready) return
    await syncFromServer()
    if (!state.workspace.plates.length) setStatus("已连接。拖入模型文件、点击对话区模型链接或打开本地文件开始。")
    if (pendingRoute !== null) { const route = pendingRoute; pendingRoute = null; applyRoute(route) }
    startOpenRequestPoll()
  } catch (error) {
    setStatus(error?.message || String(error), true)
  }
}

void main()