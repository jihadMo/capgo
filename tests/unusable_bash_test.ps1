# Test ensure-monk-agent.ps1 with unusable bash stub

$output = & powershell -ExecutionPolicy Bypass -File "./hooks/ensure-monk-agent.ps1"

if ($output -like '*monk-agent is not installed*') {
    Write-Host "✅ PASS: Unusable bash stub correctly fell back to native PowerShell guidance"
    exit 0
} else {
    Write-Host "❌ FAIL: Hook exited silently without outputting install guidance"
    exit 1
}
