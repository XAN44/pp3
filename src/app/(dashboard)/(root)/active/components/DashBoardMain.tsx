'use client'
import { Post, User } from '@prisma/client'
import { U } from '../../../../../types/joinEvent'
import React, { useEffect } from 'react'
import {
  isAfter,
  isSameDay,
  isToday,
  parseISO,
  format,
  differenceInBusinessDays,
  differenceInDays,
  toDate,
} from 'date-fns'
import clsx from 'clsx'
import { th } from 'date-fns/locale'
import { Button, ButtonGroup, Image } from '@nextui-org/react'
import useSWR from 'swr'
import Link from 'next/link'

const fetcher = (url: string) => fetch(url).then((res) => res.json())
const DashBoardMain = () => {
  const { data: eq, mutate } = useSWR<U[]>(`/api/EventHas`, fetcher)

  const handleJoin = async (id: string) => {
    try {
      const response = await fetch('/api/join', {
        method: 'POST',
        body: JSON.stringify({ id }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()
      mutate(eq)
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการกดไลค์:', error)
    }
  }
  const getStatus = (eventDay: string) => {
    const eventDate = parseISO(eventDay)
    const isToday = new Date()
    const diffDays = differenceInDays(eventDate, isToday)

    if (isSameDay(eventDay, isToday)) {
      return 'เริ่มแล้ว'
    } else if (diffDays > 0 && diffDays < 2) {
      return 'ใกล้เริ่ม'
    } else if (isAfter(eventDate, isToday)) {
      return 'ยังไม่เริ่ม'
    } else {
      return 'เลยกำหนด'
    }
  }

  const getStatusClass = (status: string) => {
    return clsx({
      'text-green-500': status === 'เริ่มแล้ว',
      'text-yellow-500': status === 'ใกล้เริ่ม',
      'text-gray-500': status === 'ยังไม่เริ่ม',
      'text-red-500': status === 'เลยกำหนด',
    })
  }

  return (
    <div className="h-full w-full gap-3 p-3">
      <div className="flex">
        <div className="w-1/2 font-bold">รายชื่อกิจกรรม</div>
        <div className="w-1/2 font-bold">สถานะกิจกรรม</div>
        <div className="w-1/2 font-bold">แก้ไขกิจกรรม</div>
      </div>
      <div className="flex flex-col gap-3 p-3">
        {eq?.map((a, index) => (
          <div key={index} className="flex flex-col gap-3 p-3">
            {a.RegisterEvent.map((e, index) => (
              <div key={index} className="flex">
                <div className="w-1/2">
                  <Link href={`/event/${e.eventID}`}>{e.event?.title}</Link>
                </div>
                <div
                  className={clsx(
                    'w-1/2 ',
                    getStatusClass(getStatus(e.event?.eventstartTime || ''))
                  )}
                >
                  <p>{getStatus(e.event?.eventstartTime || '')}</p>
                  <p className="text-sm">
                    {format(
                      parseISO(e.event?.eventstartTime || ''),
                      '    d MMMM yyyy  ',
                      { locale: th }
                    )}
                  </p>
                </div>
                <div className="w-1/2">
                  <ButtonGroup>
                    <Button onClick={() => handleJoin(e.eventID || '')}>
                      ยกเลิกเข้าร่วม
                    </Button>
                  </ButtonGroup>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default DashBoardMain
