import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const { postId } = await request.json()

    const like = await db.like.count({
      where: {
        postId,
      },
    })
    return NextResponse.json({ like })
  } catch (error) {
    return NextResponse.json({ message: 'error' }, { status: 500 })
  }
}
