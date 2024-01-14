import { Avatar, Text } from "@radix-ui/themes";
import Link from "next/link";
import { AiFillInstagram } from "react-icons/ai";
import { FaFacebook, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Followbtn from "../follow/followbtn";

interface Props {
  accountId: string;
  authUserId: string;
  name: string;
  nickname: string;
  image: string;
  bio: string;
  totalFollower: number;
  totalFollowing: number;
  isFollow: boolean;
  contact: {
    facebook: string;
    ig: string;
    twitter: string;
    tiktok: string;
  };
}

function ProfileHeader({
  accountId,
  authUserId,
  name,
  nickname,
  image,
  bio,
  totalFollower,
  totalFollowing,
  isFollow,
  contact,
}: Props) {
  return (
    <>
      <div className="card bg-base-200 w-full grid grid-flow-row items-center justify-center place-items-center ">
        {/* TOTOD:AVATAR */}
        <div className="flex">
          <Avatar
            size="8"
            fallback={name}
            src={image}
            radius="full"
            className="ring-1 ring-black"
          />
        </div>
        <div className="justify-center items-center text-center place-items-center">
          <Text size="3" weight="regular" as="div">
            {name}
          </Text>
          {nickname && nickname ? (
            <Text size="2">@{nickname}</Text>
          ) : (
            <Text size="2">@Dont have nickname</Text>
          )}
        </div>
        <div className="">
          <Text>{bio}</Text>
        </div>
        {accountId !== authUserId && (
          <Followbtn
            key={authUserId}
            ProfileId={accountId}
            isFollowing={authUserId}
            checkFollow={isFollow}
          />
        )}

        <div className="text-center items-center justify-center placeitemce ring-1 ring-black">
          {/* Facebook contact */}
          {contact.facebook && (
            <Link href={contact.facebook}>
              <div className="flex items-center justify-center place-items-center">
                <Text>FACEBOOK : </Text>
                <FaFacebook />
              </div>
            </Link>
          )}
          {/* IG contact */}

          {contact?.ig && (
            <Link href={contact.ig}>
              <div className="flex items-center justify-center place-items-center">
                <Text>INSTAGRAM : </Text>
                <AiFillInstagram />
              </div>
            </Link>
          )}
          {/* Tiktok contact */}

          {contact.tiktok && (
            <Link href={contact.tiktok}>
              <div className="flex items-center justify-center place-items-center">
                <Text>TIKTOK : </Text>
                <FaTiktok />
              </div>
            </Link>
          )}
          {/* Twitter contact */}

          {contact.twitter && (
            <Link href={contact.twitter}>
              <div className="flex items-center justify-center place-items-center">
                <Text>TWITTER : </Text>
                <FaXTwitter />
              </div>
            </Link>
          )}
        </div>

        <div className="flex">
          <Text>Follower {totalFollower}</Text>
          <Text>Following {totalFollowing}</Text>
        </div>
      </div>
    </>
  );
}

export default ProfileHeader;
