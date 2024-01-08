import Image from "next/image";

interface Props {
  accountId: string;
  authUserId: string;
  name: string;
  nickname: string;
  image: string;
  bio: string;
  totalFollower: number;
  totalFollowing: number;
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
}: Props) {
  return (
    <div className="flex w-full flex-col justify-start">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative h-20 w-20 object-cover">
            <Image
              src={image}
              alt="logo"
              fill
              className="rounded-full object-cover shadow-2xl"
            />
          </div>

          <div className="flex-1">
            <h2 className="text-left text-heading3-bold text-light-1">
              {name}
            </h2>
            <p className="text-base-medium text-gray-1">@{nickname}</p>
          </div>
        </div>
      </div>
      <p>{bio}</p>
      <div className="flex">
        <div>Follower {totalFollower}</div>
        <div>Following {totalFollowing}</div>
      </div>
    </div>
  );
}

export default ProfileHeader;
