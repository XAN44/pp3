import { db } from '@/lib/db'
import { getCurrentUser } from '@/lib/session'
import { NextResponse } from 'next/server'

export async function DELETE(request: Request) {
  try {
    const user = await getCurrentUser()
    if (!user?.id) {
      return NextResponse.json(
        { message: 'กรุณาเข้าสู่ระบบก่อน' },
        { status: 401 }
      )
    }
    const { id } = await request.json()
    if (!id) {
      return NextResponse.json(
        { message: 'กรุณาใส่ ID ของบทความ' },
        { status: 400 }
      )
    }

    //* ตรวจสอบว่าเจ้าของโพสต์ คือผู้ที่จะทำการลบหรือไม่
    const check = await db.event.findFirst({
      where: {
        id,
      },
      select: {
        author: {
          select: {
            id: true,
          },
        },
      },
    })
    if (check?.author?.id === user.id) {
      const deleteArticle = await db.event.delete({
        where: {
          id,
        },
      })
      return NextResponse.json(deleteArticle)
    }
  } catch (error) {
    return NextResponse.json(
      { message: 'มีข้อผิดพลาดบางอย่างให้ไม่สามารถลบได้' },
      { status: 401 }
    )
  }
}
