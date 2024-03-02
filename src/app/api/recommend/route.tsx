import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const tag = searchParams.get('tag') || ''

    const hashtag = await db.article.findMany({
      where: {
        tag: {
          some: {
            tag: tag,
          },
        },
      },
      select: {
        id: true,
        title: true,
        ArticleImage: true,
        articleContent: true,

        createAt: true,
        authorId: true,

        comment: {
          orderBy: {
            createdAt: 'asc',
          },
          select: {
            id: true,
            text: true,
            authorid: true,
            createdAt: true,
            author: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
            articleId: true,
            Article: {
              select: {
                id: true,
                title: true,
                articleContent: true,
                ArticleImage: true,
              },
            },
            Reply: {
              select: {
                replytext: true,
                author: {
                  select: {
                    id: true,
                    name: true,
                    image: true,
                  },
                },
                replyCommet: {
                  select: {
                    id: true,
                  },
                },
              },
            },
          },
        },
        Visit: {
          select: {
            count: true,
          },
        },
        author: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        tag: {
          select: {
            id: true,
            tag: true,
          },
        },
      },
    })
    return NextResponse.json(hashtag)
  } catch (error) {
    return NextResponse.json({ error })
  }
}
