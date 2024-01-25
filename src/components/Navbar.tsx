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
import { Topbar } from './topbar/topbar'
import { fetchUserProfileByID } from '@/lib/actions/user.post'

const Navbar = async () => {
  const user = await getCurrentUser()
  const account = await fetchUserProfileByID(user?.id || '')

  return (
    <>
      {account?.map((ac) => (
        <Topbar
          key={ac.id}
          params={{
            id: ac?.id ?? '',
          }}
        />
      ))}
    </>
  )
}

export default Navbar
