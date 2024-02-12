'use client'

import Link from 'next/link'
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

async function fetcher(url: string) {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('cannot fetch top article')
  }
  console.log(response)
  return response.json()
}

export default function SearchBar() {
  const [queryArticle, setQueryArticle] = React.useState('')
  const [queryEvent, setQueryEvent] = React.useState('')
  const [queryProfile, setQueryProfile] = React.useState('')

  // TODO: 3 อันดับ
  // * blog - 3 อันดับ
  const { data: ToptierArticle, mutate: MutaSearch } = useSWR<any[]>(
    '/api/search-toptier',
    fetcher,
    {
      revalidateOnMount: false, // *ปิดระมวลผลเริ่มต้น
      revalidateOnFocus: false, // *ปิดระมวลผลเมื่อเปิดหน้าเว็บ
      //TODO: ผลที่เกิดขึ้นคือ จะมีการเรียกใช้ API เมื่อมีการกดปุ่ม SEARCH เท่านั้น
    }
  )

  const { data: ToptierEvent, mutate: MutaEvent } = useSWR<any[]>(
    '/api/eventsearchtoptier',
    fetcher,
    {
      revalidateOnMount: false,
      revalidateOnFocus: false,
    }
  )

  const { data: ToptierProfile, mutate: mutaProfile } = useSWR<any[]>(
    '/api/searchprofiletoptier',
    fetcher,
    {
      revalidateOnMount: false,
      revalidateOnFocus: false,
    }
  )

  // TODO: ประวัติ
  const { data: searchHistory, mutate: mutateSearch } = useSWR<any[]>(
    '/api/searchhistory',
    fetcher,
    {
      revalidateOnMount: false,
      revalidateOnFocus: false,
    }
  )
  const { data: eventHistory, mutate: mutateEvent } = useSWR<any[]>(
    '/api/eventhistory',
    fetcher,
    {
      revalidateOnMount: false,
      revalidateOnFocus: false,
    }
  )
  const { data: profileHistory, mutate: mutateProfile } = useSWR<any[]>(
    '/api/searchprofilehistory',
    fetcher,
    {
      revalidateOnMount: false,
      revalidateOnFocus: false,
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

  const handleArticle = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setQueryArticle(event.currentTarget.q.value)
  }
  MutaSearch()
  mutateSearch()

  const handleEvent = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setQueryEvent(event.currentTarget.e.value)
  }
  mutateEvent()
  MutaEvent()
  const handleProfile = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setQueryEvent(event.currentTarget.p.value)
  }
  mutateProfile()
  mutaProfile()
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
      <Button onPress={onOpen}>Open Modal</Button>
      <Modal
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
              <ModalHeader className="">Modal Title</ModalHeader>
              <ModalBody>
                <div className=" flex items-start justify-center space-x-20">
                  <div className="w-full ">
                    <Tabs
                      defaultValue="article"
                      className=" "
                      orientation="horizontal"
                    >
                      <div className="items-center justify-center text-center">
                        <TabsList>
                          <TabsTrigger value="user">ค้นหาผู้คน</TabsTrigger>
                          <TabsTrigger value="article">ค้นหาบล็อก</TabsTrigger>
                          <TabsTrigger value="event">ค้นหากิจกรรม</TabsTrigger>
                        </TabsList>
                      </div>
                      <TabsContent value="user" className=" ">
                        <div className="flex justify-center space-x-28">
                          <div className="mt-5 w-full ring-1">
                            <h1>การค้นหายอดนิยม</h1>
                            {/* 
                            !
                            */}
                            {ToptierProfile?.map((Profile, index) => (
                              <>
                                <div
                                  key={index}
                                  className=" mt-6 flex items-start justify-start"
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
                                    <h1>{Profile.name}</h1>
                                  </div>
                                </div>
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
                                    <div className="mt-6 flex ">
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
                                        <h1>{Profile.name}</h1>
                                      </div>
                                    </div>
                                  </Link>
                                </div>
                              ))}
                            </form>
                          </div>

                          <div className="mt-5 w-full ring-1">
                            <h1>ประวัติการค้นหา</h1>

                            {profileHistory?.map((history, index) => (
                              <>
                                {history.user && (
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
                                      <h1>{history.user.name}</h1>
                                    </div>
                                  </div>
                                )}
                              </>
                            ))}
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="article" className=" ">
                        <div className="flex justify-center space-x-28">
                          <div className="mt-5 w-full ring-1">
                            <h1>การค้นหายอดนิยม</h1>
                            {/* 
                            !
                            */}
                            {ToptierArticle?.map((Article, index) => (
                              <>
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
                                    <h1>{Article.title}</h1>
                                    <h1>ผู้เขียน {Article.author.name}</h1>
                                  </div>
                                </div>
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
                                      <div className="ml-5 items-start justify-center ">
                                        <h1>{article?.title}</h1>
                                        <h1>ผู้เขียน {article?.author.name}</h1>
                                      </div>
                                    </div>
                                  </Link>
                                </div>
                              ))}
                            </form>
                          </div>

                          <div className="mt-5 w-full ring-1">
                            <h1>ประวัติการค้นหา</h1>

                            {searchHistory?.map((history, index) => (
                              <>
                                {history.article && (
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
                                      <h1>{history.article.title}</h1>
                                      <h1>
                                        ผู้เขียน {history.article.author.name}
                                      </h1>
                                    </div>
                                  </div>
                                )}
                              </>
                            ))}
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="event" className=" ">
                        <div className="flex justify-center space-x-28">
                          <div className="mt-5 w-full ring-1">
                            <h1>การค้นหายอดนิยม</h1>
                            {/* 
                            !
                            */}
                            {ToptierEvent?.map((Event, index) => (
                              <>
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
                                    <h1>{Event.title}</h1>
                                    <h1>ผู้เขียน {Event.author.name}</h1>
                                  </div>
                                </div>
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
                                        <h1>{event.title}</h1>
                                        <h1>ผู้เขียน {event.author.name}</h1>
                                      </div>
                                    </div>
                                  </Link>
                                </div>
                              ))}
                            </form>
                          </div>

                          <div className="mt-5 w-full ring-1">
                            <h1>ประวัติการค้นหา</h1>
                            {eventHistory?.map((event, index) => (
                              <>
                                {event.event && (
                                  <div
                                    key={index}
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
                                      <h1>{event.event.title}</h1>
                                      <h1>
                                        ผู้เขียน {event.event.author.name}
                                      </h1>
                                    </div>
                                  </div>
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
  )
}
