import { ReactNode } from 'react'
import DashBoardSideBar from '../../../../components/active/DashboardSidebar'
import DashBoardLy from '../../../../components/sidebar/DashBoardLy'

export default async function ActiveOwnerLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <DashBoardLy>
      <main className="h-full w-full">{children}</main>
    </DashBoardLy>
  )
}
