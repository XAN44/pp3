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
  const [query, setQuery] = React.useState('')
  const [searchResult, setSearchResult] = React.useState<any[]>([])

  const {
    data: search,
    isLoading,
    error,
  } = useSWR<any[]>('/api/search-toptier', fetcher)

  const { data: searchHistory } = useSWR<any[]>('/api/searchhistory', fetcher)

  useEffect(() => {
    const fetchSearchResult = async () => {
      if (query.trim() !== '') {
        const response = await fetch('/api/search?q=' + query)
        const json = await response.json()
        setSearchResult(json)
      } else {
        setSearchResult([])
      }
    }
    fetchSearchResult()
  }, [query])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setQuery(event.currentTarget.q.value)
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

  const history = async (articleId: string) => {
    await fetch('/api/searchhistory', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: articleId }),
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
        className=" bg-transparent "
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex gap-1">Modal Title</ModalHeader>
              <ModalBody className="flex flex-row place-items-center items-center justify-center">
                <div className="  relative top-0 h-full w-full overflow-hidden rounded-md shadow-lg ring-1 ring-black">
                  <h1>การค้นหายอดนิยม พิเศษ</h1>

                  {search?.map((Article) => (
                    <>
                      <div className="relative mt-6 grid place-items-center items-center justify-center text-center">
                        <div className="w-80 ring-1">
                          <div className="flex flex-row overflow-hidden text-start">
                            <Image
                              isBlurred
                              src={Article.ArticleImage}
                              alt={Article.ArticleImage}
                              radius="md"
                              width={100}
                              height={100}
                              className=" h-43 w-full object-scale-down"
                            />
                            <div className="ml-3 grid">
                              <h1>{Article.title}</h1>
                              <h1>ผู้เขียน {Article.author.name}</h1>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ))}
                </div>
                <Tabs
                  defaultValue="article"
                  className="top-3 place-items-center items-center justify-center text-center "
                  orientation="vertical"
                >
                  <TabsList>
                    <TabsTrigger value="user">ค้นหาผู้คน</TabsTrigger>
                    <TabsTrigger value="article">ค้นหาบล็อก</TabsTrigger>
                    <TabsTrigger value="event">ค้นหากิจกรรม</TabsTrigger>
                  </TabsList>
                  <TabsContent value="article">
                    <form onSubmit={handleSubmit} className="py-4">
                      <div className="flex">
                        <Input
                          className="w-full"
                          variant="faded"
                          size="lg"
                          color="primary"
                          type="text"
                          name="q"
                          placeholder="ค้นหา"
                          onChange={(event) => setQuery(event.target.value)}
                        />

                        {/* <button type="submit" className="btn-black">
                          Search
                        </button> */}
                      </div>
                      {searchResult.map((article) => (
                        <div className="" key={article}>
                          <Link
                            href={`/article/${article.id}`}
                            onClick={() => {
                              visitHandler(article.id)
                            }}
                          >
                            <div className="relative mt-6 grid place-items-center items-center justify-center text-center">
                              <div className="w-80 ring-1">
                                <div className="flex flex-row overflow-hidden text-start">
                                  <Image
                                    isBlurred
                                    src={article.ArticleImage}
                                    alt={article.ArticleImage}
                                    radius="md"
                                    width={100}
                                    height={100}
                                    className=" h-43 w-full object-scale-down"
                                  />
                                  <div className="ml-3 grid">
                                    <h1>{article.title}</h1>
                                    <h1>ผู้เขียน {article.author.name}</h1>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </div>
                      ))}
                    </form>
                  </TabsContent>
                </Tabs>
                <div className="  relative top-0 h-full w-full overflow-hidden rounded-md shadow-lg ring-1 ring-black">
                  <h1>ประวัติการค้นหา</h1>

                  {searchHistory?.map((history) => (
                    <>
                      <div className="relative mt-6 grid place-items-center items-center justify-center text-center">
                        <div className="w-80 ring-1">
                          <div className="flex flex-row overflow-hidden text-start">
                            <Image
                              isBlurred
                              src={history.article.ArticleImage}
                              alt={history.article.ArticleImage}
                              radius="md"
                              width={100}
                              height={100}
                              className=" h-43 w-full object-scale-down"
                            />
                            <div className="ml-3 grid">
                              <h1>{history.article.title}</h1>
                              <h1>ผู้เขียน {history.article.author.name}</h1>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ))}
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
