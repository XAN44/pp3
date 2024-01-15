import multer from "multer";
import jwt from "jsonwebtoken"; // แก้ไข import statement
import express from "express";
import session from "express-session";

import configDotenv from "dotenv"; // เพิ่ม import statement
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

configDotenv.config({
  path: "C:/agric/agric-production/.env",
});
dotenv.config();

export const sessionOptions = {
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  },
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "C:/agric/agric-production/public/profileImages"); // แก้ path ตรงนี้
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

export const upload = multer({ storage });

export function uploadProfileImageMiddleware(req, res) {
  try {
    const profileImageUrl = `/profileImages/${req.file.filename}`;
    res.status(200).json({ imageUrl: profileImageUrl });
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการอัปโหลดรูปภาพ:", error);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการอัปโหลดรูปภาพ" });
  }
}

export function createJWTToken(userId) {
  const secretKey = process.env.SECRET_KEY;
  if (!secretKey) {
    console.log("Secret_key incorrect");
    process.exit(1);
  }
  const payload = {
    userId,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
  };
  try {
    const token = jwt.sign(payload, secretKey);
    return token;
  } catch (error) {
    console.log("เกิดข้อผิดพลาดในการสร้าง Token", error);
    return null;
  }

  function createCookie(res, token) {
    res.cookie("token", token, {
      httpOnly: false, // ห้ามเอา token ด้วย Javascript (เพราะเป็น sensitive data)
      secure: true, // ไว้ใช้งานใน HTTPS เท่านั้น
      sameSite: "none", // ระบุว่า cookie จะส่งได้ไฟล์เดียวกับโดเมนเท่านั้น
      maxAge: 1000 * 60 * 60 * 24, // หมดอายุหลังจาก 24 ชั่วโมง
      path: "/", // สามารถใช้งานได้ทุก path ของเว็บไซต์
    });
  }
}

function createCookie(res, token) {
  res.cookie("token", token, {
    httpOnly: false, // ห้ามเอา token ด้วย Javascript (เพราะเป็น sensitive data)
    secure: true, // ไว้ใช้งานใน HTTPS เท่านั้น
    sameSite: "none", // ระบุว่า cookie จะส่งได้ไฟล์เดียวกับโดเมนเท่านั้น
    maxAge: 1000 * 60 * 60 * 24, // หมดอายุหลังจาก 24 ชั่วโมง
    path: "/", // สามารถใช้งานได้ทุก path ของเว็บไซต์
  });
}
