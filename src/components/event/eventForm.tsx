'use client'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { POSTARTILE } from '@/lib/actions/user.article'
import { EVENTPOST } from '@/lib/actions/user.event'
import { useUploadThing } from '@/lib/uploadthing'
import { isBase64Image } from '@/lib/utils'
import { EventPost } from '@/lib/validations/Userpost'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogOverlay,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Select, SelectItem, Textarea } from '@nextui-org/react'
import { Loader2 } from 'lucide-react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React, { ChangeEvent, useState } from 'react'
import { useForm } from 'react-hook-form'
import { CiImageOn } from 'react-icons/ci'
import * as z from 'zod'
import { HASHTAG } from '../tag/hashtag'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

interface Props {
  accountId: string
  authUserId: string
  title: string
  eventContent: string
  eventImage: string
  tag: string
}

export default function EventForm({
  accountId,
  authUserId,
  title,
  eventContent,
  eventImage,
  tag,
}: Props) {
  const [files, setFiles] = useState<File[]>([])
  const [selectedImage, setSelectedImage] = useState<string>('')
  const { startUpload } = useUploadThing('media')
  const [isLoading, setIsloading] = useState(false)
  const [isText, setIsText] = useState('บันทึก')
  const [imageSelected, setImageSelected] = useState(false)
  
  const toast = useToast()

  const pathname = usePathname()
  const postArticle = useForm<z.infer<typeof EventPost>>({
    resolver: zodResolver(EventPost),
    defaultValues: {},
  })

  const onSubmitPost = async (values: z.infer<typeof EventPost>) => {
    setIsloading(true)

    const blob = values.eventImage
    if (blob) {
      const hasImageChange = isBase64Image(blob)
      if (hasImageChange) {
        const imgRes = await startUpload(files)
        if (imgRes && imgRes[0].url) {
          values.eventImage = imgRes[0].url
        }
      }
    }

    const UserPromise = EVENTPOST({
      authorId: authUserId,
      title: values.title ? String(values.title) : '',
      eventContent: values.eventContent ? String(values.eventContent) : '',
      eventImage: values.eventImage ? String(values.eventImage) : '',
      tag: values.tag ? String(values.tag) : '',
      path: pathname,
    })

    toast.promise(UserPromise, {
      success: { title: 'สำเร็จ!', description: 'สร้างกิจกรรมสำเร็จแล้ว' },
      error: { title: 'เกิดข้อผิดพลาด', description: 'เกิดข้อผิดพลาดบางอย่าง' },
      loading: { title: 'กำลังโพสต์ ...', description: 'โปรดรอสักครู่' },
    })

    setIsloading(false)
    setIsText('บันทึกสำเร็จ')
    console.log('NEW ARTICLE', POSTARTILE)
  }

  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (Value: string) => void
  ) => {
    e.preventDefault()
    const fileReader = new FileReader()

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      setFiles(Array.from(e.target.files))
      if (!file.type.includes('image')) return

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || ' '
        setSelectedImage(imageDataUrl)
        fieldChange(imageDataUrl)
        setImageSelected(true)
      }
      fileReader.readAsDataURL(file)
    }
  }
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef<HTMLInputElement>(null)

  return (
    <>
      {accountId === authUserId && (
        <div className=" ">
          <Button onClick={onOpen}>BLOG POST</Button>
          <AlertDialog
            motionPreset="slideInBottom"
            leastDestructiveRef={cancelRef}
            onClose={onClose}
            isOpen={isOpen}
            isCentered
          >
            <AlertDialogOverlay />
            <AlertDialogContent>
              <AlertDialogHeader>Discard Changes?</AlertDialogHeader>
              <AlertDialogCloseButton />
              <AlertDialogBody>
                <Form {...postArticle}>
                  <form
                    onSubmit={postArticle.handleSubmit(onSubmitPost)}
                    className="flex flex-col justify-center gap-10 text-center"
                  >
                    <FormField
                      control={postArticle.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem className="flex flex-col gap-3 ">
                          <FormLabel> TITLE </FormLabel>
                          <FormControl className=" border-dark-4 border">
                            <Input
                              className=" w-full resize-none rounded-lg bg-base-300 pl-3 pr-3 pt-3 ring-1 ring-black"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={postArticle.control}
                      name="eventContent"
                      render={({ field }) => (
                        <FormItem className="flex flex-col place-items-center items-center justify-center gap-3  ">
                          <FormLabel> CONTENT </FormLabel>

                          <FormControl className="">
                            <Textarea
                              labelPlacement="outside"
                              placeholder="แบ่งปันเรื่องราวดีๆของคุณเข้าสู่แพลตฟอร์ม!"
                              className="max-w-xs"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={postArticle.control}
                      name="tag"
                      render={({ field }) => (
                        <FormItem className="flex flex-col gap-3 ">
                          <FormLabel> HASHTAG </FormLabel>
                          <Select
                            items={HASHTAG}
                            label="Select Hashtag"
                            placeholder="HashTag For You"
                            {...field}
                            value={field.value}
                            onChange={(value) => field.onChange(value)}
                          >
                            {(HASHTAG) => (
                              <SelectItem key={HASHTAG.value}>
                                {HASHTAG.label}
                              </SelectItem>
                            )}
                          </Select>
                          <FormDescription>
                            คุณสามารถเลือกแท็กเพื่อโพสต์แสดงไปยังเนื้อหาที่เกี่ยวข้องได้
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={postArticle.control}
                      name="eventImage"
                      render={({ field }) => (
                        <FormItem className="flex w-full flex-col items-center  justify-center gap-2 ">
                          <FormLabel className="text-base-semibold text-light-2"></FormLabel>
                          <FormControl>
                            <label
                              htmlFor="file-upload"
                              className="flex w-12 cursor-pointer gap-2"
                            >
                              <input
                                id="file-upload"
                                type="file"
                                className="hidden w-5 "
                                accept="image/*"
                                placeholder="add post photo"
                                onChange={(e) => handleImage(e, field.onChange)}
                              />
                              <CiImageOn size={30} id="file-upload" />
                            </label>
                          </FormControl>
                          <Image
                            src={selectedImage}
                            alt="image post"
                            width={100}
                            height={100}
                            style={{
                              display: imageSelected ? 'block' : 'none',
                            }}
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="mt-3" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Button disabled>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Please wait
                          </Button>
                        </>
                      ) : (
                        isText
                      )}
                    </Button>
                  </form>
                </Form>
              </AlertDialogBody>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}
    </>
  )
}
