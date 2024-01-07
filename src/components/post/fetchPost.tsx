import { FetchUserPost } from "@/lib/actions/user.post";
import PostCard from "./postCard";

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
