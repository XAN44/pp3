"use client";

import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import {
  DropdownMenuShortcut,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
const UserAccountnav = () => {
  return (
    <DropdownMenuItem className=" ">
      <Button
        onClick={() =>
          signOut({
            redirect: true,
            callbackUrl: `${window.location.origin}/sign-in`,
          })
        }
      >
        Log Out
      </Button>
    </DropdownMenuItem>
  );
};

export default UserAccountnav;
