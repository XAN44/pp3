import { revalidatePath } from "next/cache"
import { db } from "../db"



const getMessages = async (
    conversationroomId:string,
    path:string
    ) => {
    try {
        const messages = await db.message.findMany({
            where:{
                rooms:{
                    some:{
                        id:conversationroomId
                    }
                }
            },
            include:{
                seen:true,
                sender:true,
                rooms:true,
                
            },
            orderBy:{
            createdAt:'asc'
            }
            
        })
        revalidatePath(path)
        return messages
    } catch (error) {
        return []
    }
    }

    export default getMessages