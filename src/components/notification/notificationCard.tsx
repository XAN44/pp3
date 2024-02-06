import { GetNotification } from '@/lib/actions/user.notification'
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
import { Link } from '@nextui-org/react'

export default async function NotificationCard() {
  const user = await getCurrentUser()
  if (!user?.id) return <></>

  const account = await fetchUserProfileByID(user.id)
  const notifications = await GetNotification(user?.id || '')

  return (
    <>
      <Dialog>
        <DialogTrigger>Notification</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle> การแจ้งเตือน </DialogTitle>
            <DialogDescription>
              <div>
                {notifications.length > 0 ? (
                  account?.map((acc) =>
                    acc.notifications.map((noi) => (
                      <div key={noi.id} className="">
                        <Link href={`/post/${noi.post?.id}`}>
                          <p>
                            ผู้ใช้ {noi.current} ได้แสดงความคิดเห็นในโพสต์
                            {noi.post?.content} ของคุณด้วยข้อความ {noi.body}
                          </p>
                        </Link>
                      </div>
                    ))
                  )
                ) : (
                  <p>Dont have notification</p>
                )}
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  )
}
