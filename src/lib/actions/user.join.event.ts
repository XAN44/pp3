import { revalidatePath } from 'next/cache'
import { db } from '../db'
import { getCurrentUser } from '../session'

export async function getEventHasJoin() {
  try {
    const user = await getCurrentUser()
    if (!user?.id) {
      return []
    }

    const userJoin = await db.registerEvent.findMany({
      where: {
        userID: user?.id,
      },
      include: {
        event: {
          include: {
            Visit:true,
            tag:true,
            author:true
          }
        },
        user: {
          include: {
            Event:true,
          },
        },
      },
    })
    revalidatePath('/')
    return userJoin
  } catch (error) {}
}
