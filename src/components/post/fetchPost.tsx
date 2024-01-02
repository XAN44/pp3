import { FetchUserPost, Fetchusercomment } from "@/lib/actions/user.post";
import React, { useEffect, useState } from "react";
import { getCurrentUser } from "@/lib/session";
import PostCard from "./postCard";
import { useWatch } from "react-hook-form";

export default async function FetchPost() {
  const posts = await FetchUserPost();

  return (
    <>
      <div className="">
        <div className="">
          {posts?.map((post) => (
            <PostCard
              key={post.id}
              id={post.id}
              content={post.content}
              ImagePost={post.ImagePost}
              authorId={post.authorId}
              createAt={new Date(post.createdAt).toLocaleString()}
              author={post.author}
              comments={post.comments}
            />
          ))}
        </div>
      </div>
    </>
  );
}
