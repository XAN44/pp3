import { db } from "@/lib/db";
import { pusherServer } from "@/lib/pusher";
import { getCurrentUser } from "@/lib/session";
import { NextResponse } from "next/server";

export async function POST(request:Request) {
    try {
        
        const currentUser = await getCurrentUser()

        const body = await request.json()
        const {
            userId
        } = body

      
        if (!currentUser?.id || !currentUser?.email){
            return new NextResponse('Unauthorized',{status:401})
        }    

        
      const existingConversation = await db.room.findMany({
            where: {
                OR: [
                    {
                        AND: [
                            { users: { some: { id: currentUser?.id } } },
                            { users: { some: { id: userId } } }
                        ]
                    },
                    {
                        AND: [
                            { users: { some: { id: userId } } },
                            { users: { some: { id: currentUser?.id } } }
                        ]
                    }
                ]
            }
        });


        const singleConversation = existingConversation[0]

        if(singleConversation){
        return NextResponse.json(singleConversation)
        }

         const newRoom = await db.room.create({
            data:{
                users:{
                    connect:[
                        {
                            id:currentUser?.id
                        },
                        {
                            id:userId
                        }
                    ]
                }
            },
            include:{
                users:true
            }
        })

      newRoom.users.map((user) => {
        if(user.email){
            pusherServer.trigger(user.email,'conversation:new',newRoom)
        }
    })

        return NextResponse.json(newRoom)
    } catch (error) {
        console.log('===========',error)
        return new NextResponse ('Internal Error ' , {status:500})
    }
}