import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { postId, userId ,checkLike , path} = await request.json();

    const isAlreadyLike = await db.like.findFirst({
      where: {
        postId,
        userId,
      },
    });

    if (isAlreadyLike) {
      // If already liked, unlike the post
      const unLike = await db.like.deleteMany({
        where: {
          userId,
          postId,
          isLiked:checkLike

        },
      });

      console.log(`unlike relation: ${JSON.stringify(unLike)}`);
    } else {
      // If not liked, create a new like
      const newLike = await db.like.create({
        data: {
          postId,
          userId,
          isLiked:checkLike
        },
      });

      console.log("Added new like:", newLike);
    }
    revalidatePath(path)
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: error });
  }
}



export async function DELETE(request: Request) {
  try {
    const { postId, userId ,checkLike } = await request.json();

    const isAlreadyLike = await db.like.findFirst({
      where: {
        postId,
        userId,
      },
    });

    if (isAlreadyLike) {
      // If already liked, unlike the post
      const unLike = await db.like.deleteMany({
        where: {
          userId,
          postId,
          isLiked:checkLike
        },
      });

      console.log(`unlike relation: ${JSON.stringify(unLike)}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: error });
  }
}
export async function GET(request: Request) {
    const { postId } = await request.json();
    try {
        const like = await db.like.count({
            where: {
                postId
            }
        });
        return {
            body: JSON.stringify({ totalLike: like }),
            headers: {
                'Content-Type': 'application/json'
            }
        };
    } catch (error) {
        return {
            status: 500,
            body: JSON.stringify({ error: error })
        };
    }
}