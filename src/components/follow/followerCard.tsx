"use client";

interface FollowerCardProps {
  authorId: string;
  follower: string;
}

function FollowerCard({ authorId, follower }: FollowerCardProps) {
  return (
    <div>
      <p>ผู้ติดตาม {authorId}</p>
      <p> ยอดผู้ติดตาม {follower}</p>
    </div>
  );
}

export default FollowerCard;
