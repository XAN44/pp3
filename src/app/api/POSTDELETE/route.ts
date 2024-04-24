import { NextResponse } from 'next/server'
import { db } from '../../../lib/db'
import { getCurrentUser } from '../../../lib/session'

export async function DELETE(request: Request) {
  try {
    const user = await getCurrentUser()

    const { id } = await request.json()
    if (!id) {
      return new NextResponse('กรุณาใส่ ID ของบทความ', { status: 400 })
    }
    if (!user?.id) {
      return new NextResponse('กรุณาเข้าสู่ระบบก่อน', { status: 401 })
    }

    const findPost = await db.post.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
        authorId: true,
      },
    })
    if (findPost) {
      if (findPost.authorId === user.id) {
        await db.post.delete({
          where: {
            id: findPost.id,
          },
        })
      }
    }
    return NextResponse.json({ message: 'ลบบทความสําเร็จ' })
  } catch (error) {
    console.error(error)
    return new NextResponse('internaleError', { status: 500 })
  }
}
