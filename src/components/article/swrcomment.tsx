'use client'
import { Container, Flex, Grid } from '@radix-ui/themes'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { replyComments } from '@/lib/actions/user.comment'
import { replyComment } from '@/lib/validations/Userpost'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { usePathname } from 'next/navigation'
import { Button } from '../ui/button'
import { Text } from '@chakra-ui/react'
import { Avatar } from '@nextui-org/react'
import useSWR from 'swr'
interface Props {
  articleId: string
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const SWRcomment = ({ articleId }: Props) => {
  const { data, error } = useSWR(
    `/api/commentArticle?articleId=${articleId}`,
    fetcher
  )
  console.log(data)

  // เช็คว่ากำลังโหลดหรือไม่
  if (!data) return <div>กำลังโหลด...</div>

  // เช็คว่าเกิดข้อผิดพลาดหรือไม่
  if (error) return <div>เกิดข้อผิดพลาดในการโหลดข้อมูล</div>

  return (
    <div className="flex w-full flex-col rounded-xl ">
      <div className="flex gap-3">
        {data &&
          data.map((comment: any, index: any) => (
            <div key={index}>
              {comment.comment.map((c: any) => (
                <div key={c.id}>
                  <p>{c.text}</p>
                </div>
              ))}
            </div>
          ))}
      </div>
    </div>
  )
}

export default SWRcomment
