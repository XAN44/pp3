import { Avatar } from '@nextui-org/react'
import { HandMetal } from 'lucide-react'
import Link from 'next/link'

import { getCurrentUser } from '@/lib/session'

import { fetchUserProfileByID } from '@/lib/actions/user.post'
import NotificationPage from '../Notification'
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
import { ImgProfilee } from '../profile-image/imgProfile'
import UserAccountnav from '../UserAccountnav'
import { GetNotification } from '@/lib/actions/user.notification'

interface params {
  params: {
    id: string
  }
}

export async function Topbar({ params }: params) {
  if (!params.id) return null

  const user = await getCurrentUser()
  if (!user) return null
  const account = await fetchUserProfileByID(user.id)
  const notification = await GetNotification(user.id)
  return (
    <>
      <div className=" fixed top-0 z-10 w-full border-b border-s-zinc-200 bg-zinc-100 py-2">
        {account &&
          account?.map((noti) => (
            <div
              className="container flex items-center justify-between "
              key={noti.id}
            >
              <Link href="/">
                <HandMetal />
              </Link>

              {notification.map((notis) => (
                <>
                  <div className="" key={notis.id}>
                    <NotificationPage
                      id={notis.id}
                      key={user.id}
                      currenUser={user.name}
                      notificationByUser={notis.current}
                      body={notis.body}
                      post={notis.post?.content || ''}
                    />
                  </div>
                </>
              ))}

              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar color="default" isBordered src={noti.image || ''} />
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
          ))}
      </div>
    </>
  )
}
