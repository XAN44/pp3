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
          <Text size="2">@{nickname}</Text>
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

        {/* Facebook contact */}
        {contact && contact.facebook ? (
          <div className="flex items-center justify-center place-items-center">
            <Text>FACEBOOK : </Text>
            <Link href={contact.facebook}>
              <FaFacebook />
            </Link>
          </div>
        ) : (
          <div className="">Facebook : ยังไม่มีช่องทางติดตาม</div>
        )}
        {/* IG contact */}

        {contact && contact.ig ? (
          <div className="flex items-center justify-center place-items-center">
            <Text>INSTAGRAM : </Text>
            <Link href={contact.facebook}>
              <AiFillInstagram />
            </Link>
          </div>
        ) : (
          <div className="">IG : ยังไม่มีช่องทางติดตาม</div>
        )}
        {/* Tiktok contact */}

        {contact && contact.tiktok ? (
          <div className="flex items-center justify-center place-items-center">
            <Text>TIKTOK : </Text>
            <Link href={contact.facebook}>
              <FaTiktok />
            </Link>
          </div>
        ) : (
          <div className="">Tiktok : ยังไม่มีช่องทางติดตาม</div>
        )}
        {/* Twitter contact */}

        {contact && contact.twitter ? (
          <div className="flex items-center justify-center place-items-center">
            <Text>TWITTER : </Text>
            <Link href={contact.facebook}>
              <FaXTwitter />
            </Link>
          </div>
        ) : (
          <div className=""> Twitter : ยังไม่มีช่องทางติดตาม</div>
        )}
        <div className="flex">
          <Text>Follower {totalFollower}</Text>
          <Text>Following {totalFollowing}</Text>
        </div>
      </div>
    </>
  );
}

export default ProfileHeader;
