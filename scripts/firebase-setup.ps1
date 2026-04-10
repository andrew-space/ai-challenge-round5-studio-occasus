$ErrorActionPreference = "Stop"
$firebase = Join-Path $env:APPDATA "npm\firebase.cmd"

if (-not (Test-Path $firebase)) {
  throw "firebase.cmd introuvable. Installer via: npm.cmd install -g firebase-tools"
}

Write-Host "[Firebase] CLI version"
& $firebase --version

Write-Host "[Firebase] Connected account(s)"
& $firebase login:list

Write-Host "[Firebase] Next steps:"
Write-Host "1) firebase login"
Write-Host "2) firebase use --add"
Write-Host "3) cd functions; npm install; cd .."
Write-Host "4) firebase deploy --only functions,firestore:rules"
