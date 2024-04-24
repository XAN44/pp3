import { Text } from '@chakra-ui/react'
import { Button, Divider, Textarea } from '@nextui-org/react'
import React from 'react'
import Image from 'next/image'
import { Input } from '@nextui-org/react'
import { getCurrentUser } from '@/lib/session'
import Link from 'next/link'

export default async function Workwithus() {
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

        <div className="grid text-start">
          <Text as="b" color="red" fontSize="2xl">
            ติดต่อร่วมงานกับเรา
          </Text>

          {/*  */}

          <Text className="mb-3 mt-3">
            หากคุณมีคำถาม ข้อเสนอแนะ หรือสนใจที่จะเป็นส่วนหนึ่งของ AGRIC
          </Text>
          <br />
          <Text className="mb-3 mt-3">
            เรายินดีที่จะพูดคุยและหาวิธีการร่วมงานที่เหมาะสมกับความต้องการของคุณ
            ไม่ว่าจะเป็นการโปรโมทสินค้า, การจัดกิจกรรมโฆษณา,
            หรือการพัฒนาคอนเทนต์ที่น่าสนใจ
            ทางทีมงานของเราพร้อมที่จะรับฟังและทำงานร่วมกับคุณเพื่อสร้างประสบการณ์ที่น่าจดจำสำหรับผู้ใช้งานของเรา.
            ขอบคุณที่คุณให้ความสนใจที่จะทำงานร่วมกับเรา
            และเราหวังว่าจะได้ร่วมทำความสำเร็จในโครงการนี้ด้วยกัน!
          </Text>
          <Text fontSize="2xl" color="red" className="mb-3 mt-3" as="b">
            กรุณาติดต่อเราทาง
          </Text>
          <Text>E-Mail : Watthanai45r@gmail.com</Text>

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
              <Text className="btn-prim  flex place-items-center justify-center gap-3 text-center">
                <Image src="/tiktok.png" alt="youtube" width="32" height="32" />
                : TIKTOK
              </Text>
              <Text className="flex place-items-center justify-center gap-3 text-center">
                <Image src="/email.png" alt="youtube" width="32" height="32" />:
                email
              </Text>
            </div>
            <Text fontSize="x-large" as="b" className="mt-3" color="red">
              ชั่วโมงทำการ
            </Text>
            <Text className="flex">จันทร์ - ศุกร์ : [ 09:00 - 16:00]</Text>
            <Text className="flex">เสาร์ - อาทิตย์ :[ 09:00 - 17:00]</Text>
          </div>
        </div>
        <div className=" mt-14 grid place-items-center items-center justify-center">
          <Text textAlign="center" as="b" fontSize="xx-large">
            เรายินดีต้อนรับทุกท่านที่สนใจและต้องการร่วมงานกับAGRIC
          </Text>
          <Text textAlign="center" as="b" fontSize="xx-large">
            ขอบคุณที่คุณให้ความสนใจใน AGRIC
            และเราหวังว่าจะได้ร่วมมือกับคุณเร็วๆนี้
          </Text>
          <Divider className="mt-6 w-[900px] ring-0 ring-black" />
          <div className="w-[600px]  place-items-center items-center justify-center  ">
            <div className="mb-10 mt-5 text-start">
              <Text textAlign="start" as="b" fontSize="x-large">
                หากมีคำถามเพิ่มเติม
              </Text>
            </div>

            <div className="flex gap-5">
              <Input size="sm" variant="faded" type="text" placeholder="ชื่อ" />
              <Input
                size="sm"
                variant="faded"
                type="text"
                placeholder="นามสกุล"
              />
              <Input
                size="sm"
                variant="faded"
                type="email"
                placeholder="อีเมล"
              />
            </div>
            <div className="mt-5">
              <Textarea
                variant="faded"
                placeholder="เรื่องที่ต้องการติดต่อ"
                className="max-w-2xl"
              />
            </div>
            <div className="mt-5">
              <Textarea
                placeholder="เพิ่มเติม"
                variant="faded"
                className="max-w-2xl"
              />
            </div>
            <div className="place-items-center items-center justify-center text-center">
              {user?.id ? (
                <>
                  <div className="mt-5">
                    <Button color="success" variant="shadow">
                      ยืนยัน
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div className="mt-5 ">
                    <Button isDisabled color="default" variant="shadow">
                      ยืนยัน
                    </Button>
                  </div>
                  <Text
                    as="div"
                    className="mt-6 flex place-items-center items-center justify-center"
                  >
                    คุณมีบัญชีอยู่แล้วใช่ไหม?
                    <span>
                      <Text color="green">
                        <Link href="/sign-in">กดลงชื่อเข้าใช้งาน</Link>
                      </Text>
                    </span>
                  </Text>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
