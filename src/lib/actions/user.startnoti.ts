import { format, parseISO } from 'date-fns'
import { db } from '../db'
import { getCurrentUser } from '../session'
import { th } from 'date-fns/locale'

export async function notificationForStartEvent() {
  try {
    const user = await getCurrentUser()
    const findEvent = await db.event.findMany({
      select: {
        id: true,
        eventstartTime: true,
        RegisterEvent: {
          select: {
            userID: true,
          },
        },
      },
    })

    const dateTimeNow = new Date()
    const today = format(dateTimeNow, 'EEEE d MMMM YYYY ', { locale: th })

    const formatStartEvent = findEvent.map((event) => {
      return format(parseISO(event.eventstartTime || ''), 'EEEE d MMMM yyyy', {
        locale: th,
      })
    })

    const hasEvent = formatStartEvent.some((date) => date === today)

    return findEvent
  } catch (error) {
    console.log(error)
    return error
  }
}
