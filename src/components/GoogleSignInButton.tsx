import { FC, ReactNode } from 'react'
import { Button } from './ui/button'
import { signIn } from 'next-auth/react'
import { useSession } from 'next-auth/react'

interface GoogleSignInButtonProps {
  children: ReactNode
}
const GoogleSignInButton: FC<GoogleSignInButtonProps> = ({ children }) => {
  const { data: session, status } = useSession()

  const loginWithGoogle = () =>
    signIn('google', {
      callbackUrl: `/home/${session?.user.id}`,
    })

  return (
    <Button onClick={loginWithGoogle} className="w-full">
      {children}
    </Button>
  )
}

export default GoogleSignInButton
