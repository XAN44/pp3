import { format, parseISO } from "date-fns"
import { db } from "../db"
import { getCurrentUser } from "../session"
import { th } from "date-fns/locale"


export async function notificationForStartEvent() {
    
    try {

        const findEvent = await db.event.findFirst({
            select:{
                id:true,
                
                eventstartTime:true,
                RegisterEvent:{
                    select:{
                        userID:true
                    }
                }
            }
        })

        const registerEvent = findEvent?.RegisterEvent;
        const userinEvent = registerEvent ? registerEvent.map(e => e.userID).join(', ') : '';
        const dateTimeNow = new Date()
        const today = format(dateTimeNow, 'EEEE d MMMM YYYY ',{locale:th})

        const formatStartEvent = format(parseISO(findEvent?.eventstartTime || '') , "EEEE d MMMM YYYY" , {locale:th})

        if(today === formatStartEvent){
            await db.notification.create({
                data:{
                    current:userinEvent,
                    body:`มีกิจกรรมที่คุณได้เข้าร่วม กำลังเริ่มขึ้นวัน ${formatStartEvent}`
                }
            })
        }
        
        return findEvent
    } catch (error) {
        console.log(error)
        return error
    }
}