'use client'

import clsx from 'clsx'
import useConversation from '../hooks/useConversation'
import Emty from '@/components/stage/emty'

const Home = () => {
  const { isOpen } = useConversation()
  return (
    <div
      className={clsx(
        '   hidden    h-screen    w-full    lg:block lg:pl-80   ',
        isOpen ? 'block' : 'hidden'
      )}
    >
      <Emty />
    </div>
  )
}

export default Home
