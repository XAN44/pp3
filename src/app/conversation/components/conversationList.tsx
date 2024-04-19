'use client'
import useConversation from '@/app/hooks/useConversation'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { MdOutlineGroupAdd } from 'react-icons/md'
import ConversationBox from './ConversationBox'
import { FullconversationType } from '@/types'
import { useSession } from 'next-auth/react'
import { pusherClient } from '@/lib/pusher'

interface ConversationProps {
  initialItem: FullconversationType[]
}

const ConversationList: React.FC<ConversationProps> = ({ initialItem }) => {
  const [items, setItems] = useState(initialItem)
  const { data: session } = useSession()
  const router = useRouter()
  const { conversationId, isOpen } = useConversation()

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
            {session?.user.name}
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
          <ConversationBox
            key={index}
            data={item}
            selected={conversationId === item?.id}
          />
        ))}
      </div>
    </aside>
  )
}

export default ConversationList
