import React from 'react'

import {
  Avatar,
  Card,
  CardBody,
  CardFooter,
  Image,
  Link,
} from '@nextui-org/react'
import { Badge } from '@chakra-ui/react'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Text } from '@chakra-ui/react'
import { TotalVisit, TotalVisit1 } from '@/lib/actions/user.visit'
import VisitBtnArticle from '../visit/visitArticle'
import VisitBtnArticleC from '../visit/visitArticleC'
import { getCurrentUser } from '@/lib/session'
import {
  fetchInBlogPage,
  fetchInFollowInPage,
} from '@/lib/actions/user.carousel'
import VisitBtnPOSTAll from '../visit/visitPost'

export default async function CorosuleFollowPost() {
  const user = await getCurrentUser()

  const otherInfo = await fetchInFollowInPage()

  return (
    <>
      {otherInfo?.map((article, index) => (
        <>
          <>
            <Carousel
              opts={{
                align: 'start',
              }}
              className="w-full max-w-full "
            >
              <CarouselContent>
                <CarouselItem
                  key={index}
                  className="pl-1 md:basis-1/2 lg:basis-1/3"
                >
                  {article.following.post.map((post) => (
                    <>
                      <h1>โพสต์จากผู้ใช้ที่คุณติดตาม</h1>

                      <div className="p-1">
                        <Card className="max-w-96">
                          <CardBody className="flex items-center justify-center p-0 ">
                            <Image
                              isZoomed
                              src={post.ImagePost || ''}
                              alt="articleImage"
                              radius="md"
                              width="100%"
                              className="h-56 w-96 rounded-xl object-cover"
                            />
                          </CardBody>
                          <CardFooter className="px-3  text-small">
                            <div className="w-full ">
                              <div className="text-center">
                                <Text as="b">{post.content}</Text>
                                {/* <Text>{article.articleContent}</Text> */}
                              </div>
                              <div className=" mt-3 flex">
                                <Avatar
                                  src={post.author?.image || ''}
                                  alt="avatar"
                                  radius="full"
                                  isBordered
                                />
                                <div className="grid">
                                  <div className="ml-4 ">
                                    <Text>{post.author?.name}</Text>
                                    {post.tag.map((hashtag) => (
                                      <>
                                        {hashtag?.tag ? (
                                          <Badge width="max-content">
                                            {hashtag.tag}
                                          </Badge>
                                        ) : (
                                          <Badge>ไม้มี HASHTAG</Badge>
                                        )}
                                      </>
                                    ))}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center  justify-around ">
                                <div className="flex items-center">
                                  <Text className="mr-3">
                                    เข้าชม
                                    <span className="ml-2">
                                      {post.Visit.map((total) => (
                                        <>{total.count}</>
                                      ))}
                                    </span>
                                  </Text>
                                </div>
                                <div className="">
                                  <Link href={`/post/${post.id}`}>
                                    <VisitBtnPOSTAll
                                      id={post.id}
                                      userId={user?.id || ''}
                                    />
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </CardFooter>
                        </Card>
                      </div>
                    </>
                  ))}
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
            <div className="flex w-full flex-col">
              <div className="items-end justify-end text-end">
                <Link href="/allblog">ดูทั้งหมด</Link>
              </div>
              <div className="divider divider-neutral "></div>
            </div>
          </>
        </>
      ))}
    </>
  )
}
