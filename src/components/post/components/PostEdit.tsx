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
import React, { useCallback, useEffect, useState } from 'react'
import { Button } from '../../ui/button'
import { CiEdit } from 'react-icons/ci'
import { Text } from '@chakra-ui/react'
import { Input, Textarea } from '@nextui-org/react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

type Data = {
  id: string
  content: string
}

const PostEdit: React.FC<Data> = ({ id, content }) => {
  const [StateText, setStateText] = useState('')

  const router = useRouter()
  useEffect(() => {
    setStateText(content)
  }, [content, setStateText])

  const handleEdit = useCallback(() => {
    axios
      .put(`/api/POSTEDIT`, {
        id,
        content: StateText,
      })
      .then((res) => {
        console.log(res.status)
        router.refresh()
      })
      .catch((err) => {
        console.log(err)
      })
  }, [StateText, id, router])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex items-center justify-start gap-3">
          <Text as="b">Edit</Text>
          <CiEdit size={25} className="hover:cursor-pointer" />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>แก้ไขโพสต์</DialogTitle>
          <DialogDescription>
            <div className="mt-5">
              <Textarea
                type="text"
                value={StateText}
                onChange={(e) => setStateText(e.target.value)}
              />
            </div>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button type="submit" className="bg-green-700" onClick={handleEdit}>
            บันทึกโพสต์
          </Button>
          <DialogClose asChild>
            <Button type="submit">ยกเลิก </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default PostEdit
