'use client'

import Avatars from "@/components/sidebar/Avatar";
import { Avatar } from "@nextui-org/react";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

interface UserboxData {
    data: User
}
const UserBox: React.FC<UserboxData> = ({ data }) => {
    const router = useRouter()
    const [ isLoading, setIsloading ] = useState(false)

    const handleClick = useCallback(() => {
        setIsloading(true)
        axios.post('/api/conversation', {
            userId: data.id
        }).then((data) => {
            router.push(`/conversation/${data.data.id}`)
        })
            .finally(() => setIsloading(false))
    }, [ data, router ])

    return (
        <div
            onClick={handleClick}
            className="
            w-full
            relative
            flex
            items-center
            space-x-3
            bg-white
            p-3
            hover:bg-neutral-100
            rounded-lg
            transition
            cursor-pointer
            ">
            <Avatars user={data} />
            <div className="min-w-0 flex-1">
                <div className="focus:outline-none">
                    <div className="
                        flex
                        justify-between
                        items-center
                        mb-1
                        ">

                        <p className=" text-sm font-medium text-gray-900">
                            {data.name}
                        </p>

                    </div>
                </div>

            </div>
        </div>
    );
}

export default UserBox;