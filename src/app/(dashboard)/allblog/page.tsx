import ArticleTagBusiness from '@/components/compoinhome/articleTagBusines'
import ArticleTagFamily from '@/components/compoinhome/articleTagFamily'
import ArticleTagFood from '@/components/compoinhome/articleTagFood'
import ArticleTagTravel from '@/components/compoinhome/articleTagTravel'
import { Text } from '@chakra-ui/react'
import { Image } from '@nextui-org/react'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Allblog',
}

export default function page() {
  return (
    <>
      <div className="h-full w-full items-center justify-center text-center ">
        <Text as="b">คุณสามารถเลือกหาบทความได้ที่นี่</Text>
        <Text>เนื้อหาใหม่ของเราพร้อมแล้ว! ไปอ่านกันเลย</Text>
        <div className="mt-10 flex justify-center gap-5 space-x-4">
          <div className="basis-1/4">
            <Image src="/article.png" alt="article" />
          </div>
          <div className="flex basis-1/4 flex-col justify-between">
            วันนี้เรามีความตั้งใจที่จะพาทุกท่านไปเที่ยวสนุกสนานในบทความนี้!
            เราเข้าใจและรู้ว่าการเที่ยวนั้นเป็นหนึ่งในความสุขที่หลายคนกำลังมองหาอยู่
            และคำถามที่ทุกคนตั้งใจถามกันจริงๆ คือ &quot; ต้องไปที่ไหนดี?
            อยากเที่ยวให้สนุก &quot;
            <div className=" text-end">
              <Text as="b">ดูทั้งหมด</Text>
            </div>
          </div>
        </div>
        <div className=" mx-auto mt-6 w-[690px]  items-center justify-center">
          <div className="text-start">
            <Text as="b">ท่องเที่ยว</Text>
          </div>
          <ArticleTagTravel />
        </div>
        <div className=" mx-auto mt-6 w-[690px]  items-center justify-center">
          <div className="text-start">
            <Text as="b">ครอบครัว</Text>
          </div>
          <ArticleTagFamily />
        </div>
        <div className=" mx-auto mt-6 w-[690px]  items-center justify-center">
          <div className="text-start">
            <Text as="b">ธุรกิจ</Text>
          </div>
          <ArticleTagBusiness />
        </div>
        <div className=" mx-auto mt-6 w-[690px]  items-center justify-center">
          <div className="text-start">
            <Text as="b">อาหาร</Text>
          </div>
          <ArticleTagFood />
        </div>
      </div>
    </>
  )
}
