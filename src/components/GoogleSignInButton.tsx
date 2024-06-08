import { FC, ReactNode } from 'react'
import { signIn } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import { Avatar, Button, Image } from '@nextui-org/react'

interface GoogleSignInButtonProps {
  children: ReactNode
}
const GoogleSignInButton: FC<GoogleSignInButtonProps> = ({ children }) => {
  const { data: session, status } = useSession()

  const loginWithGoogle = () =>
    signIn('google', {
      callbackUrl: `/home`,
    })

  return (
    <Button
      startContent={<Avatar src="/google.png" className="h-6 w-6 text-tiny" />}
      onClick={loginWithGoogle}
      className="w-full"
    >
      {children}
    </Button>
  )
}

export default GoogleSignInButton
