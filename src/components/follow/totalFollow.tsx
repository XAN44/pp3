'use client'
import { getTotalFollowers, getTotalFollowing } from '@/lib/actions/user.follow'
import { useEffect, useState } from 'react'

interface Props {
  account: {
    id: string
  }
}

export default function TotalFollowe({ account }: Props) {
  const [totalFollowers, setTotalFollowers] = useState(0)
  const [totalFollowing, setTotalFollowing] = useState(0)

  useEffect(() => {
    const fetchTotalFollowers = async () => {
      try {
        const followersCount = await getTotalFollowers(account.id)
        setTotalFollowers(followersCount)
      } catch (error) {
        console.error(error)
      }
    }

    const fetchTotalFollowing = async () => {
      try {
        const followingCount = await getTotalFollowing(account.id)
        setTotalFollowing(followingCount)
      } catch (error) {
        console.error(error)
      }
    }

    fetchTotalFollowers()
    fetchTotalFollowing()
  }, [account.id])

  return (
    <div>
      <p>Total Followers: {totalFollowers}</p>
      <p>Total Following: {totalFollowing}</p>
    </div>
  )
}
