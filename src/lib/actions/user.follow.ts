"use server";

import { revalidatePath } from "next/cache";
import { db } from "../db";
import { getCurrentUser } from "../session";

interface Props {
  accountId: string;
  path: string;
}

export async function Follower({ accountId, path }: Props) {
  // Todo: เช็คผู้ใช้ที่กำลัง Login
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    // ! เตือนให้ผู้ใช้เข้าสู่ระบบใหม่
    throw new Error("Pless Login");
  }

  try {
    // Todo:เช็คว่าเป้าหมายที่ต้องการติดตามมีอยู่จริงไหม
    const findAccournt = await db.follows.findFirst({
      where: {
        follower: {
          id: accountId,
        },
      },
    });

    // * หากมีให้เข้าเงื่อนไขด้านล่างนี้
    // Todo:เช็คว่ามีการติดตามเป้าหมายแล้วหรือไม่
    // !โดยไม่ให้มีการติดตามซ้ำ
    if (!findAccournt) {
      const isAlreadyFollowing = await db.follows.findFirst({
        where: {
          follower: { id: currentUser.id },
          following: { id: accountId },
        },
      });
      //  *ถ้าเงื่อนไขผ่าน จะทำการสร้างการติดตามผู้ใช้คนนั้นๆ
      if (!isAlreadyFollowing) {
        const newFollower = await db.follows.create({
          data: {
            follower: { connect: { id: currentUser.id } },
            following: { connect: { id: accountId } },
          },
        });
        console.log("Added new follow:", newFollower);
      } else {
        console.log("Already following this account");
      }
    }

    revalidatePath(path);
    return;
  } catch (error) {
    throw new Error("Error somthing wrong!");
  }
}

export async function getTotalFollower(accountid: string) {
  try {
    const followers = await db.follows.findMany({
      where: {
        following: {
          id: accountid,
        },
      },
      include: {
        follower: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });
    return followers;
  } catch (error) {}
}
