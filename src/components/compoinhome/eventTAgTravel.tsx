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
import { getCurrentUser } from '@/lib/session'
import { fetchEventByTagTravel } from '@/lib/actions/user.event.tag'
import VisitEventTag from '../visit/visitTag/visiteventTag'

export default async function EventTagTravel() {
  const otherInfo = await fetchEventByTagTravel()
  const user = await getCurrentUser()

  if (otherInfo.length === 0) {
    return <Text color='red'>ไม่มีข้อมูล</Text>;
  } return (
    <>

      <Carousel
        opts={{
          align: 'start',
        }}
        className="w-full max-w-full "
      >
        <CarouselContent>
          {otherInfo.map((event: any, index: any) => (
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
                              {event.tag.map((hashtag: any) => (
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
                                  (total: number, current: any) =>
                                    total + current.count,
                                  0
                                )}
                              </span>
                            </Text>
                          </div>

                        </div>
                      </div>
                    </CardFooter>
                    <Link href={`/event/${event.id}`}>
                      <VisitEventTag
                        id={event.id}
                        userId={user?.id || ''}
                      />
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
