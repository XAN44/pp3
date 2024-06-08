import EventTagTravel from '@/components/compoinhome/eventTAgTravel'
import EventTagBusiness from '@/components/compoinhome/eventTagBusines'
import EventTagFamily from '@/components/compoinhome/eventTagFamily'
import { Text } from '@chakra-ui/react'
import { Image } from '@nextui-org/react'
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getEventHasJoin } from '@/lib/actions/user.join.event'
import { usePathname } from 'next/navigation'
import Urevent from './components/urEvent'
import EventTagResident from '@/components/compoinhome/eventTagResident'
import EventAllTarvel from './components/EventAllTarvel'
import {
  getBusinesAll,
  getEVENTALL,
  getResidentAll,
} from '@/lib/actions/user.EventALL'
import EventAllResident from './components/EventAllResident'
import EventAllBusines from './components/EventAllBusines'
import Footer from '@/components/Footer'

export default async function Page() {
  const HasEvent = await getEventHasJoin()
  const eventAll = await getEVENTALL()
  const eventResident = await getResidentAll()
  const eventBusines = await getBusinesAll()

  return (
    <>
      <div className=" mt-16 h-full w-full max-w-full items-center justify-center text-center">
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

            <TabsTrigger value="urEvent">กิจกรรมของคุณ</TabsTrigger>
          </TabsList>
          <TabsContent value="All">
            <div className="mx-auto mt-6 w-[690px] items-center justify-center">
              <div className="text-start">
                <Text as="b">ท่องเที่ยว</Text>
              </div>
              <EventTagTravel />
              <div className="divider" />
            </div>

            <div className="mx-auto mt-6 w-[690px] items-center justify-center ">
              <div className="text-start">
                <Text as="b">ชุมชน</Text>
              </div>
              <EventTagResident />
              <div className="divider" />
            </div>

            <div className="mx-auto mt-6 w-[690px] items-center justify-center">
              <div className="text-start">
                <Text as="b">ครอบครัว</Text>
              </div>
              <EventTagFamily />
              <div className="divider" />
            </div>

            <div className="mx-auto mt-6 w-[690px] items-center justify-center">
              <div className="text-start">
                <Text as="b">ธุรกิจ</Text>
              </div>
              <EventTagBusiness />
              <div className="divider" />
            </div>
          </TabsContent>
          {/* END */}
          <TabsContent value="Tarvel">
            <div className="flex w-full items-center justify-center">
              <EventAllTarvel data={eventAll || []} />
            </div>
          </TabsContent>
          <TabsContent value="Resident">
            <div className="flex w-full items-center justify-center">
              <EventAllResident data={eventResident || []} />
            </div>
          </TabsContent>
          <TabsContent value="Busines">
            <div className="flex w-full items-center justify-center">
              <EventAllBusines data={eventBusines || []} />
            </div>
          </TabsContent>
          <TabsContent value="urEvent">
            <Urevent data={HasEvent || null} />
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}
