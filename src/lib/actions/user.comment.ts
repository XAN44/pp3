'use server'

import { revalidatePath } from 'next/cache'
import { db } from '../db'
import { Notification } from './user.notification'
import { text } from 'body-parser'
import { getCurrentUser } from '../session'



export async function CommentInPost(
  postId: string,
  comment: string,
  authorId: string,
  path: string
) {
  try {
    const user = await getCurrentUser()
    const Inpost = await db.post.findUnique({
      where: {
        id: postId,
      },
    })
    if (!Inpost) {
      throw new Error('Dont have post')
    }

    const newComment = await db.comment.create({
      data: {
        text: comment,
        postId: postId,
        authorid: authorId
      },
      include:{
        author:{
          select:{
            name:true
          }
        },
        Post:{
        select:{
          content:true,
          author:{
            select:{
            name:true
            }
          }
        }
        }
      }
    })

  if (Inpost && Inpost.authorId) {
        // แจ้งเตือนเจ้าของโพสต์
        const auth = newComment.author?.name
          await Notification(Inpost.authorId, postId, 
          `ผู้ใช้ ${auth} ได้แสดงความคิดเห็นในโพสต์ ${newComment.Post?.content} ของ ${newComment.Post?.author?.name} ด้วยข้อความ ${comment}` ,path  );
    }


    revalidatePath(path)
  } catch (error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`)
  }
}

export async function fetchPostByID(id: string) {
  try {
    const post = await db.post.findUnique({
      where: {
        id: id,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        comments: {
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
            postId: true,
            Post: {
              select: {
                id: true,
                content: true,
                ImagePost: true,
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
      },
    })

    if (!post) {
      throw new Error('Post not found')
    }

    return post
  } catch (error) {
    console.error('Error fetching comments:', error)
    throw error
  }
}

export async function replyComments(
  commentId: string,
  reply: string,
  authorId: string,
  path: string
) {
  try {
    const findComment = await db.comment.findUnique({
      where: {
        id: commentId,
      },
    })
    if (findComment) {
      console.log('Attempting to create reply...')

      const repy = await db.reply.create({
        data: {
          replyCommentid: commentId,
          replytext: reply,
          authorid: authorId,
        },
      })
      console.log('Created reply:', repy)

      revalidatePath(path)
      console.log('Path revalidated:', path)
    }

    return reply
  } catch (error) {}
}
