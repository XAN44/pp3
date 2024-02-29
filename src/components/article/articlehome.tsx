'use client'
import { Badge, Button, Divider, Image, useSwitch } from '@nextui-org/react'
import { Avatar, AvatarImage } from '../ui/avatar'
import Followbtn from '../follow/followbtn'
import { Text } from '@chakra-ui/react'
import { Heart } from 'lucide-react'
import useSWR from 'swr'
import { useEffect, useState } from 'react'
import { FaComment } from 'react-icons/fa'
import { FaRegComment, FaRegCommentDots } from 'react-icons/fa6'
import Follow from '../follow/follow'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

interface Props {
  id: string
  title: string | null
  articleContent: string | null
  ArticleImage: string | null
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

export default function ArticleHome({
  id,
  title,
  articleContent,
  ArticleImage,
  tag,
  author,
  authorId,
  comments,
  createAt,
  isComment,
  currentId,
  // isFollow,
}: Props) {
  const { data: Like, mutate: MutaLike } = useSWR<LikeData>(
    `/api/like?id=${id}`,
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

  useEffect(() => {
    if (Like && Like.liked) {
      setLiked(Like.liked)
    }
  }, [Like])

  const handleLike = async () => {
    try {
      const response = await fetch('/api/like', {
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

  return (
    <div className="h-full w-full  ">
      <div className="flex">
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
        <div className="ml-3 mt-3 grid text-start">
          <div className="flex items-center justify-center ">
            <Text as="b"> {author && author.name}</Text>
            <div className="divider divider-neutral divider-horizontal mt-3 h-5 w-2 items-center justify-center" />
            <div className="">
              {currentId !== author?.id && (
                <>
                  {Follow && (
                    <Button onClick={handleFollow}>
                      {follow ? 'Unfollow' : 'Follow'}
                    </Button>
                  )}
                </>
              )}
            </div>
            <div className="mb-2">
              {currentId === author?.id && (
                <div className="badge badge-neutral mt-3">โพสต์ของคุณ</div>
              )}
            </div>
          </div>
          <div className="">
            <Text>{createAt}</Text>
          </div>
        </div>
      </div>
      <div className="mt-4 grid place-items-center items-center justify-center ">
        {ArticleImage && <Image alt="Blog Image" src={ArticleImage} />}
      </div>

      <div className="mt-6 text-start">
        {tag.map((hashtag) => (
          <>
            {hashtag ? (
              <>
                <div className="badge badge-info">{hashtag.tag}</div>
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
              shadow-xl after:absolute
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
        <div className="mt-3">
          <Text as="b">{title}</Text>
        </div>
        <div className="mt-1 p-3">
          <Text>{articleContent}</Text>
        </div>
      </div>
    </div>
  )
}
