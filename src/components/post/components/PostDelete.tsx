'use client'
import { HiEllipsisVertical } from 'react-icons/hi2'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import React, { useCallback } from 'react'
import { Button } from '../../ui/button'
import { Label } from '../../ui/label'
import { Input } from '../../ui/input'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import PostEdit from './PostEdit'
import { Text } from '@chakra-ui/react'
import { MdDeleteForever } from 'react-icons/md'

interface Props {
  id: string
}

export default function PostDelete({ id }: Props) {
  const router = useRouter()
  const handleDelete = useCallback(() => {
    axios
      .delete(`/api/POSTDELETE`, {
        data: { id },
      })
      .then(() => {
        router.refresh()
      })
      .catch((error) => console.log(error))
  }, [id, router])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex">
          <Text as="b"> Delete</Text>
          <MdDeleteForever size={25} className="hover:cursor-pointer" />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>ตัวเลือกสำหรับโพสต์</DialogTitle>
          <DialogDescription>
            <Text>
              หากคุณทำการลบโพสต์ เนื้อหานี้ของคุณจะศูนย์หายจากเว็บไซต์อย่างถาวร
              คุณต้องการที่จะลบโพสต์หรือไม่
            </Text>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="submit"
              onClick={handleDelete}
              variant="destructive"
              asChild
            >
              ลบโพสต์
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="submit">ยกเลิก </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
