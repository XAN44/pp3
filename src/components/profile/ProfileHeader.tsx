'use client'
import { Avatar } from '@radix-ui/themes'
import Link from 'next/link'
import { AiFillInstagram } from 'react-icons/ai'
import { FaFacebook, FaTiktok } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import Followbtn from '../follow/followbtn'
import { Text } from '@chakra-ui/react'
import useSWR from 'swr'
import { Image } from '@nextui-org/react'
import { MessageSquarePlus } from 'lucide-react'
import { useRouter } from "next/navigation";
import { useCallback, useState } from 'react'
import axios from 'axios'
import { User } from '@prisma/client'

interface Props {
  accountId: string
  authUserId: string
  name: string
  nickname: string
  image: string
  bio: string
  totalFollower: number
  totalFollowing: number
  isFollow: boolean
  article: {
    id: string
  }
  event: {
    id: string
  }
  contact: {
    facebook: string
    ig: string
    twitter: string
    tiktok: string
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

function ProfileHeader({
  accountId,
  authUserId,
  name,
  nickname,
  image,
  bio,
  totalFollower,
  totalFollowing,
  isFollow,
  contact,
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
  const router = useRouter()


  const handleClick = (() => {
    router.push(`/conversationroom/`)
  })


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
      <div className=" item-center grid justify-center  ">
        <div className="item-center grid place-items-center justify-center ">
          {/* AVATAR */}
          <div className="grid items-center justify-center xl:flex ">
            <div className=" grid items-center justify-center xl:mr-5">
              <Avatar
                size="8"
                fallback={name}
                src={image}
                radius="full"
                className="ring-1 ring-black  "
              />
            </div>
            {/* NAME AND NICKNAME */}
            <div className=" mt-4 grid items-center justify-center text-center xl:mr-4 xl:items-start xl:justify-start xl:text-start ">
              <div
                className="flex items-center  justify-center text-center
              
                xl:mr-4 xl:items-start xl:justify-start xl:text-start"
              >
                <Text fontSize="large" as="b">
                  {name}
                </Text>
                <div className="ml-2">
                  {nickname && nickname ? (
                    <Text fontSize="small">@{nickname}</Text>
                  ) : (
                    <Text fontSize="small">@Dont have nickname</Text>
                  )}
                </div>
              </div>
              <div className=" ">
                <Text>{bio}</Text>
              </div>
            </div>
          </div>
        </div>

        {accountId !== authUserId && (
          <Followbtn
            key={authUserId}
            ProfileId={accountId}
            isFollowing={authUserId}
            checkFollow={isFollow}
          />
        )}



        <div className="mt-3 flex items-center justify-center space-x-10 text-center xl:grid xl:items-start xl:justify-start xl:space-x-0 xl:text-start">
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
        </div>

        <div className="mt-5">
          <div className="text-center xl:text-start">
            <Text>ช่องทางติดต่อ</Text>
          </div>
          <div className="mt-3 flex items-center justify-center space-x-5 xl:ml-6 xl:grid xl:items-start xl:justify-start xl:space-x-0 xl:text-start">
            {accountId !== authUserId && (
              <div className="
            mt-3 
            w-13 flex
            cursor-pointer
            "
                onClick={handleClick}
              >
                <MessageSquarePlus size={20} />
                Message
              </div>
            )}
            {!contact.facebook &&
              !contact.ig &&
              !contact.twitter &&
              !contact.tiktok && <Text>ไม่มีช่องทางติดต่อ</Text>}
            {/* Facebook contact */}
            {contact.facebook && (
              <Link href={contact.facebook}>
                <div className="flex items-center justify-start text-center">
                  <FaFacebook />
                  <Text>:FACEBOOK </Text>
                </div>
              </Link>
            )}

            {/* IG contact */}

            {contact?.ig && (
              <Link href={contact.ig}>
                <div className="flex items-center justify-start text-center">
                  <AiFillInstagram />
                  <Text>: INSTAGRAM </Text>
                </div>
              </Link>
            )}
            {/* Tiktok contact */}

            {contact.tiktok && (
              <Link href={contact.tiktok}>
                <div className="flex items-center justify-start text-center">
                  <FaTiktok />
                  <Text>: TIKTOK </Text>
                </div>
              </Link>
            )}
            {/* Twitter contact */}

            {contact.twitter && (
              <Link href={contact.twitter}>
                <div className="flex items-center justify-start text-center">
                  <FaXTwitter />
                  <Text>: TWITTER </Text>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center space-x-10 xl:grid xl:items-start xl:justify-start xl:space-x-0 ">
        <div className="mt-5 text-center ">
          <Text as="b" fontSize="large" textAlign="center">
            มาแรง
          </Text>
          <div className="flex">
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
      </div>
    </>
  )
}

export default ProfileHeader
