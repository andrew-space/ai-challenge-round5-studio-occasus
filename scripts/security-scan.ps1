# Security scan — Studio Occasus
# Checks that no real secrets have been committed to the site/ directory.
# Complements Gitleaks; focuses on patterns specific to this project.

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$failed = $false

# Patterns that must never appear in client code
$forbidden = @(
    @{ Pattern = "sk_live_";                   Reason = "Stripe live secret key" },
    @{ Pattern = "sk_test_";                   Reason = "Stripe test secret key" },
    @{ Pattern = "whsec_";                     Reason = "Stripe webhook secret" },
    @{ Pattern = "-----BEGIN PRIVATE KEY-----"; Reason = "Private key material" },
    @{ Pattern = "-----BEGIN RSA PRIVATE KEY-----"; Reason = "RSA private key" }
)

foreach ($item in $forbidden) {
    $hits = Get-ChildItem -Recurse -Path ./site -File -ErrorAction SilentlyContinue |
        Select-String -Pattern $item.Pattern -SimpleMatch -ErrorAction SilentlyContinue
    if ($hits) {
        Write-Error "FAIL: $($item.Reason) detected in client code:`n$($hits | ForEach-Object { $_.Filename + ':' + $_.LineNumber })"
        $failed = $true
    }
}

if ($failed) {
    exit 1
}

Write-Host "Security scan passed — no forbidden patterns found in site/."
exit 0
