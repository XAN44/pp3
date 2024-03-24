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
      },
    })
    return NextResponse.json(getNoti)
  } catch (error: any) {
    console.error(`Error fetching notifications: ${error.message}`)
    throw new Error('Failed to fetch notifications')
  }
}

export async function DELETENOTI(id: string, path: string) {
  try {
    const user = await getCurrentUser()

    const check = await db.notification.findFirst({
      where: {
        id,
      },
      select: {
        user: {
          select: {
            id: true,
          },
        },
      },
    })
    if (check?.user?.id === user?.id) {
      const deleteNotification = await db.notification.delete({
        where: {
          id,
        },
      })
    }
    revalidatePath(path)
    return check
  } catch (error) {
    console.error('Error fetching comments:', error)
    throw error
  }
}
