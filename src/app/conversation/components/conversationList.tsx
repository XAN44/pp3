'use client'
import useConversation from "@/app/hooks/useConversation";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { MdOutlineGroupAdd } from 'react-icons/md'
import ConversationBox from "./ConversationBox";
import { FullconversationType } from "@/types";
import { useSession } from 'next-auth/react'
import { pusherClient } from "@/lib/pusher";

interface ConversationProps {
    initialItem: FullconversationType[]
}

const ConversationList: React.FC<ConversationProps> = ({
    initialItem
}) => {
    const [ items, setItems ] = useState(initialItem)
    const { data: session } = useSession()
    const router = useRouter()
    const { conversationId, isOpen } = useConversation()



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
                        {session?.user.name}
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
                    <ConversationBox
                        key={index}
                        data={item}
                        selected={conversationId === item?.id}

                    />
                ))}
            </div>
        </aside>
    );
}

export default ConversationList;