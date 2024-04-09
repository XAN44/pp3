import { db } from '@/lib/db'
import { getCurrentUser } from '@/lib/session'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const user = await getCurrentUser()

    const getNoti = await db.notification.findMany({
      where: {
        userId: user?.id,
      },
      select: {
        id: true,
        body: true,
        current:true,
        articleId:true,
        postId:true,
        eventId:true,
        
      },
    })
    return NextResponse.json(getNoti)
  } catch (error: any) {
    console.error(`Error fetching notifications: ${error.message}`)
    throw new Error('Failed to fetch notifications')
  }
}


