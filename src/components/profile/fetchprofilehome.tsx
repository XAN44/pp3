'use client'

import { Text } from '@chakra-ui/react'
import useSWR from 'swr'
import { Avatar, Image } from '@nextui-org/react'
import { FaRegistered } from 'react-icons/fa'
import { LogInIcon } from 'lucide-react'
import Link from 'next/link'
import HomePageFollow from '../../app/(dashboard)/home/components/HomepageFollow'
import HomepageChat from '../../app/(dashboard)/home/components/HomepageChart'
import POSTFORM from '../post/postform'
import ArticleForm from '../article/articleForm'
import EventForm from '../event/eventForm'

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
      <div
        className="
      opacity-300 h-full
      max-h-screen
      items-center
      justify-center
      rounded-lg
      border border-gray-300
      pb-3 pt-3
      "
      >
        <div className="mt-4 grid w-full items-center justify-center text-center">
          <div className="flex flex-col items-center justify-center">
            <Image
              src={image}
              width={100}
              height={100}
              alt="Profile"
              className=" rounded-full ring-1"
            />
          </div>
          <div className="mt-3">
            <Text as="b" fontSize="medium">
              {name}
            </Text>
            <Text>{bio}</Text>
          </div>
          <div className="mt-3">
            <HomePageFollow
              follower={totalFollower}
              following={totalFollowing}
              accountId={accountId}
            />
          </div>
          <div className="mt-10 text-center">
            <HomepageChat />
          </div>
          <div className="">
            {accountId === authUserId ? (
              <>
                <div className="mt-3">
                  <POSTFORM accountId={accountId} authUserId={authUserId} />
                </div>
                <div className="mt-3">
                  <ArticleForm accountId={accountId} authUserId={authUserId} />
                </div>
                <div className="mt-3">
                  <EventForm accountId={accountId} authUserId={authUserId} />
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </>
  )
}

export default Fetchprofilehome
