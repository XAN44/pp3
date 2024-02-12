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
  return NextResponse.json({ message: 'มีข้อผิดพลาดบางอย่าง' }, { status: 500 })
  }
}
