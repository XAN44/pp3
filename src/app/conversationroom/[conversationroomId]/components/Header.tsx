'use client'

import useOtherChat from '@/app/hooks/useOtherchat'
import Avatars from '@/components/sidebar/Avatar'
import { Room, User } from '@prisma/client'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { HiChevronLeft } from 'react-icons/hi'
import { HiEllipsisHorizontal } from 'react-icons/hi2'
import ProfileDrawer from './ProfileDrawer'

interface HeaderProps {
  room: Room & {
    users: User[]
  }
}
const Header: React.FC<HeaderProps> = ({ room }) => {
  const otherUser = useOtherChat(room)

  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <>
      <ProfileDrawer
        data={room}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
      <div
        className="
        flex
        w-full
        items-center 
        justify-between
        border-r-[1px]
        bg-white
        px-4
        py-3
        shadow-sm
        lg:px-6
        "
      >
        <div
          className="
            flex 
            items-center 
            gap-3 
            "
        >
          <div className="flex items-center gap-3">
            <Link
              className="
                            block
                            cursor-pointer
                            text-sky-500
                            transition
                            hover:text-sky-600
                            lg:hidden
                            "
              href="/conversationroom"
            >
              <HiChevronLeft size={30} />
            </Link>
            <Avatars user={otherUser} />
            <div
              className="
                    flex flex-col
                    "
            >
              {room.name || otherUser.name}
            </div>
            <HiEllipsisHorizontal
              size={32}
              onClick={() => setDrawerOpen(true)}
              className="
                   cursor-pointer
                   text-sky-500
                   transition
                   hover:text-sky-600
                   "
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
