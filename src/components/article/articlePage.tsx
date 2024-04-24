'use client'
import { Button } from '@nextui-org/button'
import { Avatar, Badge, Divider, Image } from '@nextui-org/react'
import { Flex, Heading } from '@radix-ui/themes'
import Link from 'next/link'
import { Text } from '@chakra-ui/react'
import { Heart, Trash2 } from 'lucide-react'
import useSWR from 'swr'
import parse from 'html-react-parser'

import { useCallback, useEffect, useState } from 'react'
import Followbtn from '../follow/followbtn'

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@nextui-org/react'
import { AiOutlineDelete } from 'react-icons/ai'
import { useRouter } from 'next/navigation'
import { format } from 'date-fns'
import { CiEdit } from 'react-icons/ci'
import 'react-quill/dist/quill.snow.css'
import dynamic from 'next/dynamic'
import axios from 'axios'

const DynamicQuill = dynamic(() => import('react-quill'), { ssr: false })

const fetcher = (url: string) => fetch(url).then((res) => res.json())

interface Props {
  id: string
  title: string | null
  articleContent: string | null
  ArticleImage: string | null
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
export default function ArticleHomePage({
  id,
  title,
  articleContent,
  ArticleImage,
  tag,
  author,
  authorId,
  comments,
  createAt,
  currentId,
  totalFollower,
  totalFollowing,
  isComment,
  totalVisit,
  isFollow,
}: Props) {
  const router = useRouter()

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link'],
      [{ color: [] }],
      ['code-block'],
      ['clean'],
    ],
  }

  const quillFormats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
    'align',
    'color',
    'code-block',
  ]
  const { data: Like, mutate: MutaLike } = useSWR<LikeData>(
    `/api/like?id=${id}`,
    fetcher
  )

  const { data: Follow, mutate: MutaFollow } = useSWR<FollowData>(
    `/api/follow?authorId=${authorId}`,
    fetcher
  )

  const { data: hashtag } = useSWR(
    `/api/recommend?tag=${tag.map((tag) => tag.tag)}`,
    fetcher
  )

  const [Textcontent, setTextContent] = useState('')
  const [Textheader, setTextheader] = useState('')

  const handleDelete = async () => {
    try {
      const response = await fetch('/api/deleteArticle', {
        method: 'DELETE',
        body: JSON.stringify({ id }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await response.json()
      if (response.ok) {
        router.push('/home') // เมื่อลบเสร็จแล้วกลับไปที่หน้า /home
      }
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการลบโพส:', error)
    }
  }

  useEffect(() => {
    setTextheader(title || '')
    setTextContent(articleContent || '')
  }, [setTextheader, title, setTextContent, articleContent])

  const handleEdit = useCallback(() => {
    axios
      .put('/api/ArticleEdit', {
        id,
        ...(Textcontent !== articleContent
          ? { articleContent: Textcontent }
          : { articleContent: articleContent }),
        ...(Textheader !== title ? { title: Textheader } : { title: title }),
      })
      .then((res) => {
        router.refresh()
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [id, Textheader, title, Textcontent, articleContent, router])

  const [follow, setFollow] = useState(false)
  const [liked, setLiked] = useState(false)
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  useEffect(() => {
    if (Follow && Follow.Followed) {
      setFollow(Follow.Followed)
    }
  }, [Follow])

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
            <div className="flex space-x-6">
              <p>ยอดผู้เข้าชม {totalVisit}</p>
              {Like && (
                <Button
                  isIconOnly
                  variant="light"
                  size="sm"
                  aria-label="Like"
                  color="danger"
                  className="
              relative left-4 overflow-visible 
              after:absolute after:inset-0 after:bg-background/40 
              after:transition
              after:!duration-500 hover:-translate-y-2 hover:after:scale-150 hover:after:opacity-0
              "
                  onClick={handleLike}
                >
                  <Badge
                    content={Like.totalLike}
                    color="default"
                    variant="faded"
                  >
                    <Heart
                      color={liked ? '#FF0000' : '#000000'}
                      className="hover:	hover:cursor-pointer"
                    />
                  </Badge>
                </Button>
              )}
              {currentId === author?.id && (
                <>
                  <div className="">
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
                      <CiEdit size={25} className="hover:cursor-pointer" />
                    </Button>
                  </div>
                  <div className="">
                    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                      <ModalContent>
                        {(onClose) => (
                          <>
                            <ModalHeader className="flex flex-col gap-1">
                              เริ่มการแก้ไขบทความ
                            </ModalHeader>
                            <ModalBody>
                              <input
                                type="text"
                                onChange={(e) => setTextheader(e.target.value)}
                              />
                              <DynamicQuill
                                modules={quillModules}
                                formats={quillFormats}
                                placeholder="เริ่มเขียนบล็อกของคุณที่นี่"
                                theme="snow"
                                onChange={(value) => setTextContent(value)}
                              />
                            </ModalBody>
                            <ModalFooter>
                              <Button
                                color="danger"
                                variant="light"
                                onPress={handleEdit}
                              >
                                แก้ไขบทความ
                              </Button>
                              <Button color="primary" onPress={onClose}>
                                ยกเลิก
                              </Button>
                            </ModalFooter>
                          </>
                        )}
                      </ModalContent>
                    </Modal>
                  </div>
                </>
              )}
            </div>
            <Text as="small">เขียนวันที่ {createAt}</Text>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mt-6 grid w-full  rounded-lg p-3 shadow-xl ring-1 ring-gray-400">
        <div className="mt-5 w-full text-center">
          <Text as="b">{title}</Text>
        </div>
        <div className="mt-3 flex max-h-[400px] flex-col overflow-y-auto">
          {parse(articleContent || '')}
        </div>
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
