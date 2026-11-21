# Blender  headless 转换脚本：任意受支持格式 -> GLB
# 版本适配策略：
#   1. 导入操作符按候选列表探测（4.x 的 wm.*_import 与 2.8x-3.x 的 import_scene.* / import_mesh.*）。
#   2. 导入/导出参数按当前版本操作符实际支持的 RNA 属性过滤，避免跨版本参数改名导致失败。
# 用法: blender --background --factory-startup --python blender_convert.py -- <input> <output.glb> <report.json>
import bpy
import sys
import json
import os


def log(msg):
    print("[model-studio] " + str(msg))


def operator_exists(path):
    mod, name = path.rsplit(".", 1)
    obj = bpy.ops
    for part in mod.split("."):
        obj = getattr(obj, part, None)
        if obj is None:
            return False
    return hasattr(obj, name)


def call_operator(path, desired):
    """按当前版本 RNA 支持的属性过滤参数后调用操作符。"""
    mod, name = path.rsplit(".", 1)
    obj = getattr(bpy.ops, mod)
    op = getattr(obj, name)
    try:
        supported = set(op.get_rna_type().properties.keys())
    except Exception:
        supported = set(desired.keys())
    kwargs = {k: v for k, v in desired.items() if k in supported}
    log("call %s with %s" % (path, sorted(kwargs.keys())))
    return op(**kwargs)


# 扩展名 -> 候选导入操作符（按优先级，适配不同 Blender 版本）
IMPORT_CANDIDATES = {
    ".obj": ["wm.obj_import", "import_scene.obj"],
    ".fbx": ["import_scene.fbx"],
    ".stl": ["wm.stl_import", "import_mesh.stl"],
    ".ply": ["wm.ply_import", "import_mesh.ply"],
    ".abc": ["wm.alembic_import"],
    ".usd": ["wm.usd_import"],
    ".usda": ["wm.usd_import"],
    ".usdc": ["wm.usd_import"],
    ".usdz": ["wm.usd_import"],
    ".x3d": ["import_scene.x3d"],
    ".wrl": ["import_scene.x3d"],
    ".dae": ["wm.collada_import", "import_scene.dae"],
    ".gltf": ["import_scene.gltf"],
    ".glb": ["import_scene.gltf"],
}


def main():
    argv = sys.argv
    args = argv[argv.index("--") + 1:] if "--" in argv else []
    if len(args) < 3:
        raise ValueError("missing arguments: <input> <output.glb> <report.json>")
    inp, out, report_path = args[0], args[1], args[2]
    ext = os.path.splitext(inp)[1].lower()
    result = {
        "ok": False,
        "blender": bpy.app.version_string,
        "input": inp,
        "output": out,
    }
    try:
        if bpy.app.version < (2, 80, 0):
            raise RuntimeError("Blender %s 过旧：glTF 导出需要 2.80 及以上版本。" % bpy.app.version_string)
        if not os.path.isfile(inp):
            raise RuntimeError("输入文件不存在: %s" % inp)

        bpy.ops.wm.read_factory_settings(use_empty=True)

        if ext == ".blend":
            bpy.ops.wm.open_mainfile(filepath=inp)
        else:
            candidates = IMPORT_CANDIDATES.get(ext)
            if not candidates:
                raise RuntimeError("Blender 适配器不支持扩展名 %s" % ext)
            chosen = next((c for c in candidates if operator_exists(c)), None)
            if chosen is None:
                raise RuntimeError(
                    "Blender %s 中找不到 %s 的导入操作符（候选: %s）。"
                    % (bpy.app.version_string, ext, ", ".join(candidates))
                )
            call_operator(chosen, {"filepath": inp})

        if len(bpy.data.objects) == 0:
            raise RuntimeError("导入后场景为空，没有可导出的对象。")

        # 统一导出为 GLB（Y-up，应用修改器，保留动画）
        call_operator("export_scene.gltf", {
            "filepath": out,
            "export_format": "GLB",
            "export_apply": True,
            "use_selection": False,
            "export_animations": True,
            "export_yup": True,
        })
        if not os.path.isfile(out):
            raise RuntimeError("导出完成但未找到输出文件。")
        result["ok"] = True
        result["objects"] = len(bpy.data.objects)
        result["meshes"] = len(bpy.data.meshes)
        log("exported %d objects -> %s" % (len(bpy.data.objects), out))
    except Exception as exc:  # noqa: BLE001
        result["error"] = "%s: %s" % (type(exc).__name__, exc)
        log("ERROR " + result["error"])
    try:
        with open(report_path, "w", encoding="utf-8") as fh:
            json.dump(result, fh, ensure_ascii=False)
    except Exception as exc:  # noqa: BLE001
        log("cannot write report: %s" % exc)
    # 非零退出码让服务器能区分失败
    if not result["ok"]:
        sys.exit(1)


main()