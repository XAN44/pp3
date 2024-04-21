import { db } from '@/lib/db'
import { getCurrentUser } from '@/lib/session'
import { NextResponse } from 'next/server'

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json()
    const user = await getCurrentUser()

    const check = await db.comment.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
        Article: {
          select: {
            authorId: true,
          },
        },
        author: {
          select: {
            id: true,
          },
        },
      },
    })
    if (check?.author?.id === user?.id) {
      const deleteArticle = await db.comment.delete({
        where: {
          id,
        },
      })

      if (deleteArticle && user?.id !== check?.author?.id) {
        await db.notification.delete({
          where: {
            id: check?.id,
          },
        })
      }
    }
    return NextResponse.json(check)
  } catch (error) {
    console.error('Error fetching comments:', error)
    throw error
  }
}
