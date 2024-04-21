'use client'
import useConversation from '@/app/hooks/useConversation'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { MdOutlineGroupAdd } from 'react-icons/md'
import { useSession } from 'next-auth/react'
import { getUserinchat } from '@/types/chatindex'
import RoomBox from './RoomBox'
import useRoom from '@/app/hooks/useRoom'
import { User } from '@prisma/client'
import { pusherClient } from '@/lib/pusher'
import { find } from 'lodash'

interface ConversationProps {
  initialItem: getUserinchat[]
}

const RoomList: React.FC<ConversationProps> = ({ initialItem }) => {
  const [items, setItems] = useState(initialItem)

  const { data: session } = useSession()
  const router = useRouter()
  const { conversationroomId, isOpen } = useRoom()

  const pusherKey = useMemo(() => {
    return session?.user?.email
  }, [session?.user?.email])

  useEffect(() => {
    if (!pusherKey) {
      return
    }
    pusherClient.subscribe(pusherKey)

    const newHandler = (conversation: getUserinchat) => {
      setItems((current) => {
        if (find(current, { id: conversation.id })) {
          return current
        }
        return [conversation, ...current]
      })
    }

    const updateHandler = (conversation: getUserinchat) => {
      setItems((current) =>
        current.map((currentRoom) => {
          if (currentRoom.id === conversation.id) {
            return {
              ...currentRoom,
              messages: conversation.messages,
            }
          }
          return currentRoom
        })
      )
    }

    const romveHandler = (conversation: getUserinchat) => {
      setItems((current) => {
        return [...current.filter((convo) => convo.id !== conversation.id)]
      })
      if (conversationroomId !== conversation.id) {
        router.push(`/conversationroom`)
      }
    }

    pusherClient.bind('conversation:new', newHandler)
    pusherClient.bind('conversation:update', updateHandler)
    pusherClient.bind('conversation:remove', romveHandler)

    return () => {
      pusherClient.unsubscribe(pusherKey)
      pusherClient.unbind('conversation:new', newHandler)
      pusherClient.unbind('conversation:update', updateHandler)
      pusherClient.unbind('conversation:romove', romveHandler)
    }
  }, [pusherKey, conversationroomId, router])

  return (
    <aside
      className={clsx(
        `
            fixed
            inset-y-0
            left-0
            mt-14
            block
            w-full
            overflow-y-auto
            border-r
            border-gray-200
            pb-20
            lg:left-20
            lg:block
            lg:w-80
            lg:pb-0
            `,
        isOpen ? 'hidden' : 'left-0 block w-full'
      )}
    >
      <div className="px-5">
        <div className="mb-4 flex justify-between pt-4">
          <div
            className="
                    text-2xl
                    font-bold
                    text-neutral-800
                    "
          >
            Message
          </div>
          <div
            className="
                    cursor-pointer
                    rounded-full
                    bg-gray-100
                    p-2
                    text-gray-600
                    transition
                    hover:opacity-75
                    "
          >
            <MdOutlineGroupAdd size={20} />
          </div>
        </div>

        {items.map((item, index) => (
          <RoomBox
            key={index}
            data={item}
            selected={conversationroomId === item?.id}
          />
        ))}
      </div>
    </aside>
  )
}

export default RoomList
