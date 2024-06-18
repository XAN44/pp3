import { db } from '@/lib/db'
import { NextResponse } from 'next/server'
export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id') || ''
    if (!id) {
      return NextResponse.json(
        { message: 'กรุณาใส่ ID ของบทความ' },
        { status: 400 }
      )
    }

    const findEvent = await db.event.findFirst({
      where: {
        id: id,
      },
    })
    if (findEvent) {
      const checkcount = await db.event.findFirst({
        where: {
          id: id,
        },
        select: {
          eventparticipants: true,
        },
      })
      return NextResponse.json(checkcount)
    }
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { message: 'เกิดข้อผิดพลาดในระหว่างการดำเนินการ' },
      { status: 500 }
    )
  }
}
