import { db } from '@/lib/db'
import { getCurrentUser } from '@/lib/session'
import { query } from 'express'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const qurey = searchParams.get('e') || ''
    const search = await db.event.findMany({
      where: {
        title: {
          contains: qurey,
        },
      },
      select: {
        id: true,
        title: true,
        eventImage: true,
        author: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        title: 'asc',
      },
    })

    return NextResponse.json(search)
  } catch (error) {
    return NextResponse.json(
      { message: 'มีข้อผิดพลาดบางอย่าง' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const { id } = await request.json()
    const user = await getCurrentUser()
    const visit = await db.visit.upsert({
      where: {
        userId: user?.id,
        id: id,
      },
      update: {
        count: { increment: 1 },
      },
      create: {
        eventId: id,
        count: 1,
      },
    })
    if (visit) {
      const searchHistory = await db.searchHistory.create({
        data: {
          userId: user?.id,
          getSearch: id,
          eventId: id,
        },
      })
    }
    return NextResponse.json(visit)
  } catch (error: any) {
    return NextResponse.json(
      { message: 'มีข้อผิดพลาดบางอย่าง' },
      { status: 500 }
    )
  }
}
