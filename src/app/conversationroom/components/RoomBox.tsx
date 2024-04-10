'use client'

import { Conversation, Message, User, } from '@prisma/client'
import { useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { format } from 'date-fns'
import { useSession } from "next-auth/react";
import clsx from 'clsx'
import { FullconversationType } from '@/types'
import useOtheruser from '@/app/hooks/useOtheruser'
import Avatars from '@/components/sidebar/Avatar'
import useOtherChat from '@/app/hooks/useOtherchat'
import { getUserinchat } from '@/types/chatindex'

interface ConversationBoxProps {
    data: getUserinchat,
    selected?: boolean
}


const RoomBox: React.FC<ConversationBoxProps> = ({
    data,
    selected
}) => {
    const otherUser = useOtherChat(data)
    const session = useSession()
    const router = useRouter()

    const handle = useCallback(() => {
        router.push(`/conversationroom/${data.id}`)
    }, [ data.id, router ])


    const lastMessage = useMemo(() => {
        const messages = data.messages || [];

        return messages[ messages.length - 1 ];
    }, [ data.messages ]);

    const userEmail = useMemo(() => session.data?.user?.email,
        [ session.data?.user?.email ]);

    const hasSeen = useMemo(() => {
        if (!lastMessage) {
            return false;
        }

        const seenArray = lastMessage.seen || [];

        if (!userEmail) {
            return false;
        }

        return seenArray
            .filter((user) => user.email === userEmail).length !== 0;
    }, [ userEmail, lastMessage ]);

    const lastMessageText = useMemo(() => {
        if (lastMessage?.image) {
            return 'Sent an image';
        }

        if (lastMessage?.text) {
            return lastMessage?.text
        }

        return 'Started a conversation';
    }, [ lastMessage ]);
    return (

        <div
            onClick={handle}

            className={clsx(`
       w-full 
        relative 
        flex 
        items-center 
        space-x-3 
        p-3 
        hover:bg-neutral-100
        rounded-lg
        transition
        cursor-pointer

        `,
                selected ? 'bg-neutral-100' : 'bg-white'
            )}>
            <Avatars user={otherUser} />
            <div className="min-w-0 flex-1">
                <div className="focus:outline-none">
                    <div className="
                    flex
                    justify-between
                    items-center
                    mb-1
                    ">
                        <p className='text-md font-medium text-gray-900'>
                            {data.name || otherUser?.name}

                        </p>
                        {lastMessage?.createdAt && (
                            <p
                                className='
                            text-xs
                            text-gray-400
                            font-light
                            '
                            >
                                {format(new Date(lastMessage.createdAt), 'p')}
                            </p>
                        )}
                    </div>
                    <p
                        className=
                        {clsx(`
                    truncate
                    text-sm
                    `,
                            hasSeen ? 'text-gray-500' : 'text-black font-medium'
                        )
                        }
                    >
                        {lastMessageText}</p>
                </div>
            </div>
        </div>
    );
}

export default RoomBox;