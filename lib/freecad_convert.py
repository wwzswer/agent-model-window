# FreeCAD 转换示例脚本（示例配置，未在所有 FreeCAD 版本上验证）
# 用法: FreeCADCmd freecad_convert.py <input.step> <output.glb> <report.json>
# 依赖 FreeCAD 0.20+ 的 Import / importGLTF 模块。
import sys
import os
import json

result = {"ok": False}
try:
    import FreeCAD
    import Import
    try:
        import importGLTF
    except ImportError:
        importGLTF = None

    inp, out, report_path = sys.argv[1], sys.argv[2], sys.argv[3]
    if not os.path.isfile(inp):
        raise RuntimeError("输入文件不存在: %s" % inp)
    doc = FreeCAD.newDocument("convert")
    ext = os.path.splitext(inp)[1].lower()
    if ext in (".step", ".stp", ".iges", ".igs", ".brep"):
        Import.insert(inp, doc.Name)
    else:
        raise RuntimeError("示例脚本不支持扩展名 %s，请按需扩展。" % ext)
    doc.recompute()
    objects = [o for o in doc.Objects if hasattr(o, "Shape") and not o.Shape.isNull()]
    if not objects:
        raise RuntimeError("导入后没有有效形状。")
    if importGLTF is None:
        raise RuntimeError("当前 FreeCAD 缺少 importGLTF 模块，无法导出 glTF；请升级 FreeCAD。")
    importGLTF.export(objects, out)
    if not os.path.isfile(out):
        raise RuntimeError("导出完成但未找到输出文件。")
    result.update(ok=True, objects=len(objects), freecad=FreeCAD.Version())
except Exception as exc:  # noqa: BLE001
    result["error"] = "%s: %s" % (type(exc).__name__, exc)

try:
    with open(sys.argv[3], "w", encoding="utf-8") as fh:
        json.dump(result, fh, ensure_ascii=False, default=str)
except Exception:
    pass
if not result["ok"]:
    sys.exit(1)