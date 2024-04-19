'use client'
import { VisitEventt } from '@/lib/actions/user.visit'
import { Button } from '@nextui-org/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function VisitEventCarosule({
  userId,
  id,
}: {
  userId: string
  id: string
}) {
  const pathname = usePathname()

  const visit = async () => {
    try {
      await VisitEventt(userId, id, pathname)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <>
      <Button onClick={visit} className="">
        เยี่ยมชม
      </Button>
    </>
  )
}
