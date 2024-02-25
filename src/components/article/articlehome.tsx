'use client'
import { Badge, Button, Divider, Image, useSwitch } from '@nextui-org/react'
import { Avatar, AvatarImage } from '../ui/avatar'
import Followbtn from '../follow/followbtn'
import { Text } from '@chakra-ui/react'
import { Heart } from 'lucide-react'
import useSWR from 'swr'
import { useEffect, useState } from 'react'

async function fetcher(url: string) {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('cannot fetch top article')
  }
  console.log(response)
  return response.json()
}

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
  isFollow: boolean
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
  isFollow,
}: Props) {
  const [liked, setLiked] = useState(false)

  const { data: Like, mutate: MutaLike } = useSWR<any[]>(
    `/api/like?id=` + id,
    fetcher
  )

  useEffect(() => {
    async function FetchLike() {
      const result = await fetch('/api/like?id=' + id)
      const body = await result.json()
      setLiked(body)
    }
    FetchLike()
  }, [id])

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
    } catch (error) {}
  }

  return (
    <div className="h-full w-full    ">
      {/* TODO: Image && Name */}
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
                <Followbtn
                  ProfileId={author?.id || ''}
                  isFollowing={currentId}
                  checkFollow={isFollow}
                />
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

      <div className="w-full">
        {ArticleImage && <Image alt="Blog Image" src={ArticleImage} />}
      </div>

      <div className="mt-3 text-start">
        {tag.map((hashtag) => (
          <>
            {hashtag ? (
              <>
                <div className="badge badge-info">{hashtag.tag}</div>
              </>
            ) : null}
          </>
        ))}
        <div className="">
          <Button onClick={handleLike}>
            <Heart color={liked ? '#FF0000' : '#000000'} />
          </Button>
        </div>
        <div className="mt-3">
          <Text as="b">{title}</Text>
        </div>
        <div className="mt-3">
          <Text>{articleContent}</Text>
        </div>
      </div>
    </div>
  )
}
