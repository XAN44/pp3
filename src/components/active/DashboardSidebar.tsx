'use client'

import Link from 'next/link'
import useDashBoard from '../../app/hooks/useDashBoard'
import clsx from 'clsx'

const DashBoardSideBar = () => {
  const useRoute = useDashBoard()

  return (
    <div
      className="
 fixed
 left-0
  border-gray-200
  lg:w-80
 lg:pb-0
  "
    >
      <div className="flex flex-col gap-3">
        {useRoute.map((a, index) => (
          <Link
            key={index}
            href={a.href}
            className={
              a.active && a.href ? 'font-bold underline' : 'font-bold '
            }
          >
            {a.label}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default DashBoardSideBar
