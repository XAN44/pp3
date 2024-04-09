'use client'

import clsx from "clsx"
import useConversation from "../hooks/useConversation"
import Emty from "@/components/stage/emty"

const Home = () => {
    const { isOpen } = useConversation()
    return (
        <div className={clsx(
            "   hidden    lg:block    lg:pl-80    w-full h-screen   ",
            isOpen ? 'block' : 'hidden'
        )}>
            <Emty />
        </div>
    )
}

export default Home