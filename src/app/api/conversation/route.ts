import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { NextResponse } from "next/server";

export async function POST(request:Request) {
    try {
        
        const currentUser = await getCurrentUser()
        const body = await request.json()
        const {
            userId,
            isGroup,
            members,
            name
        } = body

        if (!currentUser?.id || !currentUser?.email){
            return new NextResponse('Unauthorized',{status:401})
        }

        if(isGroup &&(!members || members.length < 2 || !name )){
        return new NextResponse('invalid data',{status:400})
        }
        if(isGroup){
            const newConversation = await db.conversation.create({
                data:{
                    name,
                    isGroup,
                    User:{
                        connect:[
                        ...members.map((member:{value:string}) => ({
                            id:member.value
                        })),
                        {
                            id:currentUser.id
                        }
                        ]
                    }
                },
                include:{
                    User:true
                }
            })
            return NextResponse.json(newConversation)
        }

        const existingConversation = await db.conversation.findMany({
            where:{
                OR:[
                    {
                        userIds:{
                            equals:[currentUser.id,userId]
                        }
                    },
                    {
                        userIds:{
                            equals:[userId,currentUser.id]
                        }
                    }
                ]
            }
        })

        const singleConversation = existingConversation[0]

        if(singleConversation){
        return NextResponse.json(singleConversation)
        }

        const newConversation = await db.conversation.create({
            data:{
                User:{
                    connect:[
                        {
                            id:currentUser.id
                        },
                        {
                            id:userId
                        }
                    ]
                }
            },
            include:{
                User:true
            }
        })

        return NextResponse.json(newConversation)
    } catch (error) {
        return new NextResponse ('Internal Error ' , {status:500})
    }
}