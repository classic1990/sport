# 📋 SportCut - โครงสร้างหมวดหมู่ถาวร

## 🎯 แนวคิดหลัก
**แยกข้อมูลเป็น 2 ส่วน: หมวดหมู่ถาวร และ ข้อมูลยืดหยุ่น**

---

## 🏆 ข้อมูลที่เก็บไว้ถาวร (หมวดหมู่หลัก)

### 📊 **5 ลีกใหญ่**
- 🏴󠁧󠁢󠁥󠁮󠁧󠁿 **Premier League** (20 ทีม)
- 🇪🇸 **La Liga** (20 ทีม)
- 🇮🇹 **Serie A** (20 ทีม)
- 🇩🇪 **Bundesliga** (18 ทีม)
- 🇫🇷 **Ligue 1** (18 ทีม)

### ⚽ **96 ทีม** พร้อมข้อมูลครบ:
- 📛 **ชื่อทีม** (ไทย + อังกฤษ)
- 🎨 **โลโก้ทีม** (URL จาก Wikipedia)
- 🏷️ **สีทีม** (Primary + Secondary)
- 🌈 **Gradient Theme** (สำหรับ UI)
- 📊 **Short Name** (3 ตัวอักษร)

### 🏷️ **โครงสร้างหมวดหมู่** ที่ผู้ใช้เห็น:
```
🏆 Premier League
  ├── แมนเชสเตอร์ ยูไนเต็ด
  ├── ลิเวอร์พูล
  ├── อาร์เซนอล
  └── ... (20 ทีม)

🏆 La Liga  
  ├── เรอัล มาดริด
  ├── บาร์เซโลน่า
  └── ... (20 ทีม)
```

---

## 🔄 ข้อมูลที่อัปเดตได้ (ยืดหยุ่น)

### 📸 **รูปนักเตะ**
- ➕ **เพิ่มได้ไม่จำกัด**
- 🗑️ **ลบได้**
- 🏷️ **จัดหมวดหมู่ตามทีม**

### 🏷️ **Tags ของรูป**
- ตำแหน่ง (กองหน้า, กองกลาง, กองหลัง)
- อารมณ์ (ดีใจ, โกรธ, เศร้า)
- การกระทำ (ฉลองประตู, จ่ายบอล, ทำประตู)
- กิจกรรม (อบรม, สัมภาษณ์, โฆษณา)

### 👤 **ชื่อนักเตะ**
- ชื่อจริง (ภาษาอังกฤษ)
- สามารถเพิ่มนักเตะใหม่ๆ ได้

---

## 🛡️ การปกป้องข้อมูล (Security Rules)

### 🏆 **ข้อมูลหลัก (Leagues + Teams)**
- 🌍 **ทุกคนอ่านได้** - ดูหมวดหมู่ได้
- 🔐 **Admin เพิ่ม/แก้ไขได้** - อัปเดตข้อมูลทีม
- 🚫 **ห้ามลบเด็ดขาด** - ปกป้องหมวดหมู่ถาวร

### 📸 **รูปภาพ (Images)**
- 🌍 **ทุกคนอ่านได้** - ดูรูปนักเตะ
- 🔐 **Admin จัดการได้เต็มที่** - เพิ่ม/ลบ/แก้ไขรูป

---

## 🔧 Firestore Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // ข้อมูลหลัก (leagues) - ปกป้องไว้
    match /leagues/{leagueId} {
      allow read: if true;
      allow create, update: if request.auth != null;
      allow delete: if false; // ห้ามลบ
    }
    
    // ข้อมูลหลัก (teams) - ปกป้องไว้
    match /teams/{teamId} {
      allow read: if true;
      allow create, update: if request.auth != null;
      allow delete: if false; // ห้ามลบ
    }
    
    // รูปภาพ - จัดการได้เต็มที่
    match /images/{imageId} {
      allow read: if true;
      allow create, update, delete: if request.auth != null;
    }
  }
}
```

---

## 📊 โครงสร้างฐานข้อมูล

### 🏆 **Collections ถาวร**
```javascript
// leagues collection
{
  "id": "premier-league",
  "name": "Premier League",
  "thaiName": "พรีเมียร์ลีก",
  "logo": "https://...",
  "country": "England"
}

// teams collection  
{
  "id": "manchester-united",
  "name": "Manchester United",
  "thaiName": "แมนเชสเตอร์ ยูไนเต็ด",
  "leagueId": "premier-league",
  "logo": "https://...",
  "colors": { "primary": "#DA020E", "secondary": "#FBE122" }
}
```

### 📸 **Collection ยืดหยุ่น**
```javascript
// images collection
{
  "teamId": "manchester-united",
  "playerName": "Bruno Fernandes",
  "urls": {
    "thumbnail": "https://...",
    "preview": "https://...",
    "full": "https://..."
  },
  "tags": ["กองกลาง", "กัปตัน", "ดีใจ"],
  "type": "cutout",
  "createdAt": "2024-01-01"
}
```

---

## 🚀 ขั้นตอน Setup

1. **อัปเดต Firestore Rules**
   - ไปที่ Firebase Console → Firestore Database → Rules
   - แทนที่ด้วย rules ข้างบน
   - คลิก "Publish"

2. **Seed ข้อมูลหลัก**
   - รัน `node scripts/seedFirestore.js`
   - จะได้ 5 ลีก + 96 ทีม

3. **ทดสอบระบบ**
   - หน้าบ้าน: ดูหมวดหมู่ได้
   - Admin: เพิ่มรูปได้

---

## 🎯 ผลลัพธ์ที่ได้

**ผู้ใช้จะเห็นว่า:**
> "ที่นี่มีหมวดหมู่ฟุตบอลครบ 5 ลีกใหญ่ 96 ทีม และสามารถดูรูปนักเตะได้เรื่อยๆ"

**Admin สามารถ:**
- เพิ่มรูปนักเตะในทีมที่มีอยู่แล้ว
- อัปเดตข้อมูลทีม (โลโก้, สี)
- จัดการรูปภาพได้เต็มที่
- **แต่ไม่สามารถลบทีมหรือลีกหลักได้**

---

## 🔐 ความปลอดภัย

- ✅ **ข้อมูลหลักปลอดภัย** - ไม่มีวันหาย
- ✅ **Admin สามารถจัดการ** - แต่ในขอบเขตที่กำหนด
- ✅ **ผู้ใช้ทั่วไป** - ดูข้อมูลได้เต็มที่
- ✅ **ระบบ URL Upload** - ฟรี ไม่ต้องจ่าย Storage

**ระบบนี้ทำให้มั่นใจว่าหมวดหมู่หลักจะอยู่ถาวร แต่ยังคงความยืดหยุ่นในการเพิ่มเนื้อหาได้!** 🎯
