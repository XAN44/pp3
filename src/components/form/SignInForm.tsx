'use client'

import { useToast } from '@/components/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import GoogleSignInButton from '../GoogleSignInButton'
import { Button } from '../ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import { useSession } from 'next-auth/react'
import { Image } from '@nextui-org/react'
import { Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import useImageForm from './imageIndex'
import { Domine } from 'next/font/google'
import { motion } from 'framer-motion'
const FormSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must have than 8 characters'),
})

const SignInForm = () => {
  const router = useRouter()
  const { toast } = useToast()

  const { data: session, status } = useSession()

  useEffect(() => {
    if (status === 'authenticated') {
      router.push(`/home`)
    }
  }, [router, status])

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const signInData = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false,
    })
    if (signInData?.error) {
      toast({
        title: 'Error',
        description: 'เกิดปัญหาจากข้อผิดพลาดบางอย่าง',
        variant: 'destructive',
      })
    } else {
      router.refresh()
      router.push(`/home`)
    }
  }

  const useImage = useImageForm()
  const [ImageIndex, setImageIndex] = useState(0)
  const [dotImage, setDotImage] = useState(0)
  const handleNextImage = () => {
    if (ImageIndex < useImage.length - 1) {
      setImageIndex(ImageIndex + 1)
      setDotImage(dotImage + 1)
    }
  }

  const handlePreviusImage = () => {
    if (ImageIndex > 0) {
      setImageIndex(ImageIndex - 1)
      setDotImage(dotImage - 1)
    }
  }
  return (
    <>
      <div className="relative max-h-full max-w-full p-32 ">
        <div className="flex gap-3 space-x-3">
          <div className="basis-3/4">
            <div className="h-full w-full">
              <div>
                <Image src={useImage[ImageIndex].img as string} alt="" />
              </div>
              <div className="mt-4 flex items-center justify-center gap-10 space-x-10">
                <Button onClick={handlePreviusImage}>{'<'}</Button>
                {useImage.map((m, index) => (
                  <div
                    key={index}
                    className={`h-4 w-4 rounded-full ${
                      index === dotImage ? 'bg-black' : 'bg-gray-300'
                    }`}
                  />
                ))}
                <Button onClick={handleNextImage}>{'>'}</Button>
              </div>
            </div>
          </div>
          <div className="basis-1/2">
            <div className="flex h-full w-full flex-col items-center justify-center">
              <Text as="b" fontSize="larger">
                Login your account
              </Text>
              <div className="mt-6 w-1/3">
                <GoogleSignInButton>Coninue with Google</GoogleSignInButton>
              </div>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="  w-1/2 "
                >
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="mail@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Enter your password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button className="mt-6 w-full " type="submit">
                    Sign in
                  </Button>
                </form>

                <p className="m-3 mt-2 text-center text-sm text-gray-600">
                  If you don&apos;t have an account, please&nbsp;
                  <Link
                    className="text-blue-500 hover:underline"
                    href="/sign-up"
                  >
                    Sign up
                  </Link>
                </p>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignInForm
