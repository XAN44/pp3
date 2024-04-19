import { Message, Room, User } from '@prisma/client'

export type FullmessageSender = Message & {
  sender: User
  seen: User[]
}

export type getUserinchat = Room & {
  users: User[]
  messages: FullmessageSender[]
}
