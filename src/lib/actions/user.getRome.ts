import { getCurrentUser } from "../session";
import { db } from "../db";

const getRoom = async () => {
    const currentUser = await getCurrentUser();

    if(!currentUser?.id){

        return []
    }

    try {
        const conversation = await db.room.findMany({
            orderBy:{
                lastMessageAt:'desc'
            },
            where:{
                users:{
                    some:{
                        id:currentUser.id
                    }
                }
                
            },
            include: {

                users: true,
                messages: {
                    include: {
                        sender: true,
                        rooms:true,
                        seen:true, 

                    }
                }
            }
        })
    
        return conversation
    } catch (error) {
        console.log(error)
        return []
    }
}

export default getRoom
