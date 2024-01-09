"use client";
import { Follower, unFollower } from "@/lib/actions/user.follow";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

function Followbtn({
  ProfileId,
  isFollowing,
  checkFollow,
}: {
  ProfileId: string;
  isFollowing: string;
  checkFollow: boolean;
}) {
  const path = usePathname();

  const onFollow = async () => {
    try {
      if (checkFollow) {
        await unFollower(ProfileId, isFollowing, path);
      } else {
        await Follower(ProfileId, isFollowing, path);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const Fol = async () => {
    const res = await fetch("/api/follow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json ",
      },
      body: JSON.stringify({ follower: ProfileId, Following: isFollowing }),
    });
  };

  return (
    <>
      <div className="">
        <Button onClick={Fol}>{checkFollow ? "Unfollow" : "Follow"}</Button>
      </div>
    </>
  );
}

export default Followbtn;
