'use client'

import { Text } from '@chakra-ui/react'

type Follow = {
  accountId: string
  follower: number
  following: number
}

const HomePageFollow: React.FC<Follow> = ({
  accountId,
  follower,
  following,
}) => {
  return (
    <div className="grid max-w-full grid-cols-2 items-center justify-center text-center">
      <Text
        as="b"
        align="start"
        className="hover:cursor-pointer hover:underline"
      >
        ผู้ติดตาม
      </Text>
      {follower}
      <Text
        as="b"
        align="start"
        className="hover:cursor-pointer hover:underline"
      >
        กำลังติดตาม
      </Text>
      {following}
    </div>
  )
}

export default HomePageFollow
