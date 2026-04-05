# SPORTCUT Deploy Script
# สคริปต์สำหรับ deploy แอพขึ้น Vercel
# วิธีใช้: .\deploy.ps1

param(
    [switch]$Preview = $false,
    [switch]$BuildOnly = $false
)

$ErrorActionPreference = "Stop"

Write-Host @"
╔══════════════════════════════════════════════════════════════╗
║                    SPORTCUT DEPLOY SCRIPT                     ║
║              Deploy แอพขึ้น Vercel อัตโนมัติ                 ║
╚══════════════════════════════════════════════════════════════╝
"@ -ForegroundColor Cyan

# 1. ตรวจสอบ Prerequisites
Write-Host "`n📋 ตรวจสอบ Prerequisites..." -ForegroundColor Yellow

$nodeVersion = node --version 2>$null
$npmVersion = npm --version 2>$null
$vercelVersion = npx vercel --version 2>$null

if (-not $nodeVersion) {
    Write-Error "❌ Node.js ไม่ได้ติดตั้ง กรุณาติดตั้งก่อน: https://nodejs.org"
    exit 1
}

if (-not $npmVersion) {
    Write-Error "❌ npm ไม่พบ"
    exit 1
}

Write-Host "  ✓ Node.js: $nodeVersion" -ForegroundColor Green
Write-Host "  ✓ npm: $npmVersion" -ForegroundColor Green

# 2. ตรวจสอบ Environment Variables
Write-Host "`n🔐 ตรวจสอบ Environment Variables..." -ForegroundColor Yellow

if (-not (Test-Path ".env")) {
    if (Test-Path ".env.example") {
        Write-Host "  ⚠️ ไม่พบไฟล์ .env" -ForegroundColor Red
        Write-Host "  สร้างไฟล์ .env จาก .env.example..." -ForegroundColor Yellow
        Copy-Item ".env.example" ".env"
        Write-Host "  📝 โปรดแก้ไขไฟล์ .env ด้วย Firebase config จริงของคุณ" -ForegroundColor Red
        Write-Host "  แล้วรันสคริปต์ใหม่อีกครั้ง" -ForegroundColor Red
        exit 1
    }
}

# ตรวจสอบว่า .env มีค่าจริงหรือไม่
$envContent = Get-Content ".env" -Raw
if ($envContent -match "your_") {
    Write-Host "  ⚠️ ไฟล์ .env ยังมี placeholder (your_*)" -ForegroundColor Red
    Write-Host "  โปรดแก้ไข .env ด้วย Firebase config จริง" -ForegroundColor Red
    exit 1
}

Write-Host "  ✓ .env พร้อมใช้งาน" -ForegroundColor Green

# 3. Install dependencies
Write-Host "`n📦 Install Dependencies..." -ForegroundColor Yellow

if (-not (Test-Path "node_modules")) {
    Write-Host "  กำลัง install dependencies (ครั้งแรก)..." -ForegroundColor Gray
    npm install
} else {
    Write-Host "  node_modules มีอยู่แล้ว" -ForegroundColor Green
}

# 4. Build project
Write-Host "`n🔨 Build Project..." -ForegroundColor Yellow

# เคลียร์ dist เก่า
if (Test-Path "dist") {
    Remove-Item "dist" -Recurse -Force
}

npm run build

if (-not (Test-Path "dist/index.html")) {
    Write-Error "❌ Build failed - dist/index.html ไม่พบ"
    exit 1
}

Write-Host "  ✓ Build สำเร็จ (dist/ พร้อม)" -ForegroundColor Green

if ($BuildOnly) {
    Write-Host "`n✅ Build เสร็จแล้ว (ไม่ deploy)" -ForegroundColor Green
    exit 0
}

# 5. Deploy
Write-Host "`n🚀 Deploy ขึ้น Vercel..." -ForegroundColor Yellow

# ตรวจสอบ vercel CLI
$vercelInstalled = npx vercel --version 2>$null
if (-not $vercelInstalled) {
    Write-Host "  ติดตั้ง Vercel CLI..." -ForegroundColor Gray
    npm install -g vercel
}

# ตรวจสอบ login
$vercelAuth = npx vercel whoami 2>$null
if (-not $vercelAuth) {
    Write-Host "  🔑 กรุณา login Vercel..." -ForegroundColor Yellow
    npx vercel login
}

# Deploy
if ($Preview) {
    Write-Host "  🌐 Deploy as Preview..." -ForegroundColor Gray
    npx vercel --yes
} else {
    Write-Host "  🌐 Deploy to Production..." -ForegroundColor Gray
    npx vercel --prod --yes
}

Write-Host @"

╔══════════════════════════════════════════════════════════════╗
║                     ✅ DEPLOY สำเร็จ!                         ║
╚══════════════════════════════════════════════════════════════╝

"@ -ForegroundColor Green

Write-Host "📌 ขั้นตอนถัดไป:" -ForegroundColor Yellow
Write-Host "   1. ตรวจสอบเว็บไซต์ที่ URL ที่ Vercel ให้มา"
Write-Host "   2. Seed ข้อมูล: cd scripts && node seedFirestore.js"
Write-Host "   3. ทดสอบ Admin Dashboard ที่ /admin/login"
