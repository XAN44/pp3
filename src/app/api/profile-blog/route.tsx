import { db } from '@/lib/db'
import { getCurrentUser } from '@/lib/session'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const queryArticle = searchParams.get('id') || ''

  try {
    const topArticle = await db.article.findMany({
      where: {
        author: {
          id: queryArticle,
        },
      },
      select: {
        id: true,
        title: true,
        author: {
          select: {
            name: true,
            image: true,
          },
        },
        ArticleImage: true,
        Visit: true,
      },
      take: 1,
      orderBy: {
        Visit: {
          _count: 'desc',
        },
      },
    })
    return NextResponse.json(topArticle)
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
    const visit = await db.visit.upsert({
      where: {
        userId: user?.id,
        id: id,
      },
      update: {
        count: { increment: 1 },
      },
      create: {
        articleId: id,
        count: 1,
      },
    })
    if (visit) {
      const searchHistory = await db.searchHistory.create({
        data: {
          userId: user?.id,
          getSearch: id,
          articleId: id,
        },
      })
    }
    return NextResponse.json(visit)
  } catch (error: any) {
    return NextResponse.json(
      { message: 'มีข้อผิดพลาดบางอย่าง' },
      { status: 500 }
    )
  }
}
