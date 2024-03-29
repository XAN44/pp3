import { db } from '@/lib/db'
import { getCurrentUser } from '@/lib/session'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser()

    const { id, currentId } = await request.json()
    if (!id) {
      return NextResponse.json(
        { message: 'กรุณาใส่ ID ของบทความ' },
        { status: 400 }
      )
    }

    if (!user) {
      return NextResponse.json({ message: 'กรุณาเข้าสู่ระบบ' }, { status: 401 })
    }

    const findarticle = await db.article.findFirst({
      where: {
        id: id,
      },
    })
    if (findarticle) {
      const existingLike = await db.like.findFirst({
        where: {
          userId: user.id,
          articleId: id,
        },
      })
      if (existingLike) {
        const unlike = await db.like.delete({
          where: {
            id: existingLike.id,
          },
        })
        return NextResponse.json(unlike)
      }
      if (!existingLike) {
        const like = await db.like.create({
          data: {
            userId: user?.id,
            articleId: id,
          },
        })
        return NextResponse.json(like)
      }
    }
  } catch (error) {
    return NextResponse.json(
      { message: 'มีข้อผิดพลาดบางอย่าง' },
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  try {
    const user = await getCurrentUser()
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id') || ''
    // const currentId = searchParams.get('currentId') || ''

    const ArticleId = await db.article.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
      },
    })

    if (ArticleId) {
      // เช็คว่าผู้ใช้ปัจจุบันได้กดไลค์บทความนี้หรือไม่
      const existingLike = await db.like.findFirst({
        where: {
          userId: user?.id,
          articleId: id,
        },
        select: {
          id: true,
        },
      })

      const totalLike = await db.like.count({
        where: {
          articleId: id,
        },
        select: {
          id: true,
        },
      })

      return NextResponse.json({
        liked: !!existingLike?.id,
        totalLike: totalLike.id,
      })
    }
    return NextResponse.json(ArticleId)
  } catch (error) {
    return NextResponse.json(
      { message: 'เกิดข้อผิดพลาดบางอย่าง' },
      { status: 500 }
    )
  }
}
