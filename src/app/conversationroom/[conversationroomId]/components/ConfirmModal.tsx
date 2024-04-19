'use client'

import React, { useCallback, useState } from 'react'
import { Dialog } from '@headlessui/react'
import { FiAlertTriangle } from 'react-icons/fi'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import useRoom from '@/app/hooks/useRoom'
import { toast } from 'react-hot-toast'
import Modals from '@/components/sidebar/modals'
import { Button } from '@nextui-org/react'

interface ConfirmModalProps {
  isOpen?: boolean
  onClose: () => void
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter()
  const { conversationroomId } = useRoom()
  const [isLoading, setIsLoading] = useState(false)

  const onDelete = useCallback(() => {
    setIsLoading(true)

    axios
      .delete(`/api/conversationroom/${conversationroomId}`)
      .then(() => {
        onClose()
        router.push('/conversationroom')
        router.refresh()
      })
      .catch(() => toast.error('Something went wrong!'))
      .finally(() => setIsLoading(false))
  }, [router, conversationroomId, onClose])

  return (
    <Modals isOpen={isOpen} onClose={onClose}>
      <div className="sm:flex sm:items-start">
        <div
          className="
            mx-auto 
            flex 
            h-12 
            w-12 
            flex-shrink-0 
            items-center 
            justify-center 
            rounded-full 
            bg-red-100 
            sm:mx-0 
            sm:h-10 
            sm:w-10
          "
        >
          <FiAlertTriangle
            className="h-6 w-6 text-red-600"
            aria-hidden="true"
          />
        </div>
        <div
          className="
            mt-3 
            text-center 
            sm:ml-4 
            sm:mt-0 
            sm:text-left
          "
        >
          <Dialog.Title
            as="h3"
            className="text-base font-semibold leading-6 text-gray-900"
          >
            ลบการสนทนา
          </Dialog.Title>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              คุณต้องการที่จะลบการสนทนาหรือไม่ ?
              หากลบแล้วจะไม่สามารถย้อนกลับไปแก้ไขได้อีก
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5 flex space-x-3 sm:mt-4 sm:flex sm:flex-row-reverse">
        <Button disabled={isLoading} onClick={onDelete} color="danger">
          ลบ
        </Button>
        <Button disabled={isLoading} onClick={onClose}>
          ยกเลิก
        </Button>
      </div>
    </Modals>
  )
}

export default ConfirmModal
