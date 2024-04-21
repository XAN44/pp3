import { useSession } from 'next-auth/react'
import { useMemo } from 'react'
import { User } from '@prisma/client'
import { getUserinchat } from '@/types/chatindex'

const useOtherChat = (
  conversation:
    | getUserinchat
    | {
        users: User[]
      }
) => {
  const session = useSession()
  const otherUser = useMemo(() => {
    const currentUserName = session.data?.user.name

    const otherUser = conversation.users.filter(
      (User) => User.name !== currentUserName
    )
    return otherUser[0]
  }, [session.data?.user.name, conversation.users])
  return otherUser
}

export default useOtherChat
