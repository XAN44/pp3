import { db } from "@/lib/db"
import { pusherServer } from "@/lib/pusher"
import { getCurrentUser } from "@/lib/session"
import { NextResponse } from "next/server"

interface IParams {
    conversationroomId:string
}

export async function POST(
    request:Request,
    {params} : {params:IParams}
    ) {
    
        try {
            const currentUser = await getCurrentUser()
            const {conversationroomId} = params

            if(!currentUser?.id || !currentUser?.email){
                return new NextResponse("Unauthoried" , {status:401})
            }

            const conversationroom = await db.room.findUnique({
                where:{
                    id:conversationroomId
                },
                include:{

                    messages:{
                        include:{                        
                            seen:true
                        }
                    },
                    users:true
                }
            })
            if(!conversationroom){
                return new NextResponse ('invalid ID',{status:400})
            }

            const lastMessage = conversationroom.messages[conversationroom.messages.length - 1]

            if(!lastMessage){
                return NextResponse.json(conversationroom)
            }

            const updatedMessage = await db.message.update({
                where:{
                    id:lastMessage.id
                },
                include:{
                    sender:true,
                    seen:true
                },
                data:{
                    seen:{
                        connect:{
                            id:currentUser.id
                        }
                    }
                }
            })

         const latestUpdatedMessage = await db.message.findUnique({
            where: {
                id: lastMessage.id
            },
            include: {
                seen: true
            }
        })

            await pusherServer.trigger(currentUser.email,'conversation:update',{
                id:conversationroomId,
                messages:[updatedMessage],
                seen: latestUpdatedMessage?.seen

            })

            if(lastMessage.senderId.indexOf(currentUser.id) === -1){
                return NextResponse.json(conversationroom)
            }

            await pusherServer.trigger(conversationroomId!,'message:update',updatedMessage)
          

            return NextResponse.json(updatedMessage)
        } catch (error) {
            console.log(error)
            return new NextResponse("internale Error", {status: 500})
        }
}