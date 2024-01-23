'use client'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { CommentinEvent } from '@/lib/actions/user.event'
import { commentEvent } from '@/lib/validations/Userpost'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '../ui/button'

interface Props {
  eventId: string
  currentUserImage: string
  currentUserId: string
}

export default function CommentIEvent({
  eventId,
  currentUserImage,
  currentUserId,
}: Props) {
  const path = usePathname() ?? ''

  const commentTimeLine = useForm<z.infer<typeof commentEvent>>({
    resolver: zodResolver(commentEvent),
    defaultValues: {
      commentz: '',
    },
  })

  const onSubmitPost = async (values: z.infer<typeof commentEvent>) => {
    await CommentinEvent(
      eventId,
      values.commentz,
      JSON.parse(currentUserId),
      path
    )
  }

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
                  <Image
                    src={currentUserImage}
                    alt="profile"
                    width={48}
                    height={48}
                    className="rounded-full object-cover"
                  />
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
