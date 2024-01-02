import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Toast } from "@radix-ui/react-toast";
import { toast } from "../ui/use-toast";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Avatar, AvatarImage } from "../ui/avatar";
import { CldUploadButton } from "next-cloudinary";

export function ASd() {
  const { data: session, status } = useSession();
  const [file, setFile] = React.useState<File>();

  const onsubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    try {
      const data = new FormData();
      data.set("file", file);

      const res = await fetch("/api/uploadProfile", {
        method: "POST",
        body: data,
      });

      if (res.ok) {
        toast({
          title: "สำเร็จ!",
          description: "อัพโหลดรูปภาพสำเร็จ",
          variant: "default",
        });
      }
    } catch (e: any) {
      toast({
        title: "ผิดพลาด!",
        description: e.message,
        variant: "destructive",
      });
    }
  };

  if (status === "authenticated") {
    return (
      <>
        <div className="">
          <CldUploadButton uploadPreset="uhlc9xfr" className="">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
            </div>
            <h1>Upload</h1>
          </CldUploadButton>
        </div>
      </>
    );
  }
}
