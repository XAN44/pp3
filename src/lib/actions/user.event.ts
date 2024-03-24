'use server'

import { revalidatePath } from 'next/cache'
import { db } from '../db'

interface Props {
  authorId: string
  title: string
  eventContent: string
  eventImage: string
  eventstartTime: string
  eventlocation: string
  eventparticipants: string
  eventcreator: string
  eventmore: string
  blogInArticle: any
  path: string
  tag: string
}

export async function EVENTPOST({
  authorId,
  title,
  eventContent,
  eventImage,
  eventstartTime,
  eventlocation,
  blogInArticle,
  eventparticipants,
  eventcreator,
  eventmore,
  path,
  tag,
}: Props): Promise<void> {
  try {
    if (!authorId) {
      throw new Error('Pless LOGIN')
    }

    await db.event.create({
      data: {
        author: {
          connect: { id: authorId },
        },
        title,
        eventContent,
        eventcreator,
        eventmore,
        eventImage,
        eventstartTime,
        eventlocation,
        blogInArticle: {
          connect: { id: blogInArticle },
        },
        eventparticipants,
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
    const inArticle = await db.event.findUnique({
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

// export async function rep(id: string) {
//   try {
//     const reply = await db.comment.findUnique({
//       where: {
//         id: id,
//       },
//       select: {
//         Reply: {
//           select: {
//             id: true,
//             replytext: true,
//             author: {
//               select: {
//                 id: true,
//                 name: true,
//                 image: true,
//               },
//             },
//             replyCommet: {
//               select: {
//                 id: true,
//               },
//             },
//           },
//         },
//       },
//     })
//     return reply
//   } catch (error) {
//     console.error('Error fetching comments:', error)
//     throw error
//   }
// }
export async function FetchArticleByID(id: string) {
  try {
    const article = await db.event.findUnique({
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
              },
            },
            eventId: true,
            Event: {
              select: {
                id: true,
                title: true,
                eventContent: true,
                eventImage: true,
                eventstartTime: true,
                eventlocation: true,
                eventparticipants: true,
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

    if (!article) {
      throw new Error('Article not found')
    }
    return article
  } catch (error) {
    console.error('Error fetching comments:', error)
    throw error
  }
}

export async function FetchEventByID(id: string) {
  try {
    const article = await db.event.findUnique({
      where: {
        id: id,
      },

      include: {
        RegisterEvent: {
          select: {
            userID: true,
            user: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
        },
        blogInArticle: {
          select: {
            id: true,
            title: true,
            ArticleImage: true,
            articleContent: true,
            createAt: true,
            author: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
            Visit: {
              select: {
                count: true,
              },
            },
            tag: {
              select: {
                tag: true,
              },
            },
          },
        },
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
            eventId: true,
            Event: {
              select: {
                id: true,
                title: true,
                eventContent: true,
                eventImage: true,
                eventlocation: true,
                eventparticipants: true,
                eventstartTime: true,
                eventcreator: true,
                eventmore: true,
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

export async function CommentinEvent(
  eventId: string,
  comment: string,
  authorId: string,
  path: string
) {
  try {
    const inArticle = await db.event.findUnique({
      where: {
        id: eventId,
      },
    })
    if (!inArticle) {
      throw new Error('dont have article')
    }

    const newCommentInArticle = await db.comment.create({
      data: {
        text: comment,
        eventId: eventId,
        authorid: authorId,
      },
    })
    revalidatePath(path)
  } catch (error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`)
  }
}
