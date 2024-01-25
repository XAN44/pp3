'use client'

import { Notification } from '@/lib/actions/user.notification'
import { useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from '@nextui-org/react'
import { getCurrentUser } from '@/lib/session'

interface Notidata {
  id: string
  currenUser: string
  notificationByUser: string
  body: string
  post: string
}

const NotificationPage = ({
  notificationByUser,
  body,
  post,
  id,
  currenUser,
}: Notidata) => {
  const toast = useToast()
  useEffect(() => {
    if (body) {
      toast({
        title: 'New comment',
        position: 'bottom',
        status: 'success',
        description: `คุณได้รับการแจ้งเตือนจากผู้ใช้ ${notificationByUser} จากโพสต์นี้  ${post} ของคุณ `,
        duration: 9000,
        isClosable: true,
      })
    }

    return () => {}
  }, [body, notificationByUser, post, toast])

  return (
    <>
      <div className="">
        <h1>Noti By User</h1>
        {notificationByUser}

        <h1>current User</h1>
        {currenUser}

        <h1>BODY</h1>
        {body}
      </div>
    </>
  )
}

export default NotificationPage
