import { db } from "@/lib/db";
import { pusherServer } from "@/lib/pusher";
import { getCurrentUser } from "@/lib/session";
import { NextResponse } from "next/server";

interface IParams {
    conversationroomId?:String
}

export async function DELETE(request:Request,{params}:{params:IParams}) {
    try {
        

        const {conversationroomId} = params
        const currentUser = await getCurrentUser()

        if(!currentUser){
            return new NextResponse("Unauthorized",{status:401})
        }

        if(!conversationroomId){
            return new NextResponse("invalid ID" ,{status:404})
        }   
        const existingConversation = await db.room.findUnique({
            where:{
                id:conversationroomId  as string
            },
            include:{
                users:true
            }
        })
        if(!existingConversation){
            return new NextResponse('invalid ID' , {status:400})
        }

        const deletedRoom = await db.room.delete({
            where:{
                id:conversationroomId as string,
                users:{
                    some:{
                        id:currentUser?.id
                    }
                }
            }
        })


        existingConversation.users.forEach((user) => {
            if(user.email){
                pusherServer.trigger(user.email,'conversation:remove',existingConversation)
            }
        })

        return NextResponse.json(deletedRoom)
    } catch (error) {
        console.log(error,"error_conversation_delete");
        return new NextResponse("internal error",{status:500})
    }
}