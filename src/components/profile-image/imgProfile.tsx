"use client";

import * as z from "zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useUploadThing } from "@/lib/uploadthing";
import { isBase64Image } from "@/lib/utils";
import { getCurrentUser } from "@/lib/session";
import { useSession } from "next-auth/react";
import {
  UserBio,
  UserName,
  UserNickName,
  FOrmImage,
} from "@/lib/validations/user";
import {
  updateBio,
  updateImage,
  updateName,
  updateNickname,
} from "@/lib/actions/user.action";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AvatarImage } from "../ui/avatar";
import { Avatar } from "@radix-ui/react-avatar";
import { toast } from "../ui/use-toast";
import { UpdateSession } from "@/lib/updateSession";
import { Loader2 } from "lucide-react";

interface Props {
  user: {
    image: string;
    id: string;
    bio: string;
    nickname: string;
    name: string;
  };
}
export function ImgProfilee({ user }: Props) {
  const pathname = usePathname();
  const { data: session, status, update } = useSession();
  const { startUpload } = useUploadThing("media");
  const [isLoading, setIsloading] = useState(false);
  const [isText, setIsText] = useState("บันทึก");

  const [files, setFiles] = useState<File[]>([]);

  const imageform = useForm<z.infer<typeof FOrmImage>>({
    resolver: zodResolver(FOrmImage),
    defaultValues: {
      image: user?.image ? user.image : "",
    },
  });
  const bioForm = useForm<z.infer<typeof UserBio>>({
    resolver: zodResolver(UserBio),
    defaultValues: {
      bio: user?.bio ? user.bio : "",
    },
  });
  const nameForm = useForm<z.infer<typeof UserName>>({
    resolver: zodResolver(UserName),
    defaultValues: {
      name: user?.name ? user.name : " ",
    },
  });
  const nicknameForm = useForm<z.infer<typeof UserNickName>>({
    resolver: zodResolver(UserNickName),
    defaultValues: {
      nickname: user?.nickname ? user.nickname : " ",
    },
  });

  const onSubmitImg = async (values: z.infer<typeof FOrmImage>) => {
    setIsloading(true);
    const blob = values.image;

    const hasImageChanged = isBase64Image(blob);
    if (hasImageChanged) {
      const imgRes = await startUpload(files);

      if (imgRes && imgRes[0].url) {
        values.image = imgRes[0].url;
      }
    }

    await updateImage({
      userId: user?.id,
      image: values.image,
      path: pathname,
    });
    toast({
      title: "อัพเดทโปรไฟล์สําเร็จ",
      description: "อัพเดทโปรไฟล์สําเร็จ",
      variant: "default",
    });
    update({
      image: values.image,
    });
    setIsloading(false);
    setIsText("บันทึกสำเร็จ");
  };

  const onSubmitBio = async (values: z.infer<typeof UserBio>) => {
    await updateBio({
      userId: user?.id,
      path: pathname,
      bio: values.bio,
    });

    toast({
      title: "อัพเดท BIO สำเร็จ",
      description: "อัพเดทโปรไฟล์สําเร็จ",
      variant: "default",
    });
    update({
      bio: values.bio,
    });
  };

  const onSubmitName = async (values: z.infer<typeof UserName>) => {
    await updateName({
      userId: user?.id,
      name: values.name,
      path: pathname,
    });
    toast({
      title: "อัพเดท name สำเร็จ",
      description: "อัพเดทโปรไฟล์สําเร็จ",
      variant: "default",
    });
    update({
      name: values.name,
    });
  };

  const onSubmitNickname = async (values: z.infer<typeof UserNickName>) => {
    await updateNickname({
      userId: user?.id,
      nickname: values.nickname,
      path: pathname,
    });
    toast({
      title: "อัพเดท BIO สำเร็จ",
      description: "อัพเดทโปรไฟล์สําเร็จ",
      variant: "default",
    });
    update({
      nickname: values.nickname,
    });
  };

  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault();

    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFiles(Array.from(e.target.files));

      if (!file.type.includes("image")) return;

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";
        fieldChange(imageDataUrl);
      };

      fileReader.readAsDataURL(file);
    }
  };

  if (status === "authenticated") {
    return (
      <>
        <Dialog>
          <DialogTrigger>ตั้งค่า</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle> ตั้งค่าโปรไฟล์ </DialogTitle>
              <DialogDescription>แก้ไขเนื้อหาของคุณได้</DialogDescription>
            </DialogHeader>

            <Dialog>
              <DialogTrigger>เปลี่ยรูปโปรไฟล์</DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>เปลี่ยนรูปโปรไฟล์</DialogTitle>
                  <DialogDescription>เลือกรูปโปรไฟล์ของคุณ</DialogDescription>
                </DialogHeader>
                <Form {...imageform}>
                  <form onSubmit={imageform.handleSubmit(onSubmitImg)}>
                    <FormField
                      control={imageform.control}
                      name="image"
                      render={({ field }) => (
                        <FormItem className="">
                          <FormLabel
                            className="
                          grid
                          justify-items-center
                          mb-6
                        "
                          >
                            <Avatar className="w-40 ">
                              {field.value ? (
                                <AvatarImage
                                  src={field.value}
                                  alt="profile_icon"
                                  className="rounded-full object object-contain"
                                />
                              ) : (
                                <AvatarImage
                                  src="/defaultAvatar.png"
                                  alt="profile_icon"
                                  className="object-contain rounded-full"
                                />
                              )}
                            </Avatar>
                          </FormLabel>
                          <FormControl className="">
                            <Input
                              type="file"
                              accept="image/*"
                              placeholder="Add profile photo"
                              className="hidden"
                              onChange={(e) => handleImage(e, field.onChange)}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <DialogFooter>
                      <Button
                        type="submit"
                        className="mt-3"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <Button disabled>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Please wait
                            </Button>
                          </>
                        ) : (
                          isText
                        )}
                      </Button>
                    </DialogFooter>
                    {/* เปลี่ยนชื่อเล่น */}
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger>เปลี่ยนชื่อ</DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>เปลี่ยนชื่อของคุณ</DialogTitle>
                  <DialogDescription>ชื่อของคุณ</DialogDescription>
                </DialogHeader>
                <Form {...nameForm}>
                  <form onSubmit={nameForm.handleSubmit(onSubmitName)}>
                    <FormField
                      control={nameForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm">ชื่อ</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="ชื่อ"
                              className="w-full"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="mt-3">
                      บันทึก
                    </Button>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger>เปลี่ยนชื่อเล่น</DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>เปลี่ยนชื่อเล่นของคุณ</DialogTitle>
                  <DialogDescription>ชื่อเล่นของคุณ</DialogDescription>
                </DialogHeader>
                <Form {...nicknameForm}>
                  <form onSubmit={nicknameForm.handleSubmit(onSubmitNickname)}>
                    <FormField
                      control={nicknameForm.control}
                      name="nickname"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm">ชื่อเล่น</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="ชื่อเล่น"
                              className="w-full"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="mt-3">
                      บันทึก
                    </Button>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger>เปลี่ยนประวัติสังเขป</DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>เปลี่ยนชื่อประวัติสังเขปของคุณ</DialogTitle>
                  <DialogDescription>ประวัติของคุณ</DialogDescription>
                </DialogHeader>
                <Form {...bioForm}>
                  <form onSubmit={bioForm.handleSubmit(onSubmitBio)}>
                    <FormField
                      control={bioForm.control}
                      name="bio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm">Bio</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Bio"
                              className="w-full"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="mt-3">
                      บันทึก
                    </Button>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </DialogContent>
        </Dialog>
      </>
    );
  }
}
