import { getCurrentUser } from '../session'
import { db } from '../db'

const getConverSation = async () => {
  const currentUser = await getCurrentUser()

  if (!currentUser?.id) {
    return []
  }

  try {
    const conversation = await db.conversation.findMany({
      orderBy: {
        lastMessageAt: 'desc',
      },
      where: {
        userIds: {
          has: currentUser.id,
        },
      },
      include: {
        User: true,
        messages: {
          include: {
            sender: true,
          },
        },
      },
    })

    return conversation
  } catch (error) {
    console.log(error)
    return []
  }
}

export default getConverSation
