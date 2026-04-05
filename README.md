# SPORTCUT

แหล่งรวมไฟล์ PNG นักเตะระดับ 4K (cutout) สำหรับออกแบบโปสเตอร์กีฬา

## ฟีเจอร์

- 🏆 4 ลีกใหญ่: Premier League, La Liga, Serie A, Bundesliga
- 🖼️ รูป cutout นักเตะพร้อมใช้งาน
- 🔍 ระบบค้นหาและกรองตามทีม
- 📌 Pinterest-style pinning system
- 🔐 Admin dashboard สำหรับจัดการรูปภาพ
- 📱 Responsive design

## Tech Stack

- React 19 + Vite 8
- Tailwind CSS 4
- Firebase (Firestore, Storage, Auth, Analytics)
- React Router DOM

## เริ่มต้นใช้งาน

```bash
# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# แก้ไข .env ด้วย Firebase config ของคุณ

# Run development server
npm run dev

# Build for production
npm run build
```

## Environment Variables

สร้างไฟล์ `.env` จาก `.env.example` และกรอกข้อมูล:

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
```

## โครงสร้างโปรเจกต์

```
src/
├── components/    # Reusable components
├── pages/         # Route pages
├── services/      # Firebase services
├── data/          # Mock data & seed
└── hooks/         # Custom hooks
```

## การ Deploy

### Vercel
```bash
vercel --prod
```

### Firebase Hosting
```bash
npm run build
firebase deploy
```

## License

MIT
