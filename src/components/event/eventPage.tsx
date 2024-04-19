'use client'
import { Button } from '@nextui-org/button'
import { Avatar, Badge, Divider, Image } from '@nextui-org/react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Container, Flex, Grid } from '@radix-ui/themes'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@nextui-org/react'
import Link from 'next/link'
import { Text } from '@chakra-ui/react'
import { Heart, Trash2 } from 'lucide-react'
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { usePathname } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { commentArticle, replyComment } from '@/lib/validations/Userpost'
import * as z from 'zod'
import { CommentinArticlesHome } from '@/lib/actions/user.article'
import { CommentinEvent } from '@/lib/actions/user.event'
import { replyComments } from '@/lib/actions/user.comment'
import { useRouter } from 'next/navigation'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

interface Props {
  id: string
  ArticleImage: string | null
  title: string | null
  createAt: string
  totalFollower: number
  totalFollowing: number
  isFollow: boolean
  currentId: {
    id: string
    name: string
    image: string
  } | null
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

interface FollowData {
  existingFollow: {
    currentAccountId: string | null
  }
  Followed: boolean
}
export default function EventHomePage({
  id,
  ArticleImage,
  tag,
  author,
  authorId,
  createAt,
  currentId,
  totalFollower,
  totalFollowing,
  title,
  totalVisit,
  isFollow,
}: Props) {
  const router = useRouter()

  const { data: join, mutate: MutaJoin } = useSWR<JoinData>(
    `/api/join?id=${id}`,
    fetcher
  )

  const { data: checkREGEVENT, mutate: MutaCheck } = useSWR<CheckCount>(
    `/api/event?id=${id}`,
    fetcher
  )
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const handleDelete = async () => {
    try {
      const response = await fetch('/api/deleteEvent', {
        method: 'DELETE',
        body: JSON.stringify({ id }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await response.json()
      if (response.ok) {
        router.push('/home')
      }
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการลบโพส:', error)
    }
  }

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
      <div className="mb-3 mt-3">
        {tag.map((hashtag, index) => (
          <div key={index} className="badge badge-info">
            {hashtag?.tag}
          </div>
        ))}
      </div>
      <div className="mt-3 text-start">
        <Text as="b" color="red">
          {title}
        </Text>
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
          {currentId?.id !== authorId && (
            <Followbtn
              key={authorId}
              ProfileId={currentId?.id || ''}
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
            <div className="flex">
              {join && (
                <Button
                  isIconOnly
                  variant="light"
                  size="sm"
                  aria-label="Like"
                  color="danger"
                  className="
                          relative left-4 w-52 overflow-visible
                          after:absolute after:inset-0 
                          after:bg-background/40 
                          after:transition
                          after:!duration-500 
                          hover:-translate-y-2 
                          hover:after:scale-150 
                          hover:after:opacity-0
                        "
                  onClick={handleJoin}
                  disabled={
                    checkREGEVENT?.eventparticipants !== '-0' &&
                    join?.totalJoin >=
                      parseInt(checkREGEVENT?.eventparticipants || '0') &&
                    !isJoined
                  }
                >
                  {isJoined ? 'ยกเลิกเข้าร่วม' : 'เข้าร่วม'}
                </Button>
              )}
              {currentId?.id === author?.id && (
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
                    <Trash2 />
                  </Button>
                  <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                    <ModalContent>
                      {(onClose) => (
                        <>
                          <ModalHeader className="flex flex-col gap-1">
                            คุณต้องการที่จะลบบทความนี้ ?
                          </ModalHeader>
                          <ModalBody>
                            <p>
                              การลบจะทำให้หายไปจากไทม์ไลน์ของคุณและผู้อื่นจะไม่สามารถอ่านบทความนี้ได้อีก
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
            <p>ยอดผู้เข้าชม {totalVisit}</p>

            {join && checkREGEVENT && (
              <div className="">
                จำนวนการเข้าร่วม {join?.totalJoin} /{' '}
                {checkREGEVENT?.eventparticipants}
              </div>
            )}
            <Text as="small">เขียนวันที่ {createAt}</Text>
          </div>
        </div>
      </div>
    </>
  )
}
