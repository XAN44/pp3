'use client'

import {
  DELETENOTI,
  GetNotification,
  getNotificationLike,
} from '@/lib/actions/user.notification'
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
import { Avatar, Badge, Button, Link } from '@nextui-org/react'
import { Delete, Heart } from 'lucide-react'
import { useSession } from 'next-auth/react'
import useSWR from 'swr'
import { usePathname } from 'next/navigation'
import { AiFillNotification } from 'react-icons/ai'
import { UseStoreNotification } from '../store/store'
import axios from 'axios'
import { format, formatDistanceToNow } from 'date-fns'
import { th } from 'date-fns/locale' // import locale for Thai language
import { User } from '@prisma/client'
import { IoNotifications } from 'react-icons/io5'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

interface user {
  userId: string
}

export default function NotificationCard({ userId }: user) {
  const path = usePathname() ?? ''

  const { data: notifications } = useSWR(`/api/notification`, fetcher)

  const { data: noi } = useSWR(`/api/countnoi`, fetcher)

  const { data: user } = useSession()

  const {
    notificationCount,
    notificationIncrement,

    notificationRead,
    statusRead,
  } = UseStoreNotification((state) => ({
    notificationCount: state.notificationCount,
    notificationIncrement: state.notificationIncrement,
    notificationRead: state.notificationRead,
    statusRead: state.statusRead,
  }))

  useEffect(() => {
    if (noi) {
      notificationIncrement(noi.length)
    }
  }, [noi, notificationIncrement])
  const handleRead = async () => {
    try {
      const response = await axios.post('/api/notification')
      notificationRead()
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการส่งคำขอ:')
    }
  }

  if (!user?.user.id) return <></>

  const handleDelete = async (notificationId: string) =>
    await DELETENOTI(notificationId, path)

  return (
    <>
      <Dialog>
        <DialogTrigger className="items-center justify-center">
          <button onClick={handleRead}>
            <Badge content={notificationCount} color="default" variant="faded">
              <div className="hover:	hover:cursor-pointer">
                <IoNotifications
                  className="
                text-white"
                />
              </div>
            </Badge>
          </button>
        </DialogTrigger>
        <DialogContent className="h-full overflow-auto">
          <DialogHeader>
            <DialogTitle> การแจ้งเตือน </DialogTitle>
            <DialogDescription>
              <Tabs defaultValue="Post" className="flex flex-col">
                <TabsList className="">
                  <TabsTrigger value="Post"> โพสต์</TabsTrigger>
                  <TabsTrigger value="Blog"> บทความ</TabsTrigger>
                  <TabsTrigger value="event"> กิจกรรม</TabsTrigger>
                  <TabsTrigger value="other"> อื่นๆ</TabsTrigger>
                </TabsList>
                <TabsContent value="Post">
                  {notifications.map((notification: any ) => (
                    <div key='1'>
                      <div className="flex items-center justify-start ">
                        {notification?.postId && (
                          <>
                            <Link href={`/post/${notification?.postId}`}>
                              <div className="grid">
                                <p>{notification.body}</p>
                                <p className="text-green-600">
                                  {' '}
                                  เมื่อ{' '}
                                  {formatDistanceToNow(
                                    new Date(notification?.createAt),
                                    {
                                      addSuffix: true,
                                      locale: th,
                                    }
                                  )}{' '}
                                </p>
                              </div>
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
                    </div>
                  ))}
                </TabsContent>
                <TabsContent value="Blog">
                  {notifications.map((notification: any) => (
                    <div key='2'>
                      <div className="flex items-center justify-start ">
                        {notification?.articleId && (
                          <>
                            <Link href={`/event/${notification?.articleId}`}>
                              <div className="grid">
                                <p>{notification.body}</p>
                                <p className="text-green-600">
                                  {' '}
                                  เมื่อ{' '}
                                  {formatDistanceToNow(
                                    new Date(notification?.createAt),
                                    {
                                      addSuffix: true,
                                      locale: th,
                                    }
                                  )}{' '}
                                </p>
                              </div>
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
                    </div>
                  ))}
                </TabsContent>
                <TabsContent value="event">
                  {notifications.map((notification: any) => (
                    <div key='3'>
                      <div className="flex items-center justify-start ">
                        {notification?.eventId && (
                          <>
                            <Link href={`/event/${notification?.eventId}`}>
                              <div className="grid">
                                <p>{notification.body}</p>
                                <p className="text-green-600">
                                  {' '}
                                  เมื่อ{' '}
                                  {formatDistanceToNow(
                                    new Date(notification?.createAt),
                                    {
                                      addSuffix: true,
                                      locale: th,
                                    }
                                  )}{' '}
                                </p>
                              </div>
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
                    </div>
                  ))}
                </TabsContent>
                <TabsContent value="other">
                  {notifications.map((notification: any) => (
                    <div key='4'>
                      <div className="flex items-center justify-start ">
                        {notification?.followsFollowingId && (
                          <>
                            <Link href={`/event/${notification?.eventId}`}>
                              <div className="grid">
                                <p>{notification.body}</p>
                                <p className="text-green-600">
                                  เมื่อ
                                  {formatDistanceToNow(
                                    new Date(notification?.createAt),
                                    {
                                      addSuffix: true,
                                      locale: th,
                                    }
                                  )}
                                </p>
                              </div>
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
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  )
}
