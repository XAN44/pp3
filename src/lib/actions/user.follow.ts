'use server'

import { revalidatePath } from 'next/cache'
import { db } from '../db'

export async function Follower(
  accountId: string,
  currentId: string,
  path: string
) {
  // Todo: เช็คผู้ใช้ที่กำลัง Login

  try {
    if (accountId === currentId) {
      return false
    } else {
      // Todo:เช็คว่ามีการติดตามเป้าหมายแล้วหรือไม่
      // !โดยไม่ให้มีการติดตามซ้ำ
      const isAlreadyFollowing = await db.follows.findFirst({
        where: {
          followerId: accountId,
          followingId: currentId,
        },
      })
      //  *ถ้าเงื่อนไขผ่าน จะทำการสร้างการติดตามผู้ใช้คนนั้นๆ
      if (!isAlreadyFollowing) {
        const newFollower = await db.follows.create({
          data: {
            followerId: accountId,
            followingId: currentId,
          },
        })

        console.log('Added new follow:', newFollower)
        revalidatePath(path)
        return true
      } else {
        return true
      }
    }
  } catch (error) {
    throw new Error(
      'เกิดข้อผิดพลาด: มีปัญหาในการเข้าถึงหรือประมวลผลข้อมูลที่ไม่ถูกต้อง'
    )
  }
}

// * Unfollower

export async function unFollower(
  accountId: string,
  currentId: string,
  path: string
) {
  try {
    if (accountId !== currentId) {
      const isFollow = await db.follows.findFirst({
        where: {
          followerId: accountId,
          followingId: currentId,
        },
      })

      if (isFollow) {
        const deletedFollow = await db.follows.deleteMany({
          where: {
            followerId: accountId,
            followingId: currentId,
          },
        })
        revalidatePath(path)
        console.log(`Deleted follow relation: ${JSON.stringify(deletedFollow)}`)
      }
      return true
    }
  } catch (error) {
    throw new Error('เกิดข้อผิดพลาด')
  }
}

// * Check

export async function getTotalFollowers(accountId: string) {
  try {
    const totalFollowers = await db.follows.count({
      where: {
        followerId: accountId,
      },
    })
    return totalFollowers
  } catch (error) {
    throw new Error('เกิดข้อผิดพลาดในการดึงจำนวนผู้ติดตาม')
  }
}

export async function getTotalFollowing(accountId: string) {
  try {
    const totalFollowing = await db.follows.count({
      where: {
        followingId: accountId,
      },
    })
    return totalFollowing
  } catch (error) {
    throw new Error('เกิดข้อผิดพลาดในการดึงจำนวนผู้ถูกติดตาม')
  }
}

export async function CheckFollow(
  accountId: string,
  followingId: string,
  isFollow?: boolean
) {
  try {
    const readFollow = await db.follows.findFirst({
      where: {
        followerId: accountId,
        followingId: followingId,
        isFollow: isFollow,
      },
    })
    return !!readFollow
  } catch (error) {
    console.error(error)
    return false
  }
}
