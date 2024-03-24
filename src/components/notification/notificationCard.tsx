'use client'
import { DELETENOTI, GetNotification } from '@/lib/actions/user.notification'
import { fetchUserProfileByID } from '@/lib/actions/user.post'
import { getCurrentUser } from '@/lib/session'
import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button, Link } from '@nextui-org/react'
import { Delete } from 'lucide-react'
import { useSession } from 'next-auth/react'
import useSWR from 'swr'
import { usePathname } from 'next/navigation'

const fetcher = (url: string) => fetch(url).then((res) => res.json())
export default function NotificationCard() {
  const path = usePathname() ?? ''

  const { data: notifications } = useSWR(`/api/notification`, fetcher)
  const { data: user } = useSession()
  if (!user?.user.id) return <></>

  const handleDelete = async (notificationId: string) =>
    await DELETENOTI(notificationId, path)

  return (
    <>
      <Dialog>
        <DialogTrigger>Notification</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle> การแจ้งเตือน </DialogTitle>
            <DialogDescription>
              {notifications ? (
                notifications.map((notification: any) => (
                  <div key={notification.id} className="flex">
                    <p>{notification.body}</p>
                    <Delete
                      className="
              relative left-4 overflow-visible 
              after:absolute after:inset-0 after:bg-background/40 
              after:transition after:!duration-500
              hover:-translate-y-2 hover:cursor-pointer hover:after:scale-150 hover:after:opacity-0
              "
                      onClick={() => handleDelete(notification.id)}
                      size={20}
                    />
                  </div>
                ))
              ) : (
                <p>ไม่มีการแจ้งเตือน</p>
              )}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  )
}
