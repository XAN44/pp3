import Navbars from '../../components/Navbar'
import { getCurrentUser } from '../../lib/session'

export default async function RootDashBord({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()

  return (
    <main className="h-full max-h-full w-screen max-w-full flex-col items-center justify-center ">
      <Navbars userId={user?.id || ''} />
      {children}
    </main>
  )
}
