'use client'
import {
  Follower,
  getTotalFollowers,
  getTotalFollowing,
  unFollower,
} from '@/lib/actions/user.follow'
import { usePathname } from 'next/navigation'
import { Button } from '@nextui-org/react'
import React, { useState, useEffect } from 'react'

function Followbtn({
  ProfileId,
  isFollowing,
  checkFollow,
}: {
  ProfileId: string
  isFollowing: string
  checkFollow: boolean
}) {
  const path = usePathname()

  const [isDisabled, setisisDisabled] = useState(false)

  const onFollow = async () => {
    try {
      setisisDisabled(true) // เริ่มต้นโหลดข้อมูล
      if (checkFollow) {
        await unFollower(ProfileId, isFollowing, path)
      } else {
        await Follower(ProfileId, isFollowing, path)
      }
      setisisDisabled(false) // จบการโหลดข้อมูล
    } catch (error) {
      console.error('Error:', error)
      setisisDisabled(false) // หยุดโหลดข้อมูลเมื่อเกิดข้อผิดพลาด
    }
  }

  return (
    <>
      <div className="">
        <Button onClick={onFollow} isDisabled={isDisabled}>
          {checkFollow ? 'Unfollow' : 'Follow'}
        </Button>
      </div>
    </>
  )
}

export default Followbtn
