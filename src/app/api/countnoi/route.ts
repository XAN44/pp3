import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { NextResponse } from "next/server"

export async function GET(request:Request) {

    try {
        
        const user = await getCurrentUser()

        if(!user) {
            return new Response('Unauthorized', { status: 401 })
        }

        const fetchUnreadNotification = await db.notification.findMany({
            where:{
                userId:user.id,
                readStatus:false,
            },
            select:{
                id:true,
            }
        })

        return NextResponse.json(fetchUnreadNotification)

    } catch (error) {
        return new Response('Error', { status: 500 })
    }
}