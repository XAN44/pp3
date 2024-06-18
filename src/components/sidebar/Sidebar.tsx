import { getCurrentUser } from '@/lib/session'
import DesktopSidebar from './DesktopSidebar'

async function Sidebar({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser()
  return (
    <div className=" max-h-full w-full ">
      <main className="h-full lg:pl-20">{children}</main>
    </div>
  )
}

export default Sidebar
