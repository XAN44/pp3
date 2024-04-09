'use client'
import { Container, Flex, Grid } from '@radix-ui/themes'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
} from '@nextui-org/react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { DELETE, DELETEREPLYEVENT, replyComments, replyCommentsEvent } from '@/lib/actions/user.comment'
import { replyComment } from '@/lib/validations/Userpost'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { usePathname } from 'next/navigation'
import { Text } from '@chakra-ui/react'
import { Avatar } from '@nextui-org/react'
import { Delete } from 'lucide-react'
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

const CommentEventandreply = ({
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
  const [ replying, setReplying ] = useState(false)
  const [ showReply, setShowReply ] = useState(false)
  const [ showComment, setShowComment ] = useState(false)
  const [ replyVisible, setReplyVisible ] = useState(false)
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

  // const handleDelete = async () => {
  //   try {
  //     const response = await fetch('/api/deleteCommentArticle', {
  //       method: 'DELETE',
  //       body: JSON.stringify({ id }),
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     })
  //     const data = await response.json()
  //     if (response.ok) {
  //       //
  //     }
  //   } catch (error) {
  //     console.error('เกิดข้อผิดพลาดในการลบโพส:', error)
  //   }
  // }
  const handleDelete = async () => {
    await DELETE(id || '', path)
  }

  const handleDeleteReply = async (replyId: string) => {
    try {
      await DELETEREPLYEVENT(replyId, path);
      // เพิ่มโค้ดเพื่ออัปเดตหรือรีเฟรชข้อมูลหลังจากลบ reply ได้ตามต้องการ
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการลบการตอบกลับ:', error);
    }
  }
  const onSubmitReply = async (values: z.infer<typeof replyComment>) => {
    await replyCommentsEvent(id || '', values.reply, current.id || '', path)
    replyForm.reset()
  }
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <div className="flex w-full flex-col rounded-xl ">
      {isComment ? (
        <>
          <div className="flex gap-3">
            <Link href={`/profile/${author?.id}`}>
              {author?.image && <Avatar alt=".." src={author.image} />}
            </Link>
            <div className="grid  ">
              <div className="flex items-center">
                <Text>{author?.name}</Text>
                {current.id === author?.id && (
                  <>
                    <Button
                      isIconOnly
                      size="sm"
                      aria-label="delete"
                      variant="light"
                      color="danger"
                      className="
              relative left-4 overflow-visible 
              after:absolute after:inset-0 after:bg-background/40 
              after:transition
              after:!duration-500 hover:-translate-y-2 hover:after:scale-150 hover:after:opacity-0
              "
                      onPress={onOpen}
                    >
                      <Delete />
                    </Button>
                    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                      <ModalContent>
                        {(onClose) => (
                          <>
                            <ModalHeader className="flex flex-col gap-1">
                              คุณต้องการที่จะลบความคิดเห็นนี้ ?
                            </ModalHeader>
                            <ModalBody>
                              <p>
                                การลบจะทำให้ความคิดเห็นของผู้ใช้รายนี้หายไปจากบทความอย่างถาวร
                                คุณยืนยันที่จะลบหรือไม่
                              </p>
                            </ModalBody>
                            <ModalFooter>
                              <Button
                                color="danger"
                                variant="light"
                                onPress={handleDelete}
                              >
                                ลบ
                              </Button>
                              <Button color="primary" onPress={onClose}>
                                ยกเลิก
                              </Button>
                            </ModalFooter>
                          </>
                        )}
                      </ModalContent>
                    </Modal>
                  </>
                )}
              </div>
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
                  <div key={r.id} className="mb-3 flex gap-3">
                    <>
                      <Link href={`/profile/${r.author?.id}`}>
                        <Avatar
                          src={r.author?.image || ''}
                          alt="profile"
                          className="rounded-full object-cover"
                        />
                      </Link>

                      <div className="grid text-start">
                        <div className="flex items-center">


                          <Text>{r.author?.name}</Text>
                          {current.id === r.author?.id && (
                            <>
                              <Button
                                isIconOnly
                                size="sm"
                                aria-label="delete"
                                variant="light"
                                color="danger"
                                className="
                                                    relative left-4 overflow-visible 
                                                    after:absolute after:inset-0 after:bg-background/40 
                                                    after:transition
                                                    after:!duration-500 hover:-translate-y-2 hover:after:scale-150 hover:after:opacity-0
                                                    "
                                onPress={() => handleDeleteReply(r.id)}
                              >
                                <Delete />
                              </Button>

                            </>
                          )}
                        </div>
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

export default CommentEventandreply
