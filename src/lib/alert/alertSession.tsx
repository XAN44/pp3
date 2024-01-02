"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useSession } from "next-auth/react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";

export function AlertAuth() {
  const { data: session, status } = useSession();

  if (status === "unauthenticated") {
    return (
      <>
        <Alert variant={"destructive"} className="w-80 h-24">
          <ExclamationTriangleIcon className="h-4 w-4" />
          <AlertTitle> โปรดทราบ </AlertTitle>
          <AlertDescription>คุณต้องเข้าสู่ระบบก่อนใช้งาน</AlertDescription>
          <Link href="/sign-in" className="ml-44 w-3 ">
            <Button variant={"destructive"}>รับทราบ</Button>
          </Link>
        </Alert>
      </>
    );
  }
  if (status === "loading") {
    return (
      <>
        <span className="loading loading-spinner "></span>
      </>
    );
  }
}
