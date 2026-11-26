---
name: model-studio
description: 在 Qoder 窗口中预览、简单编辑多种格式 3D 模型、用 AI 参数化图元直接生成/修改模型并统一导出 GLB。当用户要求查看/预览 3D 模型文件（glb、gltf、obj、stl、ply、fbx、3mf、dae、blend、step 等）、对模型做移动/旋转/缩放/设置原点/复制等简单调整、按“盘”组织多个模型、让 AI 直接建模或改模（桌子、杯子、支架等由基本体组合的模型）、统一转换建模格式、或配置 Blender / 其他建模软件接入时使用。
---

# 建模工作台（model-studio）

让模型在 Qoder 窗口中可视化：多格式兼容进同一查看器、按“盘”组织场景、预览与简单编辑（移动/旋转/缩放/设置原点/复制）、统一输出为 GLB。AI 建模基于参数化图元规格（spec），用 `agent_create_model` 生成、`agent_modify_model` 修改。

## 工具使用规则

1. **预览模型**：用户给出模型文件路径时，调用 `open_model { path }`（绝对路径）。成功会自动打开建模工作台并把模型导入：工作区还没有盘时默认新建“盘 1”；已有盘时页面弹窗让用户选择并入当前盘或新建盘。结果文本本身也要向用户转述加载结果。
   - **只想打开工作台**：调用 `open_model {}`（不传 `path`）。服务器不读任何文件，页面自己拉取模型注册表并导入最近注册的模型——用户不需要提供任何绝对路径。
2. **对话区模型链接（重要）**：在回复中提到本地模型文件、或希望用户点击后直接进入工作台时，输出深链接 Markdown，点击即自动打开建模工作台并导入该文件：
   `[文件名](qoder-cn://plugins/model-studio%40local/app/open_viewer?path=/open/<encodeURIComponent(绝对路径)>)`
   - `path` 参数值必须以单个 `/` 开头，路由固定为 `/open/` 后接 **一次** `encodeURIComponent` 的绝对路径（盘符冒号、反斜杠、中文都要编码；不得出现裸 `//`、`\`、`#`）。
   - 例：`E:\models\cup.stl` → `qoder-cn://plugins/model-studio%40local/app/open_viewer?path=/open/E%3A%5Cmodels%5Ccup.stl`。
   - **免路径链接（默认优先）**：不带 `path` 参数即可只调起工作台并导入最近的模型——`[打开建模工作台](qoder-cn://plugins/model-studio%40local/app/open_viewer)`；等价的显式写法 `?path=/recent`、`?path=/workbench`。
   - **调起视图（首选做法）**：直接调用 `open_viewer {}`（无参数、无路径）。宿主会在对话里渲染工作台卡片，用户点卡片即进入全屏视图；比深链接更稳，不依赖协议注册。每轮生成/修改/导出之后都调用它。
   - 指定服务器里已注册的某个模型（无需磁盘路径）：`?path=/model/<encodeURIComponent(modelId)>`，`modelId` 取 `open_model` / `agent_create_model` 结果里的 `model.id`。多个候选模型对比时，给每个候选一条 `/model/` 链接，用户点哪个看哪个。
   - 每次 `agent_create_model` / `agent_modify_model` / `export_model` 之后，回复里必须附一个上述链接；不要让用户手输绝对路径，也不要让用户自己去菜单里找入口。
   - **不要用普通 `file://` 链接指向模型文件**：点击只会走系统打开方式，不会进工作台。要么 `open_model { path }` + `open_viewer {}`，要么上面的 `/open/` 深链接。
   - 用户拖拽桌面文件到工作台同样可导入，无需 Agent 介入。
3. **了解用户编辑**：页面把盘工作区（每个盘的对象及位置/旋转角度/缩放/可见性）通过 `update_workspace_state` 同步到服务器。需要完整场景时调用 `get_workspace {}`；需要某个模型被哪些盘引用及其变换时调用 `get_model_info { modelId? }`（读 `references`）。不要凭空假设变换数值。
4. **统一导出**：调用 `export_model { plateId?, modelId?, outputPath? }` 把一个盘统一导出为 GLB。
   - `plateId` 省略时用当前盘；传 `modelId` 时导出该模型所在的盘。
   - 导出依赖页面自动同步的 GLB 缓存（导入后与每次编辑后约 1–3 秒内自动上传）。
   - 若返回“没有可用的 GLB 导出缓存”，先调用 `open_model` 或 `open_viewer` 打开视图，稍候重试；不要反复立即重试。
   - `outputPath` 省略时保存到首个对象源文件同目录、以盘名命名；服务器不会覆盖源文件（自动改名）。
5. **格式转换能力诊断**：`list_adapters {}` 查看 Blender 是否配置、检测到的版本、自定义适配器可用性。
6. **软件配置**：引导用户在 Qoder 设置 → 已安装 MCP → 建模工作台的设置表单中填写 `blenderPath`（Blender 可执行文件）与 `adaptersFile`（自定义适配器 JSON）。也可用 `settings_read` / `settings_update` 读写。配置存于 `~/.qoder-model-studio/config.json`。
7. **AI 建模（生成新模型）**：用户要求“做一个 / 生成一个”由基本体组合的模型（桌子、杯子、机器人、支架、场景摆件等）时，调用 `agent_create_model { name?, description?, parts[] }`。
   - 坐标系约定：Y-up、单位米、地面在 y=0；每个图元的 `position` 是其几何中心。
   - 规则图元与 `params`：`box {width,height,depth[,segments|segmentsX/Y/Z]}`、`rounded_box {width,height,depth[,radius,segments]}`（radius<最小边长一半）、`sphere {radius[,segments]}`、`cylinder {radius|radiusTop/radiusBottom,height[,segments]}`、`cone {radius,height[,segments]}`、`pyramid {radius,height}`（四棱锥，底面边与轴对齐）、`torus {radius,tube[,segments,segmentsTubular]}`、`capsule {radius,height[,segments]}`（height 为总高，含两端半球）、`plane {width,height[,segments]}`（水平放置于 XZ 面）。
   - 工程曲面图元与 `params`：`lathe {points:[[半径,y],…2–64][,segments]}`（轮廓绕 Y 轴回转成回转体，适合杯/瓶/罐/塔；端点半径 0 自动封闭）、`tube {points:[[x,y,z],…2–64][,radius,tubularSegments,radialSegments,closed:1]}`（沿路径圆截面扫掠，适合把手/扶手/管线）、`sweep {points:[[x,y,z],…2–64], profile:{shape:"circle"[,radius]|"rect"{width,height}|"polygon"{points:[[x,y],…3–32]}[, twistDeg, tubularSegments, closed:1]}`（沿路径扫掠任意截面，适合型材/工字梁/异形扶手；截面随 Frenet 帧朝向，twistDeg 沿程扭转）、`extrude {points:[[x,z],…3–64], depth[, bevel:1, bevelSize, bevelSegments]}`（平面轮廓沿 +Y 拉伸成实体，bevel 倒角，适合法兰/垫片/L 支架/带孔板轮廓）、`heightfield {width,depth, heights:[[…],2–33 行×2–33 列]}`（逐格给 y 高度的网格曲面，适合地形/波纹板/弧面薄壳；行沿 +Z、列沿 +X，中心在原点）。曲面图元的 points 相对图元 position。
   - 精度：segments 默认 球 48 / 圆柱·圆锥 32 / 环面 24×64 / 回转 48 / 管道 64×16 / 扫掠 32×截面（上限 256）；圆润度不足时显式加大 segments，细小特征拆成多图元组合。
   - 每个 part 必有 `primitive`；`id` 省略自动编号；可选 `name`、`position [x,y,z]`、`rotationDeg [x,y,z]`、`scale [x,y,z]`、`color "#rrggbb"`、`metalness`、`roughness`、`visible`。每模型 ≤200 图元。
   - 组合技巧：先想整体尺寸，再按“底座→主体→细节”逐块摆放，保证接触面 y 值衔接（如桌面 y=0.72、厚 0.06 则桌腿中心 y≈0.35）。回转体优先 lathe，变截面路径用 sweep，平面轮廓实体用 extrude，起伏表面用 heightfield。
   - 成功结果带 `importHint.plateName`：页面会弹窗建议以模型名新建盘；向用户说明已生成、可在窗口查看并继续编辑/导出。
   - 布尔运算、真正的自由曲面（NURBS / 雕刻 / 扫描重建）、精确工程公差做不到——超出时如实说明并建议外部建模软件产出 GLB 再 `open_model`。工程类规则曲面用上面的 lathe/tube/sweep/extrude/heightfield 表达。
8. **AI 修改（已生成的 spec 模型或盘中对象）**：调用 `agent_modify_model { modelId?, operations[] }`，一次可提交 1–100 个操作：
   - 图元级（仅 spec 模型，`modelId` 指向 spec 模型）：`{op:"addPart", part:{...}}`、`{op:"removePart", partId}`、`{op:"setPart", partId, ...字段补丁}`。修订号自动递增，页面约 1–3 秒内自动重建场景，无需再调 `open_model`。
   - 对象级（任意格式的盘内条目）：`{op:"moveItem"|"rotateItem"|"scaleItem", itemId, value:[x,y,z]}`、`{op:"setItemVisible", itemId, visible}`、`{op:"removeItem", itemId}`、`{op:"addItem", modelId, plateId?}`。
   - 先用 `get_workspace {}` 拿盘与 `itemId`，用 `list_models {}` 或结果确认 `modelId`；不要在图元格式（非 spec）模型上调 addPart/removePart/setPart（会被拒绝，改用对象级操作）。

## 页面能力（向用户介绍时使用）

- 左侧可收起“盘”大纲：盘的新建/重命名/删除（可撤销）、设为当前盘、可见性；对象行点选、右键菜单。
- 对象右键 / 右侧属性表：设置原点（几何中心 / 底面中心 / 世界原点）、复制（立即粘贴到相同位置并提示）、删除（可撤销）、重置变换、数值化移动/旋转/缩放。
- 右上角坐标球：点击 X/Y/Z 轴球或负轴圆环切换对应视角。
- 选中对象后右侧属性表固定在页面上，拖动视角不会丢失选择。左侧盘大纲与右侧属性表均可在任意窗口宽度下用顶栏“盘大纲”/“属性”按钮收起/展开，避免遮挡盘画面。
- 桌面拖拽导入：沙箱页面读不到 `File.path` 时自动读取文件字节分块上传（`upload_import_chunk`）再 `commit_import` 注册，无需宿主拖放通知；用户拖入后按弹窗选择并入当前盘或新建盘。
- 右下“AI 建模”面板：输入描述后“AI 生成模型”/“AI 修改当前盘”把需求与当前盘上下文（含 spec 图元 id / 盘内对象 id）作为消息发送到对话，引导 Agent 调用 `agent_create_model` / `agent_modify_model`。
- 左下渲染控制区：主光强度/方位、环境光、曝光、视场角、自动旋转、画质、主题、网格/线框/坐标球开关，全部即时生效。

## 格式支持

| 类别 | 格式 | 路径 |
| --- | --- | --- |
| 浏览器直接解析 | glb、gltf（含外部 bin/贴图）、obj（含 mtl/贴图）、stl、ply（网格与点云）、fbx、3mf、dae | three.js 加载器 |
| AI 参数化图元 | spec（`agent_create_model` 生成，可直接导出 GLB） | 浏览器端按图元构建 |
| 需 Blender（≥2.80，自动版本适配） | blend、abc、usd/usda/usdc/usdz、x3d、wrl 等 | headless 转换为 GLB |
| 需自定义适配器（如 FreeCAD） | step、stp、iges、igs、brep 等 | 适配器输出 GLB |

不支持 Draco 压缩与 KTX2 纹理的 glTF；遇到相关报错时向用户说明并建议先在建模软件中重新导出为未压缩 GLB。

## 约束

- 单文件 ≤150 MB；导出 ≤200 MB；注册表最多保留 24 个模型（超出清理最旧）；盘 ≤50、每盘对象 ≤500。
- 转换超时默认 120 秒，可在设置中调整（10–600 秒）。
- 页面编辑只作用于对象级变换与原点；AI 建模只组合参数化图元（每模型 ≤200 个），支持工程类规则曲面（回转/扫掠/挤出/高度场），但不做布尔运算、任意自由曲面/雕刻建模——不要向用户承诺这些能力。
- 视图快捷键：F 适配视图；编辑模式下 G 移动 / R 旋转 / S 缩放；Ctrl+D 复制；Delete 删除；Esc 取消选择。
- 远程会话（Managed SSH / peer）中页面可渲染但消息与本地文件能力受限；此时引导用户用 `open_model` 而非页面“打开文件”。