import { db } from '../db'

export async function getFollowCount(userId: string) {
  try {
    const getCount = await db.follows.count({
      where: {
        follower: {
          id: userId,
        },
        following: {
          id: userId,
        },
      },
    })

    return getCount
  } catch (error) {}
}
