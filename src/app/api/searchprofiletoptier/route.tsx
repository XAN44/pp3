import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const topArticle = await db.user.findMany({
      select: {
        id: true,
        name: true,
        image: true,
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
    return NextResponse.json(
      { message: 'มีข้อผิดพลาดบางอย่าง' },
      { status: 500 }
    )
  }
}
