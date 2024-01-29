'use client'

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react'
import Link from 'next/link'
import React from 'react'

interface notification {
  id: string
  body: string
  userId: string
  currentId: string
  current: string
}

export default function NotificationCard({
  id,
  body,
  userId,
  currentId,
  current,
}: notification) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [backdrop, setBackdrop] = React.useState('opaque')

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <Button className="capitalize" onPress={onOpen}>
          Notification
        </Button>
      </div>
      <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <div>
              <ModalHeader className="flex flex-col gap-1">
                การแจ้งเตือนที่คุณได้รับ
              </ModalHeader>
              <ModalBody>
                {body ? (
                  <>
                    <Link href={`/post/${id}`}>
                      <div className="">
                        <p>{body}</p>
                      </div>
                    </Link>
                  </>
                ) : (
                  <>
                    <p>Dont have noti</p>
                  </>
                )}
              </ModalBody>
              <ModalFooter>อย่าลืมตรวจสอบการแจ้งเตือนของคุณละ</ModalFooter>
            </div>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
