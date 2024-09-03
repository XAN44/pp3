import { db } from '@/lib/db'
import { getCurrentUser } from '@/lib/session'
import { parseISO, isSameDay, addDays } from 'date-fns'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const user = await getCurrentUser()

    const dateTimeNow = new Date()
    // No need to format the date, just use the date object
    const today = dateTimeNow

    console.log('today', today)

    const events = await db.registerEvent.findMany({
      where: {
        userID: user?.id,
      },
      include: {
        event: true,
      },
    })

    for (const event of events) {
      const eventStartTime = parseISO(event.event?.eventstartTime || '')
      const notificationDate = addDays(eventStartTime, -1)

      const formatStartEvent = eventStartTime.toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })

      const notificationExists = await db.notification.findFirst({
        where: {
          userId: user?.id,
          eventId: event.eventID,
          current: event.eventID,
          body: {
            contains: `มีกิจกรรม ${event.event?.title}ที่คุณได้เข้าร่วม กำลังเริ่มขึ้นวัน ${formatStartEvent}`,
          },
        },
      })

      if (isSameDay(today, notificationDate) && !notificationExists) {
        await db.notification.create({
          data: {
            userId: user?.id,
            eventId: event.eventID,
            current: event.eventID,
            body: `มีกิจกรรม ${event.event?.title}ที่คุณได้เข้าร่วม กำลังเริ่มขึ้นวัน ${formatStartEvent}`,
          },
        })
      }
    }

    return NextResponse.json({ message: 'success' })
  } catch (error) {
    return NextResponse.json(error)
  }
}
