"use client";

import { Follower } from "@/lib/actions/user.follow";
import { usePathname } from "next/navigation";

interface Props {
  authorId: string;
}

export default function Follow({ authorId }: Props) {
  const path = usePathname() ?? "";

  const handleFollow = async () => {
    try {
      await Follower({ authorId, path });
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการติดตาม:", error);
    }
  };
  return (
    <>
      <button onClick={handleFollow}>ติดตาม</button>
    </>
  );
}
