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

interface ConversationBoxProps {
  data: FullconversationType
  selected?: boolean
}

const ConversationBox: React.FC<ConversationBoxProps> = ({
  data,
  selected,
}) => {
  const otherUser = useOtheruser(data)
  const session = useSession()
  const router = useRouter()

  const handle = useCallback(() => {
    router.push(`/conversation/${data.id}`)
  }, [data.id, router])

  const lastMessage = useMemo(() => {
    const message = data.messages || []
    return message[message.length - 1]
  }, [data.messages])

  const userEmail = useMemo(() => {
    return session.data?.user.email
  }, [session.data?.user.email])

  const lastMessageText = useMemo(() => {
    if (lastMessage && lastMessage.text) {
      return 'Sent a message'
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
        bg-white
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
        </div>
      </div>
    </div>
  )
}

export default ConversationBox
