'use server'

import { revalidatePath } from 'next/cache'
import { db } from '../db'
import { getCurrentUser } from '../session'
import { user } from '@nextui-org/theme'

export async function Notification(
  userId: string,
  articleId: string,
  body: string,
  path: string
) {
  try {
    const user = await getCurrentUser()
    if (!user?.id) {
      throw new Error('Not have account ')
    }

    const newNoti = await db.notification.create({
      data: {
        body,
        userId,
        articleId,
        current: user.name,
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
        article: {
          select: {
            comment: true,
          },
        },
      },
    })

    revalidatePath(path)
    console.log(
      `ผู้ใช้ ${user.name} ได้แสดงความคิดเห็นในโพสต์ ${newNoti.article?.comment} ของ ${newNoti.user?.name} ด้วยข้อความ ${body}`
    )
  } catch (error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`)
  }
}

export async function GetNotification(accountId: string) {
  try {
    const user = await getCurrentUser()

    const getNoti = await db.notification.findMany({
      where: {
        userId: accountId,
      },
      select: {
        id: true,
        body: true,
      },
    })
    return getNoti
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

export async function getNotificationLike(id: string) {
  try {
    await db.notification.findFirst({
      where: {
        id,
      },
      select: {
        likeId: true,
      },
    })
  } catch (error) {}
}

export async function getNOITI() {
  try {
    const user = await getCurrentUser()
    const getnoti = await db.notification.findMany({
      where: {
        userId: user?.id,
      },
      select: {
        body: true,
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    })
    return getnoti
  } catch (error) {}
}

export async function creatNotificationForLikeArticle(
  userId: string,
  body: string,
  articleId: string,
  likeId: string
) {
  try {
    await db.notification.create({
      data: {
        userId,
        body,
        articleId,
        likeId,
      },
    })
  } catch (error) {}
}

export async function createNotificatipnForJoin(
  userId: string,
  body: string,
  eventId: string
) {
  try {
    if (!userId || !eventId) {
      throw new Error('User ID or Event ID is missing or null')
    }
    await db.notification.create({
      data: {
        userId,
        body,
        eventId,
      },
    })
  } catch (error) {
    throw error
  }
}

export async function createNotificatipnForCommentEvent(
  id: string,
  userId: string,
  body: string,
  eventId: string,
  commentId: string
) {
  try {
    if (!userId || !eventId) {
      throw new Error('User ID or Event ID is missing or null')
    }
    await db.notification.create({
      data: {
        id,
        userId,
        body,
        eventId,
        commentId,
      },
    })
  } catch (error) {
    throw error
  }
}
