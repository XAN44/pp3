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
import { fetchBlogByTag, fetchInBlogPage } from '@/lib/actions/user.carousel'
import {
  fetchBlogByTagFamily,
  fetchBlogByTagTravel,
} from '@/lib/actions/user.article.tag'

export default async function ArticleTagFamily() {
  const otherInfo = await fetchBlogByTagFamily()
  const user = await getCurrentUser()
  return (
    <>
      <Carousel
        opts={{
          align: 'start',
        }}
        className="w-full max-w-full "
      >
        <CarouselContent>
          {otherInfo.map((article, index) => (
            <>
              <CarouselItem
                key={index}
                className="pl-1 md:basis-1/2 lg:basis-1/3"
              >
                <div className="p-1">
                  <Card className="max-w-96">
                    <CardBody className="flex items-center justify-center p-0 ">
                      <Image
                        isZoomed
                        src={article.ArticleImage || ' '}
                        alt="articleImage"
                        radius="md"
                        width="100%"
                        className="h-56 w-96 rounded-xl object-cover"
                      />
                    </CardBody>
                    <CardFooter className="px-3  text-small">
                      <div className="w-full ">
                        <div className="text-center">
                          <Text as="b">{article.title}</Text>
                          {/* <Text>{article.articleContent}</Text> */}
                        </div>
                        <div className=" mt-3 flex">
                          <Avatar
                            src={article.author?.image || ''}
                            alt="avatar"
                            radius="full"
                            isBordered
                          />
                          <div className="grid">
                            <div className="ml-4 ">
                              <Text>{article.author?.name}</Text>
                              {article.tag.map((hashtag) => (
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
                                {article.Visit.reduce(
                                  (total, current) => total + current.count,
                                  0
                                )}
                              </span>
                            </Text>
                          </div>
                          <div className="">
                            <Link href={`/article/${article.id}`}>
                              <VisitBtnArticleC
                                id={article.id}
                                userId={user?.id || ''}
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
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </>
  )
}
