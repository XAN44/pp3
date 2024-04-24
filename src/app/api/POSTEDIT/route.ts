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
        const {id,content} = body

        if(!id){
            return new NextResponse("กรุณาใส่ ID",{status:400})
        }
        const findPost = await db.post.findFirst({
            where:{
                id:id
            },
            select:{
                id:true,
                content:true
            }
        })
        if(findPost){
            await db.post.update({
                where:{
                    id:findPost.id
                },
                data:{
                    content:content
                }  
            })
        }

        return NextResponse.json(findPost)
    } catch (error) {
        return NextResponse.json(error)
    }
}