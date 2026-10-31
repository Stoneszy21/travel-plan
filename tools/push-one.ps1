# 逐个补传指定文件到 GitHub（带重试与上传后校验）
param([string]$List)

$ErrorActionPreference = 'Continue'
$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
Set-Location $root

$repo = 'Stoneszy21/travel-plan'
$branch = 'main'
$gh = "$env:USERPROFILE\.dsh\tools\gh\gh.exe"

$Files = $List -split "`n" | ForEach-Object { $_.Trim() } | Where-Object { $_ }
foreach ($f in $Files) {
    $full = Join-Path $root $f
    if (-not (Test-Path $full)) { Write-Host "  ✗ 本地没有 $f"; continue }

    $done = $false
    for ($try = 1; $try -le 8 -and -not $done; $try++) {
        # 先看远程是否已存在
        $sha = $null
        try {
            $j = & $gh api "repos/$repo/contents/$f`?ref=$branch" 2>$null | ConvertFrom-Json
            $sha = $j.sha
        } catch { }

        $b64 = [Convert]::ToBase64String([System.IO.File]::ReadAllBytes($full))
        $payload = @{ message = "补传 $f"; content = $b64; branch = $branch }
        if ($sha) { $payload.sha = $sha }
        $tmp = [System.IO.Path]::GetTempFileName()
        [System.IO.File]::WriteAllText($tmp, ($payload | ConvertTo-Json -Compress), [System.Text.UTF8Encoding]::new($false))

        & $gh api --method PUT "repos/$repo/contents/$f" --input $tmp 2>&1 | Out-Null
        Remove-Item $tmp -Force

        # 校验：远程能读到且大小对得上
        try {
            $check = & $gh api "repos/$repo/contents/$f`?ref=$branch" --jq '.size' 2>$null
            $localSize = (Get-Item $full).Length
            if ("$check".Trim() -eq "$localSize") {
                Write-Host ("  ✓ {0}（{1} 字节，第 {2} 次）" -f $f, $localSize, $try)
                $done = $true
            }
        } catch { }

        if (-not $done) { Start-Sleep -Seconds (3 * $try) }
    }
    if (-not $done) { Write-Host ("  ✗ {0} 8 次都失败" -f $f) }
}
