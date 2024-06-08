import { NextResponse } from 'next/server'
import { db } from '../../../lib/db'
import { getCurrentUser } from '../../../lib/session'
import { U } from '../../../types/joinEvent'

export async function GET(req: Request) {
  try {
    const user = await getCurrentUser()
    const userJon = await db.registerEvent.findMany({
      where: {
        userID: user?.id,
      },
      include: {
        event: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
        },
      },
    })

    const Schema: U[] = userJon.map((a) => ({
      RegisterEvent: [a],
    }))
    return NextResponse.json(Schema)
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: 'มีข้อผิดพลาดบางอย่าง' },
      { status: 500 }
    )
  }
}
