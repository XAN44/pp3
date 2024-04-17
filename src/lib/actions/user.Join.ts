    import { db } from "../db";



    export async function NotificationJoinEvent() {
        try {
            
            const fineEvent = await db.event.findMany({
                select:{
                    RegisterEvent:{
                        select:{
                            userID:true
                        }
                    },
                    eventstartTime:true
                }
            })
            if(fineEvent){

            }
        } catch (error) {
            
        }
    }