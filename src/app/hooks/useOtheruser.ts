

import {useSession} from 'next-auth/react'
import {useMemo} from 'react'
import {FullconversationType , FullmessageType} from '@/types'
import { User } from '@prisma/client'


const useOtheruser = (conversation:FullconversationType| {
    User:User[]
}) => {
    const session = useSession()
    const otherUser = useMemo(() => {
        const currentUserName = session.data?.user.name

        const otherUser = conversation.User.filter((User) => User.name !== currentUserName )
        return otherUser[0]
    },[session.data?.user.name, conversation.User])
    return otherUser
} 

export default useOtheruser


