import { db } from '../db'

export async function fetchEventByTagTravel() {
  const fetchUser = await db.event.findMany({
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
          eventId: true,
          Event: {
            select: {
              id: true,
              title: true,
              eventContent: true,
              eventImage: true,
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

export async function fetchEventByTagFamily() {
  const fetchUser = await db.event.findMany({
    where: {
      tag: {
        some: {
          tag: 'ครอบครัว',
        },
      },
    },
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
          eventId: true,
          Event: {
            select: {
              id: true,
              title: true,
              eventContent: true,
              eventImage: true,
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

export async function fetchEventByTagBusiness() {
  const fetchUser = await db.event.findMany({
    where: {
      tag: {
        some: {
          tag: 'ธุรกิจ',
        },
      },
    },
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

export async function fetchEventByTagFood() {
  const fetchUser = await db.event.findMany({
    where: {
      tag: {
        some: {
          tag: 'อาหาร',
        },
      },
    },
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
          eventId: true,
          Event: {
            select: {
              id: true,
              title: true,
              eventContent: true,
              eventImage: true,
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
