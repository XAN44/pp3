'use client'

import React, { useEffect, useState } from 'react'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Image,
  Card,
  CardBody,
  CardFooter,
  Avatar,
} from '@nextui-org/react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import useSWR from 'swr'
import { useSession } from 'next-auth/react'
import { Text } from '@chakra-ui/react'
import Link from 'next/link'

async function fetcher(url: string) {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('cannot fetch top article')
  }
  console.log(response)
  return response.json()
}

export default function SearchBar() {
  const [ queryArticle, setQueryArticle ] = React.useState('')
  const [ queryEvent, setQueryEvent ] = React.useState('')
  const [ queryProfile, setQueryProfile ] = React.useState('')
  const { data: session, status } = useSession()

  // TODO: 3 อันดับ
  // * blog - 3 อันดับ
  const { data: ToptierArticle, mutate: MutaSearch } = useSWR<any[]>(
    '/api/search-toptier',
    fetcher,
    {
      revalidateOnMount: true, // *ปิดระมวลผลเริ่มต้น
    }
  )

  const { data: ToptierEvent, mutate: MutaEvent } = useSWR<any[]>(
    '/api/eventsearchtoptier',
    fetcher,
    {
      revalidateOnMount: true, // *ปิดระมวลผลเริ่มต้น
    }
  )

  const { data: ToptierProfile, mutate: mutaProfile } = useSWR<any[]>(
    '/api/searchprofiletoptier',
    fetcher,
    {
      revalidateOnMount: true, // *ปิดระมวลผลเริ่มต้น
    }
  )

  // TODO: ประวัติ
  const { data: searchHistory, mutate: mutateSearch } = useSWR<any[]>(
    '/api/searchhistory',
    fetcher,
    {
      revalidateOnMount: true, // *ปิดระมวลผลเริ่มต้น
    }
  )
  const { data: eventHistory, mutate: mutateEvent } = useSWR<any[]>(
    '/api/eventhistory',
    fetcher,
    {
      revalidateOnMount: true, // *ปิดระมวลผลเริ่มต้น
    }
  )
  const { data: profileHistory, mutate: mutateProfile } = useSWR<any[]>(
    '/api/searchprofilehistory',
    fetcher,
    {
      revalidateOnMount: true, // *ปิดระมวลผลเริ่มต้น
    }
  )

  // TODO: ค้นหา
  const { data: searchAT } = useSWR<any[]>(
    queryArticle.trim() !== '' ? '/api/search?q=' + queryArticle : null,
    fetcher
  )

  const { data: searchEvent } = useSWR<any[]>(
    queryEvent.trim() !== '' ? '/api/eventsearch?q=' + queryEvent : null,
    fetcher
  )

  const { data: searchProfile } = useSWR<any[]>(
    queryProfile.trim() !== '' ? '/api/searchprofile?q=' + queryProfile : null,
    fetcher
  )

  const handleArticle = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setQueryArticle(event.currentTarget.q.value)

    MutaSearch()
    mutateSearch()
  }

  const handleEvent = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setQueryEvent(event.currentTarget.e.value)
    mutateEvent()
    MutaEvent()
  }
  const handleProfile = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setQueryEvent(event.currentTarget.p.value)
    mutateProfile()
    mutaProfile()
  }
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

  const visitHandler = async (articleId: string) => {
    await fetch('/api/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: articleId }),
    })
  }

  const visitEvent = async (eventId: string) => {
    await fetch('/api/eventsearch', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: eventId }),
    })
  }

  const visitProfile = async (profileId: string) => {
    await fetch('/api/searchprofile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: profileId }),
    })
  }

  return (
    <>
      {session?.user.id ? (
        <>
          <Button onPress={onOpen}>Search</Button>
          <Modal
            scrollBehavior="inside"
            backdrop="blur"
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="top"
            size="full"
            className="  bg-transparent  "
            classNames={{
              backdrop: 'bg-[#050505]/50 backdrop-opacity-40',
              base: 'border-[#292f46] bg-[#050505] dark:bg-[#050505]',
              closeButton: 'hover:bg-white/5 active:bg-white/10',
            }}
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex items-center justify-center text-white text-center font-bold">
                    ค้นหาสิ่งที่คุณอยากเจอ !
                  </ModalHeader>
                  <ModalBody>
                    <div className=" flex items-start justify-center space-x-20 ">
                      <div className="w-full ">
                        <Tabs
                          defaultValue="article"
                          className=" "
                          orientation="horizontal"
                        >
                          <div className="items-center justify-center text-center">
                            <TabsList>
                              <TabsTrigger value="user">ค้นหาผู้คน</TabsTrigger>
                              <TabsTrigger value="article">
                                ค้นหาบล็อก
                              </TabsTrigger>
                              <TabsTrigger value="event">
                                ค้นหากิจกรรม
                              </TabsTrigger>
                            </TabsList>
                          </div>
                          <TabsContent value="user" className=" ">
                            <div className="flex justify-center space-x-28 text-black ">
                              <div className="mt-5 w-full ">
                                <Text color="white">การค้นหายอดนิยม</Text>
                                {/* 
                            !
                            */}
                                {ToptierProfile?.map((Profile, index) => (
                                  <>

                                    <Link href={`/profile/${Profile.id}`}>
                                      <div
                                        key={index}
                                        className=" mt-6 flex items-center justify-start"
                                      >
                                        <Image
                                          isBlurred
                                          src={Profile.image}
                                          alt={Profile.image}
                                          radius="md"
                                          width={100}
                                          height={100}
                                          className=" h-43 w-full object-scale-down"
                                        />
                                        <div className="ml-3 ">
                                          <Text color="white">
                                            {Profile.name}
                                          </Text>
                                        </div>
                                      </div>
                                    </Link>
                                  </>
                                ))}
                              </div>
                              <div className="w-full">
                                <form onSubmit={handleProfile} className="">
                                  <Input
                                    variant="faded"
                                    size="lg"
                                    color="primary"
                                    type="text"
                                    name="p"
                                    placeholder="ค้นหา"
                                    onChange={(event) =>
                                      setQueryProfile(event.target.value)
                                    }
                                  />

                                  {searchProfile?.map((Profile, index) => (
                                    <div className="" key={index}>
                                      <Link
                                        href={`/profile/${Profile.id}`}
                                        onClick={() => {
                                          visitProfile(Profile.id)
                                          onClose()
                                        }}
                                      >
                                        <div className="mt-6 flex items-center">
                                          <Image
                                            isBlurred
                                            src={Profile.image}
                                            alt={Profile.image}
                                            radius="md"
                                            width={100}
                                            height={100}
                                            className=" h-43 w-full object-scale-down"
                                          />
                                          <div className="ml-5 items-start justify-center ">
                                            <Text color="white">
                                              {Profile.name}
                                            </Text>
                                          </div>
                                        </div>
                                      </Link>
                                    </div>
                                  ))}
                                </form>
                              </div>

                              <div className="mt-5 w-full ">
                                <Text color="white">ประวัติการค้นหา</Text>

                                {profileHistory?.map((history, index) => (
                                  <>
                                    {history.user && (
                                      <>
                                        <Link href={`/profile/${history.user.id}`}>
                                          <div
                                            key={index}
                                            className="mt-6 flex items-start justify-start"
                                          >

                                            <Image
                                              isBlurred
                                              src={history.user.image}
                                              alt={history.user.image}
                                              radius="md"
                                              width={100}
                                              height={100}
                                              className="h-43 w-full object-scale-down"
                                            />
                                            <div className="ml-3">
                                              <Text color="white">
                                                {history.user.name}
                                              </Text>
                                            </div>
                                          </div>
                                        </Link>
                                      </>
                                    )}
                                  </>
                                ))}
                              </div>
                            </div>
                          </TabsContent>
                          <TabsContent value="article" className=" ">
                            <div className="flex justify-center space-x-28">
                              <div className="mt-5 w-full ">
                                <Text color="white">การค้นหายอดนิยม</Text>
                                {/* 
                            !
                            */}
                                {ToptierArticle?.map((Article, index) => (
                                  <>
                                    <Link href={`/article/${Article.id}`}>
                                      <div
                                        key={index}
                                        className=" mt-6 flex items-start justify-start"
                                      >

                                        <Image
                                          isBlurred
                                          src={Article.ArticleImage}
                                          alt={Article.ArticleImage}
                                          radius="md"
                                          width={100}
                                          height={100}
                                          className=" h-43 w-full object-scale-down"
                                        />
                                        <div className="ml-3 ">
                                          <Text color="white">
                                            {Article.title}
                                          </Text>
                                          <Text color="white">
                                            ผู้เขียน {Article.author.name}
                                          </Text>
                                        </div>

                                      </div>
                                    </Link>
                                  </>
                                ))}
                              </div>
                              <div className="w-full">
                                <form onSubmit={handleArticle} className="">
                                  <Input
                                    variant="faded"
                                    size="lg"
                                    color="primary"
                                    type="text"
                                    name="q"
                                    placeholder="ค้นหา"
                                    onChange={(event) =>
                                      setQueryArticle(event.target.value)
                                    }
                                  />
                                  {searchAT?.map((article, index) => (
                                    <div className="" key={index}>
                                      <Link
                                        href={`/article/${article.id}`}
                                        onClick={() => {
                                          visitHandler(article.id)
                                          onClose()
                                        }}
                                      >
                                        <div className="mt-6 flex ">
                                          <Image
                                            isBlurred
                                            src={article?.ArticleImage}
                                            alt={article?.ArticleImage}
                                            radius="md"
                                            width={100}
                                            height={100}
                                            className=" h-43 w-full object-scale-down"
                                          />
                                          <div className="ml-5 items-start justify-center text-white ">
                                            <Text>{article?.title}</Text>
                                            <Text>
                                              ผู้เขียน {article?.author.name}
                                            </Text>
                                          </div>
                                        </div>
                                      </Link>
                                    </div>
                                  ))}
                                </form>
                              </div>

                              <div className="mt-5 w-full ">
                                <Text color="white">ประวัติการค้นหา</Text>

                                {searchHistory?.map((history, index) => (
                                  <>
                                    {history.article && (

                                      <>
                                        <Link href={`/article/${history.article.id}`}>
                                          <div
                                            key={index}
                                            className="mt-6 flex items-start justify-start"
                                          >
                                            <Image
                                              isBlurred
                                              src={history.article.ArticleImage}
                                              alt={history.article.ArticleImage}
                                              radius="md"
                                              width={100}
                                              height={100}
                                              className="h-43 w-full object-scale-down"
                                            />
                                            <div className="ml-3">
                                              <Text color="white">
                                                {history.article.title}
                                              </Text>
                                              <Text color="white">
                                                ผู้เขียน{' '}
                                                {history.article.author.name}
                                              </Text>
                                            </div>
                                          </div>
                                        </Link>
                                      </>
                                    )}
                                  </>
                                ))}
                              </div>
                            </div>
                          </TabsContent>
                          <TabsContent value="event" className=" ">
                            <div className="flex justify-center space-x-28">
                              <div className="mt-5 w-full ">
                                <Text color="white">การค้นหายอดนิยม</Text>
                                {/* 
                            !
                            */}
                                {ToptierEvent?.map((Event, index) => (
                                  <>
                                    <Link href={`/event/${Event.id}`}>

                                      <div
                                        key={index}
                                        className=" mt-6 flex items-start justify-start"
                                      >
                                        <Image
                                          isBlurred
                                          src={Event.eventImage}
                                          alt={Event.eventImage}
                                          radius="md"
                                          width={100}
                                          height={100}
                                          className=" h-43 w-full object-scale-down"
                                        />
                                        <div className="ml-3 ">
                                          <Text color="white">{Event.title}</Text>
                                          <Text color="white">
                                            ผู้เขียน {Event.author.name}
                                          </Text>
                                        </div>
                                      </div>
                                    </Link>

                                  </>
                                ))}
                              </div>
                              <div className="w-full">
                                <form onSubmit={handleEvent} className="">
                                  <Input
                                    variant="faded"
                                    size="lg"
                                    color="primary"
                                    type="text"
                                    name="e"
                                    placeholder="ค้นหา"
                                    onChange={(event) =>
                                      setQueryEvent(event.target.value)
                                    }
                                  />
                                  {searchEvent?.map((event, index) => (
                                    <div className="" key={index}>
                                      <Link
                                        href={`/event/${event.id}`}
                                        onClick={() => {
                                          visitEvent(event.id)
                                          onClose()
                                        }}
                                      >
                                        <div className="mt-6 flex ">
                                          <Image
                                            isBlurred
                                            src={event.eventImage}
                                            alt={event.eventImage}
                                            radius="md"
                                            width={100}
                                            height={100}
                                            className=" h-43 w-full object-scale-down"
                                          />
                                          <div className="ml-5 items-start justify-center ">
                                            <Text color="white">
                                              {event.title}
                                            </Text>
                                            <Text color="white">
                                              ผู้เขียน {event.author.name}
                                            </Text>
                                          </div>
                                        </div>
                                      </Link>
                                    </div>
                                  ))}
                                </form>
                              </div>

                              <div className="mt-5 w-full ">
                                <Text color="white">ประวัติการค้นหา</Text>
                                {eventHistory?.map((event, index) => (
                                  <>
                                    {event.event && (
                                      <>
                                        <Link href={`/event/${event.event.id}`}>
                                          <div
                                            className="mt-6 flex items-start justify-start"
                                          >

                                            <Image
                                              isBlurred
                                              src={event.event.eventImage}
                                              alt={event.event.eventImage}
                                              radius="md"
                                              width={100}
                                              height={100}
                                              className="h-43 w-full object-scale-down"
                                            />
                                            <div className="ml-3">
                                              <Text color="white">
                                                {event.event.title}
                                              </Text>
                                              <Text color="white">
                                                ผู้เขียน {event.event.author.name}
                                              </Text>
                                            </div>
                                          </div>
                                        </Link>
                                      </>
                                    )}
                                  </>
                                ))}
                              </div>
                            </div>
                          </TabsContent>
                        </Tabs>
                      </div>
                    </div>
                  </ModalBody>
                </>
              )}
            </ModalContent>
          </Modal>
        </>
      ) : (
        <>
          <Button onPress={onOpen}>search</Button>
          <Modal
            classNames={{
              backdrop: 'bg-[#050505]/50 backdrop-opacity-40',
              base: 'border-[#292f46] bg-[#050505] dark:bg-[#050505]',
              closeButton: 'hover:bg-white/5 active:bg-white/10',
            }}
            scrollBehavior="inside"
            backdrop="blur"
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="top"
            size="5xl"
            className="  bg-transparent  "
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="text-white">
                    โปรดเข้าสู่ระบบ
                  </ModalHeader>
                  <ModalBody>
                    <div className=" flex items-center justify-around space-x-20">
                      <div className="text-white">
                        <Text>โปรไฟล์ของคุณ</Text>
                        <Text>คุณยังไม่ได้สร้างโปรไฟล์ของคุณ</Text>
                        <div className="mt-3 flex space-x-3 ">
                          <Link
                            href="/sign-in"
                            className="text-blue-400 hover:underline"
                          >
                            ลงชื่อเข้าใช้
                          </Link>
                          <Text>เพื่อสามารถใช้งานได้อย่างเต็มที่</Text>
                        </div>
                        <div className="flex space-x-3">
                          <Link
                            href="/sign-up"
                            className="text-blue-400 hover:underline"
                          >
                            สมัครใช้งาน
                          </Link>
                          <Text>ถ้าคุณยังไม่มีบัญชี สมัครเลย</Text>
                        </div>
                      </div>
                      <div>
                        <Text color="white" as="b" fontSize="larger">
                          ทำรายการของคุณ
                        </Text>
                        <div className="mt-2">
                          <Text color="white">เขียนบล็อกของคุณ</Text>
                          <Text color="white">สร้างกิจกรรมของคุณ</Text>
                          <Text color="white">ค้นหาเพื่อนของคุณ</Text>
                        </div>
                      </div>
                    </div>
                  </ModalBody>
                </>
              )}
            </ModalContent>
          </Modal>
        </>
      )}
    </>
  )
}
