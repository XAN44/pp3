'use client'

import { Avatar } from '@nextui-org/react'
import { User } from '@prisma/client'
import React from 'react'

interface AvatarProps {
  user?: User
}

const Avatars: React.FC<AvatarProps> = ({
  user
}) => {
  return (
    <div className='relative'>
      <div className="
      relative
      inline-block
      rounded-full
      overflow-hidden
      h-9
      w-9
      md:h-11
      md:w-11
      ">
        <Avatar src={user?.image || ''} />

      </div>
    </div>
  )
}

export default Avatars
