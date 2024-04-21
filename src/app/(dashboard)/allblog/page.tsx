import ArticleTagBusiness from '@/components/compoinhome/articleTagBusines'
import ArticleTagFamily from '@/components/compoinhome/articleTagFamily'
import ArticleTagResident from '@/components/compoinhome/articleTagResident'
import ArticleTagTravel from '@/components/compoinhome/articleTagTravel'
import { Text } from '@chakra-ui/react'
import { Image } from '@nextui-org/react'
import { Metadata } from 'next'
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ArticleAllTarvel from './components/ArticleAllTarvel'
import {
  getArticleAllBusines,
  getArticleAllResident,
  getArticleAllTarvel,
} from '@/lib/actions/user.ArticleAll'
import ArticleAllResident from './components/ArticleAllResident'
import ArticleAllBusines from './components/ArticleAllBusines'

export const metadata: Metadata = {
  title: 'Allblog',
}

export default async function Page() {
  const ArticleTarvelAll = await getArticleAllTarvel()
  const ArticleResidentAll = await getArticleAllResident()
  const ArticleBusinesAll = await getArticleAllBusines()

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
          </div>
        </div>
        <Tabs defaultValue="All" className="mt-14">
          <TabsList className="">
            <TabsTrigger value="All">ทั้งหมด</TabsTrigger>
            <TabsTrigger value="Tarvel">ท่องเที่ยว</TabsTrigger>
            <TabsTrigger value="Resident">ชุมชน</TabsTrigger>
            <TabsTrigger value="Busines">ธุรกิจ</TabsTrigger>
          </TabsList>
          <TabsContent value="All">
            <div className=" mx-auto mt-6 w-[690px]  items-center justify-center">
              <div className="text-start">
                <Text as="b">ท่องเที่ยว</Text>
              </div>
              <ArticleTagTravel />
              <div className="divider" />
            </div>

            <div className=" mx-auto mt-6 w-[690px]  items-center justify-center">
              <div className="text-start">
                <Text as="b">ชุมชน</Text>
              </div>
              <ArticleTagResident />
              <div className="divider" />
            </div>
            <div className=" mx-auto mt-6 w-[690px]  items-center justify-center">
              <div className="text-start">
                <Text as="b">ครอบครัว</Text>
              </div>
              <ArticleTagFamily />
              <div className="divider" />
            </div>
            <div className=" mx-auto mt-6 w-[690px]  items-center justify-center">
              <div className="text-start">
                <Text as="b">ธุรกิจ</Text>
              </div>
              <ArticleTagBusiness />
              <div className="divider" />
            </div>
          </TabsContent>
          <TabsContent value="Tarvel">
            <div className="flex w-full items-center justify-center">
              <ArticleAllTarvel data={ArticleTarvelAll || []} />
            </div>
          </TabsContent>
          <TabsContent value="Resident">
            <div className="flex w-full items-center justify-center">
              <ArticleAllResident data={ArticleResidentAll || []} />
            </div>
          </TabsContent>
          <TabsContent value="Busines">
            <div className="flex w-full items-center justify-center">
              <ArticleAllBusines data={ArticleBusinesAll || []} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}
