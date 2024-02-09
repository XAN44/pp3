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
        eventId: id,
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
