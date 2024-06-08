import React from 'react'
import DashBoardActivity from '../../../../lib/actions/getDashBoard'
import DashBoardMain from './components/DashBoardMain'

function Page() {
  return (
    <div
      className="
      hidden
      w-full
      lg:block
      lg:pl-80
        "
    >
      <DashBoardMain />
    </div>
  )
}

export default Page
