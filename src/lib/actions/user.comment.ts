'use server'

import { revalidatePath } from 'next/cache'
import { db } from '../db'
import { getCurrentUser } from '../session'
import { Notification } from './user.notification'

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
        authorid: authorId,
      },
      include: {
        author: {
          select: {
            name: true,
          },
        },
        Post: {
          select: {
            content: true,
            author: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    })

    if(newComment && Inpost.authorId !== authorId){
      await db.notification.create({
        data:{
          current:Inpost.id,
          commentId:newComment.id,
          postId:Inpost.id,
          userId:Inpost.authorId,
          body:`ผู้ใช้ ${user?.name} ได้แสดงความคิดเห็นในโพสต์ ${Inpost.content} `,

        }
      })
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
    const user = await getCurrentUser()
    const findComment = await db.comment.findUnique({
      where: {
        id: commentId,
      },
      select:{
        text:true,
        authorid:true,
        postId:true,
        Post:{
          select:{
            content:true
          },
        },
        Article:{
          select:{
            title:true
          }
        }
      }
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
      if(user?.id === findComment.authorid){
        revalidatePath(path)
        return false
      }
      if(repy){
        await db.notification.create({
          data:{
            postId:findComment.postId,
            current:findComment.postId,
            userId:findComment.authorid,
            body:`ผู้ใช้ ${user?.name} ได้ตอบกลับความคิดเห็น ${findComment.text} บนบทความ ${findComment.Post?.content} `, 
            replyId:repy.id 
          }
        })
      }
      revalidatePath(path)

    }

    return reply
  } catch (error) {}
}




export async function replyCommentsEvent(
  commentId: string,
  reply: string,
  authorId: string,
  path: string
) {
  try {
    const user = await getCurrentUser()
    const findComment = await db.comment.findUnique({
      where: {
        id: commentId,
      },
      select:{
        text:true,
        authorid:true,
        postId:true,
        eventId:true,
        Event:{
          select:{
            title:true
          }
        },
        Post:{
          select:{
            content:true
          },
        },
        Article:{
          select:{
            title:true
          }
        }
      }
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
      if(user?.id === findComment.authorid){
        revalidatePath(path)
        return false
      }
      if(repy){
        await db.notification.create({
          data:{
            eventId:findComment.eventId,
            current:findComment.eventId,
            userId:findComment.authorid,
            body:`ผู้ใช้ ${user?.name} ได้ตอบกลับความคิดเห็น ${findComment.text} บนกิจกรรม ${findComment.Event?.title} `, 
            replyId:repy.id 
          }
        })
      }
      revalidatePath(path)

    }

    return reply
  } catch (error) {}
}


export async function replyCommentsBlog(
  commentId: string,
  reply: string,
  authorId: string,
  path: string
) {
  try {
    const user = await getCurrentUser()
    const findComment = await db.comment.findUnique({
      where: {
        id: commentId,
      },
      select:{
        text:true,
        authorid:true,
        postId:true,
        eventId:true,
        articleId:true,
        Event:{
          select:{
            title:true
          }
        },
        Post:{
          select:{
            content:true
          },
        },
        Article:{
          select:{
            title:true
          }
        }
      }
    })
    if (findComment) {
      console.log('Attempting to create reply...')

      const repy = await db.reply.create({
        data: {
          replyCommentid: commentId,
          replytext: reply,
          authorid: authorId,
        },
        select:{
          id:true,
        }
      })
      if(user?.id === findComment.authorid){
        revalidatePath(path)
        return false
      }
      if(repy){
        await db.notification.create({
          data:{
            id:repy.id,
            articleId:findComment.articleId,
            current:findComment.articleId,
            userId:findComment.authorid,
            body:`ผู้ใช้ ${user?.name} ได้ตอบกลับความคิดเห็น ${findComment.text} บนบล็อก ${findComment.Article?.title} `, 
            replyId:repy.id 
          }
        })
      }
      revalidatePath(path)

    }

    return reply
  } catch (error) {}
}



export async function CommentinArticlesHome(
  postId: string,
  comment: string,
  authorId: string,
  path: string
) {
  try {
    const user = await getCurrentUser()
    const inArticle = await db.post.findFirst({
      where: {
        id: postId,
      },
      select: {
        authorId: true,
        comments:true
      },
    })
    if (!inArticle) {
      throw new Error('dont have article')
    }

    const newCommentInArticle = await db.comment.create({
      data: {
        text: comment,
        postId:postId,
        authorid: authorId,
      },
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    })
    if (newCommentInArticle && inArticle.authorId !== authorId) {
      // เพิ่มเงื่อนไขนี้
      await db.notification.create({
        data: {
          postId:postId,
          userId: inArticle.authorId, 
          body: `ผู้ใช้ ${user?.name} ได้แสดงความคิดเห็นบนบล็อกของคุณ ${inArticle.comments}`,
        },
      })
    }

    revalidatePath(path)
  } catch (error: any) {
    throw new Error(`Faied to creat comment : ${error.message}`)
  }
}
 
export async function DELETEReply(id: string, path: string) {
  try {
    const user = await getCurrentUser()


      const deleteReply = await db.reply.delete({
        where: {
          id
        },
        select:{
          id:true
        }
      })
      revalidatePath(path)

    console.log(deleteReply)

      if(deleteReply){
        await db.notification.delete({
          where:{
            id:deleteReply.id
          }
        })
      }
    revalidatePath(path)
    return deleteReply
  } catch (error) {
    console.error('Error fetching comments:', error)
    throw error
  }
}


export async function DELETEREPLYPOST(replyId: string, path: string) {
  try {
 
    console.log(replyId)
      const deleteReply = await db.reply.delete({
        where: {  
          id:replyId
        },
        select:{
          id:true
        }
      })
      revalidatePath(path)

    console.log(deleteReply)

      if(deleteReply){
        await db.notification.delete({
          where:{
            id:deleteReply.id
          }
        })
      }
    revalidatePath(path)
    return deleteReply
  } catch (error) {
    console.error('Error fetching comments:', error)
    throw error
  }
}


export async function DELETEREPLYEVENT(id: string, path: string) {
  try {
    const user = await getCurrentUser()


      const deleteReply = await db.reply.delete({
        where: {
          id
        },
        select:{
          id:true
        }
      })
      revalidatePath(path)

    console.log(deleteReply)

      if(deleteReply){
        await db.notification.delete({
          where:{
            id:deleteReply.id
          }
        })
      }
    revalidatePath(path)
    return deleteReply
  } catch (error) {
    console.error('Error fetching comments:', error)
    throw error
  }
}



 

export async function DELETE(id: string, path: string) {
  try {
    const user = await getCurrentUser()


      const check = await db.comment.findFirst({
        where: {
          id,
        },
        select: {
          id:true,
          Article:{
            select:{
            authorId:true
            }
          },
          author: {
            select: {
              id: true,
            },
          },
        },
      })
      console.log(check)
      if(check?.id){
        await db.comment.delete({
          where:{
            id:check.id
          }
        })
      }
      
      // if (check?.author?.id === user?.id) {
      //   const deleteArticle = await db.comment.delete({
      //     where: {
      //       id,
      //     },
      //   })
      // revalidatePath(path)

      //   if(deleteArticle && user?.id !== check?.author?.id){
      //     await db.notification.delete({
      //       where:{
      //         id:check?.id
      //       }
      //     })
      //   }
      // }
    revalidatePath(path)
    return check
  } catch (error) {
    console.error('Error fetching comments:', error)
    throw error
  }
}

 

