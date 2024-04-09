import { RegisterEvent } from './../../../node_modules/.prisma/client/index.d'
import { db } from '../db'
import { getCurrentUser } from '../session'

export async function fetchInBlogPage() {
  const fetchUser = await db.article.findMany({
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



export async function fetchInFollowInPage() {
  const user = await getCurrentUser()

  try {
    if(!user?.id){  
      return null
    }


    if(user.id){
      const fetchcontent = await db.follows.findMany({
        where:{
          followerId:user.id
        },
        include:{
          following:{
            select:{
              post:{
                select:{
                  id: true,
                  content:true,                       
                  ImagePost:true,
                  author:true,
                  tag:true,
                  Visit:{
                    select:{
                      count:true
                    }
                  },
                  comments:{
                    select:{
                      id:true,
                      text:true,
                      author:true
                    }
                  }
                }
              }
            }
          }
        }
      })
      return fetchcontent
    }

  } catch (error) {
    throw error    
  }
}

export async function fetchEventInBlogPage() {
  const fetchUser = await db.event.findMany({
    select: {
      id: true,
      title: true,
      eventImage: true,
      eventContent: true,

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


export async function fetchBlogByTag() {
  const fetchUser = await db.article.findMany({
    where: {
      tag: {
        some: {
          tag: 'ท่องเที่ยว',
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
  return fetchUser
}

export async function geteventregister(eventID: string) {
  const fetchUser = await db.registerEvent.count({
    where: {
      eventID,
    },
  })
  return fetchUser
}

export async function fetchPostcarosule() {
   const fetchUser = await db.post.findMany({
    select: {
      id: true,
      ImagePost: true,
      content: true,
      createdAt: true,
      authorId: true,
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



export async function fetchPostcarosuleByID(id: string) {
   const fetchUser = await db.post.findMany({
    where:{
      authorId:id
    },
    select: {
      id: true,
      ImagePost: true,
      content: true,
      createdAt: true,
      authorId: true,
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
      eventlocation: true,
      eventparticipants: true,
      eventstartTime: true,

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

export async function fetchBlogByFollowing(userId: string) {
  const followingIds = await db.follows.findMany({
    where: {
      followerId: userId,
    },
    select: {
      followingId: true,
    },
  })

  const fetchUser = await db.article.findMany({
    where: {
      authorId: {
        in: followingIds.map((follow) => follow.followingId),
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

  return fetchUser
}
