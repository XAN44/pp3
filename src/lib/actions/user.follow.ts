"use server";
import { db } from "@/lib/db";

import { revalidatePath } from "next/cache";
import { getCurrentUser } from "../session";

interface Follower {
  authorId: string;
  path: string;
}

export async function Follower({ path, authorId }: Follower): Promise<void> {
  try {
    const user = await getCurrentUser();
    if (!user) {
      throw new Error("เข้าสู่ระบบก่อน");
    }

    // ค้นหาข้อมูล Follow ที่ต้องการอัปเดตโดยใช้เงื่อนไขของ user.id ในฟิลด์ FollowerId
    const existingFollow = await db.follow.findFirst({
      where: {
        FollowerId: user.id,
      },
    });

    // ถ้ามีข้อมูล Follow ที่ตรงกับเงื่อนไข (FollowerId เท่ากับ user.id) ให้ทำการอัปเดต
    if (existingFollow) {
      await db.follow.update({
        where: {
          id: existingFollow.id,
        },
        data: {
          FollowingId: authorId,
        },
      });
    } else {
      // ถ้าไม่มีข้อมูล Follow ที่ตรงกับเงื่อนไข (FollowerId เท่ากับ user.id) ให้สร้างข้อมูล Follow ใหม่
      await db.follow.create({
        data: {
          FollowerId: user.id,
          FollowingId: authorId,
        },
      });
    }

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function getFollower(userId: string) {
  const count = await db.follow.count({
    where: {
      FollowerId: userId,
    },
  });
  return count;
}
