"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CommentInPost } from "@/lib/actions/user.comment";
import { commentPost } from "@/lib/validations/Userpost";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "../ui/button";

interface Props {
  postId: string;
  currentUserImage: string;
  currentUserId: string;
}

export default function Comment({
  postId,
  currentUserImage,
  currentUserId,
}: Props) {
  const path = usePathname() ?? "";

  const commentTimeLine = useForm<z.infer<typeof commentPost>>({
    resolver: zodResolver(commentPost),
    defaultValues: {
      comment: "",
    },
  });

  const onSubmitPost = async (values: z.infer<typeof commentPost>) => {
    await CommentInPost(
      postId,
      values.comment,
      JSON.parse(currentUserId),
      path,
    );
  };

  return (
    <div className="">
      <Form {...commentTimeLine}>
        <form
          onSubmit={commentTimeLine.handleSubmit(onSubmitPost)}
          className="
            flex  
            justify-center 
             text-center "
        >
          <FormField
            control={commentTimeLine.control}
            name="comment"
            render={({ field }) => (
              <FormItem
                className="
                flex w-full 
                items-center 
                gap-3 "
              >
                <FormLabel>
                  <Image
                    src={currentUserImage}
                    alt="profile"
                    width={48}
                    height={48}
                    className="rounded-full object-cover"
                  />
                </FormLabel>

                <FormControl
                  className="
                 border-none
                  "
                >
                  <input
                    placeholder="Comment.."
                    className=" 
                    bg-base-300
                     rounded-lg w-full p-3"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-32 ml-3 mt-1 flex">
            Comment
          </Button>
        </form>
      </Form>
    </div>
  );
}
