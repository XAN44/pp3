'use client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { CiEdit } from 'react-icons/ci'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '../../ui/button'
import { Text } from '@chakra-ui/react'
import { Input } from '../../ui/input'
import { HASHTAG } from '../../tag/hashtag'
import { Select, SelectItem } from '@nextui-org/react'
type Data = {
  id: string
  articleContent: string
  eventlocation: string
  eventParticipants: string
  eventStartTime: string
  eventCreator: string
  eventmore: string
}

const EventOptions: React.FC<Data> = ({
  id,
  articleContent,
  eventlocation,
  eventCreator,
  eventParticipants,
  eventStartTime,
  eventmore,
}) => {
  const [textContent, setTextcontent] = useState('')
  const [location, setLocation] = useState('')
  const [Creator, setCreator] = useState('')
  const [participants, setParticipants] = useState('')
  const [StartTime, setStartTime] = useState('')
  const [moreEvent, setMoreEvent] = useState('')
  const router = useRouter()

  useEffect(() => {
    setTextcontent(articleContent)
    setCreator(eventCreator)
    setLocation(eventlocation)
    setParticipants(eventParticipants)
    setStartTime(eventStartTime)
    setMoreEvent(eventmore)
  }, [
    articleContent,
    eventCreator,
    eventParticipants,
    eventStartTime,
    eventlocation,
    eventmore,
  ])
  const EditEventHandler = useCallback(() => {
    axios
      .put('/api/EventOption', {
        id: id,
        ...(articleContent !== textContent
          ? { articleContent: textContent }
          : { articleContent: articleContent }),
        ...(eventlocation !== location
          ? { eventlocation: location }
          : { eventlocation: eventlocation }),
        ...(eventCreator !== Creator
          ? { eventCreator: Creator }
          : { eventCreator: eventCreator }),
        ...(eventParticipants !== participants
          ? { eventParticipants: participants }
          : { eventParticipants: eventParticipants }),
        ...(eventStartTime !== StartTime
          ? { eventStartTime: StartTime }
          : { eventStartTime: eventStartTime }),
        ...(eventmore !== moreEvent
          ? { eventmore: moreEvent }
          : { eventmore: '' }),
      })
      .then((res) => {
        console.log(res)
        router.refresh()
      })
      .catch((error) => {
        console.log(error)
      })
  }, [
    Creator,
    StartTime,
    articleContent,
    eventCreator,
    eventParticipants,
    eventStartTime,
    eventlocation,
    eventmore,
    id,
    location,
    moreEvent,
    participants,
    router,
    textContent,
  ])

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <div className="flex items-center justify-start gap-3">
            <Text as="b">Edit</Text>
            <CiEdit size={25} className="hover:cursor-pointer" />
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>แก้ไขกิจกรรม</DialogTitle>
            <DialogDescription>
              <div className="mt-5">
                <Input
                  placeholder="คำอธิบายกิจกรรม"
                  type="text"
                  onChange={(e) => setTextcontent(e.target.value)}
                />
              </div>
              <div className="mt-5">
                <Input
                  placeholder="ผู้สร้างกิจกรรม"
                  onChange={(e) => setCreator(e.target.value)}
                />
              </div>
              <div className="mt-5">
                <Input
                  placeholder="เพิ่มเติม"
                  type="text"
                  onChange={(e) => setMoreEvent(e.target.value)}
                />
              </div>
              <div className="mt-5">
                <Input
                  placeholder="สถานที่จัดกิจกรรม"
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <div className="mt-5">
                <Input
                  className="w-full"
                  type="datetime-local"
                  placeholder="สถานที่จัดกิจกรรม"
                  defaultValue={eventStartTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </div>
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              type="submit"
              className="bg-green-700"
              onClick={EditEventHandler}
            >
              บันทึกโพสต์
            </Button>
            <DialogClose asChild>
              <Button type="submit">ยกเลิก </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default EventOptions
