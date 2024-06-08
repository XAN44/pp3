import DashBoardLy from '../../../../components/sidebar/DashBoardLy'
import DashBoardSideBar from '../../../../components/active/DashboardSidebar'

export default async function DashBoardAc({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DashBoardLy>
      <div className="h-full w-full  ">{children}</div>
    </DashBoardLy>
  )
}
