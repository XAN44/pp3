import { Text } from '@chakra-ui/react'
import { Button, Divider, Textarea } from '@nextui-org/react'
import React from 'react'
import Image from 'next/image'
import { Input } from '@nextui-org/react'
import { getCurrentUser } from '@/lib/session'
import Link from 'next/link'

export default async function Agreement() {
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
            ข้อตกลงและเงื่อนไขการให้บริการ
          </Text>

          <div className="mt-10 flex flex-col space-y-4">
            <Text className="mb-3 mt-3" color="black">
              1. ยอมรับข้อตกลง
            </Text>
            <Text className="">
              การใช้บริการของเว็บไซต์แสดงถึงความยินยอมของผู้ใช้ที่ปฏิบัติตามข้อตกลงและเงื่อนไขทั้งหมดที่ระบุไว้ในเอกสารนี้
            </Text>

            <Text className="mt-3" color="black">
              2. สิทธิ์และระงับบัญชี
            </Text>
            <Text className="">
              เว็บไซต์ขอสงวนสิทธิ์ในการระงับหรือปิดบัญชีผู้ใช้ที่ไม่ปฏิบัติตามข้อตกลง
              และขอสงวนสิทธิ์ในการปรับเปลี่ยนหรือยกเลิกบริการต่าง ๆ
              โดยไม่ต้องแจ้งให้ทราบล่วงหน้า
            </Text>

            <Text className="mt-3" color="black">
              3.ความรับผิดชอบ
            </Text>
            <Text className="">
              ผู้ใช้ต้องรับผิดชอบต่อข้อมูลที่ได้โพสต์บนเว็บไซต์และข้อมูลส่วนบุคคลที่ถูกเผยแพร่.
              เว็บไซต์ไม่รับประกันความถูกต้องหรือครบถ้วนของข้อมูล
            </Text>

            <Text className="mt-3" color="black">
              4.การให้สิทธิ์
            </Text>
            <Text className="">
              ผู้ใช้จะต้องมีสิทธิ์ในข้อมูลที่เข้าถึงหรือใช้บนเว็บไซต์
              และต้องปฏิบัติตามกฎหมายที่เกี่ยวข้อง
            </Text>

            <Text className="mt-3" color="black">
              5.การใช้ข้อมูลส่วนบุคคล
            </Text>
            <Text className="">
              เว็บไซต์จะปฏิบัติตามนโยบายความเป็นส่วนตัวที่ระบุไว้ในเอกสารนี้และไม่นำข้อมูลส่วนบุคคลไปใช้โดยไม่ได้รับความยินยอม
            </Text>

            <Text className="mt-3" color="black">
              6.การให้บริการเสริม
            </Text>
            <Text className="">
              เว็บไซต์อาจให้บริการเสริมที่มีค่าใช้จ่าย
              และผู้ใช้จะต้องยอมรับเงื่อนไขและค่าบริการที่กำหนด
            </Text>

            <Text className="mt-3" color="black">
              7.การตั้งค่าบัญชี
            </Text>
            <Text className="">
              ผู้ใช้มีความรับผิดชอบในการรักษาความลับของรหัสผ่านและข้อมูลเข้าถึงบัญชีส่วนตัวของตน.
            </Text>

            <Text className="mt-3" color="black">
              8.การปฏิบัติตามกฎหมาย
            </Text>
            <Text className="">
              ผู้ใช้ต้องปฏิบัติตามกฎหมายที่เกี่ยวข้องในการใช้บริการ
            </Text>

            <Text className="mt-3" color="black">
              9.การเปลี่ยนแปลงข้อตกลง
            </Text>
            <Text className="">
              เว็บไซต์อาจทำการปรับเปลี่ยนข้อตกลงและเงื่อนไขโดยไม่ต้องแจ้งให้ทราบล่วงหน้า
            </Text>

            <Text className="mt-3" color="black">
              10.การติดต่อ
            </Text>
            <Text className="">
              สงวนสิทธิ์ในการติดต่อผู้ใช้เพื่อแจ้งเตือนหรือข้อมูลที่สำคัญผ่านทางอีเมลหรือช่องทางอื่น
              ๆ ที่เหมาะสม
            </Text>

            <Text className="mt-11">
              การใช้บริการต่อไปถือเป็นการยอมรับและปฏิบัติตามข้อตกลงและเงื่อนไขทั้งหมดที่ระบุไว้ในเอกสารนี้
            </Text>
          </div>
          <Divider className="my-1 mt-10 w-[1200px] ring-0 ring-black " />
        </div>
      </div>
    </div>
  )
}
