import { db } from '@/lib/db'
import { getCurrentUser } from '@/lib/session'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const user = await getCurrentUser()

    const notifications = await db.notification.findMany({
      where: {
        userId: user?.id,
      },
      select: {
        id: true,
        body: true,
        current:true,
        articleId:true,
        postId:true,
        eventId:true,
        likeId:true,
        readStatus:true,
        createAt:true
      },
    })
    
    
    return NextResponse.json(notifications)
  } catch (error: any) {
    console.error(`Error fetching notifications: ${error.message}`)
    throw new Error('Failed to fetch notifications')
  }
}



export async function POST(request: Request) {
  try {

    const user = await getCurrentUser()
    
    const updateRead = await db.notification.updateMany({
      where:{
        userId:user?.id,
      },
      data:{
        readStatus:true
      }
    })

    return NextResponse.json(updateRead)
  } catch (error) {
    console.error(error)
    return NextResponse.json(error)
  }
}