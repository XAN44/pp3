'use client'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { userPost } from '@/lib/actions/user.post'
import { useUploadThing } from '@/lib/uploadthing'
import { isBase64Image } from '@/lib/utils'
import { TimeLinePost } from '@/lib/validations/Userpost'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React, { ChangeEvent, useState } from 'react'
import { useForm } from 'react-hook-form'
import { CiImageOn } from 'react-icons/ci'
import * as z from 'zod'
import { Button } from '../ui/button'
import { Textarea } from '@nextui-org/react'

interface Props {
  content: string
  imagePost: string
  accountId: string
  authUserId: string
}

export function PostForm({ content, imagePost, accountId, authUserId }: Props) {
  const [files, setFiles] = useState<File[]>([])
  const [selectedImage, setSelectedImage] = useState<string>('')
  const { startUpload } = useUploadThing('media')
  const [isLoading, setIsloading] = useState(false)
  const [isText, setIsText] = useState('บันทึก')
  const [imageSelected, setImageSelected] = useState(false)

  const pathname = usePathname()
  const PostTimeline = useForm<z.infer<typeof TimeLinePost>>({
    resolver: zodResolver(TimeLinePost),
    defaultValues: {},
  })

  const onSubmitPost = async (values: z.infer<typeof TimeLinePost>) => {
    setIsloading(true)

    const blob = values.imagePost
    if (blob) {
      const hasImageChange = isBase64Image(blob)
      if (hasImageChange) {
        const imgRes = await startUpload(files)
        if (imgRes && imgRes[0].url) {
          values.imagePost = imgRes[0].url
        }
      }
    }

    await userPost({
      authorid: authUserId,
      content: values.content ? String(values.content) : '',
      ImagePost: values.imagePost ? String(values.imagePost) : '',
      path: pathname,
    })
    setIsloading(false)
    setIsText('บันทึกสำเร็จ')
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
        <div className="">
          <Button onClick={onOpen}>Post Stroy</Button>

          <AlertDialog
            motionPreset="slideInBottom"
            leastDestructiveRef={cancelRef}
            onClose={onClose}
            isOpen={isOpen}
            isCentered
          >
            <AlertDialogOverlay />
            <AlertDialogContent>
              <AlertDialogHeader>
                แบ่งปันเรื่องราวดีๆของคุณเข้าสู่แพลตฟอร์ม
              </AlertDialogHeader>

              <AlertDialogCloseButton />
              <AlertDialogBody>
                <div className=" ">
                  <Form {...PostTimeline}>
                    <form
                      onSubmit={PostTimeline.handleSubmit(onSubmitPost)}
                      className="flex flex-col justify-center gap-10 text-center"
                    >
                      <FormField
                        control={PostTimeline.control}
                        name="content"
                        render={({ field }) => (
                          <FormItem className="flex flex-col place-items-center items-center justify-center gap-3 ">
                            <FormLabel> CONTENT </FormLabel>

                            <FormControl className=" ">
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
                        control={PostTimeline.control}
                        name="imagePost"
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
                                  onChange={(e) =>
                                    handleImage(e, field.onChange)
                                  }
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
                      <Button
                        type="submit"
                        className="mt-3"
                        disabled={isLoading}
                      >
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
                </div>
              </AlertDialogBody>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}
    </>
  )
}
