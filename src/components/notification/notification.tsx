'use client'

import { useToast } from '@chakra-ui/react'
import { useEffect } from 'react'

interface Notidata {
  noti: {
    id: string
    currenUser: string
    notificationByUser: string
    body: string
    post: string
  } | null
}

const NotificationPage = ({ noti }: Notidata) => {
  const toast = useToast()
  useEffect(() => {
    if (noti) {
      toast({
        title: 'New comment',
        position: 'bottom',
        status: 'success',
        description: `คุณได้รับการแจ้งเตือนจากผู้ใช้ ${noti.notificationByUser} จากโพสต์นี้  ${noti.post} ของคุณ `,
        duration: 9000,
        isClosable: true,
      })
    }

    return () => {}
  }, [noti, toast])

  return (
    <>
      <div className="">
        <h1>TODSOB</h1>
      </div>
    </>
  )
}

export default NotificationPage
