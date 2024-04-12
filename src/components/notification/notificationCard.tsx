'use client'
import { DELETENOTI, GetNotification, getNotificationLike } from '@/lib/actions/user.notification'
import { fetchUserProfileByID } from '@/lib/actions/user.post'
import { getCurrentUser } from '@/lib/session'
import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge, Button, Link } from '@nextui-org/react'
import { Delete, Heart } from 'lucide-react'
import { useSession } from 'next-auth/react'
import useSWR from 'swr'
import { usePathname } from 'next/navigation'
import { AiFillNotification } from 'react-icons/ai'
import { UseStoreNotification } from '../store/store'
import axios from 'axios'


const fetcher = (url: string) => fetch(url).then((res) => res.json())





export default function NotificationCard() {
  const path = usePathname() ?? ''

  const { data: notifications } = useSWR(`/api/notification`, fetcher)

  const { data: noi } = useSWR(`/api/countnoi`, fetcher)


  const { data: user } = useSession()


  const { notificationCount, notificationIncrement, notificationRead, statusRead } = UseStoreNotification((state) => ({
    notificationCount: state.notificationCount,
    notificationIncrement: state.notificationIncrement,
    notificationRead: state.notificationRead,
    statusRead: state.statusRead
  }))

  useEffect(() => {
    if (noi) {
      notificationIncrement(noi.length)

    }
  }, [ noi, notificationIncrement ])
  const handleRead = async () => {
    try {
      const response = await axios.post('/api/notification');
      notificationRead()
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการส่งคำขอ:',);
    }
  }

  if (!user?.user.id) return <></>


  const handleDelete = async (notificationId: string) =>
    await DELETENOTI(notificationId, path)




  return (
    <>
      <Dialog >
        <DialogTrigger >
          <button onClick={handleRead}>
            <Badge content={notificationCount} color="default" variant="faded">

              <div
                className="hover:	hover:cursor-pointer"
              >
                <AiFillNotification />
              </div>
            </Badge>
          </button>
        </DialogTrigger>
        <DialogContent className='h-full overflow-auto'>
          <DialogHeader>
            <DialogTitle> การแจ้งเตือน </DialogTitle>
            <DialogDescription>

              <Tabs defaultValue="Post" className='flex flex-col' >
                <TabsList className=''>
                  <TabsTrigger value="Post"> โพสต์</TabsTrigger>
                  <TabsTrigger value="Blog"> บทความ</TabsTrigger>
                  <TabsTrigger value="event"> กิจกรรม</TabsTrigger>
                </TabsList>
                <TabsContent value="Post">

                  {notifications.map((notification: any) => (
                    <>
                      <div className="flex items-center justify-center ">

                        {notification?.current === notification?.postId && (
                          <>
                            <Link href={`/post/${notification?.postId}`}>
                              <p>{notification.body}</p>
                            </Link>

                            <Delete
                              className="
                                relative left-4 overflow-visible 
                                after:absolute after:inset-0 after:bg-background/40 
                                after:transition after:!duration-500
                                hover:cursor-pointer 
                                hover:after:scale-150 hover:after:opacity-0
                                "
                              onClick={() => handleDelete(notification.id)}
                              size={20}
                            />


                          </>
                        )}
                      </div>

                    </>
                  ))}
                </TabsContent>
                <TabsContent value='Blog'>
                  {notifications.map((notification: any) => (
                    <>
                      <div className="flex items-center justify-center">
                        {notification?.current === notification?.articleId && (
                          <>
                            <Link href={`/event/${notification?.articleId}`}>
                              <p>{notification.body}</p>
                            </Link>

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


                          </>
                        )}
                      </div>
                    </>
                  ))}
                </TabsContent>
                <TabsContent value='event'>

                  {notifications.map((notification: any) => (
                    <>
                      <div className="flex items-center justify-center">
                        {notification?.current === notification?.eventId && (
                          <>
                            <Link href={`/event/${notification?.eventId}`}>
                              <p>{notification.body}</p>
                            </Link>

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


                          </>
                        )}

                      </div >
                    </>
                  ))}
                </TabsContent>
              </Tabs>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog >
    </>
  )
}
