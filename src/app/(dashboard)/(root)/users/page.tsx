import Emty from '@/components/stage/emty'
import { getCurrentUser } from '@/lib/session'
import { Metadata } from 'next'
import React from 'react'
import UserList from './components/Userlist'

export const metadata: Metadata = {
  title: 'Chat',
}

export default async function page() {
  return (
    <div
      className="
        hidden 
        h-screen 
        w-full 
        lg:block lg:pl-80
        "
    >
      <Emty />
    </div>
  )
}
