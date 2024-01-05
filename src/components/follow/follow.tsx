"use client";

import { Follower } from "@/lib/actions/user.follow";
import { usePathname } from "next/navigation";

interface Props {
  authorId: string;
  currentUserId: string;
}

export default function Follow({ authorId, currentUserId }: Props) {
  const path = usePathname() ?? "";

  const handleFollower = async () => {
    try {
      await Follower({ accountId: authorId, path });
      console.log("Follower function called successfully");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div>
        <button onClick={handleFollower}>ติดตาม</button>
      </div>
    </>
  );
}
