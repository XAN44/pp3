"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { POSTARTILE } from "@/lib/actions/user.article";
import { useUploadThing } from "@/lib/uploadthing";
import { isBase64Image } from "@/lib/utils";
import { ArticlePost } from "@/lib/validations/Userpost";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { CiImageOn } from "react-icons/ci";
import * as z from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Toast } from "../ui/toast";

interface Props {
  accountId: string;
  authUserId: string;
  title: string;
  articleContent: string;
  ArticleImage: string;
  path: string;
  tag: string;
}

export default function ArticleForm({
  accountId,
  authUserId,
  title,
  articleContent,
  ArticleImage,
  path,
  tag,
}: Props) {
  const [files, setFiles] = useState<File[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const { startUpload } = useUploadThing("media");
  const [isLoading, setIsloading] = useState(false);
  const [isText, setIsText] = useState("บันทึก");
  const [imageSelected, setImageSelected] = useState(false);

  const pathname = usePathname();
  const postArticle = useForm<z.infer<typeof ArticlePost>>({
    resolver: zodResolver(ArticlePost),
    defaultValues: {},
  });

  const onSubmitPost = async (values: z.infer<typeof ArticlePost>) => {
    setIsloading(true);

    const blob = values.articleImage;
    if (blob) {
      const hasImageChange = isBase64Image(blob);
      if (hasImageChange) {
        const imgRes = await startUpload(files);
        if (imgRes && imgRes[0].url) {
          values.articleImage = imgRes[0].url;
        }
      }
    }

    await POSTARTILE({
      authorId: authUserId,
      title: values.title ? String(values.title) : "",
      articleContent: values.articleContent
        ? String(values.articleContent)
        : "",
      ArticleImage: values.articleImage ? String(values.articleImage) : "",
      tag: values.tag ? String(values.tag) : "",
      path: pathname,
    });
    Toast({
      title: "Creat Article success",
    });
    setIsloading(false);
    setIsText("บันทึกสำเร็จ");
  };

  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (Value: string) => void
  ) => {
    e.preventDefault();
    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFiles(Array.from(e.target.files));
      if (!file.type.includes("image")) return;

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || " ";

        setSelectedImage(imageDataUrl);
        fieldChange(imageDataUrl);
        setImageSelected(true);
      };
      fileReader.readAsDataURL(file);
    }
  };

  return (
    <>
      {accountId === authUserId && (
        <Dialog>
          <DialogTrigger>Create Article</DialogTrigger>
          <DialogContent className="grid items-center justify-center text-center">
            <DialogHeader>
              <DialogTitle> เพิ่มเนื้อหาของคุณ ! </DialogTitle>
              <DialogDescription> เพิิ่มเนื้อหาของคุณได้เลย </DialogDescription>
            </DialogHeader>

            <div className=" ">
              <Form {...postArticle}>
                <form
                  onSubmit={postArticle.handleSubmit(onSubmitPost)}
                  className="flex flex-col justify-center gap-10 text-center">
                  <FormField
                    control={postArticle.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem className="flex flex-col gap-3 ">
                        <FormLabel> TITLE </FormLabel>
                        <FormControl className=" border border-dark-4">
                          <Input
                            className=" ring-1 ring-black resize-none bg-base-300 rounded-lg w-full pl-3 pr-3 pt-3"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={postArticle.control}
                    name="articleContent"
                    render={({ field }) => (
                      <FormItem className="flex flex-col gap-3 ">
                        <FormLabel> CONTENT </FormLabel>

                        <FormControl className=" border border-dark-4">
                          <textarea
                            rows={10}
                            className="resize-none bg-base-300 rounded-lg w-96 pl-3 pr-3 pt-3 ring-1 ring-black"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={postArticle.control}
                    name="tag"
                    render={({ field }) => (
                      <FormItem className="flex flex-col gap-3 ">
                        <FormLabel> HASHTAG </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}>
                          <FormControl className=" border border-dark-4">
                            <SelectTrigger>
                              <SelectValue placeholder="select hashtag" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="ท่องเที่ยว">
                              ท่องเที่ยว
                            </SelectItem>
                            <SelectItem value="อาหาร">อาหาร</SelectItem>
                            <SelectItem value="อื่นๆ">อื่นๆ</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          คุณสามารถเลือกแท็กเพื่อโพสต์แสดงไปยังเนื้อหาที่เกี่ยวข้องได้
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={postArticle.control}
                    name="articleImage"
                    render={({ field }) => (
                      <FormItem className="flex w-full flex-col gap-2  items-center justify-center ">
                        <FormLabel className="text-base-semibold text-light-2"></FormLabel>
                        <FormControl>
                          <label
                            htmlFor="file-upload"
                            className="flex gap-2 cursor-pointer w-12">
                            <input
                              id="file-upload"
                              type="file"
                              className="hidden w-5 "
                              accept="image/*"
                              placeholder="add post photo"
                              onChange={(e) => handleImage(e, field.onChange)}
                            />
                            <CiImageOn size={30} id="file-upload" />
                          </label>
                        </FormControl>
                        <Image
                          src={selectedImage}
                          alt="image post"
                          width={100}
                          height={100}
                          style={{ display: imageSelected ? "block" : "none" }}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="mt-3" disabled={isLoading}>
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
                </form>
              </Form>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
