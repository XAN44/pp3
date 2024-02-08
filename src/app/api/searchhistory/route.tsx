import { db } from '@/lib/db'
import { getCurrentUser } from '@/lib/session'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const history = await db.searchHistory.findMany({
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
    })
    return NextResponse.json(history)
  } catch (error) {
    console.error(error)
    return {
      status: 500,
      body: { error: 'Internal Server Error' },
    }
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
    console.error(error)
    return {
      status: 500,
      body: { error: 'Internal Server Error' },
    }
  }
}
