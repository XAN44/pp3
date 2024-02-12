import { db } from '@/lib/db'
import { getCurrentUser } from '@/lib/session'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const user = await getCurrentUser()
    if (user?.id) {
      const event = await db.searchHistory.findMany({
        select: {
          id: true,
          user: {
            select: {
              id: true,
              image: true,
              name: true,
            },
          },
        },
        orderBy: {
          timestamp: 'desc',
        },
      })
      return NextResponse.json(event)
    }
  } catch (error) {
    return NextResponse.json(
      { message: 'มีข้อผิดพลาดบางอย่าง' },
      { status: 500 }
    )
  }
}
