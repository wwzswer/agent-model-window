# 建模工作台（model-studio）

Qoder 插件：让 Agent 在窗口中显示 3D 建模内容。多种建模格式兼容进同一查看器，按“盘”组织场景，支持预览与简单编辑（移动 / 旋转 / 缩放 / 设置原点 / 复制 / 视图），可用 AI 参数化图元直接生成与修改模型，统一输出为 **GLB**；内置 Blender 多版本适配，并可配置接入其他建模软件。

## 已实现功能

- **多格式同窗预览**：GLB、glTF（含外部 buffer/贴图）、OBJ（含 MTL/贴图）、STL、PLY（网格/点云）、FBX、3MF、DAE 由浏览器端 three.js 直接解析；AI 生成的 spec（参数化图元规格）浏览器端直接构建；`.blend`、Alembic、USD、X3D 等经 Blender headless 转换为 GLB；STEP/IGES 等经自定义适配器（如 FreeCAD）转换。
- **盘工作区**：模型按“盘”组织。左侧可收起大纲列出盘与对象（新建/重命名/删除可撤销、设为当前盘、可见性）。导入时可选并入当前盘或新建盘，首个模型默认新建盘。
- **多入口导入**：对话区点击模型深链接自动打开工作台并导入；点击免路径链接 `[打开建模工作台](qoder-cn://plugins/model-studio%40local/app/open_viewer)` 只调起视图并导入最近的模型（`?path=/model/<modelId>` 指定已注册模型，无需磁盘路径）；从桌面拖拽文件到工作台导入（沙箱页面读不到 `File.path` 时自动改为读取文件字节分块上传到服务器再注册，无需宿主拖放通知）；“打开文件”/路径输入；Agent 调用 `open_model`（`path` 可省略）。
- **简单编辑**：点选对象后 gizmo 或数值输入移动/旋转/缩放；右键菜单与右侧固定属性表支持设置原点（几何中心/底面中心/世界原点）、复制（立即粘贴到相同位置）、删除（可撤销）、重置变换、可见性。选中后拖动视角不会丢失选择。快捷键 F/G/R/S/Ctrl+D/Delete/Esc。
- **视图与渲染**：左侧盘大纲与右侧属性表均可在任意窗口宽度下用顶栏按钮收起/展开，避免遮挡盘画面；轨道/平移/缩放、正/顶/侧/等轴预设、适配视图、Y-up/Z-up 切换；右上角坐标球点击轴切换视角；渲染控制区（主光强度/方位、环境光、曝光、视场角、自动旋转、画质、主题、网格/线框/坐标球）即时生效。
- **统一输出 GLB**：页面“导出 GLB”按当前盘下载或保存到指定路径；Agent 调用 `export_model { plateId? / modelId? }` 落盘（含用户编辑，自动避开源文件）。编辑后页面自动把工作区与 GLB 同步到服务器缓存。
- **Blender 版本适配**：自动探测版本（2.80–4.x+）；导入操作符按候选列表探测（`wm.*_import` vs `import_scene.*`），导入/导出参数按当前版本 RNA 属性过滤，跨版本参数改名不会导致失败。低于 2.80 给出明确升级提示。
- **其他建模软件接入**：设置中指定自定义适配器 JSON（`command` 直接命令行 / `script` 脚本式，占位符 `{input}` `{output}` `{report}` `{script}`），任何能输出 GLB 的工具都可接入。示例见 `examples/adapters.example.json` 与 `lib/freecad_convert.py`（FreeCAD 示例脚本，未在所有版本验证）。
- **Agent 协作**：`get_workspace` 读取完整盘场景，`get_model_info` 读取模型被哪些盘引用；页面“询问 AI”把当前盘上下文发送到对话；Skill 指导 Agent 为模型文件生成可点击导入的深链接。
- **AI 建模（参数化图元）**：Agent 调用 `agent_create_model` 用图元规格（spec JSON）直接生成模型。规则图元：立方体 / 圆角盒 / 球 / 圆柱 / 圆锥 / 棱锥 / 环 / 胶囊 / 平面；工程曲面图元：车旋体 lathe（轮廓绕轴回转）、管道 tube（沿路径圆截面扫掠）、扫掠 sweep（沿路径任意 circle/rect/polygon 截面，可 twistDeg 扭转，做型材/梁/异形扶手）、挤出 extrude（平面轮廓沿 Y 拉伸实体，可选 bevel，做法兰/支架/带孔板）、高度场 heightfield（二维高度网格，做地形/波纹板/弧面薄壳）。segments 可调细分，Y-up、单位米、地面 y=0，页面即时构建并可继续编辑、导出 GLB；`agent_modify_model` 支持图元级 addPart/removePart/setPart 与盘对象级 move/rotate/scale/visible/addItem/removeItem，修订号递增后页面自动重建场景。页面右下“AI 建模”面板可一键把生成/修改需求（含当前盘上下文）发送到对话。

## 组件

| 组件 | 说明 |
| --- | --- |
| MCP 服务器 `server.mjs` | stdio JSON-RPC，无第三方运行时依赖 |
| MCP App 页面 `ui/` + `src/` | three.js 查看器，esbuild 打包为自包含脚本内联进 HTML |
| 适配层 `lib/adapters.mjs` | 配置、Blender 探测、转换调度、自定义适配器 |
| Skill `skills/model-studio/` | 指导 Agent 使用工具与配置 |
| 设置扩展 `qoder/settings` | 设置表单：Blender 路径 / 适配器文件 / 转换超时 |

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
  "conversionTimeoutSec": 120
}
```

转换缓存位于 `~/.qoder-model-studio/cache/conversions/`（按文件修改时间命中缓存）；AI 生成的 spec 模型源文件位于 `~/.qoder-model-studio/cache/generated/`。

## 限制

- 单文件 ≤150 MB；导出 ≤200 MB；下载走宿主对话框限 16 MB（更大请用“保存到路径”或 `export_model`）；盘 ≤50、每盘对象 ≤500。
- 不支持 Draco 压缩 / KTX2 纹理 glTF；FBX 外部贴图不随包解析（内嵌贴图可用）。
- 编辑作用于对象级变换与原点，不含网格级建模；AI 建模为参数化图元组合（每模型 ≤200 图元），支持工程类规则曲面（回转 / 扫掠 / 挤出 / 高度场），但不支持布尔运算与任意自由曲面造型（NURBS / 雕刻 / 扫描重建请走外部建模软件产出 GLB）。
- 页面状态存于服务器进程内存：服务器重启后需重新加载模型。
- FreeCAD 示例脚本与自定义适配器实际转换效果取决于用户环境，未在本机验证。

## 开发与验证

```sh
cd build && npm install && node build.mjs   # 重新打包查看器（仅构建时需要 npm）
node scripts/smoke.mjs                      # 服务器协议冒烟测试（70 项）
node scripts/make-page-test.mjs             # 生成浏览器端页面测试 harness
```

在 Qoder 中人工验证：安装启用后让模型调用 `open_model` 加载一个 GLB/STL；确认独立视图打开、编辑模式 gizmo 可用、导出 GLB 可打开；配置 Blender 后加载 `.blend` 验证转换。

## 目录结构

```text
model-studio/
├── .qoder-plugin/plugin.json
├── .mcp.json
├── server.mjs
├── lib/            adapters.mjs · blender_convert.py · freecad_convert.py（示例）
├── ui/             viewer.html · viewer.bundle.js（构建产物，随包分发）
├── src/            main.js · loaders.js · host.js（页面源码）
├── build/          build.mjs · package.json（仅构建用）
├── skills/model-studio/SKILL.md
├── examples/adapters.example.json
└── scripts/        smoke.mjs · make-page-test.mjs
```