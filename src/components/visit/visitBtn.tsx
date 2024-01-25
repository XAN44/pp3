'use client'
import { Visit } from '@/lib/actions/user.visit'
import { Button } from '@nextui-org/react'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function VisitBtn({
  userId,
  pageId,
}: {
  userId: string
  pageId: string
}) {
  const pathname = usePathname()

  const visit = async () => {
    try {
      await Visit(userId, pageId, pathname || '')
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
