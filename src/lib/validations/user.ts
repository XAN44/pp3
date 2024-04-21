import * as z from 'zod'

export const FOrmImage = z.object({
  image: z.string().url().nonempty(),
})

export const UserBio = z.object({
  bio: z.string().min(3).max(100),
})

export const UserName = z.object({
  name: z.string().min(0).max(100),
})

export const UserNickName = z.object({
  nickname: z.string().min(0).max(100),
})

export const UrlFacebookFORM = z.object({
  facebookUrl: z.string().url(),
})

export const UrlIGFORM = z.object({
  igUrl: z.string().url(),
})

export const UrlTwiiterFORM = z.object({
  twitterUrl: z.string().url(),
})

export const UrlTiktokFORM = z.object({
  tiktokUrl: z.string().url(),
})
