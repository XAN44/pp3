import { GetNotification } from '@/lib/actions/user.notification'
import { fetchUserProfileByID } from '@/lib/actions/user.post'
import { getCurrentUser } from '@/lib/session'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuShortcut,
} from './ui/dropdown-menu'
import { HandMetal } from 'lucide-react'
import { ImgProfilee } from './profile-image/imgProfile'
import UserAccountnav from './UserAccountnav'
import {
  Avatar,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/react'
import NotificationCard from './notification/notificationCard'
import SearchBar from './SearchBar'
import Chat from '../app/chat/chat'

interface User {
  userId: string
}
const Navbars = async ({ userId }: User) => {
  const user = await getCurrentUser()
  const account = await fetchUserProfileByID(userId || '')
  console.log(user?.image)

  return (
    <>
      <Navbar shouldHideOnScroll>
        <div className="container flex items-center justify-between ">
          <Link href="/">
            <HandMetal />
          </Link>
          <NavbarContent className="hidden gap-4 sm:flex" justify="center">
            <NavbarBrand>
            </NavbarBrand>
            <NavbarBrand>
              <NotificationCard />
            </NavbarBrand>
            <NavbarBrand>
              <SearchBar />
            </NavbarBrand>

            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar src={user?.image}></Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuSeparator />
                {user?.id ? (
                  <>
                    {account?.map((acc) => (
                      <DropdownMenu key={acc.id}>
                        <DropdownMenuLabel className="text-center">
                          {acc.name}
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                          <Link href={`/profile/${user?.id}`}>
                            <DropdownMenuItem>
                              Profile
                              <DropdownMenuShortcut>
                                (โปรไฟล์)
                              </DropdownMenuShortcut>
                            </DropdownMenuItem>
                          </Link>
                          <Link href="/profile/cart">
                            <DropdownMenuItem>
                              Cart
                              <DropdownMenuShortcut>
                                (ตระกร้า)
                              </DropdownMenuShortcut>
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
                            <DropdownMenuShortcut>
                              (ตั้งค่า)
                            </DropdownMenuShortcut>
                          </DropdownMenuItem>

                          <DropdownMenuItem>
                          </DropdownMenuItem>

                          <DropdownMenuSeparator />
                          <UserAccountnav />
                        </DropdownMenuGroup>
                      </DropdownMenu>
                    ))}
                  </>
                ) : (
                  <>
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
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </NavbarContent>
        </div>
      </Navbar>
    </>
  )
}

export default Navbars
