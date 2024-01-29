import {
  Avatar,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/react'
import { HandMetal } from 'lucide-react'
import Link from 'next/link'

import { getCurrentUser } from '@/lib/session'

import { GetNotification } from '@/lib/actions/user.notification'
import { fetchUserProfileByID } from '@/lib/actions/user.post'
import UserAccountnav from '../UserAccountnav'
import NotificationCard from '../notification/notificationCard'
import { ImgProfilee } from '../profile-image/imgProfile'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'

interface params {
  id: string
}

export async function Topbar({ id }: params) {
  if (!id) return null

  const user = await getCurrentUser()

  if (!user) return null
  const notification = await GetNotification(user?.id)
  const account = await fetchUserProfileByID(user.id)

  user === user ? (
    <>
      {account &&
        account?.map((acc) => (
          <>
            <Navbar shouldHideOnScroll>
              <NavbarBrand>
                <p className="font-bold text-inherit">ACME</p>
              </NavbarBrand>
              <NavbarContent className="hidden gap-4 sm:flex" justify="center">
                <NavbarItem>
                  {acc.notifications.map((noi) => (
                    <NotificationCard
                      key="notification"
                      body={noi.body}
                      id={noi.id}
                      currentId={user.id}
                      userId={user.id}
                      current={noi.current}
                    />
                  ))}
                </NavbarItem>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Avatar color="default" isBordered src={user.image} />
                  </DropdownMenuTrigger>
                  {/* Notification */}
                  <DropdownMenuContent>
                    <DropdownMenuSeparator />

                    <DropdownMenu>
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
                        <DropdownMenuItem></DropdownMenuItem>
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
                              image: acc.image || '',
                              id: acc.id || '',
                              bio: acc.bio || '',
                              nickname: acc.nickname || '',
                              name: acc.name || '',
                              facebookUrl: acc.Facebook || '',
                              igUrl: acc.IG || '',
                              tiktokUrl: acc.Tiktok || '',
                              twitterUrl: acc.Twitter || '',
                            }}
                          />
                          <DropdownMenuShortcut>(ตั้งค่า)</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem></DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <UserAccountnav />
                      </DropdownMenuGroup>
                    </DropdownMenu>
                  </DropdownMenuContent>
                </DropdownMenu>
              </NavbarContent>
            </Navbar>
          </>
        ))}
    </>
  ) : (
    <>
      <div className=" fixed top-0 z-10 w-full border-b border-s-zinc-200 bg-zinc-100 py-2">
        <div className="container flex w-full items-center justify-between ">
          <Link href="/">
            <HandMetal />
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar color="default" isBordered src="/defaultAvatar.png" />
            </DropdownMenuTrigger>
            {/* Notification */}
            <DropdownMenuContent>
              <DropdownMenuSeparator />
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
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </>
  )
}
