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
import useSWR, { mutate } from 'swr'
import { getCurrentUser } from '@/lib/session'

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

  const [searchResult, setSearchResult] = React.useState<any[]>([])
  const [searchEvent, setSearchEvent] = React.useState<any[]>([])
  const [searchProfile, setSearchProfile] = React.useState<any[]>([])

  // TODO: 3 อันดับ
  // * blog - 3 อันดับ
  const { data: search } = useSWR<any[]>('/api/search-toptier', fetcher)

  const { data: EventSearch } = useSWR<any[]>(
    '/api/eventsearchtoptier',
    fetcher
  )

  const { data: ProfileSearch } = useSWR<any[]>(
    '/api/searchprofiletoptier',
    fetcher
  )

  // TODO: ประวัติ
  const { data: searchHistory } = useSWR<any[]>('/api/searchhistory', fetcher)

  const { data: eventHistory } = useSWR<any[]>('/api/eventhistory', fetcher)
  const { data: profileHistory } = useSWR<any[]>(
    '/api/searchprofilehistory',
    fetcher
  )

  useEffect(() => {
    const fetchSearchEvent = async () => {
      if (queryEvent.trim() !== '') {
        const response = await fetch('/api/eventsearch?q=' + queryEvent, {
          cache: 'force-cache',
        })
        const json = await response.json()
        setSearchEvent(json)
      } else {
        setSearchEvent([])
      }
    }
    fetchSearchEvent()
  }, [queryEvent])

  useEffect(() => {
    const fetchSearchResult = async () => {
      if (queryArticle.trim() !== '') {
        const response = await fetch('/api/search?q=' + queryArticle, {
          cache: 'force-cache',
        })
        const json = await response.json()
        setSearchResult(json)
      } else {
        setSearchResult([])
      }
    }
    fetchSearchResult()
  }, [queryArticle])

  useEffect(() => {
    const fetchSearchProfile = async () => {
      if (queryProfile.trim() !== '') {
        const response = await fetch('/api/searchprofile?q=' + queryProfile, {
          cache: 'force-cache',
        })
        const json = await response.json()
        setSearchProfile(json)
      } else {
        setSearchProfile([])
      }
    }
    fetchSearchProfile()
  }, [queryProfile])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setQueryArticle(event.currentTarget.q.value)
  }

  const { isOpen, onOpen, onOpenChange } = useDisclosure()

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
                            {ProfileSearch?.map((Profile) => (
                              <>
                                <div className=" mt-6 flex items-start justify-start">
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
                            <form onSubmit={handleSubmit} className="">
                              <Input
                                variant="faded"
                                size="lg"
                                color="primary"
                                type="text"
                                name="q"
                                placeholder="ค้นหา"
                                onChange={(event) =>
                                  setQueryProfile(event.target.value)
                                }
                              />
                              {searchProfile.map((Profile) => (
                                <div className="" key={Profile}>
                                  <Link
                                    href={`/profile/${Profile.id}`}
                                    onClick={() => {
                                      visitProfile(Profile.id)
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

                            {profileHistory?.map((history) => (
                              <>
                                {history.user && (
                                  <div className="mt-6 flex items-start justify-start">
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
                            {search?.map((Article) => (
                              <>
                                <div className=" mt-6 flex items-start justify-start">
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
                            <form onSubmit={handleSubmit} className="">
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
                              {searchResult.map((article) => (
                                <div className="" key={article}>
                                  <Link
                                    href={`/article/${article.id}`}
                                    onClick={() => {
                                      visitHandler(article.id)
                                    }}
                                  >
                                    <div className="mt-6 flex ">
                                      <Image
                                        isBlurred
                                        src={article.ArticleImage}
                                        alt={article.ArticleImage}
                                        radius="md"
                                        width={100}
                                        height={100}
                                        className=" h-43 w-full object-scale-down"
                                      />
                                      <div className="ml-5 items-start justify-center ">
                                        <h1>{article.title}</h1>
                                        <h1>ผู้เขียน {article.author.name}</h1>
                                      </div>
                                    </div>
                                  </Link>
                                </div>
                              ))}
                            </form>
                          </div>

                          <div className="mt-5 w-full ring-1">
                            <h1>ประวัติการค้นหา</h1>

                            {searchHistory?.map((history) => (
                              <>
                                {history.article && (
                                  <div className="mt-6 flex items-start justify-start">
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
                            {EventSearch?.map((Event) => (
                              <>
                                <div className=" mt-6 flex items-start justify-start">
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
                            <form onSubmit={handleSubmit} className="">
                              <Input
                                variant="faded"
                                size="lg"
                                color="primary"
                                type="text"
                                name="q"
                                placeholder="ค้นหา"
                                onChange={(event) =>
                                  setQueryEvent(event.target.value)
                                }
                              />
                              {searchEvent.map((event) => (
                                <div className="" key={event}>
                                  <Link
                                    href={`/event/${event.id}`}
                                    onClick={() => {
                                      visitEvent(event.id)
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
                            {eventHistory?.map((event) => (
                              <>
                                {event.event && (
                                  <div className="mt-6 flex items-start justify-start">
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
