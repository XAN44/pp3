import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
export default function ImageProfile() {
  const { data: session, status } = useSession();
  const [profile, setProfile] = useState();

  const fetchProfile = async () => {
    try {
      const response = await fetch("/api/uploadProfile");
      const data = await response.json();
      setProfile(data.user.image || "ไม่มีรูปภาพ");
    } catch (error) {}
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (status === "authenticated") {
    return (
      <>
        <div className="">
          <Avatar>
            <Image
              src={`data:image/png;base64,${profile}`}
              alt="Profile"
              width={100}
              height={100}
            />
          </Avatar>
        </div>
      </>
    );
  }
}
