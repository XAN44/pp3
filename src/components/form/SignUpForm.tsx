'use client'

import { zodResolver } from '@hookform/resolvers/zod'
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
import { toast } from '../ui/use-toast'
import { Text } from '@chakra-ui/react'
import { useState } from 'react'
import useImageForm from './imageIndex'
import { Image } from '@nextui-org/react'

const FormSchema = z
  .object({
    name: z.string().min(1, 'Username is required').max(100),
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must have than 8 characters'),
    confirmPassword: z.string().min(1, 'Password confirmation is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Password do not match',
  })

const SignUpForm = () => {
  const router = useRouter()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const response = await fetch('/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json ',
      },
      body: JSON.stringify({
        name: values.name,
        email: values.email,
        password: values.password,
      }),
    })

    if (response.ok) {
      router.push('/sign-in')
    } else {
      toast({
        title: 'Error',
        description: 'เกิดปัญหาจากข้อผิดพลาดบางอย่าง',
        variant: 'destructive',
      })
    }
  }

  const useImage = useImageForm()
  const [imageIndex, setImageIndex] = useState(0)
  const [dotImage, setDotimage] = useState(0)
  const handleNext = () => {
    if (imageIndex < useImage.length - 1) {
      setImageIndex(imageIndex + 1)
      setDotimage(imageIndex + 1)
    }
  }

  const handlePrevius = () => {
    if (imageIndex > -0) {
      setImageIndex(imageIndex - 1)
      setDotimage(imageIndex - 1)
    }
  }

  return (
    <>
      <div className="relative max-h-full max-w-full p-32 ">
        <div className="flex gap-3 space-x-3">
          <div className="basis-3/4">
            <div className="h-full w-full">
              <div>
                <Image src={useImage[imageIndex].img as string} alt="" />
              </div>
              <div className="mt-4 flex items-center justify-center gap-10 space-x-10">
                <Button onClick={handlePrevius}>{'<'}</Button>
                {useImage.map((m, index) => (
                  <div
                    key={index}
                    className={`h-4 w-4 rounded-full ${
                      index === dotImage ? 'bg-black' : 'bg-gray-300'
                    }`}
                  />
                ))}
                <Button onClick={handleNext}>{'>'}</Button>
              </div>
            </div>
          </div>
          <div className="basis-1/2">
            <div className="flex h-full w-full flex-col items-center justify-center">
              <Text as="b" fontSize="larger">
                สมัครบัญชีของคุณ
              </Text>
              <Text as="p"> โปรดกรอกรายละเอียดด้านล่าง</Text>
              <div className="mt-6 w-1/3">
                <GoogleSignInButton>Coninue with Google</GoogleSignInButton>
              </div>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="mt-6 w-1/2"
                >
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input placeholder="johndoe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
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
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Re-Enter your password</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Re-Enter your password"
                              type="password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button className="mt-6 w-full" type="submit">
                    Sign up
                  </Button>
                </form>
                <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
                  or
                </div>
                <p className="mt-2 text-center text-sm text-gray-600">
                  If you don&apos;t have an account, please&nbsp;
                  <Link
                    className="text-blue-500 hover:underline"
                    href="/sign-in"
                  >
                    Sign in
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

export default SignUpForm
