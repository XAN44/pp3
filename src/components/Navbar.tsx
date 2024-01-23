import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { HandMetal } from 'lucide-react'
import Link from 'next/link'
import UserAccountnav from './UserAccountnav'

import { getCurrentUser } from '@/lib/session'
import Notification from './Notification'
import { ImgProfilee } from './profile-image/imgProfile'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

const Navbar = async ({ params }: { params: { id: string } }) => {
  const user = await getCurrentUser()

  return (
    <>
      <div className=" fixed top-0 z-10 w-full border-b border-s-zinc-200 bg-zinc-100 py-2">
        <div className="container flex items-center justify-between ">
          <Link href="/">
            <HandMetal />
          </Link>

          <DropdownMenu>
            <Notification />

            <DropdownMenuTrigger>
              {user && user.image ? (
                <Avatar>
                  <AvatarImage src={user.image}></AvatarImage>
                </Avatar>
              ) : (
                <Avatar>
                  <AvatarImage src="defaultAvatar.png" />
                </Avatar>
              )}
            </DropdownMenuTrigger>
            {/* Notification */}
            <DropdownMenuContent>
              <DropdownMenuSeparator />

              {user ? (
                <DropdownMenu>
                  <DropdownMenuLabel className="text-center">
                    {user.name}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <Link href={`/profile/${user?.id}`}>
                      <DropdownMenuItem>
                        Profile
                        <DropdownMenuShortcut>(โปรไฟล์)</DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </Link>
                    <Link href="/profile/cart">
                      <DropdownMenuItem>
                        Cart
                        <DropdownMenuShortcut>(ตระกร้า)</DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem>
                      <ImgProfilee
                        user={{
                          image: '',
                          id: '',
                          bio: '',
                          nickname: '',
                          name: '',
                          facebookUrl: '',
                          igUrl: '',
                          tiktokUrl: '',
                          twitterUrl: '',
                        }}
                      />
                      <DropdownMenuShortcut>(ตั้งค่า)</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <UserAccountnav />
                  </DropdownMenuGroup>
                </DropdownMenu>
              ) : (
                <DropdownMenu>
                  <DropdownMenuLabel className="text-center">
                    Unknow
                    <DropdownMenuShortcut className="text-red-600">
                      (Plse login)
                    </DropdownMenuShortcut>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link href="/sign-in">
                    <DropdownMenuItem>Sign in</DropdownMenuItem>
                  </Link>
                </DropdownMenu>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </>
  )
}

export default Navbar
