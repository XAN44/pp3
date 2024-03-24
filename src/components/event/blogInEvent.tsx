import React from 'react'
import { Card, CardBody, CardFooter } from '@nextui-org/react'
import { Text } from '@chakra-ui/react'
import { Avatar, Badge, Divider, Image } from '@nextui-org/react'
import Link from 'next/link'
import VisitBtnArticleC from '../visit/visitArticleC'

interface Props {
  currentId: string
  Article: {
    id: string
    title: string | null
    articleContent: string | null
    ArticleImage: string | null
    createAt: Date
    tag: {
      Hashtag: string | null
    }[]
    author: {
      id: string
      name: string | null
      image: string | null
    } | null
    visit: {
      Visitcount: number
    }[]
  }
}

export default function BlogInEvent({ currentId, Article }: Props) {
  return (
    <div>
      {Article?.id ? (
        <>
          <Card className="mt-6 max-w-72">
            <CardBody className="flex items-center justify-center p-0 ">
              <Image
                isZoomed
                src={Article?.ArticleImage || ' '}
                alt="articleImage"
                radius="md"
                width="100%"
                className="h-56 w-96 rounded-xl object-cover"
              />
            </CardBody>
            <CardFooter className="px-3  text-small">
              <div className="w-full ">
                <div className="text-center">
                  <Text as="b">{Article?.title || ''}</Text>
                </div>
                <div className=" mt-3 flex">
                  <Avatar
                    src={Article?.author?.image || ''}
                    alt="avatar"
                    radius="full"
                    isBordered
                  />
                  <div className="grid">
                    <div className="ml-4 ">
                      <Text>{Article?.author?.name}</Text>

                      {Article?.tag?.map((hashtag, index) => (
                        <>
                          {hashtag?.Hashtag ? (
                            <div key={index} className="badge badge-info">
                              {hashtag.Hashtag}
                            </div>
                          ) : (
                            <div key={index} className="badge badge-info">
                              ไม้มี HASHTAG
                            </div>
                          )}
                        </>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center  justify-around ">
                  <div className="flex items-center">
                    {/* <Text className="mr-3">
                      เข้าชม
                      <span className="ml-2">
                        {Article?.visit?.map((tag) => (
                          <>{tag?.Visitcount || 0}</>
                        ))}
                      </span>
                    </Text> */}
                  </div>
                  <div className="">
                    <Link href={`/article/${Article?.id}`}>
                      <VisitBtnArticleC
                        id={Article?.id || ''}
                        userId={currentId || ''}
                      />
                    </Link>
                  </div>
                </div>
                <Text>{Article.createAt.toLocaleString()}</Text>
              </div>
            </CardFooter>
          </Card>
        </>
      ) : null}
    </div>
  )
}
