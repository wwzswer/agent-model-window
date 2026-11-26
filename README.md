# 建模工作台（model-studio）

Qoder 插件：让 Agent 在窗口中显示 3D 建模内容。多种建模格式兼容进同一查看器，按“盘”组织场景，支持预览与简单编辑（移动 / 旋转 / 缩放 / 设置原点 / 复制 / 视图），可用 AI 参数化图元直接生成与修改模型，统一输出为 **GLB**；内置 Blender 多版本适配，并可配置接入其他建模软件。

## 已实现功能

- **多格式同窗预览**：GLB、glTF（含外部 buffer/贴图）、OBJ（含 MTL/贴图）、STL、PLY（网格/点云）、FBX、3MF、DAE 由浏览器端 three.js 直接解析；AI 生成的 spec（参数化图元规格）浏览器端直接构建；`.blend`、Alembic、USD、X3D 等经 Blender headless 转换为 GLB；STEP/IGES 等经自定义适配器（如 FreeCAD）转换。
- **盘工作区**：模型按“盘”组织。左侧可收起大纲列出盘与对象（新建/重命名/删除可撤销、设为当前盘、可见性）。导入时可选并入当前盘或新建盘，首个模型默认新建盘。
- **多入口导入**：对话区点击模型深链接自动打开工作台并导入；点击免路径链接 `[打开建模工作台](qoder-cn://plugins/model-studio%40local/app/open_viewer)` 只调起视图并导入最近的模型（`?path=/model/<modelId>` 指定已注册模型，无需磁盘路径）；从桌面拖拽文件到工作台导入（沙箱页面读不到 `File.path` 时自动改为读取文件字节分块上传到服务器再注册，无需宿主拖放通知）；“打开文件”/路径输入；Agent 调用 `open_model`（`path` 可省略）。
- **会话外部控制面板（0.7）**：MCP 进程在 `127.0.0.1` 挂一个本地 HTTP 端点（`/status`、`/open`），端口与令牌写在 `~/.qoder-model-studio/panel.json`。对话之外的入口——`node scripts/open-in-workbench.mjs <文件>`、Windows 右键“打开方式 → 建模工作台 3D 预览”、任何本地脚本——都能把模型送进工作台：服务器注册文件并排队，已打开的视图每 2.5 秒取走队列自动导入；视图不在场时请求留着，下次打开就加载。注意对话里的**文件芯片**由宿主渲染、插件无法挂钩子，所以“点会话里的文件”只有 Agent 主动写成 `/open/` 深链接才有效，外部入口才是这条链路的正解。
- **简单编辑**：点选对象后 gizmo 或数值输入移动/旋转/缩放；右键菜单与右侧固定属性表支持设置原点（几何中心/底面中心/世界原点）、复制（立即粘贴到相同位置）、删除（可撤销）、重置变换、可见性。选中后拖动视角不会丢失选择。快捷键 F/G/R/S/Ctrl+D/Delete/Esc。
- **视图与渲染**：左侧盘大纲与右侧属性表均可在任意窗口宽度下用顶栏按钮收起/展开，避免遮挡盘画面；轨道/平移/缩放、正/顶/侧/等轴预设、适配视图、Y-up/Z-up 切换；右上角坐标球点击轴切换视角；渲染控制区（主光强度/方位、环境光、曝光、视场角、自动旋转、画质、主题、网格/线框/坐标球）即时生效。
- **统一输出 GLB**：页面“导出 GLB”按当前盘下载或保存到指定路径；Agent 调用 `export_model { plateId? / modelId? }` 落盘（含用户编辑，自动避开源文件），`save_model_glb { modelId?, outputPath? }` 由服务端内核直接从 spec 组装 GLB 写盘（全 spec 的盘无需页面在场）。编辑后页面自动把工作区与 GLB 同步到服务器缓存。
- **服务端几何内核（0.6）**：浏览器与 Node 共用同一份图元实现（`src/spec.js` + `src/analysis.js`），由 esbuild 打成 `lib/geometry.node.mjs` 供 `server.mjs` 同步调用，不依赖页面是否打开。能力包括：三角剖分与逐部件包围盒、CPU 正交光栅化（z-buffer + Lambert 着色）导出 PNG 正交图、俯视/侧视轮廓宽度采样、部件两两相交体积（Möller SAT 精确三角对 + 空间哈希剪枝，超预算自动降级为 AABB 并标注）、按 spec 哈希的 LRU 求值缓存。
- **感知与数值验收**：`inspect_model`（尺寸/包围盒/最低点/部件表/轮廓数组，可带 `views` 取正交图）、`check_gates`（`dimension` / `ground` / `silhouette` / `clearance` / `parts` / `custom` 六类门，逐条给出 `measured` 与 `expected`，可 `persist` 写入 `spec.gates` 成为后续修改的底线）、`optimize_params`（服务端随机撒点 + 三轮坐标下降，只回最优参数，试错过程不进入对话，可 `dryRun` / `apply`）、`snapshot_model` / `revert_model`（每次写回自动快照，环形保留 8 条，修订号可见）。
- **Blender 版本适配**：自动探测版本（2.80–4.x+）；导入操作符按候选列表探测（`wm.*_import` vs `import_scene.*`），导入/导出参数按当前版本 RNA 属性过滤，跨版本参数改名不会导致失败。低于 2.80 给出明确升级提示。
- **其他建模软件接入**：设置中指定自定义适配器 JSON（`command` 直接命令行 / `script` 脚本式，占位符 `{input}` `{output}` `{report}` `{script}`），任何能输出 GLB 的工具都可接入。示例见 `examples/adapters.example.json` 与 `lib/freecad_convert.py`（FreeCAD 示例脚本，未在所有版本验证）。
- **Agent 协作**：`get_workspace` 读取完整盘场景，`get_model_info` 读取模型被哪些盘引用；页面“询问 AI”把当前盘上下文发送到对话；Skill 指导 Agent 为模型文件生成可点击导入的深链接。
- **AI 建模（参数化图元）**：Agent 调用 `agent_create_model` 用图元规格（spec JSON）直接生成模型。规则图元：立方体 / 圆角盒 / 球 / 圆柱 / 圆锥 / 棱锥 / 环 / 胶囊 / 平面；工程曲面图元：车旋体 lathe（轮廓绕轴回转）、管道 tube（沿路径圆截面扫掠）、扫掠 sweep（沿路径任意 circle/rect/polygon 截面，可 twistDeg 扭转，做型材/梁/异形扶手）、挤出 extrude（平面轮廓沿 Y 拉伸实体，可选 bevel，做法兰/支架/带孔板）、高度场 heightfield（二维高度网格，做地形/波纹板/弧面薄壳）、放样 loft（一份闭合平面轮廓 + 多个 `{y, sx, sz, cx, cz, twistDeg}` 截面层逐层变形，xy 各向异性缩放可以“尾部锚住、头部快速收尖”，`scale:0` 层塌成顶点做锥/泪滴，泪滴/鼠标壳这类跟随轮廓的曲面终于不用拿矩形网格硬凑）、布尔 csg（`{op:"subtract"|"union"|"intersect"|"reverse_subtract", operands:[实体,…2–8]}`，BVH 实时求交：开孔、掏薄壁腔、切斜角、榫槽、熔接成一件，操作数还能各自带变换，最多嵌一层）。segments 可调细分，Y-up、单位米、地面 y=0，页面即时构建并可继续编辑、导出 GLB；`agent_modify_model` 支持图元级 addPart/removePart/setPart 与盘对象级 move/rotate/scale/visible/addItem/removeItem，修订号递增后页面自动重建场景。页面右下“AI 建模”面板可一键把生成/修改需求（含当前盘上下文）发送到对话。

## 组件

| 组件 | 说明 |
| --- | --- |
| MCP 服务器 `server.mjs` | stdio JSON-RPC，无第三方运行时依赖 |
| MCP App 页面 `ui/` + `src/` | three.js 查看器，esbuild 打包为自包含脚本内联进 HTML |
| 几何内核 `src/spec.js` · `src/analysis.js` · `src/kernel.mjs` → `lib/geometry.node.mjs` | 浏览器与 Node 共用的图元展开、正交栅格化、轮廓采样、相交检测、门校验、参数寻优、GLB 直出 |
| 适配层 `lib/adapters.mjs` | 配置、Blender 探测、转换调度、自定义适配器 |
| 外部面板 `lib/panel.mjs` · `scripts/open-in-workbench.mjs` | 127.0.0.1 HTTP 端点 + 命令行/“打开方式”入口 |
| Skill `skills/model-studio/` | 指导 Agent 使用工具与配置（含感知—验收闭环规则） |
| 设置扩展 `qoder/settings` | 设置表单：Blender 路径 / 适配器文件 / 转换超时 / 外部面板开关与端口 |

入口：左侧“更多”与会话右侧应用菜单中的“建模视图”（global + thread）；模型调用 `open_model` 默认在独立视图打开。

## 安装

通过 Qoder 的本地插件 ZIP 导入安装（ZIP 根目录直接包含 `.qoder-plugin/plugin.json`）。打包时排除 `build/node_modules`、`build/viewer.injected.html`、`build/page-test.html` 等本地构建产物。

运行时 Node.js 二选一（见 `.mcp.json`）：Qoder 内置 `${QODER_NODE_RUNTIME}`（推荐，无需系统 node），或用户 PATH 中的 `node`（需 22+）。

## 配置

设置表单（Qoder 设置 → 已安装 MCP → 建模工作台），或直接编辑 `~/.qoder-model-studio/config.json`：

```json
{
  "blenderPath": "C:/Program Files/Blender Foundation/Blender 4.2/blender.exe",
  "adaptersFile": "D:/config/my-adapters.json",
  "conversionTimeoutSec": 120,
  "panelEnabled": true,
  "panelPort": 0
}
```

`panelPort: 0` 表示依次试 37621-37624，都被占用就退回临时端口（真实端口永远以 `panel.json` 为准）。多个 Qoder 窗口会起多个 MCP 进程：后来者探测到已有面板就直接复用，不抢写记录。

转换缓存位于 `~/.qoder-model-studio/cache/conversions/`（按文件修改时间命中缓存）；AI 生成的 spec 模型源文件位于 `~/.qoder-model-studio/cache/generated/`。

## 限制

- 单文件 ≤150 MB；导出 ≤200 MB；下载走宿主对话框限 16 MB（更大请用“保存到路径”或 `export_model`）；盘 ≤50、每盘对象 ≤500。
- 宿主对 MCP App 工具**入参**有 1 MiB 硬校验（按 `JSON.stringify(arguments)` 的字节数算，工具结果不受此限）。页面分块上传因此按每块 700 KB 原始数据（base64 后约 0.89 MiB，余量给 plateId/uploadId 等字段）发送，被拒时自动折半重发；纯 spec 盘干脆不回传字节，GLB 由服务端内核组装。
- 外部控制面板只监听 `127.0.0.1`，请求必须带 `panel.json` 里的随机令牌；它只能把文件送进“活着的那个 MCP 进程”，视图是否出现在侧边由宿主决定——协议未注册时 CLI 会明确提示回对话点工作台卡片。
- 不支持 Draco 压缩 / KTX2 纹理 glTF；FBX 外部贴图不随包解析（内嵌贴图可用）。
- 编辑作用于对象级变换与原点，不含网格级手工建模；AI 建模为参数化图元组合（每模型 ≤200 图元），支持工程类规则曲面（回转 / 扫掠 / 挤出 / 高度场 / 放样）与闭合实体布尔（`csg`：开孔 / 掏腔 / 熔接 / 求交，≤8 操作数、≤1 层嵌套，`plane`、`heightfield` 这类开放曲面不能参与），但不支持任意自由曲面造型（NURBS / 雕刻 / 扫描重建请走外部建模软件产出 GLB）。
- 页面状态存于服务器进程内存：服务器重启后需重新加载模型。
- FreeCAD 示例脚本与自定义适配器实际转换效果取决于用户环境，未在本机验证。

## 开发与验证

```sh
cd build && npm install && node build.mjs       # 重新打包浏览器查看器（仅构建时需要 npm）
node build/build-node.mjs                       # 重新打包服务端内核 lib/geometry.node.mjs 并跑内核自检
node scripts/smoke.mjs                          # 服务器协议冒烟测试（含 0.6 内核用例）
node scripts/make-page-test.mjs                 # 生成浏览器端页面测试 harness
PAGE_TEST_GRID=200 PAGE_TEST_OUT=build/page-test-big.html node scripts/make-page-test.mjs   # 约 1 MB 的网格模型 harness
#   打开 build/page-test-big.html?argcap=250000 可在浏览器里复现"宿主入参更小 → 块自动折半重传"
node src/kernel.mjs inspect mouse-spec.json     # 单独调试内核（inspect/check/png）
node scripts/pack.mjs                          # 打包安装 ZIP（版本取自 plugin.json，条目名正斜杠，排除构建缓存）
node scripts/github-push.mjs --dry-run         # 与远端仓库比对差异（只读，无需 token）
GH_TOKEN=<PAT> node scripts/github-push.mjs    # 发布到 GitHub：新增+修改文件合成一次普通提交推上 main，并带上版本号
GH_TOKEN=<PAT> node scripts/github-push.mjs --tag-only  # 不提交文件，只把版本号 tag / Release / 安装包补在当前提交上
node scripts/open-in-workbench.mjs D:/models/cup.stl    # 从对话之外把模型送进工作台（面板 HTTP + 深链接）
node scripts/open-in-workbench.mjs --status             # 面板是否在监听、端口、队列长度、协议是否注册
node scripts/open-in-workbench.mjs --register           # 只打印要写的 HKCU 项；加 --yes 才真的写
```

发布清单由 `scripts/release-files.mjs` 统一维护，`pack.mjs` 与 `github-push.mjs` 共用同一份白名单，保证 ZIP 与仓库内容一致（`ui/viewer.bundle.js`、`lib/geometry.node.mjs` 虽是构建产物，但刻意随仓库发布，clone 即可作为插件安装）。`github-push.mjs` 走 GitHub REST 的 blobs → tree → commit → ref 流程，按 git blob SHA 跳过未变化文件，父提交取远端当前 `main`、不改写历史；之所以提供它，是因为部分网络环境只放行 `api.github.com`，`git push` 的 github.com transport 会在 TLS 握手阶段失败——那种环境下它就是唯一的发布通道。版本号取自 `plugin.json`：推完提交后会在同一个提交上打 `v<version>` 注解 tag、建同名 Release，并把 `pack.mjs` 产出的 `model-studio-<version>.zip` 作为 Release 附件上传，三步全幂等（tag 已指向别处就不移动，Release/附件已存在就跳过），所以漏发版本号用 `--tag-only` 补一次即可。

在 Qoder 中人工验证：安装启用后让模型调用 `open_model` 加载一个 GLB/STL；确认独立视图打开、编辑模式 gizmo 可用、导出 GLB 可打开；拖动一次对象确认状态条不再出现“GLB 导出同步失败/MCP App 工具参数过大”；配置 Blender 后加载 `.blend` 验证转换；对 AI 生成的 spec 模型跑一遍 `inspect_model → check_gates → optimize_params → save_model_glb → revert_model` 确认内核链路；再在终端跑 `node scripts/open-in-workbench.mjs <文件>`，确认几秒内工作台导入该文件。

两个 bundle 都必须先构建再打包：`ui/viewer.bundle.js` 内联进 `viewer.html`，`lib/geometry.node.mjs` 缺失时 `server.mjs` 仍能预览/导出页面缓存，但 `inspect_model` / `check_gates` / `optimize_params` / `save_model_glb` 会返回明确的“内核不可用”提示。

## 目录结构

```text
model-studio/
├── .qoder-plugin/plugin.json
├── .mcp.json
├── server.mjs
├── lib/            adapters.mjs · geometry.node.mjs（内核构建产物）· blender_convert.py · freecad_convert.py（示例）
├── ui/             viewer.html · viewer.bundle.js（构建产物，随包分发）
├── src/            main.js · loaders.js · host.js · spec.js · analysis.js · kernel.mjs
├── build/          build.mjs · build-node.mjs · package.json（仅构建用）
├── docs/           blender-tcp-outline.md（Blender 直连方案，未实现）
├── skills/model-studio/SKILL.md
├── examples/       adapters.example.json · csg-bracket.spec.json（布尔示例：底板开孔 + U 形槽 + 熔接筋，`node src/kernel.mjs check` 可自校验）
└── scripts/        smoke.mjs · check.mjs · pack.mjs · github-push.mjs · release-files.mjs · make-page-test.mjs
```