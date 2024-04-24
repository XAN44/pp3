import { NextResponse } from "next/server";
import { getCurrentUser } from "../../../lib/session";
import { db } from "../../../lib/db";


export async function PUT(request:Request) {
    try {
        const user = await getCurrentUser()
        if(!user?.id){
            return new NextResponse("กรุณาเข้าสู่ระบบก่อน",{status:401})
        }
        const body = await request.json()
        const { id , articleContent, eventLocation , eventParticipants , eventstartTime , eventCreator,eventmore } = body 
        if(!id){
            return new NextResponse("กรุณาใส่ ID ของบทความ",{status:400})            
        }

        const findEvent = await db.event.findFirst({
            where:{
                id
            },
            select:{
                id:true,
                authorId:true
            }
        })
        if(findEvent){
          const update =  await db.event.update({
                where:{
                    id:findEvent.id
                },
                data:{
                    eventContent:articleContent,
                    eventlocation:eventLocation,
                    eventparticipants:eventParticipants,
                    eventstartTime:eventstartTime,
                    eventcreator:eventCreator,
                    eventmore:eventmore
                }
            })
            console.log(update)
        }
        return NextResponse.json(findEvent)
    } catch (error) {
        console.log(error)
        return NextResponse.json(error)
    }    
}