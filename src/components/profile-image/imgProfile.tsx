'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import {
  Facebook,
  IG,
  tiktok,
  twitter,
  updateBio,
  updateImage,
  updateName,
  updateNickname,
} from '@/lib/actions/user.action'
import { useUploadThing } from '@/lib/uploadthing'
import { isBase64Image } from '@/lib/utils'
import {
  FOrmImage,
  UrlFacebookFORM,
  UrlIGFORM,
  UrlTiktokFORM,
  UrlTwiiterFORM,
  UserBio,
  UserName,
  UserNickName,
} from '@/lib/validations/user'
import { zodResolver } from '@hookform/resolvers/zod'
import { Avatar } from '@radix-ui/react-avatar'
import { Loader2 } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { ChangeEvent, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { AvatarImage } from '../ui/avatar'

interface Props {
  user: {
    image: string
    id: string
    bio: string
    nickname: string
    name: string
    facebookUrl: string
    igUrl: string
    tiktokUrl: string
    twitterUrl: string
  }
}
export function ImgProfilee({ user }: Props) {
  const pathname = usePathname()
  const { data: session, status, update } = useSession()
  const { startUpload } = useUploadThing('media')
  const [isLoading, setIsloading] = useState(false)
  const [isText, setIsText] = useState('บันทึก')

  const [files, setFiles] = useState<File[]>([])
  const { toast } = useToast()

  const imageform = useForm<z.infer<typeof FOrmImage>>({
    resolver: zodResolver(FOrmImage),
    defaultValues: {
      image: user?.image ? user.image : '',
    },
  })
  const bioForm = useForm<z.infer<typeof UserBio>>({
    resolver: zodResolver(UserBio),
    defaultValues: {
      bio: user?.bio ? user.bio : '',
    },
  })
  const nameForm = useForm<z.infer<typeof UserName>>({
    resolver: zodResolver(UserName),
    defaultValues: {
      name: user?.name ? user.name : ' ',
    },
  })
  const nicknameForm = useForm<z.infer<typeof UserNickName>>({
    resolver: zodResolver(UserNickName),
    defaultValues: {
      nickname: user?.nickname ? user.nickname : ' ',
    },
  })

  const UrlFacebook = useForm<z.infer<typeof UrlFacebookFORM>>({
    resolver: zodResolver(UrlFacebookFORM),
    defaultValues: {
      facebookUrl: user?.facebookUrl ? user.facebookUrl : ' ',
    },
  })

  const UrlIg = useForm<z.infer<typeof UrlIGFORM>>({
    resolver: zodResolver(UrlIGFORM),
    defaultValues: {
      igUrl: user?.igUrl ? user.igUrl : ' ',
    },
  })

  const UrlTwitter = useForm<z.infer<typeof UrlTwiiterFORM>>({
    resolver: zodResolver(UrlTwiiterFORM),
    defaultValues: {
      twitterUrl: user?.twitterUrl ? user.twitterUrl : ' ',
    },
  })

  const UrlTiktok = useForm<z.infer<typeof UrlTiktokFORM>>({
    resolver: zodResolver(UrlTiktokFORM),
    defaultValues: {
      tiktokUrl: user?.tiktokUrl ? user.tiktokUrl : ' ',
    },
  })
  const onSubmitImg = async (values: z.infer<typeof FOrmImage>) => {
    setIsloading(true)
    const blob = values.image

    const hasImageChanged = isBase64Image(blob)
    if (hasImageChanged) {
      const imgRes = await startUpload(files)

      if (imgRes && imgRes[0].url) {
        values.image = imgRes[0].url
      }
    }

    await updateImage({
      userId: user?.id,
      image: values.image,
      path: pathname,
    })
    toast({
      title: 'อัพเดทโปรไฟล์สําเร็จ',
      description: 'อัพเดทโปรไฟล์สําเร็จ',
      variant: 'default',
    })
    update({
      image: values.image,
    })
    setIsloading(false)
    setIsText('บันทึกสำเร็จ')
  }

  const onSubmitBio = async (values: z.infer<typeof UserBio>) => {
    await updateBio({
      userId: user?.id,
      path: pathname,
      bio: values.bio,
    })

    toast({
      title: 'อัพเดท BIO สำเร็จ',
      description: 'อัพเดทโปรไฟล์สําเร็จ',
      variant: 'default',
    })
    update({
      bio: values.bio,
    })
  }

  const onSubmitName = async (values: z.infer<typeof UserName>) => {
    await updateName({
      userId: user?.id,
      name: values.name,
      path: pathname,
    })
    toast({
      title: 'อัพเดท name สำเร็จ',
      description: 'อัพเดทโปรไฟล์สําเร็จ',
      variant: 'default',
    })
    update({
      name: values.name,
    })
  }

  const onCreateUrlFacebook = async (
    values: z.infer<typeof UrlFacebookFORM>
  ) => {
    await Facebook({
      userId: user?.id,
      Facebook: values.facebookUrl,
      path: pathname,
    })
    toast({
      description: 'Your message has been sent.',
    })
  }

  const onCreateUrlIg = async (values: z.infer<typeof UrlIGFORM>) => {
    await IG({
      userId: user?.id,
      IG: values.igUrl,
      path: pathname,
    })
    toast({
      description: 'Your message has been sent.',
    })
  }
  const onCreateUrlTwitter = async (values: z.infer<typeof UrlTwiiterFORM>) => {
    await twitter({
      userId: user?.id,
      Twitter: values.twitterUrl,
      path: pathname,
    })
    toast({
      description: 'Your message has been sent.',
    })
  }

  const onCreateUrlTiktok = async (values: z.infer<typeof UrlTiktokFORM>) => {
    await tiktok({
      userId: user?.id,
      Tiktok: values.tiktokUrl,
      path: pathname,
    })
    toast({
      description: 'Your message has been sent.',
    })
  }

  const onSubmitNickname = async (values: z.infer<typeof UserNickName>) => {
    await updateNickname({
      userId: user?.id,
      nickname: values.nickname,
      path: pathname,
    })
    toast({
      title: 'อัพเดท BIO สำเร็จ',
      description: 'อัพเดทโปรไฟล์สําเร็จ',
      variant: 'default',
    })
    update({
      nickname: values.nickname,
    })
  }

  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault()

    const fileReader = new FileReader()

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      setFiles(Array.from(e.target.files))

      if (!file.type.includes('image')) return

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || ''
        fieldChange(imageDataUrl)
      }

      fileReader.readAsDataURL(file)
    }
  }

  return (
    <>
      <Dialog>
        <DialogTrigger>ตั้งค่า</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle> ตั้งค่าโปรไฟล์ </DialogTitle>
            <DialogDescription>แก้ไขเนื้อหาของคุณได้</DialogDescription>
          </DialogHeader>

          <Dialog>
            <DialogTrigger>เปลี่ยรูปโปรไฟล์</DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>เปลี่ยนรูปโปรไฟล์</DialogTitle>
                <DialogDescription>เลือกรูปโปรไฟล์ของคุณ</DialogDescription>
              </DialogHeader>
              <Form {...imageform}>
                <form onSubmit={imageform.handleSubmit(onSubmitImg)}>
                  <FormField
                    control={imageform.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem className="">
                        <FormLabel
                          className="
                          mb-6
                          grid
                          justify-items-center
                        "
                        >
                          <Avatar className="w-40 ">
                            {field.value ? (
                              <AvatarImage
                                src={field.value}
                                alt="profile_icon"
                                className="object rounded-full object-contain"
                              />
                            ) : (
                              <AvatarImage
                                src="/defaultAvatar.png"
                                alt="profile_icon"
                                className="rounded-full object-contain"
                              />
                            )}
                          </Avatar>
                        </FormLabel>
                        <FormControl className="">
                          <Input
                            type="file"
                            accept="image/*"
                            placeholder="Add profile photo"
                            className="hidden"
                            onChange={(e) => handleImage(e, field.onChange)}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <DialogFooter>
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
                  </DialogFooter>
                  {/* เปลี่ยนชื่อเล่น */}
                </form>
              </Form>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger>เปลี่ยนชื่อ</DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>เปลี่ยนชื่อของคุณ</DialogTitle>
                <DialogDescription>ชื่อของคุณ</DialogDescription>
              </DialogHeader>
              <Form {...nameForm}>
                <form onSubmit={nameForm.handleSubmit(onSubmitName)}>
                  <FormField
                    control={nameForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm">ชื่อ</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="ชื่อ"
                            className="w-full"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="mt-3">
                    บันทึก
                  </Button>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger>เปลี่ยนชื่อเล่น</DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>เปลี่ยนชื่อเล่นของคุณ</DialogTitle>
                <DialogDescription>ชื่อเล่นของคุณ</DialogDescription>
              </DialogHeader>
              <Form {...nicknameForm}>
                <form onSubmit={nicknameForm.handleSubmit(onSubmitNickname)}>
                  <FormField
                    control={nicknameForm.control}
                    name="nickname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm">ชื่อเล่น</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="ชื่อเล่น"
                            className="w-full"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="mt-3">
                    บันทึก
                  </Button>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger>เปลี่ยนประวัติสังเขป</DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>เปลี่ยนชื่อประวัติสังเขปของคุณ</DialogTitle>
                <DialogDescription>ประวัติของคุณ</DialogDescription>
              </DialogHeader>
              <Form {...bioForm}>
                <form onSubmit={bioForm.handleSubmit(onSubmitBio)}>
                  <FormField
                    control={bioForm.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm">Bio</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Bio"
                            className="w-full"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="mt-3">
                    บันทึก
                  </Button>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger>เพิ่มช่องทางการติดต่อ</DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>ช่องทางติดต่อจากแพลตฟอร์มต่างๆ</DialogTitle>
                <DialogDescription>
                  คุณสามารถคัดลอกลิงค์โปรไฟล์ของตัวเองจากแพลตฟอร์มต่างๆมาใส่ในช่องกรอกข้อมูลด้านล่างนี้ได้
                  เพื่อความหลากหลายที่ให้ผู้อื่นสามารถรู้จักคุณได้มากขึน
                </DialogDescription>
              </DialogHeader>
              <Form {...UrlFacebook}>
                <form onSubmit={UrlFacebook.handleSubmit(onCreateUrlFacebook)}>
                  <FormField
                    control={UrlFacebook.control}
                    name="facebookUrl"
                    render={({ field }) => (
                      <>
                        <FormItem>
                          <FormLabel className="text-sm">FACEBOOK</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="FACEBOOK URL"
                              className="w-full"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      </>
                    )}
                  />
                  <Button type="submit" className="mt-3">
                    บันทึก
                  </Button>
                </form>
              </Form>
              <Form {...UrlIg}>
                <form onSubmit={UrlIg.handleSubmit(onCreateUrlIg)}>
                  <FormField
                    control={UrlIg.control}
                    name="igUrl"
                    render={({ field }) => (
                      <>
                        <FormItem>
                          <FormLabel className="text-sm">IG</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="IG URL"
                              className="w-full"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      </>
                    )}
                  />
                  <Button type="submit" className="mt-3">
                    บันทึก
                  </Button>
                </form>
              </Form>
              <Form {...UrlTiktok}>
                <form onSubmit={UrlTiktok.handleSubmit(onCreateUrlTiktok)}>
                  <FormField
                    control={UrlTiktok.control}
                    name="tiktokUrl"
                    render={({ field }) => (
                      <>
                        <FormItem>
                          <FormLabel className="text-sm">TIKTOK</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="TIKTOK URL"
                              className="w-full"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      </>
                    )}
                  />
                  <Button type="submit" className="mt-3">
                    บันทึก
                  </Button>
                </form>
              </Form>
              {/*  */}
              <Form {...UrlTwitter}>
                <form onSubmit={UrlTwitter.handleSubmit(onCreateUrlTwitter)}>
                  <FormField
                    control={UrlTwitter.control}
                    name="twitterUrl"
                    render={({ field }) => (
                      <>
                        <FormItem>
                          <FormLabel className="text-sm">TWITTER</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="TWITTER URL"
                              className="w-full"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      </>
                    )}
                  />
                  <Button type="submit" className="mt-3">
                    บันทึก
                  </Button>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </DialogContent>
      </Dialog>
    </>
  )
}
