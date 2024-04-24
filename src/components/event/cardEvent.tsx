import React from 'react'
import { Text } from '@chakra-ui/react'
import EventOptions from './components/EventOption'

interface Props {
  id: string | null
  articleContent: string | null
  eventlocation: string | null
  eventparticipants: string | null
  eventstartTime: string | null
  eventcreator: string | null
  eventmore: string | null
  tag: {
    tag: string | null
  }[]
}

export default function CardEvent({
  id,
  articleContent,
  eventlocation,
  eventparticipants,
  eventstartTime,
  eventcreator,
  eventmore,
  tag,
}: Props) {
  return (
    <div className="">
      <div className="mt-6 grid rounded-lg p-3 shadow-xl ring-1 ring-gray-400">
        {tag?.map((hashtag, index) =>
          hashtag?.tag ? (
            <div key={index} className="flex">
              <Text as="b">หมวดหมู่ : </Text>
              <Text>{hashtag.tag}</Text>
            </div>
          ) : null
        )}
        <div className="mt-3 flex">
          <Text as="b"> คำอธิบาย : </Text>
          <Text>{articleContent || ''}</Text>
        </div>
        <div className="mt-3 flex">
          <Text as="b">ผู้สร้างกิจกรรม : </Text>
          <Text>{eventcreator || ''}</Text>
        </div>
        <div className="mt-3 flex ">
          <Text as="b">เพิ่มเติม :</Text>
          <Text>{eventmore || ''}</Text>
        </div>
        <div className="mt-3 flex">
          <Text as="b">สถานที่จัดกิจกรรม : </Text>
          <Text>{eventlocation || ''}</Text>
        </div>
        <div className="mt-3 flex ">
          <Text as="b">เวลาเริ่มกิจกรรม :</Text>
          <Text> {eventstartTime || ''}</Text>
        </div>
      </div>
      <div className="mt-3 w-16 ">
        <EventOptions
          articleContent={articleContent || ''}
          eventCreator={eventcreator || ''}
          eventParticipants={eventparticipants || ''}
          eventStartTime={eventstartTime || ''}
          eventlocation={eventlocation || ''}
          eventmore={eventmore || ''}
          id={id || ''}
        />
      </div>
    </div>
  )
}
