import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const topArticle = await db.event.findMany({
      select: {
        id: true,
        title: true,
        author: {
          select: {
            name: true,
            image: true,
          },
        },
        eventImage: true,
        Visit: true,
      },
      take: 3,
      orderBy: {
        Visit: {
          _count: 'desc',
        },
      },
    })
    return NextResponse.json(topArticle)
  } catch (error) {
    console.error(error)
    return {
      status: 500,
      body: { error: 'Internal Server Error' },
    }
  }
}
