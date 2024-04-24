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
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Avatar,
  Badge,
  Chip,
  Image,
  Input,
  Select,
  SelectItem,
  SelectedItems,
  Textarea,
} from '@nextui-org/react'
import { Loader2 } from 'lucide-react'
import { redirect, usePathname } from 'next/navigation'
import React, { ChangeEvent, useState } from 'react'
import { useForm } from 'react-hook-form'
import { CiImageOn } from 'react-icons/ci'
import * as z from 'zod'
import { HASHTAG } from '../tag/hashtag'
import { users } from '../tag/data1'

import { Button } from '../ui/button'
import useSWR from 'swr'
interface Props {
  accountId: string
  authUserId: string
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

type Blog = {
  id: string
  title: string
  ArticleImage: string
  tag: string
}

export default function EventForm({ accountId, authUserId }: Props) {
  const { data: blogInEvent } = useSWR<Blog[]>(
    `/api/blogInEvent?authUserId=${authUserId}`,
    fetcher
  )

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
    defaultValues: {
      title: '',
      blogInArticle: '',
      eventImage: '',
      eventContent: '',
      eventstartTime: '',
      eventlocation: '',
      eventparticipants: '',
      eventcreator: '',
      eventmore: '',
      tag: '',
    },
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
      eventstartTime: values.eventstartTime
        ? String(values.eventstartTime)
        : '',
      eventlocation: values.eventlocation ? String(values.eventlocation) : '',
      eventparticipants: values.eventparticipants
        ? String(values.eventparticipants)
        : '',
      eventcreator: values.eventcreator ? String(values.eventcreator) : '',
      eventmore: values.eventmore ? String(values.eventmore) : '',
      blogInArticle: values.blogInArticle ? String(values.blogInArticle) : '',
      tag: values.tag ? String(values.tag) : '',
      path: pathname || '',
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
          <Button onClick={onOpen}>Create Event</Button>
          <AlertDialog
            motionPreset="slideInBottom"
            leastDestructiveRef={cancelRef}
            onClose={onClose}
            isOpen={isOpen}
            isCentered
          >
            <AlertDialogOverlay />
            <AlertDialogContent>
              <AlertDialogHeader>สร้างกิจกรรม !</AlertDialogHeader>
              <AlertDialogCloseButton />
              <AlertDialogBody>
                <Form {...postArticle}>
                  <form
                    onSubmit={postArticle.handleSubmit(onSubmitPost)}
                    className="flex flex-col justify-center text-center"
                  >
                    <FormField
                      control={postArticle.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem className="flex flex-col gap-3 ">
                          <FormControl>
                            <Input
                              type="text"
                              label="ชื่อกิจกรรม"
                              labelPlacement="inside"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={postArticle.control}
                      name="eventlocation"
                      render={({ field }) => (
                        <FormItem className="mt-3   items-center justify-center gap-3">
                          <FormControl>
                            <Input
                              type="text"
                              label="สถานที่จัดกิจกรรม"
                              labelPlacement="inside"
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
                        <FormItem className="mt-3 items-center justify-center gap-3 ">
                          <FormControl className="">
                            <Textarea
                              type="text"
                              label="เนื้อหากิจกรรม"
                              labelPlacement="inside"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={postArticle.control}
                      name="eventcreator"
                      render={({ field }) => (
                        <FormItem className="mt-3 items-center justify-center gap-3 ">
                          <FormControl className="">
                            <Input
                              type="text"
                              label="ผู้สร้างกิจกรรม"
                              labelPlacement="inside"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={postArticle.control}
                      name="eventmore"
                      render={({ field }) => (
                        <FormItem className="mt-3 items-center justify-center gap-3 ">
                          <FormControl className="">
                            <Textarea
                              type="text"
                              label="เพิ่มเติม"
                              labelPlacement="inside"
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
                        <FormItem className="mt-3 flex flex-col">
                          <Select
                            items={HASHTAG}
                            label="หมวดหมู่"
                            placeholder="เลือกหมวดหมู่ของกิจกรรม"
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

                    <div className="mt-3 flex">
                      <FormField
                        control={postArticle.control}
                        name="eventstartTime"
                        render={({ field }) => (
                          <FormItem className="flex flex-col items-center justify-center gap-3 ">
                            <FormControl className=" w-48 ">
                              <Input type="datetime-local" {...field} />
                            </FormControl>
                            <FormDescription>
                              เลือกวันที่เริ่มต้นกิจกรรม
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={postArticle.control}
                        name="eventparticipants"
                        render={({ field }) => (
                          <FormItem className="flex w-56 flex-col items-center justify-center gap-3">
                            <FormControl className=" w-48  ">
                              <Input
                                type="text"
                                label="จำนวนผู้เข้าร่วม"
                                labelPlacement="inside"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              ระบุจำนวนหรือระบุว่าไม่จำกัด
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    {/* testselect */}
                    <FormField
                      control={postArticle.control}
                      name="blogInArticle"
                      render={({ field }) => (
                        <FormItem className="flex flex-col  items-center justify-center gap-3">
                          <label className="form-control w-full">
                            <select
                              {...field}
                              value={field.value}
                              onChange={(value) => field.onChange(value)}
                              className="select select-bordered select-ghost w-full max-w-xs"
                            >
                              <option disabled selected>
                                เลือกบทความของคุณ
                              </option>
                              {blogInEvent?.map((d, index) => (
                                <option key={index} value={d.id}>
                                  <div className="flex">
                                    <Avatar src={d.ArticleImage} alt="img" />
                                    <div className="">{d.title}</div>
                                  </div>
                                </option>
                              ))}
                            </select>
                          </label>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* testselect */}
                    <FormField
                      control={postArticle.control}
                      name="eventImage"
                      render={({ field }) => (
                        <FormItem className="mt-3 flex w-full flex-col items-center  justify-center gap-2 ">
                          <FormLabel className="text-base-semibold text-light-2">
                            อัพโหลดภาพกิจกรรม
                          </FormLabel>
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
