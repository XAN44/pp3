import { db } from '../db'
import { getCurrentUser } from '../session'

const getConversationRoomById = async (conversationroomId: string) => {
  try {
    const currentUser = await getCurrentUser()

    if (!currentUser?.email) {
      return null
    }

    if (!conversationroomId) {
      return null
    }

    const room = await db.room.findUnique({
      where: {
        id: conversationroomId,
      },
      include: {
        users: true,
      },
    })
    return room
  } catch (error) {
    console.log(error)
    return null
  }
}

export default getConversationRoomById
