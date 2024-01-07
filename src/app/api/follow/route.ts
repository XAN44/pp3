import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  AccountFollower: string;
  AccountFollowing: string;
  path: string;
};
export async function POST(
  req: NextRequest,
  res: NextResponse,
  { AccountFollower, AccountFollowing, path }: Params
) {
  const Follow = AccountFollower;
  const Following = AccountFollowing;
  try {
    if (Follow === Following) {
      return NextResponse.json(
        { message: "ไม่สามารถติดตามตัวเองได้" },
        { status: 400 }
      );
    }
    const isAlreadyFollow = await db.follows.findFirst({
      where: {
        followerId: Follow,
        followingId: Following,
      },
    });
    if (isAlreadyFollow) {
      return NextResponse.json(
        {
          message: `คุณได้ติดตาม ${Following} แล้ว จึงไม่สามารถติดตามซ้ำได้อีก`,
        },
        { status: 400 }
      );
    }
    const newFollow = await db.follows.create({
      data: {
        followerId: Follow,
        followingId: Following,
      },
    });
    revalidatePath(path);
    console.log(`ติดตามสำเร็จ ${newFollow}`);
    return NextResponse.json({ message: "ติดตามสำเร็จ" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "ERROR" }, { status: 500 });
  }
}
