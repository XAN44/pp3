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

    console.log("db.article:", db.article);

    if (!db.article) {
      throw new Error("db.article is undefined");
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
