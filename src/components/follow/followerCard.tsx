"use client";

interface FollowerCardProps {
  authorId: string;
  follower: string;
}

function FollowerCard({ authorId, follower }: FollowerCardProps) {
  return (
    <div>
      <p>{authorId}</p>
      <p>{follower}</p>
    </div>
  );
}

export default FollowerCard;
