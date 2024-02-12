import { db } from '@/lib/db'
import { getCurrentUser } from '@/lib/session'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const user = await getCurrentUser()
    if (user?.id) {
      const article = await db.searchHistory.findMany({
        where: {
          userId: user.id,
        },
        select: {
          id: true,
          article: {
            select: {
              id: true,
              ArticleImage: true,
              title: true,
              author: {
                select: {
                  name: true,
                  image: true,
                },
              },
            },
          },
        },
        orderBy: {
          timestamp: 'desc',
        },
      })
      return NextResponse.json(article)
    }
  } catch (error) {
    return NextResponse.json(
      { message: 'มีข้อผิดพลาดบางอย่าง' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const { id } = await request.json()
    const user = await getCurrentUser()

    const history = await db.searchHistory.create({
      data: {
        userId: user?.id,
        getSearch: id,
        articleId: id,
      },
    })
    console.log(history)
    return NextResponse.json(history)
  } catch (error) {
    return NextResponse.json(
      { message: 'มีข้อผิดพลาดบางอย่าง' },
      { status: 500 }
    )
  }
}
