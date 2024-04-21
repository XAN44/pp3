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
import { fetchEventByTagFamily } from '@/lib/actions/user.event.tag'
import VisitEvent from '../visit/visitEvent'
import VisitEventTag from '../visit/visitTag/visiteventTag'
import { Event } from '@prisma/client'

interface Props {
  data: Event[]
}

export default async function EventTagFamily() {
  const otherInfo = await fetchEventByTagFamily()
  const user = await getCurrentUser()
  if (otherInfo.length === 0) {
    return <Text color="red">ไม่มีข้อมูล</Text>
  }
  return (
    <>
      <Carousel
        opts={{
          align: 'start',
        }}
        className="w-full max-w-full "
      >
        <CarouselContent>
          {otherInfo.map((event, index) => (
            <>
              <CarouselItem
                key={index}
                className="pl-3 md:basis-1/2 lg:basis-1/3"
              >
                <div className="p-1">
                  <Card className="max-w-96">
                    <CardBody className="flex items-center justify-center p-0 ">
                      <Image
                        isZoomed
                        src={event.eventImage || ' '}
                        alt="articleImage"
                        radius="md"
                        width="100%"
                        className="h-56 w-96 rounded-xl object-cover"
                      />
                    </CardBody>
                    <CardFooter className="px-3  text-small">
                      <div className="w-full ">
                        <div className="text-center">
                          <Text as="b">{event.eventContent}</Text>
                          {/* <Text>{event.articleContent}</Text> */}
                        </div>
                        <div className=" mt-3 flex">
                          <Avatar
                            src={event.author?.image || ''}
                            alt="avatar"
                            radius="full"
                            isBordered
                          />
                          <div className="grid">
                            <div className="ml-4 ">
                              <Text>{event.author?.name}</Text>
                              {event.tag.map((hashtag) => (
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
                                {event.Visit.reduce(
                                  (total, current) => total + current.count,
                                  0
                                )}
                              </span>
                            </Text>
                          </div>
                        </div>
                        <div className="flex">
                          <Text as="b" fontSize="small">
                            จำนวนที่เปิดรับผู้เข้าร่วม {event.eventparticipants}
                          </Text>
                          <Text as="code" color="gray" fontSize="small">
                            กดเยี่ยมชมเพื่ออ่านเพิ่มเติม
                          </Text>
                        </div>
                      </div>
                    </CardFooter>
                    <Link href={`/event/${event.id}`}>
                      <VisitEventTag id={event.id} userId={user?.id || ''} />
                    </Link>
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
