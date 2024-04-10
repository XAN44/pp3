"use client"

import useOtherChat from "@/app/hooks/useOtherchat"
import Avatars from "@/components/sidebar/Avatar"
import { Room, User } from "@prisma/client"
import Link from "next/link"
import { useMemo, useState } from "react"
import { HiChevronLeft } from "react-icons/hi"
import { HiEllipsisHorizontal } from "react-icons/hi2"
import ProfileDrawer from "./ProfileDrawer"


interface HeaderProps {
    room: Room & {
        users: User[]
    }
}
const Header: React.FC<HeaderProps> = ({
    room
}) => {
    const otherUser = useOtherChat(room)

    const [ drawerOpen, setDrawerOpen ] = useState(false)


    return (
        <>
            <ProfileDrawer
                data={room}
                isOpen={drawerOpen}
                onClose={() => setDrawerOpen(false)}
            />
            <div className="
        bg-white
        w-full
        flex 
        border-r-[1px]
        py-3
        px-4
        lg:px-6
        justify-between
        items-center
        shadow-sm
        ">
                <div className="
            flex 
            gap-3 
            items-center 
            ">
                    <div className="flex gap-3 items-center">

                        <Link
                            className="
                            lg:hidden
                            block
                            text-sky-500
                            hover:text-sky-600
                            transition
                            cursor-pointer
                            "
                            href="/conversationroom">
                            <HiChevronLeft size={30} />
                        </Link>
                        <Avatars user={otherUser} />
                        <div className="
                    flex flex-col
                    ">
                            {room.name || otherUser.name}
                        </div>
                        <HiEllipsisHorizontal
                            size={32}
                            onClick={() => setDrawerOpen(true)}
                            className="
                   text-sky-500
                   cursor-pointer
                   hover:text-sky-600
                   transition
                   "
                        />
                    </div>
                </div>
            </div>
        </>

    )
}


export default Header