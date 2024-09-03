import { db } from '../db'
import { getCurrentUser } from '../session'

export async function GetFollow(id: string) {
  try {
    const fetchFollow = await db.follows.findMany({
      where: {
        followingId: id,
      },
      select: {
        follower: {
          select: {
            id: true,
            name: true,
            image: true,
            _count: {
              select: {
                followers: true,
              },
            },
          },
        },
      },
    })
    console.log('Fetched Followers:', fetchFollow) // เพิ่มบรรทัดนี้

    return fetchFollow
  } catch (error) {
    return null
  }
}
export async function GetFollowing(id: string) {
  try {
    const fetchFollow = await db.follows.findMany({
      where: {
        followerId: id,
      },
      select: {
        following: {
          select: {
            id: true,
            name: true,
            image: true,
            _count: {
              select: {
                followers: true,
              },
            },
          },
        },
      },
    })
    console.log('Fetched Followers:', fetchFollow) // เพิ่มบรรทัดนี้

    return fetchFollow
  } catch (error) {
    return null
  }
}
