import { ArticleTag, Event, RegisterEvent, User, Visit } from '@prisma/client'

// export type UserInEvent = RegisterEvent & {
//   event: Event | null
//   user: User | null
// }

export type UserInEvent = Event & {
  tag:ArticleTag[]
  author: User | null
  Visit:Visit[]
}

export type JoinData = RegisterEvent& {
  event: UserInEvent | null
} 
