'use client'
import { Visit, VisitArticle, VisitPost } from '@/lib/actions/user.visit'
import { Button } from '@nextui-org/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function VisitBtnPOSTAll({
  userId,
  id,
}: {
  userId: string
  id: string
}) {
  const pathname = usePathname()

  const visit = async () => {
    try {
      await VisitPost(userId, id, pathname)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <>
      <Button radius="lg" onClick={visit} className="bg-black text-white">
        ความคิดเห็นทั้งหมด
      </Button>
    </>
  )
}
