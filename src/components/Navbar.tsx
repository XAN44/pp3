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
import { ChatBubbleIcon } from '@radix-ui/react-icons'
import { MdChat } from 'react-icons/md'
import { IoChatboxOutline, IoChatbubblesOutline } from 'react-icons/io5'
import Active from '../app/(dashboard)/(root)/active/page'

interface User {
  userId: string
}
const Navbars = async ({ userId }: User) => {
  const user = await getCurrentUser()
  const account = await fetchUserProfileByID(userId || '')
  console.log(user?.image)

  return (
    <Navbar
      shouldHideOnScroll
      className="  flex w-full max-w-full bg-black text-white "
    >
      <NavbarBrand>LOGO</NavbarBrand>
      <NavbarBrand>
        <Link href="/home">
          <Text as="b" color="white">
            Home
          </Text>
        </Link>
      </NavbarBrand>
      <NavbarBrand>
        <Link href="/Entertainment">
          <Text as="b" color="white">
            Entertainment
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
        <Link href="/allblog">
          <Text as="b" color="white">
            Blog
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
        <NavbarItem>
          <Link href="/conversationroom">
            <IoChatbubblesOutline
              size={25}
              className="text-white hover:cursor-pointer"
            />
          </Link>
        </NavbarItem>
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
                          โปรไฟล์
                          <DropdownMenuShortcut>
                            (หน้าโปรไฟล์)
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
                          (หน้าตั้งค่า)
                        </DropdownMenuShortcut>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href="/active">อื่นๆ</Link>
                        <DropdownMenuShortcut>
                          (หน้าตรวจสอบ)
                        </DropdownMenuShortcut>
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
