import { revalidatePath } from 'next/cache'
import { U } from '../../types/joinEvent'
import { db } from '../db'
import { getCurrentUser } from '../session'

const DashBoardActivity = async (): Promise<U[]> => {
  const user = await getCurrentUser()
  if (!user?.id) {
    return []
  }
  try {
    const userJon = await db.registerEvent.findMany({
      where: {
        userID: user?.id,
      },
      include: {
        event: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
        },
      },
    })

    const Schema: U[] = userJon.map((a) => ({
      RegisterEvent: [a],
    }))

    revalidatePath('/')
    return Schema
  } catch (error) {
    console.log(error)
    return []
  }
}

export default DashBoardActivity
