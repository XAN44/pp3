'use client'
import { Visit, VisitArticle } from '@/lib/actions/user.visit'
import { Button } from '@nextui-org/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function VisitBtnArticle({
  userId,
  id,
}: {
  userId: string
  id: string
}) {
  const pathname = usePathname()

  const visit = async () => {
    try {
      await VisitArticle(userId, id, pathname)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <>
      <Button
        onClick={visit}
        className="relative w-full overflow-visible rounded-full rounded-tl-none rounded-tr-none bg-gray-800 px-12 text-white shadow-xl after:absolute after:inset-0 after:z-[-1] after:rounded-full after:rounded-tl-none after:rounded-tr-none after:bg-black after:text-white after:transition 
        after:!duration-500 after:content-['']
        hover:-translate-y-1 hover:text-white hover:after:scale-150 hover:after:opacity-0"
      >
        เยี่ยมชม
      </Button>
    </>
  )
}
