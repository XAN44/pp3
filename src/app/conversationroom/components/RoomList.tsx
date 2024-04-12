'use client'
import useConversation from "@/app/hooks/useConversation";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { MdOutlineGroupAdd } from 'react-icons/md'
import { useSession } from 'next-auth/react'
import { getUserinchat } from "@/types/chatindex";
import RoomBox from "./RoomBox";
import useRoom from "@/app/hooks/useRoom";
import { User } from "@prisma/client";
import { pusherClient } from "@/lib/pusher";
import { find } from "lodash";

interface ConversationProps {
    initialItem: getUserinchat[]
}

const RoomList: React.FC<ConversationProps> = ({
    initialItem
}) => {
    const [ items, setItems ] = useState(initialItem)

    const { data: session } = useSession()
    const router = useRouter()
    const { conversationroomId, isOpen } = useRoom()


    const pusherKey = useMemo(() => {
        return session?.user?.email
    }, [ session?.user?.email ])

    useEffect(() => {
        if (!pusherKey) {
            return;
        }
        pusherClient.subscribe(pusherKey)

        const newHandler = (conversation: getUserinchat) => {
            setItems((current) => {
                if (find(current, { id: conversation.id })) {
                    return current
                }
                return [ conversation, ...current ]
            })
        }


        const updateHandler = (conversation: getUserinchat) => {
            setItems((current) => current.map((currentRoom) => {
                if (currentRoom.id === conversation.id) {
                    return {
                        ...currentRoom,
                        messages: conversation.messages
                    }
                }
                return currentRoom
            }))
        }

        const romveHandler = (conversation: getUserinchat) => {
            setItems((current) => {
                return [ ...current.filter((convo) => convo.id !== conversation.id) ]
            })
            if (conversationroomId !== conversation.id) {
                router.push(`/conversationroom`)
            }
        }



        pusherClient.bind('conversation:new', newHandler);
        pusherClient.bind('conversation:update', updateHandler);
        pusherClient.bind('conversation:remove', romveHandler);


        return () => {
            pusherClient.unsubscribe(pusherKey)
            pusherClient.unbind('conversation:new', newHandler)
            pusherClient.unbind('conversation:update', updateHandler)
            pusherClient.unbind('conversation:romove', romveHandler)


        }
    }, [ pusherKey, conversationroomId, router ])

    return (
        <aside
            className={clsx(`
            mt-14
            fixed
            inset-y-0
            pb-20
            lg:pb-0
            lg:left-20
            lg:w-80
            lg:block
            overflow-y-auto
            border-r
            border-gray-200
            block
            w-full
            left-0
            `,
                isOpen ? 'hidden' : 'block w-full left-0'
            )}
        >
            <div className="px-5">
                <div className="flex justify-between mb-4 pt-4">
                    <div className="
                    text-2xl
                    font-bold
                    text-neutral-800
                    ">
                        Message
                    </div>
                    <div className="
                    rounded-full
                    p-2
                    bg-gray-100
                    text-gray-600
                    cursor-pointer
                    hover:opacity-75
                    transition
                    ">
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
    );
}

export default RoomList;