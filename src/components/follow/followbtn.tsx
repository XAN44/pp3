"use client";
import { Follower } from "@/lib/actions/user.follow";
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
    await Follower(ProfileId, isFollowing, path);
    console.log();
  };
  return (
    <>
      <div className="">
        <Button onClick={onFollow}>
          {checkFollow ? "Unfollow" : "Follow"}{" "}
        </Button>
      </div>
    </>
  );
}

export default Followbtn;
