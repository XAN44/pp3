'use client'
import { Visit, VisitArticle } from '@/lib/actions/user.visit'
import { Button } from '@nextui-org/react'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function VisitBtnArticle({
  userId,
  articleId,
}: {
  userId: string
  articleId: string
}) {
  const pathname = usePathname()

  const visit = async () => {
    try {
      await VisitArticle(userId, articleId, pathname)
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
