'use client'

interface FollowerCardProps {
  accountId: {
    follower: number
    following: number
  }
}

function FollowerCard({ accountId }: FollowerCardProps) {
  return (
    <div className="flex">
      <div className="">
        <p> Follower {accountId.follower}</p>
      </div>
      <div>
        <p> Following {accountId.following}</p>
      </div>
    </div>
  )
}

export default FollowerCard
