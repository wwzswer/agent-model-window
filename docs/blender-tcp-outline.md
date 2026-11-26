# Blender TCP 直连设计大纲（v0.7 候选，未实现）

状态：**仅为方案**。0.6.0 已把几何内核搬到服务端（`lib/geometry.node.mjs`），感知/验收/寻优闭环不再依赖页面，TCP 直连的收益点因此从"能不能看"变成"能不能借 Blender 补齐内核做不到的建模能力"。等内核跑稳、且确认用户真的需要布尔/自由曲面时再启动。

## 1. 动机：TCP 直连解决什么

当前接入方式是 headless 单次转换：`blender -b -P script.py -- in.out`，把 blend/abc/usd 等转成 GLB。它能转换，但拿不到 Blender 的建模能力，因为一次进程只能做一件事、无法交互式迭代。

内核明确做不到的三件事，正是 Blender 的强项：

- 布尔运算与实体开孔（内空、榫卯、倒扣、装配避让）
- 修改器栈（镜像、阵列、贝塞尔曲线转网格、实体化、修角 bevel）
- 雕刻/细分/自由曲面与扫描重建网格

有了 TCP 常驻会话，Agent 可以"下一句命令 → 立刻读回数值/截图 → 再决定下一步"，把上面这些纳入与 spec 门相同的验收闭环，而不是盲发一个 .blend 赌结果。

## 2. 三种接入路线比较

| 路线 | 做法 | 优点 | 代价 | 建议 |
| --- | --- | --- | --- | --- |
| A. 扩展 + TCP 服务器 | 随插件附带一个 Blender add-on，在 Blender 内起 `127.0.0.1` 监听，接收 JSON 行协议，用 `bpy` 执行并把结果写回 socket | 交互完整、可热重载、能读 viewport 渲染结果；一次连接做多次操作 | 需要用户安装 add-on；GUI 事件循环要 `timer` 轮询才能不卡界面 | **主线** |
| B. `--python-expr` 常驻 REPL | 服务端启动 `blender --background --python-expr "code.interact(...)"`，用 stdin/stdout 当管道 | 零安装、纯服务端可控 | 无法可视化；stdout 混业务输出难解析；进程崩溃即全丢 | 作为无 GUI 兜底（批量转换复用） |
| C. 复用现有 bpy 适配器 + 文件交换 | 每次写一个临时 .py，走 headless 执行，产出 GLB 回传 | 复用 0.5 已有代码路径，改动最小 | 每次冷启动 3–8 秒、无状态、无法逐步迭代 | 保留为"降级模式" |

结论：A 为主，C 为降级；B 不做。

## 3. 协议草案（A 路线）

传输：TCP over `127.0.0.1`，换行分隔 JSON（NDJSON），一行一问一答；大二进制（GLB/PNG）不进 socket，落到临时文件后回路径。

握手：

```jsonc
// 连接后 Blender 主动发
{ "type":"hello", "addon":"model-studio", "addonVersion":"0.1.0", "blender":"4.2.0", "pid":1234, "capabilities":["exec","eval","inspect","render","spec"] }
// 服务端可发（也可不发，纯被动）
{ "type":"register", "port":8765, "token":"<本地一次性随机>" }
```

命令：

```jsonc
{ "id":"ms-1", "type":"exec",  "code":"import bpy; print(len(bpy.data.meshes))" }
{ "id":"ms-2", "type":"eval",  "expr":"[len(o.data.vertices) for o in bpy.context.scene.objects]" }
{ "id":"ms-3", "type":"call",  "name":"boolean_diff", "args":{ "object":"body", "cutter":"hole_1", "tolerance":1e-5 } }
{ "id":"ms-4", "type":"spec",  "spec":{ "parts":[...], "gates":{...} } }   // 服务端 spec → bpy 图元，见 §5
{ "id":"ms-5", "type":"cancel" }
```

应答：

```jsonc
{ "id":"ms-3", "ok":true,  "result":{ "verts":4820, "tris":9312, "volM3":0.0031, "out":"C:\\...\\tmp.glb" } }
{ "id":"ms-3", "ok":false, "error":"bpy.types.Object.name not found: 'hole_1'", "stderr":"...", "elapsedMs":42 }
```

约定：

- `id` 由服务端生成并自增，客户端只做回显，便于并发关联。
- 命令必须幂等可撤销：add-on 侧对每条 `exec/call` 自动打 Blender 端 undo step（`bpy.ops.ed.undo_push`），服务端侧仍保留自己的 8 条快照。
- 心跳 5 秒一次；服务端在等待结果期间仍要能响应 MCP 的 `tools/call`（不能阻塞事件循环），超时即视为失败。

## 4. 服务端落点

新增模块，不改现有工具签名：

- `src/blender-link.mjs`：连接池（单实例、重连退避 1/2/5/10 秒）、NDJSON 编解码、超时与取消、`hello` 能力协商。
- `server.mjs` 新增工具（全部要求已配置 `blenderPath` 且连接可用，否则返回可操作的错误文案）：
  - `blender_status {}` → 是否在线、版本、当前 .blend 路径、对象数
  - `blender_exec { code, timeoutMs }` → 受限脚本执行（默认关闭，需在设置里显式开启）
  - `blender_build { spec }` → 服务端 spec 下发到 Blender 构建（§5）
  - `blender_apply { object, modifier }` → 结构化下发修改器（bevel / mirror / array / solidify / boolean / screw），避免让用户写 bpy 代码
  - `blender_import { path }` / `blender_export { object?, format }` → 与盘打通：导入即注册到 `open_model` 同款流程，导出即产 GLB
- 与内核接力：Blender 产出 GLB → 服务端解析成网格 → `inspect_model` 的 dimension/ground/clearance 门照常可跑（Blender 结果同样要过验收，这是这套设计的核心纪律）。

## 5. spec → bpy 映射（保证"单源"）

服务端 spec 仍是唯一事实来源，Blender 只是它的一个后端渲染器：

| spec 图元 | bpy 做法 |
| --- | --- |
| box / cylinder / cone / sphere / torus / plane | `bpy.ops.mesh.primitive_*_add`（细分对应 `vertices`/`segments`/`ring_count`） |
| rounded_box | cube + `bevel` 修改器（`width=radius`, `segments`） |
| capsule | cylinder + 两个 uv_sphere 并集，或 metaball 转网格 |
| lathe | 轮廓多段线 + `screw` 修改器（轴 = Y，`angle=2π`） |
| tube | curve（poly/bezier）+ `bevel_depth` |
| sweep | curve + `bevel_object` 指向截面曲线，`twist_mode='TANGLE_NORMAL'` 对应 `twistDeg` |
| extrude | mesh.from_pydata 轮廓 + `solidify`，或 curve 填充 + solidify；`bevel:1` → bevel 修改器 |
| heightfield | grid + `bpy.data.meshes.vertices[i].co.z` 逐点赋值，另加 subdivision |

反向（Blender → spec）只在图元仍是未应用修改器的原始对象时可行；一旦网格化就退化为"外部 GLB 模型"，此时不再声称可参数化编辑，只走 `open_model`。

坐标系换算必须显式：spec 是 Y-up / 米 / 地面 y=0，Blender 原生 Z-up / 米。映射固定为 `bpy(0,0,0) = spec(0,0,0)`，轴序 `(x,y,z)_spec → (x,z,y)_bpy` 并在导入导出两侧一致；否则用户会看到模型躺倒。

## 6. 安全与权限

- 只监听 `127.0.0.1`，端口可配置（默认 8765），启动时生成一次性 token 写入 `~/.qoder-model-studio/blender-link.json`（0600），服务端必须带 token 才接受命令。
- 默认只允许结构化调用（`call` / `spec` / `apply`）；任意 `exec` 代码执行需在设置表单里打开 `allowArbitraryScript`，且在对话里向用户明示风险。
- add-on 安装方式：随插件提供 `blender/model_studio_link.py`，引导用户在 Blender 里"安装插件"；不做静默写入用户 Blender 配置目录。
- 断线、Blender 退出、用户正在交互编辑（`window_manager` 有 modal）时，服务端一律拒绝写入并说明原因，不排队重放。

## 7. 实施顺序（如果做）

1. add-on 骨架 + NDJSON 握手 + `blender_status`（半天，验证链路）
2. `blender_apply` 的 boolean / bevel / mirror 三个修改器 + GLB 导出回盘（1 天）
3. spec → bpy 映射表 + 与 `check_gates` 接力验收（1 天）
4. `blender_exec` 开关、token、断线重连与取消（半天）
5. 文档与 SKILL 增补：什么时候该转给 Blender，什么时候留在 spec（半天）

## 8. 已知风险

- GUI 事件循环：socket 读取必须挂在 `bpy.app.timers` 上，同步阻塞会让 Blender 界面假死，这是这类插件最常见的差评来源。
- 版本差异：3.x 与 4.x 的 `bpy.ops` 签名、`primitive_*_add` 参数名有变化，需要按 `hello.blenderVersion` 分支（沿用 0.5 headless 已验证过的版本适配思路）。
- 单位与轴序：见 §5 末尾，错一次整模型方向就不对。
- 双份真相：一旦用户在 Blender 里手工改过，spec 就不再等价。必须把"从 Blender 回读"设计成一等公民（导出 GLB + 标记该条目为外部网格），不要试图反推参数。
- 远程会话（Managed SSH / peer）里端口与本机监听不可用，需明确降级为 C 路线（headless 文件交换）。
