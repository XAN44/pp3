import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const qurey = searchParams.get('q') || ''
    const search = await db.article.findMany({
      where: {
        title: {
          contains: qurey,
        },
      },
      orderBy: {
        title: 'asc',
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
