import { db } from '@/lib/db'
import { getCurrentUser } from '@/lib/session'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser()

    const { id } = await request.json()
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
            isLiked: false,
          },
        })
        return NextResponse.json(unlike)
      }
      if (!existingLike) {
        const like = await db.like.create({
          data: {
            userId: user?.id,
            articleId: id,
            isLiked: true,
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

    const ArticleId = await db.article.findFirst({
      where: {
        id,
      },
    })

    if (ArticleId) {
      const existingLike = await db.like.findFirst({
        where: {
          articleId: id,
          userId: user?.id,
        },
        select: {
          id: true,
          isLiked: true,
        },
      })
      return NextResponse.json(existingLike)
    }
    return NextResponse.json(ArticleId)
  } catch (error) {
    return NextResponse.json(
      { message: 'เกิดข้อผิดพลาดบางอย่าง' },
      { status: 500 }
    )
  }
}
