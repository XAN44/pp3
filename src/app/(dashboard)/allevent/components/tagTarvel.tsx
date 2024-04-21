'use client'
import { EventInitial } from "@/components/store/EventAll";
import { JoinData, UserInEvent } from "@/types/eventJoinIndex";
import { Event, RegisterEvent } from "@prisma/client";
import { Text } from '@chakra-ui/react'
import { useEffect, useState } from "react";
import {
    Avatar,
    Card,
    CardBody,
    CardFooter,
    Image,
    Link,
    Pagination,
} from '@nextui-org/react'
import { Badge } from '@chakra-ui/react'
import VisitEventTag from "@/components/visit/visitTag/visiteventTag";
import { useSession } from 'next-auth/react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel'


interface Props {
    data: JoinData[] | null
}

const TagTarvel: React.FC<Props> = ({
    data
}) => {

    const session = useSession()

    const { eventCount, incrumentEvent } = EventInitial((state) => ({
        eventCount: state.eventCount,
        incrumentEvent: state.eventIncrument
    }))

    useEffect(() => {
        if (data) {
            incrumentEvent(data.length)
        }
    }, [data, incrumentEvent])

    const filteredData = data ? data.filter(d => d.event?.tag.some(tag => tag?.tag === 'ท่องเที่ยว')) : null;


    return (

        <div className=" ">
            <div className="mb-3 mt-3">
                <Text as='b' fontSize='large' color='black'>
                    ท่องเที่ยว
                </Text>
            </div>
            <Carousel
                opts={{
                    align: 'start',
                }}
                className="w-full max-w-full "
            >
                <CarouselContent>
                    {filteredData && filteredData.length > 0 ? (
                        <>
                            <CarouselItem
                                className="pl-11 md:basis-1/2 lg:basis-1/2"
                            >
                                <>

                                    <div className="flex gap-6 ">
                                        {filteredData.map((d) => (
                                            <div className="">
                                                <Card className="max-w-60">
                                                    <CardBody className="flex items-center justify-center p-0 ">
                                                        <Image
                                                            isZoomed
                                                            src={d.event?.eventImage || ' '}
                                                            alt="articleImage"
                                                            radius="md"
                                                            width="100%"
                                                            className="h-56 w-96 rounded-xl object-cover"
                                                        />
                                                    </CardBody>
                                                    <CardFooter className="px-3  text-small">
                                                        <div className="w-full ">
                                                            <div className="text-center">
                                                                <Text as="b">{d.event?.eventContent || ''}</Text>
                                                                {/* <Text>{event.articleContent}</Text> */}
                                                            </div>
                                                            <div className=" mt-3 flex">
                                                                <Avatar
                                                                    src={d.event?.author?.image || ''}
                                                                    alt="avatar"
                                                                    radius="full"
                                                                    isBordered
                                                                />
                                                                <div className="grid">
                                                                    <div className="ml-4 ">
                                                                        <Text>{d.event?.author?.name}</Text>
                                                                        {d.event?.tag.map((hashtag) => (
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
                                                                            {d.event?.Visit.reduce(
                                                                                (total, current) => total + current.count,
                                                                                0
                                                                            )}
                                                                        </span>
                                                                    </Text>
                                                                </div>

                                                            </div>
                                                            <div className="flex">
                                                                <Text as="b" size="small">
                                                                    จำนวนที่เปิดรับผู้เข้าร่วม {d.event?.eventparticipants}
                                                                </Text>
                                                                <Text as="code" color="gray" fontSize='small'>
                                                                    กดเยี่ยมชมเพื่ออ่านเพิ่มเติม
                                                                </Text>
                                                            </div>
                                                        </div>
                                                    </CardFooter>
                                                    <Link href={`/event/${d.event?.id}`}>
                                                        <VisitEventTag
                                                            id={d.event?.id || ''}
                                                            userId={session.data?.user.id || ''}
                                                        />
                                                    </Link>
                                                </Card>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            </CarouselItem>
                        </>
                    ) : (
                        <>
                            <div className="grid  items-center justify-start w-full pl-11 ">
                                <Card className="max-w-96  h-72">
                                    <CardBody className="text-center grid items-center justify-center">
                                        <Text color="red" as="b"  >
                                            คุณยังไม่มีกิจกรรมที่เข้าร่วม
                                        </Text>
                                    </CardBody>
                                </Card>
                            </div>
                        </>
                    )}

                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>

        </div>
    );
}

export default TagTarvel;