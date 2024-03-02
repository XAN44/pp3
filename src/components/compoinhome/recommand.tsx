'use client'
import { Button } from '@nextui-org/button'
import { Avatar, Divider, Image } from '@nextui-org/react'
import { Flex, Heading } from '@radix-ui/themes'
import { Badge } from '@chakra-ui/react'

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
  currentId: string
  tag: {
    tag: string | null
  }[]
}

export default function Recommand({ id, tag, currentId }: Props) {
  const { data: hashtag } = useSWR(
    `/api/recommend?tag=${tag.map((tag) => tag.tag)}`,
    fetcher
  )

  return (
    <>
      <div className="mb-3">
        <Text as="b" fontSize="large">
          แนะนำเพิ่มเติม
        </Text>
      </div>
      <div className="mt-3">
        <Carousel
          opts={{
            align: 'start',
          }}
          className="w-full max-w-full "
        >
          <CarouselContent>
            {hashtag &&
              hashtag.map((tag: any) => (
                <>
                  {tag?.id !== id && (
                    <>
                      <CarouselItem className="pl-1 md:basis-1/2 lg:basis-1/3">
                        <div className="p-1">
                          <Card className="max-w-96">
                            <CardBody className="flex items-center justify-center p-0 ">
                              <Image
                                isZoomed
                                src={tag?.ArticleImage || ' '}
                                alt="articleImage"
                                radius="md"
                                width="100%"
                                className="h-56 w-96 rounded-xl object-cover"
                              />
                            </CardBody>
                            <CardFooter className="px-3  text-small">
                              <div className="w-full ">
                                <div className="text-center">
                                  <Text as="b">{tag?.title}</Text>
                                  {/* <Text>{article.articleContent}</Text> */}
                                </div>
                                <div className=" mt-3 flex">
                                  <Avatar
                                    src={tag?.author.image || ' '}
                                    alt="avatar"
                                    radius="full"
                                    isBordered
                                  />
                                  <div className="grid">
                                    <div className="ml-4 ">
                                      {tag.tag.map((hashtag: any) => (
                                        <div
                                          className="badge badge-info"
                                          key={hashtag.id}
                                        >
                                          {hashtag?.tag || ''}
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center  justify-around ">
                                  <div className="flex items-center">
                                    <Text className="mr-3">
                                      เข้าชม
                                      <span className="ml-2">
                                        {tag.Visit.reduce(
                                          (total: number, current: any) =>
                                            total + current.count,
                                          0
                                        )}
                                      </span>
                                    </Text>
                                  </div>
                                  <div className="">
                                    <Link href={`/article/${tag?.id}`}>
                                      <VisitBtnArticleC
                                        id={tag?.id || ''}
                                        userId={currentId || ''}
                                      />
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </CardFooter>
                          </Card>
                        </div>
                      </CarouselItem>
                    </>
                  )}
                </>
              ))}
          </CarouselContent>

          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </>
  )
}
