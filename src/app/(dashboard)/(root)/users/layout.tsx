import DesktopSidebar from '@/components/sidebar/DesktopSidebar'
import Sidebar from '@/components/sidebar/Sidebar'
import UserList from './components/Userlist'
import { getCurrentUser } from '@/lib/session'
import getUser from '@/lib/actions/user.chat'

export default async function ChatLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const users = await getUser()
  return (
    <Sidebar>
      <main className="h-full w-full">
        <UserList items={users!} />
        {children}
      </main>
    </Sidebar>
  )
}
