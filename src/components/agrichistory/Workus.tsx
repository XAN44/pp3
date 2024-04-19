import { Text } from '@chakra-ui/react'
import { Button, Divider, Textarea } from '@nextui-org/react'
import React from 'react'
import Image from 'next/image'
import { Input } from '@nextui-org/react'
import { getCurrentUser } from '@/lib/session'
import Link from 'next/link'

export default async function Workus() {
  const user = await getCurrentUser()
  return (
    <div className="flex items-center justify-center ">
      <div className=" w-9/12 text-center  ">
        <Text
          color="black"
          as="u"
          fontSize="xx-large"
          align="center"
          justifyContent="center"
        >
          AGRIC
        </Text>

        <div className="mt-6">
          <Text
            color="black"
            fontSize="x-large"
            align="center"
            justifyContent="center"
          >
            ติดต่อเราได้ที่
          </Text>
        </div>
        <div className="grid text-start">
          <Text as="b" color="red" fontSize="2xl">
            ช่องทางหลัก
          </Text>
          <Text className="mb-3 mt-3">E-mail : Watthanai45r@gmail.com</Text>
          <br />

          <div className="mt-3 flex flex-col space-y-3">
            <Text fontSize="x-large" as="b" color="red">
              ช่องทางสื่อสารอื่นๆ
            </Text>
            <div className="grid grid-flow-col grid-rows-3 place-items-start items-start justify-start gap-3">
              <Text className="flex place-items-center justify-center gap-3 text-center">
                <Image
                  src="/facebook.png"
                  alt="facebook"
                  width="32"
                  height="32"
                />
                : FACEBOOK
              </Text>
              <Text className="flex place-items-center justify-center gap-3 text-center">
                <Image
                  src="/youtube.png"
                  alt="youtube"
                  width="32"
                  height="32"
                />
                : YOUTUBE
              </Text>
              <Text className="flex place-items-center justify-center gap-3 text-center">
                <Image
                  src="/twitter.png"
                  alt="youtube"
                  width="32"
                  height="32"
                />
                : TWITTER
              </Text>
              <Text className="flex place-items-center justify-center gap-3 text-center">
                <Image src="/ig.png" alt="youtube" width="32" height="32" />:
                INSTRAGRAM
              </Text>
              <Text className="btn-prim btn btn flex place-items-center justify-center gap-3 text-center">
                <Image src="/tiktok.png" alt="youtube" width="32" height="32" />
                : TIKTOK
              </Text>
              <Text className="flex place-items-center justify-center gap-3 text-center">
                <Image src="/email.png" alt="youtube" width="32" height="32" />:
                email
              </Text>
            </div>
            <div className="mt-6">
              <Text fontSize="x-large" as="b" color="red">
                ชั่วโมงทำการ
              </Text>
              <Text className="flex">จันทร์ - ศุกร์ : [ 09:00 - 16:00]</Text>
              <Text className="flex">เสาร์ - อาทิตย์ :[ 09:00 - 17:00]</Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
