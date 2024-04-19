import { db } from '@/lib/db'
import { getCurrentUser } from '@/lib/session'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser()
    const body = await request.json()
    const { name, image } = body

    if (!user?.id) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const updateUser = await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        name,
        image,
      },
    })

    return NextResponse.json(updateUser)
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: 'มีข้อผิดพลาดบางอย่าง' },
      { status: 500 }
    )
  }
}
