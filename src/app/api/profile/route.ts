import { db } from '@/lib/db'
import { UrlFacebookFORM } from '@/lib/validations/user'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: Request, context: any) {
  try {
    const { searchParams } = new URL(request.url)

    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ message: 'error' }, { status: 500 })
    }

    const user = await db.user.findMany({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        image: true,
      },
    })
    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json({ message: 'error' }, { status: 500 })
  }
}
