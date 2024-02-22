import { Text } from '@chakra-ui/react'
import { Button, Divider, Textarea } from '@nextui-org/react'
import React from 'react'
import Image from 'next/image'
import { Input } from '@nextui-org/react'
import { getCurrentUser } from '@/lib/session'
import Link from 'next/link'

export default async function Question() {
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
          <Text as="b" color="black" fontSize="2xl">
            คำถามที่พบบ่อย
          </Text>

          <Text className="mt-6">
            เว็บไซต์นี้เป็นแพลตฟอร์มท่องเที่ยวและแบ่งปันประสบการณ์การท่องเที่ยว
            ซึ่งเน้นในการเชื่อมโยงชุมชนที่รักการท่องเที่ยวและการแบ่งปันความรู้ท่องเที่ยว
          </Text>

          <div className="mt-10 flex flex-col space-y-4">
            <Text as="b" fontSize="xx-large">
              คุณสมบัติหลักของเว็บไซต์นี้คือ
            </Text>

            <Text className="mb-3 mt-3" color="black">
              1.Blogสำหรับการแบ่งปันประสบการณ์ท่องเที่ยว
            </Text>
            <Text className="">
              มีพื้นที่สำหรับสมาชิกที่จะเขียนบทความและแบ่งปันประสบการณ์การท่องเที่ยวของตนเอง
            </Text>

            <Text className="mt-3" color="black">
              2. หน้า Activity สำหรับกิจกรรม
            </Text>
            <Text className="">
              ทำให้สามารถแสดงข้อมูลเกี่ยวกับกิจกรรมท่องเที่ยวหรือกิจกรรมสังสรรค์ต่างๆ
              ที่ผู้ใช้สามารถเข้าร่วมและสร้างกิจกรรมได้
            </Text>

            <Text className="mt-3" color="black">
              3. การโพสต์ข้อความต่างๆ ในช่วงเวลานั้นๆ
            </Text>
            <Text className="">
              ให้สมาชิกที่มีความรู้สึกหรือความต้องการต่างๆ
              สามารถโพสต์เนื้อหาได้อย่างอิสระ
            </Text>

            <Text className="mt-3" color="black">
              4. หน้าสำหรับBlog เขียนบทความส่วนตัว{' '}
            </Text>
            <Text className="">
              สำหรับสมาชิกที่ต้องการเก็บบทความส่วนตัวหรือข้อมูลส่วนตัว
            </Text>

            <Text className="mt-3" color="black">
              5. ระบบชุมชนและความสัมพันธ์{' '}
            </Text>
            <Text className="">
              สมาชิกสามารถติดตามและแชทกับผู้ใช้คนอื่น ๆ
              และมีระบบการติดตามกิจกรรมแบบโฟลโลว์
            </Text>

            <Text className="mt-3" color="black">
              6. หน้าสำหรับบทความที่น่าสนใจ{' '}
            </Text>
            <Text className="">
              จัดเตรียมบทความที่น่าสนใจและท่องเที่ยวที่คอยเพิ่มความรู้และแรงบันดาลใจ
            </Text>

            <Text className="mt-3" color="black">
              7. ระบบความปลอดภัยและการจัดการสมาชิก{' '}
            </Text>
            <Text className="">
              ระบบสมาชิกที่ปลอดภัยและสามารถจัดการข้อมูลส่วนตัวได้อย่างมีประสิทธิภาพ
            </Text>

            <Text className="mt-3" color="black">
              8. อินโทรเกรทด้วยโทนสีเพื่อสร้างอารมณ์{' '}
            </Text>
            <Text className="">
              ใช้สีและดีไซน์เพื่อสร้างบรรยากาศและอารมณ์ที่เหมาะสมตามลักษณะของเว็บไซต์
              สามารถโพสต์เนื้อหาได้อย่างอิสระ
            </Text>
          </div>

          <div className="mt-10 flex flex-col space-y-4">
            <Text as="b" fontSize="xx-large">
              เว็บไซต์นี้เหมาะสำหรับกลุ่มเป้าหมายใด?
            </Text>
            <Text>
              เว็บไซต์นี้เหมาะสำหรับผู้ที่รักการท่องเที่ยว
              ผู้ที่กำลังวางแผนการเดินทางหาเพื่อนร่วมทางสร้างกิจกรรม
            </Text>
            <Text>
              และชุมชนที่สนใจการแบ่งปันประสบการณ์ท่องเที่ยวหรือสร้างกิจกรรมเชิญชวน
            </Text>

            <Text className="mb-3 mt-7" color="black" as="b">
              การใช้งานเว็บไซต์นี้ยากหรือง่าย?{' '}
            </Text>
            <Text>
              การใช้งานเว็บไซต์นี้ถือเป็นง่ายและใช้งานได้ง่าย
              ผู้ใช้สามารถรับชมและแบ่งปันเนื้อหาได้โดยไม่ยากเย็น
            </Text>

            <Text className="mb-3 mt-7" color="black" as="b">
              เว็บไซต์นี้มีประโยชน์อย่างไรต่อผู้ใช้?{' '}
            </Text>
            <Text>
              เว็บไซต์นี้มีประโยชน์ในการแบ่งปันให้ข้อมูลท่องเที่ยวที่น่าสนใจ
              สร้างพื้นที่สำหรับการแลกเปลี่ยนประสบการณ์ต่างๆ
              และส่งเสริมการสร้างกิจกรรมร่วมกัน
            </Text>

            <Text className="mb-3 mt-7" color="black" as="b">
              มีคุณสมบัติหรือบริการเฉพาะที่ทำให้เว็บไซต์นี้แตกต่างจากเว็บไซต์อื่น
              ๆ ไหม?
            </Text>
            <Text>
              เว็บไซต์นี้มีความพิเศษในการเชื่อมโยงกลุ่มคนที่รักการท่องเที่ยว
              ต้องการสร้างกิจกรรมเชิญชวนทำร่วมกัน
              มีพื้นที่ในการแบ่งปันประสบการณ์
              และสร้างชุมชนที่เชื่อมโยงที่มีความสนใจเดียวกัน
            </Text>
          </div>
          <Divider className="my-1 mt-10 w-[1200px] ring-0 ring-black " />
        </div>
      </div>
    </div>
  )
}
