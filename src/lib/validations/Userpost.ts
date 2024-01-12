import { z } from "zod";

export const TimeLinePost = z.object({
  content: z.string().nonempty().optional(),
  imagePost: z.string().url().nonempty().optional(),
});

export const ArticlePost = z.object({
  title: z.string().nonempty().optional(),
  articleContent: z.string().nonempty().optional(),
  tag: z.string().nonempty().optional(),
  articleImage: z.string().url().nonempty().optional(),
});

export const commentPost = z.object({
  comment: z.string().nonempty(),
});

export const commentArticle = z.object({
  commentz: z.string().nonempty(),
});

export const replyComment = z.object({
  reply: z.string().nonempty(),
});
