"use client";
import { CheckFollow, Follower, unFollower } from "@/lib/actions/user.follow";
import { usePathname } from "next/navigation";

interface Props {
  followAccount: string;
  followingByCurrentId: string;
  totalFollow: number;
}
export default function Follow({
  followAccount,
  followingByCurrentId,
  totalFollow,
}: Props) {
  const path = usePathname() ?? "";

  const handleFollower = async () => {
    try {
      await Follower(JSON.parse(followingByCurrentId), followAccount, path);
      console.log("Success");
      // ตรวจสอบสถานะการติดตามใหม่หลังจากกดปุ่มติดตาม
      const isFollowing = await CheckFollow(
        JSON.stringify(followingByCurrentId),
        followAccount
      );
      if (isFollowing) {
        console.log("Already following");
      } else {
        console.log("Not following yet");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleunFollower = async () => {
    try {
      await unFollower(JSON.parse(followingByCurrentId), followAccount, path);
      console.log("Success");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // แสดงผลปุ่มตามสถานะการติดตามที่มีในข้อมูล totalFollow โดยตรง
  return (
    <div className="">
      {totalFollow > 0 ? (
        <>
          <button onClick={handleunFollower}>Unfollow</button>
        </>
      ) : (
        <>
          <button onClick={handleFollower}>Follow</button>
        </>
      )}
    </div>
  );
}
