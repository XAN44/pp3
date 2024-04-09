import { db } from "@/lib/db";
import { NextResponse } from "next/server";


export async function GET(request:Request) {
    try {

        const getNorification = await db.notification.findMany({
            select:{
                body:true,
                likeId:true,
                postId:true,
            },
        })
    return NextResponse.json(getNorification)

    } catch (error) {
        
    }
}