import { z } from "zod";


export const TimeLinePost = z.object({
    content: z.string().nonempty().optional(),
    imagePost: z.string().url().nonempty().optional(),
})


export const commentPost = z.object({
    comment: z.string().nonempty(),
})


export const replyComment = z.object({
    reply: z.string().nonempty(),
})