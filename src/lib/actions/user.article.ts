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
}: Props) {
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
    throw new Error(`Failed to create/update user: ${error.message}`);
  }
}
