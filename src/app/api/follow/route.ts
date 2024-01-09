import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  follower: string;
  following: string;
  path: string;
};
export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();

    const { follower, following }: Params = body;

    if (follower === following) {
      return NextResponse.json(
        { message: "ไม่สามารถติดตามตัวตนตัวเองได้" },
        { status: 400 }
      );
    } else {
      const isAlreadyFollowing = await db.follows.findFirst({
        where: {
          followerId: follower,
          followingId: following,
        },
      });
      if (!isAlreadyFollowing) {
        const newFollow = await db.follows.create({
          data: { followerId: follower, followingId: following },
        });
        console.log("Added new follow:", newFollow);
        return NextResponse.json({ message: "ติดตามสำเร็จ" }, { status: 200 });
      }
    }
  } catch (error) {
    return NextResponse.json(
      { message: "ข้อมูลที่รับมาไม่ถูกต้อง" },
      { status: 400 }
    );
  }
}
