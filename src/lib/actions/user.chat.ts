'use server'

import { db } from "../db"
import { getCurrentUser } from "../session"


const getUser = async () => {
    const user = await getCurrentUser()
    if(!user?.email){
        return []
    }

    try {
        const usesr = await db.user.findMany({
            orderBy:{
                AtCreate:'desc'
            },
            where:{
                NOT:{
                    email:user.email
                }
            }
        })
        return usesr
    } catch (error) {
        return []
    }
}

export default getUser


