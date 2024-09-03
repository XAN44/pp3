'use server'

import { db } from '../src/lib/db'
import { hash } from 'bcrypt'

type email = {
  email: string
  password: string
}

export const ResetPassword = async ({ email, password }: email) => {
  if (!email) {
    return null
  }
  const findUser = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      email: true,
    },
  })

  if (!findUser || !findUser?.email) {
    return { error: 'Dont have Account' }
  }

  const hashPw = await hash(password, 10)

  await db.user.update({
    where: {
      email: findUser.email, // TypeScript error here
    },
    data: {
      password: hashPw,
    },
  })
  return { success: 'Update Password Success' }
}
