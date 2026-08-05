# Antigravity Ensure Monk Agent Hook (Fixed for unusable Windows bash stub #258)

if (Get-Command bash -ErrorAction SilentlyContinue) {
    & bash -lc "exit 0" 2>$null
    if ($LASTEXITCODE -eq 0) {
        # Runnable bash environment available; delegate to POSIX script
        exit 0
    }
}

# Native PowerShell fallback when bash is missing or unusable
$installJson = @{
    status = "ok"
    injectSteps = @(
        @{
            action = "prompt"
            message = "monk-agent is not installed. Please run installation script."
        }
    )
} | ConvertTo-Json -Compress

Write-Output $installJson
