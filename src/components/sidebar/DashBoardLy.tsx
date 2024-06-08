import DashBoardSideBar from '../active/DashboardSidebar'

export default async function DashBoardLy({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="max-h-full w-full">
      <DashBoardSideBar />
      <main className="h-full">{children}</main>
    </div>
  )
}
