'use client'
import { Avatar } from '@radix-ui/themes'

import { Text } from '@chakra-ui/react'
import useSWR from 'swr'
import { Image } from '@nextui-org/react'
import { FaRegistered } from 'react-icons/fa'
import { LogInIcon } from 'lucide-react'
import Link from 'next/link'

interface Props {
  accountId: string
  authUserId: string
  name: string
  nickname: string
  image: string
  bio: string
  totalFollower: number
  totalFollowing: number
  article: {
    id: string
  }
  event: {
    id: string
  }
}

async function fetcher(url: string) {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('cannot fetch top article')
  }
  console.log(response)
  return response.json()
}

function Fetchprofilehome({
  accountId,
  authUserId,
  name,
  nickname,
  image,
  bio,
  totalFollower,
  totalFollowing,
  article,
  event,
}: Props) {
  const { data: ToptierArticle, mutate: MutaSearch } = useSWR<any[]>(
    `/api/profile-blog?id=${accountId}`,
    fetcher,
    {
      revalidateOnMount: true, // *ปิดระมวลผลเริ่มต้น
    }
  )
  const { data: ToptierEvent, mutate: MutaEvent } = useSWR<any[]>(
    `/api/profile-event?id=${accountId}`,
    fetcher,
    {
      revalidateOnMount: true, // *ปิดระมวลผลเริ่มต้น
    }
  )
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
    await fetch('/api/profile-event', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: eventId }),
    })
  }

  return (
    <>
      <div className=" bg-base-200 item-center grid justify-center  ">
        <div className="item-center grid place-items-center justify-center ">
          {/* AVATAR */}
          <div className="grid items-center justify-center xl:flex ">
            <div className=" grid items-center justify-center xl:mr-5">
              {authUserId ? (
                <div className="">
                  <Avatar
                    size="8"
                    fallback={name}
                    src={image}
                    radius="full"
                    className="ring-1 ring-black"
                  />
                </div>
              ) : (
                <>
                  <div className="">
                    <Avatar
                      size="8"
                      fallback="Dont have avatar"
                      src="/defaultAvatar.png"
                      radius="full"
                      className="ring-1 ring-black  "
                    />
                  </div>
                </>
              )}
            </div>
            {/* NAME AND NICKNAME */}
            <div className=" mt-4 grid items-center justify-center text-center xl:mr-4 xl:items-start xl:justify-start xl:text-start ">
              <div
                className="flex items-center  justify-center text-center
                xl:mr-4 xl:items-start xl:justify-start xl:text-start"
              >
                <div>
                  {name ? (
                    <Text fontSize="large" as="b">
                      {name}
                    </Text>
                  ) : (
                    <Text fontSize="large" as="b">
                      คุณยังไม่มีโปรไฟล์
                    </Text>
                  )}
                </div>
                <div className="ml-2">
                  {authUserId ? (
                    <>
                      {nickname && nickname ? (
                        <Text fontSize="small">@{nickname}</Text>
                      ) : (
                        <Text fontSize="small">@Dont have nickname</Text>
                      )}
                    </>
                  ) : null}
                </div>
              </div>
              <div className=" ">
                <Text>{bio}</Text>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-center space-x-10 text-center xl:grid xl:items-start xl:justify-start xl:space-x-0 xl:text-start">
          {authUserId ? (
            <>
              <div className="flex ">
                <div className="w-[83px]">
                  <Text>ผู้ติดตาม</Text>
                </div>
                <Text>{totalFollower}</Text>
              </div>
              <div className="flex space-x-2">
                <Text>กำลังติดตาม </Text>
                <Text>{totalFollowing}</Text>
              </div>
            </>
          ) : null}
        </div>
      </div>

      <div className="flex items-center justify-center space-x-10 xl:grid xl:items-start xl:justify-start xl:space-x-0 ">
        {authUserId ? (
          <>
            <div className="mt-5 text-center">
              <Text as="b" fontSize="large" textAlign="center">
                มาแรง
              </Text>
              <div className="flex xl:grid">
                {ToptierArticle?.map((Article, index) => (
                  <>
                    <div
                      key={index}
                      className=" mt-6 grid items-start justify-start xl:flex"
                    >
                      <Link
                        href={`/article/${article.id}`}
                        onClick={() => {
                          visitHandler(article.id)
                        }}
                      >
                        <Image
                          isBlurred
                          src={Article.ArticleImage}
                          alt={Article.ArticleImage}
                          radius="md"
                          width={100}
                          height={100}
                          className=" h-43 w-full object-scale-down"
                        />
                      </Link>

                      <div className="ml-3 text-center xl:text-start">
                        <h1>ผู้เขียน {Article.author.name}</h1>
                      </div>
                    </div>
                  </>
                ))}

                {ToptierEvent?.map((Event, index) => (
                  <>
                    <div
                      key={index}
                      className=" mt-6 grid items-start justify-start xl:flex"
                    >
                      <Link
                        href={`/event/${event.id}`}
                        onClick={() => {
                          visitEvent(event.id)
                        }}
                      >
                        <Image
                          isBlurred
                          src={Event.eventImage}
                          alt={Event.eventImage}
                          radius="md"
                          width={100}
                          height={100}
                          className=" h-43 w-full object-scale-down"
                        />
                      </Link>
                      <div className="ml-3 text-center xl:text-start">
                        <h1>ผู้เขียน {Event.author.name}</h1>
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="space-y-3 text-blue-800 xl:grid">
              <Link href="/sign-in" className="hover:underline">
                ลงชื่อเข้าใช้
              </Link>
              <Link href="/sign-up" className="hover:underline">
                สมัครใช้งาน
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default Fetchprofilehome
