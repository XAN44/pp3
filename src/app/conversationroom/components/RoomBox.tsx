'use client'

import { Conversation, Message, User } from '@prisma/client'
import { useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { format } from 'date-fns'
import { useSession } from 'next-auth/react'
import clsx from 'clsx'
import { FullconversationType } from '@/types'
import useOtheruser from '@/app/hooks/useOtheruser'
import Avatars from '@/components/sidebar/Avatar'
import useOtherChat from '@/app/hooks/useOtherchat'
import { getUserinchat } from '@/types/chatindex'

interface ConversationBoxProps {
  data: getUserinchat
  selected?: boolean
}

const RoomBox: React.FC<ConversationBoxProps> = ({ data, selected }) => {
  const otherUser = useOtherChat(data)
  const session = useSession()
  const router = useRouter()

  const handle = useCallback(() => {
    router.push(`/conversationroom/${data.id}`)
  }, [data.id, router])

  const lastMessage = useMemo(() => {
    const messages = data.messages || []

    return messages[messages.length - 1]
  }, [data.messages])

  const userEmail = useMemo(
    () => session.data?.user?.email,
    [session.data?.user?.email]
  )

  const hasSeen = useMemo(() => {
    if (!lastMessage) {
      return false
    }

    const seenArray = lastMessage.seen || []

    if (!userEmail) {
      return false
    }

    return seenArray.filter((user) => user.email === userEmail).length !== 0
  }, [userEmail, lastMessage])

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) {
      return 'Sent an image'
    }

    if (lastMessage?.text) {
      return lastMessage?.text
    }

    return 'Started a conversation'
  }, [lastMessage])
  return (
    <div
      onClick={handle}
      className={clsx(
        `
       relative 
        flex 
        w-full 
        cursor-pointer 
        items-center 
        space-x-3 
        rounded-lg
        p-3
        transition
        hover:bg-neutral-100

        `,
        selected ? 'bg-neutral-100' : 'bg-white'
      )}
    >
      <Avatars user={otherUser} />
      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <div
            className="
                    mb-1
                    flex
                    items-center
                    justify-between
                    "
          >
            <p className="text-md font-medium text-gray-900">
              {data.name || otherUser?.name}
            </p>
            {lastMessage?.createdAt && (
              <p
                className="
                            text-xs
                            font-light
                            text-gray-400
                            "
              >
                {format(new Date(lastMessage.createdAt), 'p')}
              </p>
            )}
          </div>
          <p
            className={clsx(
              `
                    truncate
                    text-sm
                    `,
              hasSeen ? 'text-gray-500' : 'font-medium text-black'
            )}
          >
            {lastMessageText}
          </p>
        </div>
      </div>
    </div>
  )
}

export default RoomBox
