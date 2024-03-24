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
      select: {
        authorId: true,
        title: true,
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
        if (deleteJoin) {
          await db.notification.deleteMany({
            where: {
              eventId: id,
              userId: findEvent.authorId,
            },
          })
        }

        return NextResponse.json(deleteJoin)
      }

      if (!existingJoin) {
        const joinEvent = await db.registerEvent.create({
          data: {
            userID: user?.id,
            eventID: id,
          },
        })
        if (joinEvent) {
          await db.notification.create({
            data: {
              eventId: id,
              userId: findEvent.authorId,
              body: `ผู้ใช้ ${user.name} ได้เข้าร่วมกิจกรรม ${findEvent.title} ของคุณ`,
            },
          })
        }
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

    const eventID = await db.event.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
      },
    })

    if (eventID) {
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
