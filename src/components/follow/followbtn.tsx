'use client'
import { Follower, unFollower } from '@/lib/actions/user.follow'
import { usePathname } from 'next/navigation'
import { Button } from '@nextui-org/react'

function Followbtn({
  ProfileId,
  isFollowing,
  checkFollow,
}: {
  ProfileId: string
  isFollowing: string
  checkFollow: boolean
}) {
  const path = usePathname()

  const onFollow = async () => {
    try {
      if (checkFollow) {
        await unFollower(ProfileId, isFollowing, path)
      } else {
        await Follower(ProfileId, isFollowing, path)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <>
      <div className="">
        <Button onClick={onFollow}>
          {checkFollow ? 'Unfollow' : 'Follow'}
        </Button>
      </div>
    </>
  )
}

export default Followbtn
