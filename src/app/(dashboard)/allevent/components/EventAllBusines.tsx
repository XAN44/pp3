'use client'
import React, { useState } from 'react'
import { JoinData, UserInEvent } from '@/types/eventJoinIndex'
import {
  Avatar,
  Card,
  CardBody,
  CardFooter,
  Image,
  Pagination,
} from '@nextui-org/react'
import { Badge, Text } from '@chakra-ui/react'
import Link from 'next/link'
import VisitEventTag from '@/components/visit/visitTag/visiteventTag'
import { useSession } from 'next-auth/react'

type EventInitial = {
  data: UserInEvent[] | null
}

const EventAllBusines: React.FC<EventInitial> = ({ data }) => {
  const session = useSession()

  const [currentPage, setCurrentPage] = useState(1)

  const itemPerPage = 20
  const totalPage = Math.ceil((data?.length || 0) / itemPerPage) || 1

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  const startIndex = (currentPage - 1) * itemPerPage
  const endIndex = currentPage * itemPerPage

  const currentData = data?.slice(startIndex, endIndex)

  if (currentData?.length === 0) {
    return (
      <div className=" flex h-dvh w-full items-center justify-center ">
        <Text as="b" fontSize="inherit" color="red">
          ไม่มีเนื้อหาเกี่ยวกับธุรกิจ
        </Text>
      </div>
    )
  }
  return (
    <div className=" flex flex-col items-center justify-center">
      {currentData?.length === 0 && (
        <Text as="b" fontSize="inherit" color="red">
          ไม่มีเนื้อหาเกี่ยวกับการท่องเที่ยว
        </Text>
      )}

      <div className="grid grid-cols-4 items-center justify-center">
        {currentData?.map((d, index) => (
          <div key={index} className="max-w-full ">
            <div className="p-1">
              <Card className="w-64 max-w-full">
                <CardBody className="flex items-center justify-center p-0 ">
                  <Image
                    isZoomed
                    src={d.eventImage || ' '}
                    alt="articleImage"
                    radius="md"
                    width="100%"
                    className="h-56 w-96 rounded-xl object-cover"
                  />
                </CardBody>
                <CardFooter className="px-3  text-small">
                  <div className="w-full ">
                    <div className="text-center">
                      <Text as="b">{d.eventContent}</Text>
                    </div>
                    <div className=" mt-3 flex">
                      <Avatar
                        src={d.author?.image || ''}
                        alt="avatar"
                        radius="full"
                        isBordered
                      />
                      <div className="grid">
                        <div className="ml-4 ">
                          <Text>{d.author?.name}</Text>
                          {d.tag.map((hashtag: any) => (
                            <>
                              {hashtag?.tag ? (
                                <Badge width="max-content">{hashtag.tag}</Badge>
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
                            {d.Visit.reduce(
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
                <Link href={`/event/${d.id}`}>
                  <VisitEventTag
                    id={d.id}
                    userId={session.data?.user?.id || ''}
                  />
                </Link>
              </Card>
            </div>
          </div>
        ))}
      </div>
      {currentData ? (
        <Pagination
          showShadow
          color="primary"
          total={totalPage}
          page={currentPage}
          onChange={handlePageChange}
        />
      ) : null}
    </div>
  )
}

export default EventAllBusines
