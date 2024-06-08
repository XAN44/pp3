'use client'

import { User } from '@prisma/client'
import Boxuser from './Boxuser'

interface UserListProps {
  items: User[]
}
const ListUser: React.FC<UserListProps> = ({ items }) => {
  return (
    <div
      className="
        fixed
        left-0
        top-0 
        block
        w-full
        overflow-y-auto
        border-r
        border-gray-200
        pb-20
        lg:left-20
        lg:w-80
        lg:pb-0
        "
    >
      <div className="px-5">
        <div className="flex-col">
          <div
            className="
                    py-4
                    text-2xl
                    font-bold
                    text-neutral-800
                    "
          >
            แชท
          </div>
        </div>
        {items.map((item) => (
          <Boxuser key={item.id} data={item} />
        ))}
      </div>
    </div>
  )
}

export default ListUser
