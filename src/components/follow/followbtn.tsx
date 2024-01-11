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
    try {
      if (checkFollow) {
        await fetch("/api/follow", {
          method: "DELETE",
          body: JSON.stringify({
            Follower: ProfileId,
            following: isFollowing,
            path: path,
          }),
        });
      } else {
        await fetch("/api/follow", {
          method: "POST",
          body: JSON.stringify({
            follower: ProfileId,
            following: isFollowing,
            path: path,
          }),
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="">
        <Button onClick={onFollow}>
          {checkFollow ? "Unfollow" : "Follow"}
        </Button>
        {/*    <label className="swap" onClick={onFollow}>
          <input type="checkbox" />
          <div className="swap-on">Unfollow</div>
          <div className="swap-off">follow</div>
        </label> */}
      </div>
    </>
  );
}

export default Followbtn;
