"use server";
import { revalidatePath } from "next/cache";
import { db } from "../db";
import { getCurrentUser } from "../session";

interface userPost {
  authorid: string;
  path: string;
  ImagePost: string;
  content: string;
}

export async function userPost({
  authorid,
  content,
  ImagePost,
  path,
}: userPost): Promise<void> {
  try {
    if (!authorid) {
      throw new Error("ไม่มีผู้ใช้");
    }
    await db.post.create({
      data: {
        authorId: authorid,
        content,
        ImagePost,
      },
    });
    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`);
  }
}

export async function FetchUserPost() {
  try {
    const user = await getCurrentUser();
    if (!user?.id) {
      throw new Error("not have dung");
    }
    if (user?.id) {
      const fetchUser = await db.post.findMany({
        where: {
          authorId: user.id,
        },
        orderBy: {
          createdAt: "desc",
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
      });
      return fetchUser;
    }
  } catch (error) {
    console.error("Error fetching user posts:", error);
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
        createdAt: "desc",
      },
    });
    return fetchcomment;
  } catch (error) {
    console.error("Error fetching user posts:", error); // หรือใช้วิธีที่ต้องการเพื่อจัดการข้อผิดพลาดที่เกิดขึ้น
  }
}

export async function fetchUserProfileByID(id: string) {
  if (!id) {
    return null;
  }
  if (id) {
    const fetchUser = await db.user.findMany({
      where: {
        id: id,
      },
      include: {
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
          orderBy: {
            createdAt: "desc",
          },
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
            // TODO:COMMENT
            comments: {
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
      },
    });
    return fetchUser;
  }
}
