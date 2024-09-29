import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const getNorification = await db.notification.findMany({
      select: {
        body: true,
        likeId: true,
        postId: true,
      },
    })
    if (!getNorification) {
      return NextResponse.json('Null')
    }
    return NextResponse.json(getNorification)
  } catch (error) {
    return NextResponse.json('Error sometihn')
  }
}
