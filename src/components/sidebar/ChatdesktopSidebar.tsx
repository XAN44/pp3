'use client'
import useRoutes from '@/app/hooks/useRoutes'
import { Text } from '@chakra-ui/react'
import { Input } from '@nextui-org/react'
import Head from 'next/head'
import React, { useState } from 'react'
import DesktopItem from './DesktopItem'
import { User } from 'prisma/prisma-client'
import Avatars from './Avatar'
import useRoomroute from '@/app/hooks/useRoomroute'
import SettingsModals from './SettingModal'
interface DesktopSidebarProps {
  currentUser: User
}

const ChatdesktopSidebar: React.FC<DesktopSidebarProps> = ({ currentUser }) => {
  const routes = useRoomroute()
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <SettingsModals
        currentUser={currentUser}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
      <div
        className="
                hidden 
                justify-between 
                lg:fixed 
                lg:inset-y-0 
                lg:left-0 
                lg:z-40 
                lg:flex
                lg:w-20 
                lg:flex-col 
                lg:overflow-y-auto
                lg:border-r-[1px]
                lg:bg-white
                lg:pb-4
                xl:px-6
                "
      >
        <nav
          className="
            fllex-col
            mt-4
            flex
            justify-between
            "
        >
          <ul role="list" className="flex flex-col items-center space-y-1">
            {routes.map((item) => (
              <DesktopItem
                key={item.label}
                href={item.href}
                label={item.label}
                icon={item.icon}
                active={item.active}
              />
            ))}
          </ul>
        </nav>
        {/* <nav className='
            mt-4
            flex
            flex-col
            justify-between
            items-center
            '>
                    <div onClick={() => setIsOpen(true)}
                        className="
                            cursor-pointer
                            hover:opacity-75
                            transition
                            "
                    >
                        <Avatars user={currentUser} />
                    </div>
                </nav > */}
      </div>
    </>
  )
}

export default ChatdesktopSidebar
