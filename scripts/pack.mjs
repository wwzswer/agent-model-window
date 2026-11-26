// 打包插件 ZIP：条目名一律使用正斜杠（PowerShell CreateFromDirectory 会写反斜杠，Qoder 解压后目录结构会错）。
// 用法：node scripts/pack.mjs [版本号]；产物 ../model-studio-<version>.zip
import { readFileSync, writeFileSync, unlinkSync, existsSync, statSync } from "node:fs"
import { execFileSync } from "node:child_process"
import { fileURLToPath } from "node:url"
import path from "node:path"
import { releaseEntries } from "./release-files.mjs"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const version = process.argv[2] ?? JSON.parse(readFileSync(path.join(root, ".qoder-plugin", "plugin.json"), "utf8")).version
const outZip = path.join(path.dirname(root), `model-studio-${version}.zip`)
const entries = releaseEntries(root)

const ps1 = [
  "$ErrorActionPreference = 'Stop'",
  "Add-Type -AssemblyName System.IO.Compression.FileSystem",
  `$root = '${root.replace(/'/g, "''")}'`,
  `$out = '${outZip.replace(/'/g, "''")}'`,
  "if (Test-Path $out) { Remove-Item $out }",
  "$zip = [System.IO.Compression.ZipFile]::Open($out, 'Create')",
  `$entries = @(${entries.map(e => `'${e.replace(/'/g, "''")}'`).join(",")})`,
  "foreach ($e in $entries) {",
  "  $src = Join-Path $root ($e -replace '/', '\\')",
  "  if (-not (Test-Path $src)) { Write-Host \"MISS $e\"; continue }",
  "  [void][System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($zip, $src, $e)",
  "}",
  "$zip.Dispose()",
  'Write-Host "PACKED $out ($($entries.Count) entries)"',
].join("\r\n")
const tmp = path.join(root, "build", ".pack.ps1")
writeFileSync(tmp, "\ufeff" + ps1, "utf8")
try {
  execFileSync("powershell", ["-NoProfile", "-ExecutionPolicy", "Bypass", "-File", tmp], { stdio: "inherit" })
} finally {
  if (existsSync(tmp)) unlinkSync(tmp)
}
if (!existsSync(outZip)) {
  console.error("打包失败：未生成 zip")
  process.exit(1)
}
console.log(`zip: ${(statSync(outZip).size / 1024 / 1024).toFixed(2)} MB -> ${outZip}`)
console.log(entries.join("\n"))
