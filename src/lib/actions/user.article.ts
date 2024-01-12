"use server";

import { revalidatePath } from "next/cache";
import { db } from "../db";

interface Props {
  authorId: string;
  title: string;
  articleContent: string;
  ArticleImage: string;
  path: string;
  tag: string;
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
      throw new Error("Pless LOGIN");
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
    });
    revalidatePath(path);
  } catch (error: any) {
    console.error(error); // Log the error for debugging

    throw new Error(`Failed to create/update user: ${error.message}`);
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
    });
    if (!inArticle) {
      throw new Error("dont have article");
    }

    const newCommentInArticle = await db.comment.create({
      data: {
        text: comment,
        articleId: articleId,
        authorid: authorId,
      },
    });
    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`);
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
          },
        },
        comment: {
          orderBy: {
            createdAt: "asc",
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
      },
    });

    if (!article) {
      throw new Error("Article not found");
    }
    return article;
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
}