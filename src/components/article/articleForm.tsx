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
import { useUploadThing } from '@/lib/uploadthing'
import { isBase64Image } from '@/lib/utils'
import { ArticlePost } from '@/lib/validations/Userpost'
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
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { CiImageOn } from 'react-icons/ci'
import * as z from 'zod'
import { HASHTAG } from '../tag/hashtag'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css';

const DynamicQuill = dynamic(() => import('react-quill'), { ssr: false })




interface Props {
  accountId: string
  authUserId: string
}

export default function ArticleForm({
  accountId,
  authUserId,
}: Props) {
  const [ files, setFiles ] = useState<File[]>([])
  const [ selectedImage, setSelectedImage ] = useState<string>('')
  const { startUpload } = useUploadThing('media')
  const [ isLoading, setIsloading ] = useState(false)
  const [ isText, setIsText ] = useState('บันทึก')
  const [ imageSelected, setImageSelected ] = useState(false)
  const toast = useToast()

  const [ contents, setContents ] = useState('');


  const pathname = usePathname()
  const postArticle = useForm<z.infer<typeof ArticlePost>>({
    resolver: zodResolver(ArticlePost),
    defaultValues: {},
  })

  const quillModules = {
    toolbar: [
      [ { header: [ 1, 2, 3, false ] } ],
      [ 'bold', 'italic', 'underline', 'strike', 'blockquote' ],
      [ { list: 'ordered' }, { list: 'bullet' } ],
      [ 'link', ],
      [ { align: [] } ],
      [ { color: [] } ],
      [ 'code-block' ],
      [ 'clean' ],
    ],
  };


  const quillFormats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
    'align',
    'color',
    'code-block',
  ];

  const onSubmitPost = async (values: z.infer<typeof ArticlePost>) => {
    setIsloading(true)

    const blob = values.articleImage
    if (blob) {
      const hasImageChange = isBase64Image(blob)
      if (hasImageChange) {
        const imgRes = await startUpload(files)
        if (imgRes && imgRes[ 0 ].url) {
          values.articleImage = imgRes[ 0 ].url
        }
      }
    }

    const UserPromise = POSTARTILE({
      authorId: authUserId,
      title: values.title ? String(values.title) : '',
      articleContent: values.articleContent
        ? String(values.articleContent)
        : '',
      ArticleImage: values.articleImage ? String(values.articleImage) : '',
      tag: values.tag ? String(values.tag) : '',
      path: pathname,
    })

    toast.promise(UserPromise, {
      success: { title: 'สำเร็จ!', description: 'สร้างบล็อกสำเร็จแล้ว' },
      error: { title: 'เกิดข้อผิดพลาด', description: 'เกิดข้อผิดพลาดบางอย่าง' },
      loading: { title: 'กำลังโพสต์ ...', description: 'โปรดรอสักครู่' },
    })

    postArticle.reset()

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
      const file = e.target.files[ 0 ]
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
          <Button onClick={onOpen}>Create Blog</Button>
          <AlertDialog
            motionPreset="slideInBottom"
            leastDestructiveRef={cancelRef}
            onClose={onClose}
            isOpen={isOpen}
            isCentered
          >
            <AlertDialogOverlay />
            <AlertDialogContent>
              <AlertDialogHeader>สร้างบล็อกของคุณ !</AlertDialogHeader>
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
                          <FormLabel> ตั้งชื่อ Blog </FormLabel>
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
                      name="articleImage"
                      render={({ field }) => (
                        <FormItem className="flex w-full flex-col items-center  justify-center gap-2 ">
                          <FormLabel className="text-base-semibold text-light-2">
                            เลือกรูปภาพของคุณ
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

                    <FormField
                      control={postArticle.control}
                      name="tag"
                      render={({ field }) => (
                        <FormItem className="flex flex-col gap-3 ">
                          <FormLabel> เลือกหมวดหมู่ </FormLabel>
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
                      name="articleContent"
                      render={({ field }) => (
                        <FormItem className="flex flex-col place-items-center items-center justify-center gap-3  ">
                          <FormLabel> เริ่มเขียน Blog ของคุณ </FormLabel>

                          <FormControl className="">

                            <DynamicQuill
                              {...field}
                              modules={quillModules}
                              formats={quillFormats}
                              placeholder='เริ่มเขียนบล็อกของคุณที่นี่'
                              theme='snow'
                            />
                          </FormControl>
                          <FormMessage />
                          <span dangerouslySetInnerHTML={{ __html: postArticle.getValues('articleContent') || '' }} />
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
