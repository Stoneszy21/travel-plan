# 用 GitHub Contents API 逐文件推送（绕开 git push 的大包上传）
#
# 背景：梯子对大 POST 不稳定，git push 会 408。Contents API 每个文件一次小请求，能过。
# 用法：.\tools\push-api.ps1 [-DryRun]
#
# 注意：这条路只更新「远程文件内容」，不会保留本地 commit 历史。
#       推完后执行 git fetch origin && git reset --hard origin/main 让本地和远程对齐。

param([switch]$DryRun)

$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
Set-Location $root

$repo = 'Stoneszy21/travel-plan'
$branch = 'main'
$gh = "$env:USERPROFILE\.dsh\tools\gh\gh.exe"

$changes = & cmd /c "git diff --name-status origin/main..HEAD 2>&1"
$rows = $changes | Where-Object { $_ -match "^\s*[AMD]\s" } | ForEach-Object {
    $p = ($_ -split "`t")
    [pscustomobject]@{ Status = $p[0].Trim(); Path = ($p[1..($p.Count - 1)] -join "`t").Trim() }
}

if (-not $rows) { Write-Host '  没有需要推送的改动。'; exit 0 }

$ok = 0; $fail = 0
foreach ($r in $rows) {
    $action = switch ($r.Status) {
        'A' { 'add' }; 'M' { 'update' }; 'D' { 'delete' }
    }

    # 取远程现有文件的 sha（更新/删除需要）
    $sha = $null
    if ($action -ne 'add') {
        try {
            $j = & $gh api "repos/$repo/contents/$($r.Path)?ref=$branch" 2>$null | ConvertFrom-Json
            $sha = $j.sha
        } catch { }
    }

    if ($DryRun) { Write-Host ("  [dry] {0} {1}" -f $action, $r.Path); continue }

    try {
        if ($action -eq 'delete') {
            $body = @{ message = "删除 $($r.Path)"; sha = $sha; branch = $branch } | ConvertTo-Json -Compress
            $tmp = [System.IO.Path]::GetTempFileName()
            [System.IO.File]::WriteAllText($tmp, $body, [System.Text.UTF8Encoding]::new($false))
            & $gh api --method DELETE "repos/$repo/contents/$($r.Path)" --input $tmp | Out-Null
            Remove-Item $tmp -Force
        } else {
            $full = Join-Path $root $r.Path
            $b64 = [Convert]::ToBase64String([System.IO.File]::ReadAllBytes($full))
            $payload = @{
                message = "更新 $($r.Path)"
                content = $b64
                branch  = $branch
            }
            if ($sha) { $payload.sha = $sha }
            $json = $payload | ConvertTo-Json -Compress
            $tmp = [System.IO.Path]::GetTempFileName()
            [System.IO.File]::WriteAllText($tmp, $json, [System.Text.UTF8Encoding]::new($false))
            & $gh api --method PUT "repos/$repo/contents/$($r.Path)" --input $tmp | Out-Null
            Remove-Item $tmp -Force
        }
        Write-Host ("  ✓ {0} {1}" -f $action, $r.Path)
        $ok++
    } catch {
        Write-Host ("  ✗ {0} {1} — {2}" -f $action, $r.Path, $_.Exception.Message)
        $fail++
    }
}

Write-Host ''
Write-Host ("  成功 {0}，失败 {1}" -f $ok, $fail)
if ($fail -eq 0) {
    Write-Host '  远程已更新。等 Pages 重建约 1 分钟后生效。' -ForegroundColor Green
}
