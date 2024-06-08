'use client'
import { Badge, Button, Divider, Image, useSwitch } from '@nextui-org/react'
import { Avatar, AvatarImage } from '../ui/avatar'
import Followbtn from '../follow/followbtn'
import { Text } from '@chakra-ui/react'
import { Heart, Trash2 } from 'lucide-react'
import useSWR from 'swr'
import { useEffect, useState } from 'react'
import { FaComment } from 'react-icons/fa'
import { FaRegComment, FaRegCommentDots } from 'react-icons/fa6'
import Follow from '../follow/follow'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@nextui-org/react'
import { HiEllipsisHorizontal, HiEllipsisVertical } from 'react-icons/hi2'
import PostDelete from './components/PostDelete'
import PostOption from './components/PostOption'
import Link from 'next/link'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

interface Props {
  id: string
  content: string | null
  ImagePost: string
  createAt: string
  tag: {
    id: string | null
    tag: string | null
  }[]
  authorId: string | null
  author: {
    id: string
    name: string | null
    image: string | null
  } | null
  comments: {
    id: string
    text: string
    author: {
      id: string
      name: string | null
      image: string | null
    } | null
  }[]
  isComment?: boolean
  currentId: string
  // isFollow: boolean
}

interface LikeData {
  totalLike: number
  existingLike: {
    currentId: string
  }
  liked: boolean
}

interface FollowData {
  existingFollow: {
    currentAccountId: string | null
  }
  Followed: boolean
}

export default function Posthome({
  id,
  content,
  ImagePost,
  tag,
  author,
  authorId,
  comments,
  createAt,
  isComment,
  currentId,
}: Props) {
  const { data: Like, mutate: MutaLike } = useSWR<LikeData>(
    `/api/likepost?id=${id}`,
    fetcher
  )
  const { data: Follow, mutate: MutaFollow } = useSWR<FollowData>(
    `api/follow?authorId=${authorId}`,
    fetcher
  )

  const [follow, setFollow] = useState(false)
  const [liked, setLiked] = useState(false)

  useEffect(() => {
    if (Follow && Follow.Followed) {
      setFollow(Follow.Followed)
    }
  }, [Follow])

  const handleFollow = async () => {
    try {
      const response = await fetch('/api/follow', {
        method: 'POST',
        body: JSON.stringify({ authorId }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await response.json()
      if (response.ok) {
        setFollow(!follow)
        MutaFollow()
      }
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการติดตาม:', error)
    }
  }

  const [openDelete, setOpenDelete] = useState(false)

  const handleDelete = async () => {
    try {
      const response = await fetch('/api/deletepost', {
        method: 'DELETE',
        body: JSON.stringify({ id }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await response.json()
      if (response.ok) {
        console.log('ลบโพสสําเร็จ')
      }
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการลบโพส:', error)
    }
  }

  useEffect(() => {
    if (Like && Like.liked) {
      setLiked(Like.liked)
    }
  }, [Like])

  const handleLike = async () => {
    try {
      const response = await fetch('/api/likepost', {
        method: 'POST',
        body: JSON.stringify({ id }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await response.json()
      if (response.ok) {
        setLiked(!liked)
        MutaLike()
      }
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการกดไลค์:', error)
    }
  }
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <div className="h-full w-full  ">
      <div className="flex justify-between">
        <Avatar className="h-14 w-14">
          {author?.image && (
            <AvatarImage
              src={author?.image || ''}
              alt="profileImage"
              width={250}
              height={250}
            />
          )}
        </Avatar>
        <div
          className=" 
          ml-3 
          mt-3 
          grid 
          w-full
          justify-between 
          text-start"
        >
          <div className="flex w-full max-w-full  flex-grow  items-center justify-center ">
            <Text as="b"> {author && author.name}</Text>
            <div className="divider divider-neutral divider-horizontal mt-3 h-5 w-2 items-center justify-center" />
            <div className="mb-2 mr-3">
              {currentId === author?.id && (
                <div className="badge badge-neutral mt-3">โพสต์ของคุณ</div>
              )}
            </div>
            <div className="  items-center justify-center ">
              <Link href={`/profile/${author?.id}`}>
                <Text
                  as="b"
                  color="blue"
                  cursor="pointer"
                  className="hover:underline"
                >
                  เยี่ยมชมโปรไฟล์
                </Text>
              </Link>
            </div>
            <div className="ml-44 flex items-center justify-center ">
              {currentId === author?.id && (
                <div className="max-w-full">
                  <PostOption id={id} content={content || ''} />
                </div>
              )}
            </div>
          </div>
          <div className="">
            <Text> {createAt}</Text>
          </div>
        </div>
      </div>
      <div className="mt-4 grid place-items-center items-center justify-center ">
        <div className="mt-4 grid place-items-center items-center justify-center">
          <Image alt={`Blog Image`} src={ImagePost} />
        </div>
      </div>

      <div className="mt-6 text-start">
        {tag.map((hashtag) => (
          <>
            {hashtag ? (
              <>
                <div className="badge badge-info w-auto">{hashtag.tag}</div>
              </>
            ) : null}
          </>
        ))}
        <div className="mt-4 flex items-center justify-start space-x-6">
          {Like && (
            <Button
              isIconOnly
              variant="light"
              size="sm"
              aria-label="Like"
              color="danger"
              className="
              relative overflow-visible 
             after:absolute
              after:inset-0 after:bg-background/40 after:transition
              after:!duration-500 hover:-translate-y-2 hover:after:scale-150 hover:after:opacity-0
              "
              onClick={handleLike}
            >
              <Badge content={Like.totalLike} color="default" variant="faded">
                <Heart
                  color={liked ? '#FF0000' : '#000000'}
                  className="hover:	hover:cursor-pointer"
                />
              </Badge>
            </Button>
          )}
          {comments.length > 0 && (
            <>
              <Badge
                className="ml-6"
                content={comments.length}
                color="default"
                variant="faded"
              >
                <FaRegCommentDots />
              </Badge>
            </>
          )}
        </div>
        <div className="mt-3"></div>
        <div className="mt-1 p-3">
          <Text>{content}</Text>
        </div>
      </div>
    </div>
  )
}
