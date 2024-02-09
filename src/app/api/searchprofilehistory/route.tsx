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
