import { NextResponse } from 'next/server'
import { db } from '../../../lib/db'
import { getCurrentUser } from '../../../lib/session'

// API route to fetch notifications
export async function GET(request: Request) {
  try {
    const user = await getCurrentUser()

    const notifications = await db.notification.findMany({
      where: {
        userId: user?.id,
        // Ensure to include conditions to fetch the `remember` notifications
        body: {
          contains: 'มีกิจกรรม',
        },
      },
      select: {
        id: true,
        body: true,
        createAt: true,
        eventId: true,
      },
    })

    return NextResponse.json(notifications)
  } catch (error) {
    console.error('Error fetching notifications:', error)
    return NextResponse.json(
      { error: 'Failed to fetch notifications' },
      { status: 500 }
    )
  }
}
