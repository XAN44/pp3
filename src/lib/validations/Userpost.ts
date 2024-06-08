import { z } from 'zod'

export const TimeLinePost = z.object({
  content: z.string().nonempty().optional(),
  imagePost: z.string().url().nonempty().optional(),
})

export const ArticlePost = z.object({
  title: z.string().nonempty().optional(),
  articleContent: z.string().nonempty().optional(),
  tag: z.string().nonempty().optional(),
  articleImage: z.string().url().nonempty(),
})

export const EditArticle = z.object({
  title: z.string().nonempty().optional(),
  articleContent: z.string().nonempty().optional(),
})

export const PostPost = z.object({
  title: z.string().nonempty().optional(),
  articleContent: z.string().nonempty().optional(),
  tag: z.string().nonempty().optional(),
  PostImage: z.array(z.string().url().nonempty()), // Array of URLs
})

export const EventPost = z.object({
  title: z.string().nonempty({ message: 'โปรดกรอกข้อมูล' }),
  eventContent: z.string().nonempty('โปรดกรอกข้อมูล'),
  tag: z.string().nonempty('โปรดกรอกข้อมูล'),
  eventImage: z.string().url().nonempty('โปรดกรอกข้อมูล'),
  eventstartTime: z.string().nonempty('โปรดกรอกข้อมูล'),
  eventlocation: z.string().nonempty('โปรดกรอกข้อมูล'),
  blogInArticle: z
    .string()
    .nonempty(
      'โปรดกรอกข้อมูล หรือถ้าหากไม่มีบทความคุณสามารถเริ่มสร้างบล็อกได้เพื่อสร้างความน่าเชื่อถือในกิจกรรมของคุณ'
    ),
  eventcreator: z.string().nonempty('โปรดกรอกข้อมูล'),
  eventmore: z.string().nonempty('โปรดกรอกข้อมูล'),
  eventparticipants: z.string().refine(
    (value) => {
      // เช็คว่าเป็นตัวเลขหรือคำว่า "ไม่จำกัด" เท่านั้น
      return /^\d+$/.test(value) || value === 'ไม่จำกัด'
    },
    { message: 'โปรดกรอกข้อมูลเป็นตัวเลขหรือคำว่า "ไม่จำกัด"' }
  ),
})

export const commentPost = z.object({
  comment: z.string().nonempty(),
})

export const commentArticle = z.object({
  commentz: z.string().nonempty(),
})

export const commentEvent = z.object({
  commentz: z.string().nonempty(),
})

export const replyComment = z.object({
  reply: z.string().nonempty(),
})
