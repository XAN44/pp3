# 🏘️ Community Platform — Graduation Project

เว็บไซต์ชุมชนออนไลน์สำหรับกระจายข่าวสาร จัดกิจกรรม 
และเชื่อมต่อผู้คนในชุมชนเดียวกัน สร้างขึ้นเพื่อแก้ปัญหา
การสื่อสารที่กระจัดกระจายภายในชุมชน

---

## ✨ Features

**Content**
- 📰 Blog — เขียนบทความด้วย Rich Text Editor (Tiptap/Quill)
- 📅 Event — สร้างและจัดการกิจกรรม/การนัดหมายในชุมชน
- 📝 Post — แชร์เนื้อหาชีวิตประจำวัน

**Social**
- 💬 Real-time Chat ด้วย Socket.io + Pusher
- 👍 Like / Follow — ติดตามและมีส่วนร่วมกับเนื้อหา
- 👤 User Profile — จัดการโปรไฟล์ส่วนตัว

**Auth & Upload**
- 🔐 Google OAuth ผ่าน NextAuth
- 🖼️ อัปโหลดรูปภาพผ่าน Cloudinary / EdgeStore / Uploadthing

---

## 🏗️ Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js 14, TypeScript |
| Real-time | Socket.io + Pusher |
| Auth | NextAuth (Auth.js) + Google OAuth |
| ORM | Prisma |
| Database | PostgreSQL / MySQL / Supabase |
| State | Zustand + SWR |
| UI | TailwindCSS, Radix UI, NextUI, Mantine, Chakra UI |
| Form | React Hook Form + Zod |
| Editor | Tiptap + Quill |
| Dev Watch | Nodemon |

---

## 📁 โครงสร้างสำคัญ
```
pp3/
├── server/          # Custom server — Socket.io + Express
├── prisma/          # Database schema
├── drawing.drawio   # Database design diagram
├── rest.http        # API testing
├── src/             # Next.js app directory
└── nodemon.json     # Watch server
```

---

## 🚀 เริ่มใช้งาน
```bash
npm install
cp .env.example .env   # ตั้งค่า DATABASE_URL, NEXTAUTH_SECRET, Google OAuth
npx prisma db push
npm run dev
```

> ⚠️ ต้องรันผ่าน custom server เสมอ — ไม่รองรับ Vercel
