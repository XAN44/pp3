'use client' // Notification.tsx// Notification.tsximport { useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

type NotificationData = {
  body: string
  userId: string
  postId?: string
}

const Notification = ({ body, userId, postId }: NotificationData) => {
  const toast = useToast()
  const [notificationShown, setNotificationShown] = useState(true)

  useEffect(() => {
    // ใช้ useEffect เพื่อทำงานเมื่อ component ถูก mount
    if (!notificationShown) {
      toast({
        title: 'New Follower',
        description: body,
        status: 'info',
        duration: 5000,
        isClosable: true,
      })

      // ตั้งค่า state เพื่อไม่ให้แสดง Notification อีกครั้ง
      setNotificationShown(false)
    }
  }, [notificationShown, body, toast])

  return (
    <>
      <div className="">
        <h1>{body}</h1>
        <h1>{userId}</h1>
        <h1>{postId}</h1>
      </div>
    </>
  )
}

export default Notification
