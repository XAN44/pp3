"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { HandMetal } from "lucide-react";
import Link from "next/link";
import UserAccountnav from "./UserAccountnav";

import { useSession } from "next-auth/react";
import { ImgProfilee } from "./profile-image/imgProfile";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function Navbar() {
  const { data: session, status, update } = useSession();

  if (status === "unauthenticated") {
    return (
      <>
        <div className=" bg-zinc-100 py-2 border-b border-s-zinc-200 fixed w-full z-10 top-0">
          <div className="container flex items-center justify-between ">
            <Link href="/">
              <HandMetal />
            </Link>
            {/* <ModeToggle /> */}

            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src="defaultAvatar.png" />
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuSeparator />

                <DropdownMenu>
                  <DropdownMenuLabel className="text-center">
                    Unknow
                    <DropdownMenuShortcut className="text-red-600">
                      (Plse login)
                    </DropdownMenuShortcut>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link href="/sign-in">
                    <DropdownMenuItem>Sign in</DropdownMenuItem>
                  </Link>
                </DropdownMenu>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </>
    );
  }

  if (status === "authenticated") {
    return (
      <>
        <div className=" bg-zinc-100 py-2 border-b border-s-zinc-200 fixed w-full z-10 top-0">
          <div className="container flex items-center justify-between ">
            <Link href="/">
              <HandMetal />
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger>
                {session && session.user && session.user.image ? (
                  <Avatar>
                    <AvatarImage src={session.user.image}></AvatarImage>
                  </Avatar>
                ) : (
                  <Avatar>
                    <AvatarImage src="defaultAvatar.png" />
                  </Avatar>
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuSeparator />

                {session?.user ? (
                  <DropdownMenu>
                    <DropdownMenuLabel className="text-center">
                      {session.user.name}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <Link href="/profile">
                        <DropdownMenuItem>
                          Profile
                          <DropdownMenuShortcut>(โปรไฟล์)</DropdownMenuShortcut>
                        </DropdownMenuItem>
                      </Link>
                      <Link href="/profile/cart">
                        <DropdownMenuItem>
                          Cart
                          <DropdownMenuShortcut>(ตระกร้า)</DropdownMenuShortcut>
                        </DropdownMenuItem>
                      </Link>
                      <DropdownMenuItem>
                        <ImgProfilee
                          user={{
                            image: "",
                            id: "",
                            bio: "",
                            nickname: "",
                            name: "",
                          }}
                        />
                        <DropdownMenuShortcut>(ตั้งค่า)</DropdownMenuShortcut>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <UserAccountnav />
                    </DropdownMenuGroup>
                  </DropdownMenu>
                ) : (
                  <DropdownMenu>
                    <DropdownMenuLabel className="text-center">
                      Unknow
                      <DropdownMenuShortcut className="text-red-600">
                        (Plse login)
                      </DropdownMenuShortcut>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <Link href="/sign-in">
                      <DropdownMenuItem>Sign in</DropdownMenuItem>
                    </Link>
                  </DropdownMenu>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </>
    );
  }
}
