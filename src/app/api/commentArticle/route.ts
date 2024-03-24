import { db } from '@/lib/db'
import { getCurrentUser } from '@/lib/session'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser()
    const { articleId, text, authorid } = await request.json()

    if (!articleId) {
      return NextResponse.json(
        { message: 'กรุณาใส่ ID ของบทความ' },
        { status: 400 }
      )
    }

    const inArticle = await db.article.findFirst({
      where: {
        id: articleId,
      },
    })

    if (!inArticle) {
      return NextResponse.json(inArticle)
    }

    if (inArticle) {
      const createComment = await db.comment.create({
        data: {
          articleId,
          text,
          authorid,
        },
      })
      return NextResponse.json(createComment)
    }
  } catch (error) {
    return NextResponse.json(error)
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const articleId = searchParams.get('articleId') || ''

    const comments = await db.article.findMany({
      where: {
        id: articleId,
      },
      include: {
        comment: {
          select: {
            id: true,
            text: true,
            author: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
        },
      },
    })
    console.log(comments)
    return NextResponse.json(comments)
  } catch (error) {
    return NextResponse.json(
      { message: 'เกิดข้อผิดพลาดบางอย่าง' },
      { status: 500 }
    )
  }
}
