"use client";

import { Follower, unFollower } from "@/lib/actions/user.follow";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  follower: string;
  following: string;
  isFollower: boolean;
}
export default function Follow({ follower, following, isFollower }: Props) {
  const path = usePathname() ?? "";
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    setIsFollowing(isFollower);
  }, [isFollower]);

  const handleFollower = async () => {
    try {
      if (isFollowing) {
        await unFollower(following, JSON.parse(follower), path);
        setIsFollowing(false);
        console.log("Unfollowed successfully");
      } else {
        await Follower(following, JSON.parse(follower), path);
        setIsFollowing(true);
        console.log("Started following successfully");
      }
    } catch (error) {
      console.error(error);
    }
  };

  async function followUser() {
    try {
      const response = await fetch("/api/follow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          accountId: JSON.parse(follower),
          currentId: following,
          path,
        }),
      });

      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage?.error || "Failed to follow user");
      }

      setIsFollowing(!isFollowing); // Toggle the state when successful
      console.log("Followed user successfully");
    } catch (error: any) {
      console.error("Error following user:", error.message);
      // Handle error scenarios here
    }
  }

  return (
    <div className="">
      <button onClick={followUser}>
        {isFollowing ? "Unfollow" : "Follow"}
      </button>
    </div>
  );
}
