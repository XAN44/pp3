'use server'

import { revalidatePath } from 'next/cache'
import { db } from '../db'
import { getCurrentUser } from '../session'
import { Notification } from './user.notification'
import { mutate } from 'swr'

interface Props {
  authorId: string
  title: string
  articleContent: string
  ArticleImage: string
  path: string
  tag: string
}

export async function POSTARTILE({
  authorId,
  title,
  articleContent,
  ArticleImage,
  path,
  tag,
}: Props): Promise<void> {
  try {
    if (!authorId) {
      throw new Error('Pless LOGIN')
    }
    await db.article.create({
      data: {
        authorId: authorId,
        title,
        articleContent,
        ArticleImage,
        tag: {
          create: {
            tag: tag,
          },
        },
      },
    })
    revalidatePath(path)
  } catch (error: any) {
    console.error(error) // Log the error for debugging

    throw new Error(`Failed to create/update user: ${error.message}`)
  }
}

interface PropsARTICLE {
  authorId: string
  title: string
  content: string[]
  ArticleImage: string
  path: string
  tag: string
}

export async function POSTARTILETEST({
  authorId,
  title,
  content,
  ArticleImage,
  path,
  tag,
}: PropsARTICLE): Promise<void> {
  try {
    if (!authorId) {
      throw new Error('Pless LOGIN')
    }
    await db.article.create({
      data: {
        authorId: authorId,
        title,
        content,
        ArticleImage,
        tag: {
          create: {
            tag: tag,
          },
        },
      },
    })
    revalidatePath(path)
  } catch (error: any) {
    console.error(error) // Log the error for debugging

    throw new Error(`Failed to create/update user: ${error.message}`)
  }
}

export async function CommentinArticles(
  articleId: string,
  comment: string,
  authorId: string,
  path: string
) {
  try {
    const inArticle = await db.article.findUnique({
      where: {
        id: articleId,
      },
    })
    if (!inArticle) {
      throw new Error('dont have article')
    }

    const newCommentInArticle = await db.comment.create({
      data: {
        text: comment,
        articleId: articleId,
        authorid: authorId,
      },
    })
    revalidatePath(path)
  } catch (error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`)
  }
}

export async function FetchArticleByID(id: string) {
  try {
    const article = await db.article.findUnique({
      where: {
        id: id,
      },
      include: {
        tag: {
          select: {
            id: true,
            tag: true,
          },
        },
        author: {
          select: {
            id: true,
            name: true,
            image: true,
            bio: true,
            followers: {
              select: {
                id: true,
              },
            },
            following: {
              select: {
                id: true,
              },
            },
          },
        },

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
                bio: true,
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
                id: true,
                replytext: true,
                authorid: true,
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

    if (!article) {
      throw new Error('Article not found')
    }
    return article
  } catch (error) {
    console.error('Error fetching comments:', error)
    throw error
  }
}

export async function getRepl(id: string) {
  try {
    const getReply = await db.reply.findMany({
      where: {
        replyCommet: {
          id: id,
        },
      },
      select: {
        id: true,
        replytext: true,
        author: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    })
  } catch (error) {}
}

export async function FetchPOSTeByID(id: string) {
  try {
    const article = await db.post.findUnique({
      where: {
        id: id,
      },
      include: {
        tag: {
          select: {
            id: true,
            tag: true,
          },
        },
        author: {
          select: {
            id: true,
            name: true,
            image: true,
            bio: true,
            followers: {
              select: {
                id: true,
              },
            },
            following: {
              select: {
                id: true,
              },
            },
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
                bio: true,
              },
            },
            articleId: true,
            Post: {
              select: {
                id: true,
                content: true,
                ImagePost: true,
              },
            },
            Reply: {
              select: {
                id: true,
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

    if (!article) {
      throw new Error('Article not found')
    }
    return article
  } catch (error) {
    console.error('Error fetching comments:', error)
    throw error
  }
}

export async function CommentinArticlesHome(
  articleId: string,
  comment: string,
  authorId: string,
  path: string
) {
  try {
    const user = await getCurrentUser()
    const inArticle = await db.article.findFirst({
      where: {
        id: articleId,
      },
      select: {
        authorId: true,
        title: true,
      },
    })
    if (!inArticle) {
      throw new Error('dont have article')
    }

    const newCommentInArticle = await db.comment.create({
      data: {
        text: comment,
        articleId: articleId,
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
          articleId: articleId,
          userId: inArticle.authorId,
          current: articleId,
          body: `ผู้ใช้ ${user?.name} ได้แสดงความคิดเห็นบนบล็อกของคุณ ${inArticle.title}`,
        },
      })
    }

    revalidatePath(path)
  } catch (error: any) {
    throw new Error(`Faied to creat comment : ${error.message}`)
  }
}
