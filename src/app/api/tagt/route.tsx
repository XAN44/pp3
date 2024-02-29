import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  try {
    const articles = await db.article.findMany({
      include: {
        tag: true,
      },
      where: {
        tag: {
          every: {
            tag: 'ท่องเที่ยว',
          },
        },
      },
    })
    return NextResponse.json(articles)
  } catch (error) {}
}
