

import {useMemo} from 'react'
import {usePathname} from 'next/navigation'
import {HiChat} from 'react-icons/hi'
import {HiArrowLeftOnRectangle, HiUser} from 'react-icons/hi2'
import useConversation from './useConversation'
import { signOut } from 'next-auth/react'
import useRoom from './useRoom'


const useRoomroute = () => {
    const pathname = usePathname()
    const { conversationroomId } = useRoom() 

    const routes = useMemo(() => [
      {
            label:'Chat',
            href:'/conversationroom',
            icon:HiChat,
            active:pathname === '/conversationroom' || !!conversationroomId

        },
        {
            label:'User',
            href:'/chat',
            icon:HiUser,
            active:pathname === '/chat' 
        },
        {
            label:'Logout',
            href:'#',
            onClick:()=> signOut(),
            icon:HiArrowLeftOnRectangle
        }
    ],[pathname,conversationroomId])
    return routes
}

export default useRoomroute