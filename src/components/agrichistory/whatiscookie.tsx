import { Text } from '@chakra-ui/react'
import { Button, Divider, Textarea } from '@nextui-org/react'
import React from 'react'
import Image from 'next/image'
import { Input } from '@nextui-org/react'
import { getCurrentUser } from '@/lib/session'
import Link from 'next/link'

export default async function Whatiscookie() {
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
            คุกกี้ (Cookies) คืออะไร
          </Text>

          <Text className="mt-6">
            คุกกี้ (Cookies)
            คือไฟล์ขนาดเล็กที่เว็บไซต์ส่งไปแทนที่บนอุปกรณ์ของผู้ใช้ เช่น
            เบราว์เซอร์ เมื่อผู้ใช้เข้าชมเว็บไซต์นั้น ๆ
            คุกกี้จะถูกเก็บไว้ในเครื่องของผู้ใช้
            เพื่อทำให้เว็บไซต์สามารถจดจำข้อมูลเฉพาะเกี่ยวกับผู้ใช้และการใช้บริการต่าง
            ๆ ได้ เช่น การเข้าสู่ระบบ, การเลือกภาษา,
            หรือการจดจำรายการที่ผู้ใช้เคยดูไว้ในการช็อปปิ้งออนไลน์ เป็นต้น
            คุกกี้มีหลายประเภทและใช้เพื่อวัตถุประสงค์ต่าง ๆ
            รวมถึงประสิทธิภาพการทำงานของเว็บไซต์และการปรับปรุงประสบการณ์การใช้งานของผู้ใช้.
          </Text>

          <div className="mt-10 flex flex-col space-y-4">
            <Text as="b" fontSize="xx-large">
              นโยบายการใช้คุกกี้
            </Text>
            <Text>
              แพลตฟอร์มของเราใช้คุกกี้เพื่อวัตถุประสงค์หลายประการ
              เพื่อประสบการณ์การใช้งานที่เพิ่มประสิทธิภาพและทันสมัยของผู้ใช้
            </Text>

            <Text className="mb-3 mt-3" color="black">
              1.การจดจำข้อมูลการเข้าสู่ระบบ
            </Text>
            <Text className="">
              เพื่อให้ผู้ใช้ไม่ต้องเข้าสู่ระบบใหม่ทุกรอบที่เข้าชมแพลตฟอร์ม
              เราใช้คุกกี้เพื่อจดจำสถานะการเข้าสู่ระบบ
            </Text>

            <Text className="mt-3" color="black">
              2. การบันทึกการตั้งค่า
            </Text>
            <Text className="">
              เพื่อบันทึกการตั้งค่าที่ผู้ใช้ได้กำหนด เช่น ภาษาที่เลือก
              หรือการปรับแต่งประสบการณ์การใช้งานส่วนต่าง ๆ
            </Text>

            <Text className="mt-3" color="black">
              3. การวิเคราะห์ผู้ใช้
            </Text>
            <Text className="">เพื่อเข้าใจพฤติกรรมการใช้งานของผู้ใช้</Text>
          </div>

          <div className="mt-10 flex flex-col space-y-4">
            <Text as="b" fontSize="xx-large">
              นโยบายคุกกี้
            </Text>
            <Text>
              เพื่อปรับปรุงประสบการณ์การใช้งานของผู้ใช้และให้บริการที่มีประสิทธิภาพมากที่สุด
              เราใช้คุกกี้บนแพลตฟอร์มของเรา
              นโยบายคุกกี้ของเราอธิบายถึงวิธีที่เราใช้และประเภทของข้อมูลที่เรารวบรวมผ่านคุกกี้.
            </Text>

            <Text className="mb-3 mt-3" color="black">
              1.การจดจำข้อมูลการเข้าสู่ระบบ
            </Text>
            <div>
              1.ประเภทของคุกกี้ที่เราใช้
              <div className="ml-5 space-y-4">
                <Text className="mt-3"> 1.1 คุกกี้ที่จำเป็น </Text>
                <Text>
                  คุกกี้เหล่านี้เป็นสิ่งจำเป็นสำหรับการทำให้เว็บไซต์ทำงานได้ถูกต้อง
                  และมีประสิทธิภาพสูงสุด.
                </Text>
                <Text> 1.2 คุกกี้ที่เกี่ยวข้องกับประสิทธิภาพ </Text>
                <Text>
                  เราใช้คุกกี้เพื่อปรับปรุงประสิทธิภาพของเว็บไซต์
                  เพื่อให้ผู้ใช้ได้รับประสบการณ์ที่ดีที่สุด.
                </Text>
                <Text> 1.3 คุกกี้ทางสถิติ </Text>
                <Text>
                  เพื่อทำการวิเคราะห์การใช้งานของเว็บไซต์
                  และเพื่อทราบข้อมูลทางสถิติเพื่อปรับปรุงประสิทธิภาพ.
                </Text>
              </div>
            </div>

            <Text className="mt-3" color="black">
              2.การควบคุมคุกกี้
            </Text>
            <Text className="">
              ผู้ใช้สามารถควบคุมการใช้คุกกี้ของตนได้ทางเบราว์เซอร์
              โดยเปิดหรือปิดการใช้งานคุกกี้หรือลบคุกกี้ที่ถูกบันทึกไว้.
            </Text>

            <Text className="mt-3" color="black">
              3. การใช้คุกกี้โดยบุคคลที่สาม
            </Text>
            <Text className="">
              เราใช้คุกกี้จากบุคคลที่สามเพื่อวัตถุประสงค์ทางโฆษณา
              และการวิเคราะห์ เราจะปฏิบัติตามนโยบายคุกกี้ที่ได้รับการปรับปรุง
            </Text>
            <Text className="mt-3" color="black">
              4.การยินยอมของผู้ใช้
            </Text>
            <Text className="">
              การใช้บริการของเราถือเป็นการยินยอมในการใช้คุกกี้ตามนโยบายนี้.
            </Text>
            <Text className="mt-3" color="black">
              5.การปรับปรุงนโยบาย
            </Text>
            <Text className="">
              นโยบายคุกกี้อาจมีการปรับปรุงเพื่อให้เข้ากับการเปลี่ยนแปลงในเทคโนโลยีและการให้บริการ
              คำทำนายนโยบายจะถูกปรับปรุงในกรณีเช่นนี้.
            </Text>
            <Text className="mt-10">
              การใช้บริการของเราหลังจากการปรับปรุงนโยบายถือเป็นการยอมรับนโยบายคุกกี้ที่ได้รับการปรับปรุงล่าสุด.
            </Text>
          </div>
          <Divider className="my-1 mt-10 w-[1200px] ring-0 ring-black " />
        </div>
      </div>
    </div>
  )
}
