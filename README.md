# 🏘️ Community Platform — Graduation Project

เว็บไซต์ชุมชนออนไลน์สำหรับกระจายข่าวสาร จัดกิจกรรม 
และเชื่อมต่อผู้คนในชุมชนเดียวกัน

---

## 🎯 จุดประสงค์

แก้ปัญหาการสื่อสารในชุมชนที่กระจัดกระจาย 
รวมทุกอย่างไว้ในที่เดียว — ข่าวสาร, กิจกรรม, 
และการพูดคุยแบบ Real-time

---

## ✨ Features

**Content**
- 📰 Blog — เขียนบทความและแชร์ข่าวสารชุมชน
- 📅 Event — สร้างและจัดการกิจกรรม/การนัดหมาย
- 📝 Post — แชร์เนื้อหาชีวิตประจำวัน

**Social**
- 👍 Like / Follow — ติดตามและมีส่วนร่วมกับเนื้อหา
- 💬 Real-time Chat — พูดคุยแบบ Real-time ด้วย Socket.io
- 👤 User Profile — จัดการโปรไฟล์ส่วนตัว

**Auth**
- 🔐 Google OAuth ผ่าน Auth.js

---

## 🏗️ Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js (App Router), TypeScript |
| Real-time | Socket.io (via custom server) |
| Auth | Auth.js + Google OAuth |
| ORM | Prisma |
| UI | TailwindCSS + shadcn/ui |
| Dev Watch | Nodemon |

---

## 📁 โครงสร้างสำคัญ
```
pp3/
├── server/          # Custom server — Socket.io + Next.js
├── prisma/          # Database schema
├── src/             # Next.js app directory
├── drawing.drawio   # Database design diagram
├── rest.http        # API testing
└── nodemon.json     # Watch server
```

---

## ⚠️ หมายเหตุ

- ต้องรันผ่าน custom server เสมอ 
  ไม่ใช่ `next dev` ตรงๆ
- ไม่รองรับ deploy บน Vercel 
  เพราะมี Socket.io
