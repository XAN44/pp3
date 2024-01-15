"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { replyComments } from "@/lib/actions/user.comment";
import { replyComment } from "@/lib/validations/Userpost";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "../ui/button";

interface Props {
  commentId: string;
  currentUserImage: string;
  currentUserId: string;
}

export default function Reply({
  commentId,
  currentUserImage,
  currentUserId,
}: Props) {
  const [replyVisible, setReplyVisible] = useState(false);

  const handleShowReply = () => {
    setReplyVisible(true);
  };

  const handleHideReply = () => {
    setReplyVisible(false);
  };

  const path = usePathname() ?? "";

  const replyForm = useForm<z.infer<typeof replyComment>>({
    resolver: zodResolver(replyComment),
    defaultValues: {
      reply: "",
    },
  });

  const onSubmitReply = async (values: z.infer<typeof replyComment>) => {
    await replyComments(
      commentId,
      values.reply,
      JSON.parse(currentUserId),
      path,
    );
  };

  return (
    <>
      {!replyVisible && <button onClick={handleShowReply}>Reply</button>}
      {replyVisible && (
        <>
          <button onClick={handleHideReply}>Hidden</button>
          <Form {...replyForm}>
            <form
              onSubmit={replyForm.handleSubmit(onSubmitReply)}
              className="flex justify-center text-center"
            >
              <FormField
                control={replyForm.control}
                name="reply"
                render={({ field }) => (
                  <FormItem className="flex w-full items-center gap-3">
                    <FormLabel>
                      <Image
                        src={currentUserImage}
                        alt="profile"
                        width={48}
                        height={48}
                        className="rounded-full object-cover"
                      />
                    </FormLabel>

                    <FormControl className="border-none">
                      <input
                        placeholder="reply.."
                        className="bg-base-300 rounded-lg w-full p-3"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-32 ml-3 mt-1 flex">
                reply
              </Button>
            </form>
          </Form>
        </>
      )}
    </>
  );
}
