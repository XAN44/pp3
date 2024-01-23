'use client'
import { VisitEventt } from '@/lib/actions/user.visit'
import { Button } from '@nextui-org/react'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function VisitEvent({
  userId,
  eventId,
}: {
  userId: string
  eventId: string
}) {
  const pathname = usePathname()

  const visit = async () => {
    try {
      await VisitEventt(userId, eventId, pathname)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <>
      <div className="">
        <Button onClick={visit}>เยี่ยมชม</Button>
      </div>
    </>
  )
}
