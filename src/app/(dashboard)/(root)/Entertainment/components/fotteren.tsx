import { Text } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function FooterEn() {
  return (
    <footer className=" bottom-0 left-0 mt-14 w-full bg-black text-white">
      <div className="flex justify-around">
        <div className="flex flex-col space-y-3">
          <Text fontSize="x-large" as="b">
            เกี่ยวกับเรา
          </Text>

          <Text>
            <Link href="/myhis">ประวัติ</Link>
          </Text>
          <Text>
            <Link href="/publicrelations">ข่าวประชาสัมพันธ์</Link>
          </Text>
          <Text>
            <Link href="/workwithus">ร่วมงานกับเรา</Link>
          </Text>
        </div>
        <div className="flex flex-col space-y-3">
          <Text fontSize="x-large" as="b">
            กฏหมาย
          </Text>
          <Text>
            <Link href="/policy">นโยบายความเป็นส่วนตัว</Link>
          </Text>

          <Text>
            <Link href="/agreement">ข้อตกลงและเงื่อนไข</Link>
          </Text>
          <Text>
            <Link href="/whatiscookie">นโยบายการใช้คุกกี้</Link>
          </Text>
        </div>
        <div className="flex flex-col space-y-3">
          <Text fontSize="x-large" as="b">
            ศูนย์ช่วยเหลือ
          </Text>
          <Text>
            <Link href="/question">คำถามที่พบบ่อย</Link>
          </Text>
          <Text>
            <Link href="/workus">ติดต่อเรา</Link>
          </Text>
        </div>
        <div className="flex flex-col space-y-3">
          <Text fontSize="x-large" as="b">
            การติดตาม
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
              <Image src="/youtube.png" alt="youtube" width="32" height="32" />:
              YOUTUBE
            </Text>
            <Text className="flex place-items-center justify-center gap-3 text-center">
              <Image src="/twitter.png" alt="youtube" width="32" height="32" />:
              TWITTER
            </Text>
            <Text className="flex place-items-center justify-center gap-3 text-center">
              <Image src="/ig.png" alt="youtube" width="32" height="32" />:
              INSTRAGRAM
            </Text>
            <Text className=" flex place-items-center justify-center gap-3 text-center">
              <Image src="/tiktok.png" alt="youtube" width="32" height="32" />:
              TIKTOK
            </Text>
            <Text className="flex place-items-center justify-center gap-3 text-center">
              <Image src="/email.png" alt="youtube" width="32" height="32" />:
              email
            </Text>
          </div>
        </div>
      </div>
      <div className="mt-4 bg-black p-5">
        <Text color="white" align="center" justifyContent="center">
          @AGRIC 2024
        </Text>
      </div>
    </footer>
  )
}
