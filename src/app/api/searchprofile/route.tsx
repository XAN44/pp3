import { db } from '@/lib/db'
import { getCurrentUser } from '@/lib/session'
import { query } from 'express'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const qurey = searchParams.get('q') || ''
    const search = await db.user.findMany({
      where: {
        name: {
          contains: qurey,
        },
      },
      select: {
        id: true,
        name: true,
        image: true,
      },
      orderBy: {
        name: 'asc',
      },
    })

    console.log(search)
    return NextResponse.json(search)
  } catch (error) {
    console.error(error)
    return {
      status: 500,
      body: { error: 'Internal Server Error' },
    }
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
        userId: id,
        count: 1,
      },
    })
    if (visit) {
      const searchHistory = await db.searchHistory.create({
        data: {
          userId: id,
          getSearch: id,
        },
        include: {
          user: true,
        },
      })
      return NextResponse.json(visit)
    }
    console.log(visit)
    return NextResponse.json(visit)
  } catch (error: any) {
    console.error(error)
    return {
      status: 500,
      body: { error: 'Internal Server Error' },
    }
  }
}
