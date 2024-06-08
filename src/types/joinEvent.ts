import { Prisma, Event, Post, RegisterEvent, User } from '@prisma/client'

export type U = Prisma.UserGetPayload<{
  select: {
    RegisterEvent: {
      include: {
        event: {
          include: {
            author: {
              select: {
                id: true
                name: true
                image: true
              }
            }
          }
        }
      }
    }
  }
}>
