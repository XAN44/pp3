import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getCurrentUser } from '@/lib/session'

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser()
    const { id } = await request.json()
    if (!id) {
      return NextResponse.json(
        { message: 'กรุณาใส่ ID ของบทความ' },
        { status: 400 }
      )
    }

    if (!user) {
      return NextResponse.json({ message: 'กรุณาเข้าสู่ระบบ' }, { status: 401 })
    }

    const findEvent = await db.event.findFirst({
      where: {
        id: id,
      },
    })
    if (findEvent) {
      const existingJoin = await db.registerEvent.findFirst({
        where: {
          userID: user.id,
          eventID: id,
        },
      })
      if (existingJoin) {
        const deleteJoin = await db.registerEvent.delete({
          where: {
            id: existingJoin.id,
          },
        })
        return NextResponse.json(deleteJoin)
      }
      if (!existingJoin) {
        const joinEvent = await db.registerEvent.create({
          data: {
            userID: user?.id,
            eventID: id,
          },
        })
        return NextResponse.json(joinEvent)
      }
    }
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: 'มีข้อผิดพลาดบางอย่าง' },
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  try {
    const user = await getCurrentUser()
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id') || ''
    // const currentId = searchParams.get('currentId') || ''

    const eventID = await db.event.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
      },
    })

    if (eventID) {
      // เช็คว่าผู้ใช้ปัจจุบันได้กดไลค์บทความนี้หรือไม่
      const existingJoin = await db.registerEvent.findFirst({
        where: {
          userID: user?.id,
          eventID: id,
        },
        select: {
          id: true,
        },
      })

      const totalJoin = await db.registerEvent.count({
        where: {
          eventID: id,
        },
        select: {
          id: true,
        },
      })

      return NextResponse.json({
        joined: !!existingJoin?.id,
        totalJoin: totalJoin.id,
      })
    }
    return NextResponse.json(eventID)
  } catch (error) {
    return NextResponse.json(
      { message: 'เกิดข้อผิดพลาดบางอย่าง' },
      { status: 500 }
    )
  }
}
