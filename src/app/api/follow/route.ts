import { db } from '@/lib/db'
import { getCurrentUser } from '@/lib/session'
import { NextResponse } from 'next/server'
export async function POST(request: Request) {
  try {
    const user = await getCurrentUser()
    const { authorId } = await request.json()

    if (!authorId) {
      return NextResponse.json(
        { message: 'ไม่พบ authorId ของผู้ที่ต้องการติดตาม' },
        { status: 400 }
      )
    }

    if (!user?.id) {
      return NextResponse.json(
        {
          message: 'กรุณาเข้าสู่ระบบก่อน',
        },
        { status: 400 }
      )
    }

    const checkfollow = await db.follows.findFirst({
      where: {
        followerId: user?.id,
        followingId: authorId,
      },
      select: {
        id: true,
      },
    })
    if (!checkfollow) {
      const follow = await db.follows.create({
        data: {
          follower: {
            connect: { id: user?.id },
          },
          following: {
            connect: {
              id: authorId,
            },
          },
        },
        select: {
          id: true,
        },
      })
      if (follow) {
        await db.notification.create({
          data: {
            id: authorId,
            userId: authorId,
            body: `@${user?.name} ได้ติดตามคุณ`,
          },
        })
      }
      return NextResponse.json(follow)
    }

    if (checkfollow) {
      const unfollow = await db.follows.delete({
        where: {
          followerId_followingId: {
            followerId: user.id,
            followingId: authorId,
          },
        },
      })
      return NextResponse.json(unfollow)
    }
    return NextResponse.json(checkfollow)
  } catch (error) {
    return NextResponse.json(
      { message: 'มีข้อผิดพลาดบางอย่างให้ไม่สามารถติดตามได้' },
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  try {
    const user = await getCurrentUser()
    const { searchParams } = new URL(request.url)
    const authorId = searchParams.get('authorId')

    const checkFollow = await db.follows.findFirst({
      where: {
        followerId: user?.id,
        followingId: authorId || '',
      },
      select: {
        id: true,
      },
    })

    return NextResponse.json({ Followed: !!checkFollow?.id })
  } catch (error) {
    return NextResponse.json(
      { message: 'มีข้อผิดพลาดบางอย่างให้ไม่สามารถติดตามได้' },
      { status: 401 }
    )
  }
}
