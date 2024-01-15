import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();

    const { follower, following, path } = body;

    if (!follower || !following) {
      return NextResponse.json(
        { message: "ข้อมูลไม่สมบูรณ์หรือไม่ถูกต้อง" },
        { status: 400 },
      );
    }

    if (follower === following) {
      return NextResponse.json(
        { message: "ไม่สามารถติดตามตัวตนตัวเองได้" },
        { status: 400 },
      );
    }

    const isAlreadyFollowing = await db.follows.findFirst({
      where: {
        followingId: following,
        followerId: follower,
      },
    });

    if (!isAlreadyFollowing) {
      const newFollow = await db.follows.create({
        data: {
          followerId: follower,
          followingId: following,
        },
      });
      revalidatePath(path);
      return NextResponse.json({
        message: "เพิ่มข้อมูลเรียบร้อยแล้ว",
      });
    }

    return NextResponse.json({ message: "ติดตามสำเร็จ" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "ข้อมูลที่รับมาไม่ถูกต้อง" },
      { status: 400 },
    );
  }
}

// * unFollow

export async function DELETE(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();
    const { follower, following } = body;

    if (follower !== following) {
      const isFollow = await db.follows.findFirst({
        where: {
          followerId: follower,
          followingId: following,
        },
      });

      if (isFollow) {
        const unfolow = await db.follows.deleteMany({
          where: {
            followerId: follower,
            followingId: following,
          },
        });
      }
      return NextResponse.json({ mesage: "เลิกติดตามสำเร็จ" });
    }
  } catch (error) {
    return NextResponse.json(
      { message: "ข้อมูลที่รับมาไม่ถูกต้อง" },
      { status: 400 },
    );
  }
}

export async function PUT(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();
    const { follower, following, isFollow } = body;

    const readFollow = await db.follows.findFirst({
      where: {
        followerId: follower,
        followingId: following,
        isFollow: isFollow,
      },
    });
    return NextResponse.json({ message: !!readFollow });
  } catch (error) {
    return NextResponse.json(
      { message: "ข้อมูลที่รับมาไม่ถูกต้อง" },
      { status: 400 },
    );
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();
    const { accountId } = body;

    const totalFollowing = await db.follows.count({
      where: {
        followerId: accountId,
      },
    });
    return NextResponse.json({ message: totalFollowing });
  } catch (error) {
    return NextResponse.json(
      { message: "ข้อมูลที่รับมาไม่ถูกต้อง" },
      { status: 400 },
    );
  }
}
