import { FC, ReactNode } from 'react'
import Navbars from '../../components/Navbar'
import { getCurrentUser } from '../../lib/session'

interface AuthLayoutProps {
  children: ReactNode
}

const AuthLayout: FC<AuthLayoutProps> = async ({ children }) => {
  const user = await getCurrentUser()

  return (
    <>
      <Navbars userId={user?.id || ''} />
      <div className="relative h-full max-h-full w-full max-w-full ">
        {children}
      </div>
    </>
  )
}

export default AuthLayout
