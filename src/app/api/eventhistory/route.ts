import { db } from '@/lib/db'
import { getCurrentUser } from '@/lib/session'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const user = await getCurrentUser()
    if (!user?.id) {
      return NextResponse.json({ message: 'Plse login' })
    }
    if (user?.id) {
      const event = await db.searchHistory.findMany({
        select: {
          id: true,
          event: {
            select: {
              id: true,
              eventImage: true,
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
      return NextResponse.json(event)
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
        eventId: id,
      },
    })
    return NextResponse.json(history)
  } catch (error) {
    return NextResponse.json(
      { message: 'มีข้อผิดพลาดบางอย่าง' },
      { status: 500 }
    )
  }
}
