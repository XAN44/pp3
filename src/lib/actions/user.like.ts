'use server'
import { revalidatePath } from 'next/cache'
import { db } from '../db'

export async function Like(postId: string, userId: string, path: string) {
  try {
    const isAlreadyLike = await db.like.findFirst({
      where: {
        postId,
        userId,
      },
    })
    if (!isAlreadyLike) {
      console.log('Added new follow:')

      revalidatePath(path)
      return true
    }
  } catch (error) {
    console.log(error)
    throw new Error('Can not like post')
  }
}

export async function unLike(postId: string, userId: string, path: string) {
  try {
    const isLike = await db.like.findFirst({
      where: {
        userId,
        postId,
      },
    })

    if (isLike) {
      const unLike = await db.like.deleteMany({
        where: {
          userId,
          postId,
        },
      })
      revalidatePath(path)
      console.log(`unlike relation: ${JSON.stringify(unLike)}`)
    }
    return true
  } catch (error) {
    throw new Error('เกิดข้อผิดพลาด')
  }
}

export async function getLike(postId: string) {
  try {
    const like = await db.like.count({
      where: {
        postId,
      },
    })
    return like
  } catch (error) {
    throw new Error('can not get count of like')
  }
}

export async function checkLike(
  postId: string,
  userId: string,
  isLiked?: boolean
) {
  try {
    const readLike = await db.like.findFirst({
      where: {
        postId,
        userId,
        isLiked,
      },
    })
    return !!readLike
  } catch (error) {
    return false
  }
}
