'use client'
import { Container, Flex, Grid, Text } from '@radix-ui/themes'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Avatar, AvatarImage } from '../ui/avatar'

interface Props {
  id: string
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
    replyComment: {
      id: string
    }
  }[]
  isComment?: boolean
  isReply?: boolean
  currentUserId: string // เพิ่ม currentUserId เข้าไปใน Props
  currentUserImage: string // เพิ่ม currentUserImage เข้าไปใน Props
}

const CommentCard = ({
  id,
  currentUserId, // รับค่า currentUserId ผ่าน props
  currentUserImage, // รับค่า currentUserImage ผ่าน props
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

  return (
    <Container size="4" p="6" className="flex w-full flex-col rounded-xl">
      <div className="mt-3 mb-7 text-center items-center justify-center  place-items-center"></div>
      {isComment ? (
        <>
          <Flex gap="3">
            <Link href={`/profile/${author?.id}`}>
              <Avatar>
                {author?.image && (
                  <AvatarImage
                    src={author?.image}
                    width={100}
                    height={100}
                    alt="profileImage"
                  />
                )}
              </Avatar>
            </Link>
            {/* Comment By name */}
            <Text mt="2" size="5">
              {author?.name}
            </Text>
          </Flex>
          {/* Comment In Post */}
          <Grid mt="6" ml="8" width="100%">
            <Text>{comment}</Text>
          </Grid>
          {/* Click To show reply */}
          {isReply && !showReply && reply.length > 0 && (
            <div className="">
              <button onClick={handleShowReply}>แสดงการตอบกลับ</button>
            </div>
          )}
          {isReply && showReply && (
            <div className="">
              <button onClick={handleHiddenReply}>ซ่อนการตอบกลับ</button>
              <div className="">
                {reply.map((r) => (
                  <div key={r.id}>
                    <Grid>
                      <Flex p="3">
                        {typeof r.author?.image === 'string' && (
                          <Image
                            src={r.author?.image}
                            alt="profile"
                            width={24}
                            height={24}
                            className="rounded-full object-cover"
                          />
                        )}
                        <Text>{r.author?.name}</Text>
                      </Flex>
                      <Text>{r.replytext}</Text>
                    </Grid>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      ) : null}
    </Container>
  )
}

export default CommentCard
