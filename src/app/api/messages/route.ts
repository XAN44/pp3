import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { NextResponse } from "next/server"
import {pusherServer} from '@/lib/pusher'
export async function POST(request:Request) {
    try {

        const user = await getCurrentUser()
        const body = await request.json()
        const {message,image,conversationroomId} = body
        if(!user?.id || !user.email){
            return new NextResponse('Unauthoried',{status:401})
        }

        const newMessage = await db.message.create({
            data:{
                text: message,
                image: image,
                rooms:{
                    connect:{
                        id: conversationroomId
                    }
                },
                sender:{
                    connect:{
                        id:user.id
                    }
                },
                seen:{
                    connect:{
                        id:user.id
                    }
                }
            },
            include:{
                rooms:true,
                sender:true
            }
        })
        const updateConversation = await db.room.update({
            where:{
                id:conversationroomId
            },
            data:{
                lastMessageAt:new Date(),
                messages:{
                    connect:{
                        id:newMessage.id
                    }
                }
            },
            include:{
                users:true,
                messages:{
                    include:{
                        rooms:true,
                        seen:true,
                    }
                }
            }
        })


        await pusherServer.trigger(conversationroomId,'messages:new',newMessage)

        const lastMessage = updateConversation.messages[updateConversation.messages.length -1 ];


        updateConversation.users.map((user) => {
            pusherServer.trigger(user.email!,'conversation:update',{
                id:conversationroomId,
                messages:[lastMessage]
            })
        })


        return NextResponse.json(newMessage)
    } catch (error) {
        console.log(error,"Error_Messages")
        return new NextResponse('internaleError' , {status:500})
    }
}