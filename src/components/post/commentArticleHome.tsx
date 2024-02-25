'use client'
import { Container, Flex, Grid } from '@radix-ui/themes'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { replyComments } from '@/lib/actions/user.comment'
import { replyComment } from '@/lib/validations/Userpost'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { usePathname } from 'next/navigation'
import { Button } from '../ui/button'
import { Text } from '@chakra-ui/react'
import { Avatar } from '@nextui-org/react'
interface Props {
  id: string
  current: {
    id: string
    name: string | null
    image: string | null
  }
  comment: string | null
  authorId: string | null
  createAt: string
  author: {
    id: string
    name: string | null
    image: string | null
  } | null

  reply: {
    id: string
    replytext: true
    author: {
      id: string | null
      name: string | null
      image: string | null
    } | null
  }[]
  isComment?: boolean
  isReply?: boolean
}

const CommentArticleHome = ({
  id,
  current,
  comment,
  author,
  createAt,
  reply,
  authorId,
  isComment,
  isReply,
}: Props) => {
  const [replying, setReplying] = useState(false)
  const [showReply, setShowReply] = useState(false)
  const [showComment, setShowComment] = useState(false)
  const [replyVisible, setReplyVisible] = useState(false)
  const path = usePathname() ?? ''

  const handleShowComment = () => {
    setShowComment(true)
  }

  const handleShowReply = () => {
    setShowReply(true)
  }

  const handleHiddenReply = () => {
    setShowReply(false)
  }

  const handleReplyClick = () => {
    setReplying(true)
  }
  const handleCancleClick = () => {
    setReplying(false)
  }

  const replyForm = useForm<z.infer<typeof replyComment>>({
    resolver: zodResolver(replyComment),
    defaultValues: {
      reply: '',
    },
  })

  const onSubmitReply = async (values: z.infer<typeof replyComment>) => {
    await replyComments(id || '', values.reply, current.id || '', path)
  }

  return (
    <div className="flex w-full flex-col rounded-xl ">
      {isComment ? (
        <>
          <div className="flex gap-3">
            <Link href={`/profile/${author?.id}`}>
              {author?.image && <Avatar alt=".." src={author.image} />}
            </Link>
            <div className="grid text-start">
              <Text>{author?.name}</Text>
              <Text>{comment}</Text>
            </div>
          </div>

          {/* Click To show reply */}
          {isReply && !showReply && id.length > 0 && (
            <div className="text-end">
              <button onClick={handleShowReply}>แสดงการตอบกลับ</button>
            </div>
          )}
          {isReply && showReply && id.length > 0 && (
            <div className="">
              <div className="text-end">
                <button onClick={handleHiddenReply}>ซ่อนการตอบกลับ</button>
              </div>
              <div className="mb-4 ml-6">
                {reply.map((r, index) => (
                  <div key={index} className="mb-3 flex gap-3">
                    <>
                      <Avatar
                        src={r.author?.image || ''}
                        alt="profile"
                        className="rounded-full object-cover"
                      />
                      <div className="grid text-start">
                        <Text>{r.author?.name}</Text>
                        <Text>{r.replytext}</Text>
                      </div>
                    </>
                  </div>
                ))}
              </div>

              <Form {...replyForm}>
                <form
                  onSubmit={replyForm.handleSubmit(onSubmitReply)}
                  className="mb-4 flex justify-center text-center"
                >
                  <FormField
                    control={replyForm.control}
                    name="reply"
                    render={({ field }) => (
                      <FormItem className="flex w-full items-center gap-3">
                        <FormLabel>
                          <Avatar
                            key="w"
                            src={current?.image || ''}
                            alt="profile"
                          />
                        </FormLabel>

                        <FormControl className="border-none">
                          <input
                            placeholder="reply.."
                            className="w-full rounded-lg bg-base-300 p-3"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="ml-3 mt-1 flex w-32">
                    reply
                  </Button>
                </form>
              </Form>
            </div>
          )}
        </>
      ) : null}
    </div>
  )
}

export default CommentArticleHome
