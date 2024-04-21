import { revalidatePath } from 'next/cache'
import { db } from '../db'
import { getCurrentUser } from '../session'

export async function getEVENTALL() {
  try {
    const user = await getCurrentUser()
    if (!user?.id) {
      return []
    }

    const userJoin = await db.event.findMany({
      where: {
        tag: {
          some:{
            tag:'ท่องเที่ยว'
          }
        }
      },
      include: {
        tag: true,
        author: true,
        Visit:true
      }
    })
    revalidatePath('/')
    return userJoin
  } catch (error) {}
}
