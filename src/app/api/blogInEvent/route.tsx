import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('authUserId')

  const Blog = await db.article.findMany({
    where: {
      authorId: id,
    },
    select: {
      id: true,
      title: true,
      ArticleImage: true,
      tag: true,
    },
  })
  return NextResponse.json(Blog)
}
