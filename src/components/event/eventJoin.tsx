'use client'
import { Text } from '@chakra-ui/react'
import { Avatar } from '@nextui-org/react'
import React from 'react'
import useSWR from 'swr'

interface Props {
  id: string
}

interface JoinData {
  RegisterEvent: {
    id: string
    user: {
      id: string
      name: string | null
      image: string
    }
  }[]
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function EventJoin({ id }: Props) {
  const { data: join, mutate: MutaJoin } = useSWR<JoinData>(
    `/api/userInEvent?id=${id}`,
    fetcher
  )

  return (
    <div className="grid">
      <Text as="b">สมาชิกที่เข้าร่วม</Text>
      {join?.RegisterEvent.map((regus, index) => (
        <div key={index} className="mt-3 flex items-center gap-4">
          <Avatar src={regus.user.image} alt="img" />
          <Text>{regus.user.name}</Text>
        </div>
      ))}
    </div>
  )
}
