'use client'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { CommentinArticlesHome } from '@/lib/actions/user.article'
import { commentArticle } from '@/lib/validations/Userpost'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '../ui/button'
import { Avatar } from '@nextui-org/react'

interface Props {
  articleId: string
  currentUserImage: string
  currentUserId: string
}

export default function CommentArticleInHome({
  articleId,
  currentUserImage,
  currentUserId,
}: Props) {
  const path = usePathname() ?? ''
  const commentTimeLine = useForm<z.infer<typeof commentArticle>>({
    resolver: zodResolver(commentArticle),
    defaultValues: {
      commentz: '',
    },
  })

  const onSubmitPost = async (values: z.infer<typeof commentArticle>) => {
    await CommentinArticlesHome(articleId, values.commentz, currentUserId, path)
    commentTimeLine.reset()
  }

  // const onSubmitPost = async () => {
  //   try {
  //     const response = await fetch(`/api/commentArticle`, {
  //       method: 'POST',
  //       body: JSON.stringify({
  //         articleId: articleId,
  //         text: commentTimeLine.getValues('commentz'),
  //         authorid: currentUserId,
  //       }),
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     })
  //     if (!response.ok) {
  //       throw new Error('Failed to submit comment')
  //     }
  //     mutate(`/api/commentArticle?articleId=${articleId}`) // อัปเดตข้อมูลด้วย mutate

  //     commentTimeLine.reset() // Reset ค่าใน form
  //   } catch (error) {
  //     console.error('Error submitting comment:', error)
  //   }
  // }

  return (
    <div className="">
      <Form {...commentTimeLine}>
        <form
          onSubmit={commentTimeLine.handleSubmit(onSubmitPost)}
          className="
            flex  
            justify-center 
             text-center "
        >
          <FormField
            control={commentTimeLine.control}
            name="commentz"
            render={({ field }) => (
              <FormItem
                className="
                flex w-full 
                items-center 
                gap-3 "
              >
                <FormLabel>
                  <Avatar src={currentUserImage} alt="profile" />
                </FormLabel>

                <FormControl
                  className="
                 border-none
                  "
                >
                  <input
                    placeholder="Comment.."
                    className=" 
                    w-full
                     rounded-lg bg-base-300 p-3"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="ml-3 mt-1 flex w-32">
            Comment
          </Button>
        </form>
      </Form>
    </div>
  )
}
