"use client"

import Avatars from "@/components/sidebar/Avatar";
import { FullmessageSender } from "@/types/chatindex";
import clsx from "clsx";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import Image from "next/image";


interface MessageBoxProps {
    data: FullmessageSender
    isLast?: boolean
}

const MessageBox: React.FC<MessageBoxProps> = ({
    data,
    isLast
}) => {

    const session = useSession()
    const isOwn = session?.data?.user.email === data?.sender?.email
    const seenList = (data.seen || [])
        .filter((user) => user.email !== data?.sender?.email)
        .map((user) => user.name)
        .join(', ')

    const container = clsx("flex gap-3 p-4",
        isOwn && "justify-end",
    )
    const avatar = clsx(isOwn && "order-2")
    const body = clsx("flex flex-col gap-2", isOwn && "items-end")

    const message = clsx("text-sx w-fit voerflow-hidden",
        isOwn ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white' : 'rouded-full py-2 px-3',
        data.image ? 'rounded-md p-3' : 'rounded-full py-2 px-3'
    )

    return (
        <div className={container}>
            <div className={avatar}>
                <Avatars user={data.sender} />
            </div>
            <div className={body}>
                <div className="flex items-center gap-1">
                    <div className="text-sm text-gray-500">
                        {data.sender.name}
                    </div>
                    <div className="text-xs text-gray-400">
                        {format(new Date(data.createdAt), 'p')}
                    </div>
                </div>
                <div className={message}>
                    {data.image ? (
                        <Image
                            alt="image"
                            height='288'
                            width="288"
                            src={data.image}
                            className="
                            object-cover
                            cursor-pointer
                            hover:scale-100
                            transition
                            translate-x-0
                            "
                        />
                    ) : (
                        <div className="">
                            {data.text}
                        </div>
                    )}
                </div>
                {isLast && isOwn && seenList.length > 0 && (
                    <div className="
                    text-xs 
                    font-light
                    text-gray-500
                    ">
                        {`Seen by ${seenList}`}
                    </div>
                )}
            </div>
        </div>
    );
}

export default MessageBox;