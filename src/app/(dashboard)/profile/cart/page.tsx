"use client";
import PostCard from "@/components/post/postCard";
import { FetchUserPost } from "@/lib/actions/user.post";
import React, { useState, useEffect } from "react";

export default function Cart() {
  const [post, setPost] = useState<any[]>([]);
  async function getPost() {
    try {
      const res = await FetchUserPost();
      if (!res) {
        console.log("ไม่มีโพสต์");
      } else {
        if (res && Array.isArray(res)) {
          setPost(res);
        }
      }
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  }

  // Call getPost function when the component mounts
  useEffect(() => {
    getPost();
  }, []);
  return (
    <div>
      {post.map((post) => (
        <PostCard
          key={post.id}
          id={post.id}
          content={post.content}
          authorId={post.authorid}
          createAt={""}
          author={post || { id: "", name: "", nickname: "", image: "" }}
        />
      ))}
    </div>
  );
}
