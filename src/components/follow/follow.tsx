'use client'
import { Button } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

interface Props {
  authorAccountId: string | null
  currentAccountId: string | null
}

interface FollowData {
  existingFollow: {
    currentAccountId: string | null
  }
  Followed: boolean
}

export default function Follow({ authorAccountId, currentAccountId }: Props) {
  const { data: Follow, mutate: MutaFollow } = useSWR<FollowData>(
    `api/follow?id=${authorAccountId}`,
    fetcher
  )

  const [follow, setFollow] = useState(false)

  useEffect(() => {
    if (Follow && Follow.Followed) {
      setFollow(Follow.Followed)
    }
  }, [Follow])
  const handleFollow = async () => {
    try {
      const response = await fetch('/api/follow', {
        method: 'POST',
        body: JSON.stringify({ authorAccountId }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await response.json()
      if (response.ok) {
        setFollow(!follow)
        MutaFollow()
      }
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการติดตาม:', error)
    }
  }

  return (
    <>
      <Button onClick={handleFollow}>{follow ? 'Unfollow' : 'Follow'}</Button>
    </>
  )
}
