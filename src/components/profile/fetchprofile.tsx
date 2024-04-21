'use server'
import {
  FetchBio,
  FetchImageProfile,
  FetchName,
  FetchNickname,
} from '@/lib/actions/user.action'
import React from 'react'
import { Avatar, AvatarImage } from '../ui/avatar'
import { AvatarFallback } from '@radix-ui/react-avatar'
import { Text } from '@radix-ui/themes'
import { getCurrentUser } from '@/lib/session'

export default async function fetchProfile() {
  const session = await getCurrentUser()
  const UserProfile = await FetchImageProfile()
  const UserName = await FetchName()
  const UserNickname = await FetchNickname()
  const UserBio = await FetchBio()

  return (
    <>
      <div>
        {UserProfile?.image ? (
          <Avatar className="left-1/2 h-36 w-36 -translate-x-16 ">
            <AvatarImage src={UserProfile.image} />
            <AvatarFallback>{UserName?.name}</AvatarFallback>
          </Avatar>
        ) : (
          <Avatar className="left-1/2 h-36 w-36 -translate-x-14 ">
            <AvatarImage src="defaultAvatar.png" />
          </Avatar>
        )}
        <div>
          <Text>
            {UserName?.name} {UserNickname?.nickname}
          </Text>
        </div>

        <h1>
          bio
          {UserBio?.bio}
        </h1>
      </div>
    </>
  )
}
