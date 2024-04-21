'use client'
import clsx from 'clsx'
import Emty from '@/components/stage/emty'
import useRoom from '../hooks/useRoom'
import { Metadata } from 'next'
import Head from 'next/head'

const Home = () => {
  const { isOpen } = useRoom()
  return (
    <>
      <Head>
        <title>Conversation</title>
      </Head>{' '}
      <div
        className={clsx(
          '   hidden    h-screen    w-full    lg:block lg:pl-80   ',
          isOpen ? 'block' : 'hidden'
        )}
      >
        <Emty />
      </div>
    </>
  )
}

export default Home
