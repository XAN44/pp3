'use server'
import { revalidatePath } from 'next/cache'
import { db } from '../db'
import { getCurrentUser } from '../session'
import { select } from '@nextui-org/theme'

interface userPost {
  authorId: string
  path: string
  ImagePost: string
  content: string
  tag:string
}

export async function userPost({
  authorId,
  content,
  ImagePost,
  tag,
  path,
}: userPost): Promise<void> {
  try {
    if (!authorId) {
      throw new Error('ไม่มีผู้ใช้')
    }
    await db.post.create({
      data: {
        authorId: authorId,
        content,
        ImagePost,
        tag:{
          create:{
            tag:tag
          }
        }
      },
    })
    revalidatePath(path)
  } catch (error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`)
  }
}

export async function FetchUserPost() {
  try {
    const user = await getCurrentUser()
    if (!user?.id) {
      throw new Error('not have dung')
    }
    if (user?.id) {
      const fetchUser = await db.post.findMany({
        where: {
          authorId: user.id,
        },
        orderBy: {
          createdAt: 'desc',
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
            select: {
              id: true,
              text: true,
              author: {
                select: {
                  id: true,
                  name: true,
                  image: true,
                },
              },
            },
          },
        },
      })
      return fetchUser
    }
  } catch (error) {
    console.error('Error fetching user posts:', error)
  }
}

export async function Fetchusercomment() {
  try {
    const fetchcomment = await db.comment.findMany({
      select: {
        id: true,
        postId: true,
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
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    return fetchcomment
  } catch (error) {
    console.error('Error fetching user posts:', error) // หรือใช้วิธีที่ต้องการเพื่อจัดการข้อผิดพลาดที่เกิดขึ้น
  }
}

export async function fetchUserProfileByID(id: string) {
  if (!id) {
    return null
  }

  const user = await getCurrentUser()
  const fetchUser = await db.user.findMany({
    where: {
      id: id,
    },
    include: {
      //Todo: Notification
      notifications: {
        select: {
          id: true,
          userId: true,
          current: true,
          body: true,
          createAt: true,
          event: {
            select: {
              id: true,
              title: true,
            },
          },
          article: {
            select: {
              id: true,
              title: true,
            },
          },
          user: {
            select: {
              id: true,
              name: true,
            },
          },
          post: {
            select: {
              id: true,
              content: true,
            },
          },
          comment: {
            select: {
              text: true,
            },
          },
        },
      },
      // Todo:Event
      Event: {
        select: {
          id: true,
          title: true,
          eventContent: true,
          eventImage: true,
          createAt: true,
          authorId: true,
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
          comment: {
            include: {
              author: {
                select: {
                  id: true,
                  name: true,
                  image: true,
                },
              },
            },
          },
        },
      },
      // TODO:Article
      Article: {
        select: {
          id: true,
          title: true,
          articleContent: true,
          ArticleImage: true,
          createAt: true,
          authorId: true,
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
          comment: {
            include: {
              author: {
                select: {
                  id: true,
                  name: true,
                  image: true,
                },
              },
            },
          },
        },
      },
      // TODO: POST
      post: {
   
        select: {
          id: true,
          content: true,
          ImagePost: true,
          createdAt: true,
          authorId: true,
          author: {
            select: {
              id: true,
              name: true,
              image: true,
              Facebook: true,
              Tiktok: true,
              IG: true,
              Twitter: true,
            },
          },
          tag: {
            select: {
              id: true,
              tag: true,
            },
          },
          // TODO:COMMENT
          comments: {
            select: {
              Reply:{
                select:{
                  author:{
                    select:{
                      id:true,
                      name:true,
                      image:true
                    }
                  }
                }
              },
              author: {
                select: {
                  id: true,
                  name: true,
                  image: true,
                },
              },
            },
          },

        },
      },
    },
  })
  return fetchUser
}

export async function fetchInBlogPage() {
  const fetchUser = await db.article.findMany({
    take: 5,
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
  return fetchUser
}

export async function fetchInEnentPage() {
  const fetchUser = await db.event.findMany({
    select: {
      id: true,
      title: true,
      eventImage: true,
      eventContent: true,
      createAt: true,
      authorId: true,
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
  return fetchUser
}
