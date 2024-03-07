'use client'
import { Button } from '@nextui-org/button'
import { Avatar, Badge, Divider, Image } from '@nextui-org/react'
import { Flex, Heading } from '@radix-ui/themes'
import Link from 'next/link'
import { Text } from '@chakra-ui/react'
import { Heart } from 'lucide-react'
import useSWR from 'swr'
import { useEffect, useState } from 'react'
import VisitBtnArticleC from '../visit/visitArticleC'
import Followbtn from '../follow/followbtn'
import { Card, CardBody, CardFooter } from '@nextui-org/react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
const fetcher = (url: string) => fetch(url).then((res) => res.json())

interface Props {
  id: string
  title: string | null
  articleContent: string | null
  ArticleImage: string | null
  eventlocation: string | null
  eventparticipants: string | null
  eventstartTime: string | null
  createAt: string
  totalFollower: number
  totalFollowing: number
  isFollow: boolean
  currentId: string

  tag: {
    tag: string | null
  }[]
  authorId: string | null
  author: {
    id: string
    name: string | null
    image: string | null
    bio: string | null
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
  totalVisit: number
}

interface JoinData {
  totalJoin: number
  existingJoin: {
    currentId: string
  }
  joined: boolean
}

interface CheckCount {
  eventparticipants: string
}

interface getArticleWithTag {
  id: string
  title: string
  tagrecom: string
  ArticleImage: string
  createAt: string
  authorId: string
  author: {
    id: string
    name: string | null
    image: string | null
  }
}
interface FollowData {
  existingFollow: {
    currentAccountId: string | null
  }
  Followed: boolean
}
export default function EventHomePage({
  id,
  title,
  articleContent,
  ArticleImage,
  eventlocation,
  eventparticipants,

  tag,
  author,
  authorId,
  comments,
  createAt,
  currentId,
  totalFollower,
  totalFollowing,
  eventstartTime,
  isComment,
  totalVisit,
  isFollow,
}: Props) {
  const { data: join, mutate: MutaJoin } = useSWR<JoinData>(
    `/api/join?id=${id}`,
    fetcher
  )

  const { data: checkREGEVENT, mutate: MutaCheck } = useSWR<CheckCount>(
    `/api/event?id=${id}`,
    fetcher
  )

  const [isJoined, setIsJoined] = useState(false)

  useEffect(() => {
    if (join && join.joined) {
      setIsJoined(join.joined)
    }
  }, [join])

  const handleJoin = async () => {
    try {
      const response = await fetch('/api/join', {
        method: 'POST',
        body: JSON.stringify({ id }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await response.json()
      if (response.ok) {
        setIsJoined(!isJoined)
        MutaJoin()
      }
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการกดไลค์:', error)
    }
  }
  return (
    <>
      <div className="">
        <Text as="b">ผู้เขียน Blog</Text>
      </div>
      <div className=" flex  h-full w-full items-center ">
        <div className="flex rounded-lg p-3 shadow-xl ring-1 ring-gray-400   ">
          {/* TODO: Image && Name */}

          <Flex align="center" justify="start">
            {author?.image && (
              <Avatar src={author?.image || ''} alt="profileImage" />
            )}
            <div className="ml-3 grid">
              <Text> {author && author.name}</Text>
              <Text>{author && author.bio}</Text>
            </div>
          </Flex>
          {currentId !== authorId && (
            <Followbtn
              key={authorId}
              ProfileId={currentId}
              isFollowing={authorId || ''}
              checkFollow={isFollow}
            />
          )}
          <div className="mt-3 flex items-center justify-center space-x-10 text-center xl:grid xl:items-start xl:justify-start xl:space-x-0 xl:text-start">
            <div className="flex ">
              <div className="w-[83px]">
                <Text>ผู้ติดตาม</Text>
              </div>
              <Text>{totalFollower}</Text>
            </div>
            <div className="flex space-x-2">
              <Text>กำลังติดตาม </Text>
              <Text>{totalFollowing}</Text>
            </div>
          </div>
          <p>
            <Link href={`/profile/${author?.id}`}>เยี่ยมชมโปรไฟล์</Link>
          </p>
        </div>

        <div className="ml-3">
          <div className="grid">
            {tag.map((hashtag, index) => (
              <div key={index} className="badge badge-info">
                {hashtag?.tag}
              </div>
            ))}
            <div className="flex">
              <p>ยอดผู้เข้าชม {totalVisit}</p>
              {join && (
                <Button
                  isIconOnly
                  variant="light"
                  size="sm"
                  aria-label="Like"
                  color="danger"
                  className="
              relative left-4 w-full overflow-visible
              after:absolute after:inset-0 after:bg-background/40 
              after:transition
              after:!duration-500 hover:-translate-y-2 hover:after:scale-150 hover:after:opacity-0
              "
                  onClick={handleJoin}
                  disabled={
                    checkREGEVENT?.eventparticipants !== 'ไม่จำกัด' &&
                    join?.totalJoin >=
                      parseInt(checkREGEVENT?.eventparticipants || '0')
                  }
                >
                  {isJoined ? 'ยกเลิกเข้าร่วม' : 'เข้าร่วม'}
                </Button>
              )}
              {join && checkREGEVENT && (
                <div className="">
                  จำนวนการเข้าร่วม {join?.totalJoin} /{' '}
                  {checkREGEVENT?.eventparticipants}
                </div>
              )}
            </div>

            <Text as="small">เขียนวันที่ {createAt}</Text>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mt-6 grid  rounded-lg p-3 shadow-xl ring-1 ring-gray-400">
        <div className="mt-5 text-start">
          <Text as="b">{title}</Text>
        </div>
        <div className="mt-3">
          <Text>{articleContent}</Text>
        </div>
        <Text>เวลาเริ่มกิจกรรม : {eventstartTime}</Text>
        <div className="mt-3 flex w-full items-center justify-center p-0">
          {ArticleImage && (
            <Image
              alt="Blog Image"
              src={ArticleImage}
              width={600}
              height={600}
              className="object-cover"
            />
          )}
        </div>
      </div>
    </>
  )
}
