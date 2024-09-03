import React from 'react'
import { GetFollow, GetFollowing } from '../../lib/actions/getFollowData'
import { Image } from '@nextui-org/react'
import { getTotalFollowers } from '../../lib/actions/user.follow'
import Followbtn from './followbtn'
import Link from 'next/link'

interface Data {
  id: string
  isFollowing: string
  checkFollow: boolean
  authUserId: string
}

export default async function ContentFollow({
  id,
  checkFollow,
  isFollowing,
  authUserId,
}: Data) {
  const data = await GetFollow(id)
  const data1 = await GetFollowing(id)
  const gettotal = await getTotalFollowers(id)
  return (
    <div className="flex h-full w-full flex-col">
      <div className="grid grid-cols-2">
        <div className="mt-6 flex flex-col space-y-4">
          กำลังติดตาม
          {data?.map((d, index) => (
            <div key={index}>
              <div className="flex h-20 w-56 rounded-md shadow-large ">
                <Link className="w-full" href={`/profile/${d.follower.id}`}>
                  <div className="m-3 flex w-full  ">
                    <div className="w-ful flex items-center text-start">
                      <Image
                        src={d.follower.image || ''}
                        alt=""
                        className="avatar h-16 w-16 rounded-full ring-1 ring-gray-500"
                      />
                    </div>
                    <div className=" ml-2 text-start ">
                      <h1>{d.follower.name}</h1>
                      <h1>ผู้ติดตาม {d.follower._count.followers}</h1>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-col space-y-4">
          ผู้ติดตาม
          {data1?.map((d, index) => (
            <>
              <div className="right flex h-20 w-56 rounded-md shadow-large ">
                <Link className="w-full" href={`/profile/${d.following.id}`}>
                  <div className="m-3 flex w-full  ">
                    <div className="w-ful flex items-center text-start">
                      <Image
                        src={d.following.image || ''}
                        alt=""
                        className="avatar h-16 w-16 rounded-full ring-1 ring-gray-500"
                      />
                    </div>
                    <div className=" ml-2 text-start ">
                      <h1>{d.following.name}</h1>
                      <h1>ผู้ติดตาม {d.following._count.followers}</h1>
                    </div>
                  </div>
                </Link>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  )
}
