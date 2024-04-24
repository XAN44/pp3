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
import { Text } from '@chakra-ui/react'

interface User {
  userId: string
}
const Navbars = async ({ userId }: User) => {
  const user = await getCurrentUser()
  const account = await fetchUserProfileByID(userId || '')
  console.log(user?.image)

  return (
    <Navbar shouldHideOnScroll className="  bg-black text-white">
      <NavbarBrand>LOGO</NavbarBrand>
      <NavbarBrand>
        <Link href="/home">
          <Text as="b" color="white">
            Home
          </Text>
        </Link>
      </NavbarBrand>
      <NavbarBrand>
        <Link href="/allblog">
          <Text as="b" color="white">
            Blog
          </Text>
        </Link>
      </NavbarBrand>
      <NavbarBrand>
        <Link href="/allevent">
          <Text as="b" color="white">
            Activty
          </Text>
        </Link>
      </NavbarBrand>
      <NavbarBrand>
        <Link href="/myhis">
          <Text as="b" color="white">
            About
          </Text>
        </Link>
      </NavbarBrand>
      <NavbarBrand>
        <Link href="/workwithus">
          <Text as="b" color="white">
            Contact
          </Text>
        </Link>
      </NavbarBrand>
      <NavbarContent justify="end" className="items-center justify-center">
        <NavbarItem className="mt-4">
          <NotificationCard userId={userId || ''} />
        </NavbarItem>
        <NavbarItem>
          <SearchBar />
        </NavbarItem>

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
                          <DropdownMenuShortcut>(โปรไฟล์)</DropdownMenuShortcut>
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
    </Navbar>
  )
}

export default Navbars
