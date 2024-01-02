import Image from "next/image";
import Link from "next/link";
import { AvatarImage, Avatar } from "../ui/avatar";
import { classNames } from "uploadthing/client";
import { Code, Container, Flex, Grid, Text } from "@radix-ui/themes";
import { FaCommentDots } from "react-icons/fa";

interface Props {
  id: string;
  content: string | null;
  ImagePost: string | null;
  authorId: string | null;
  createAt: string;
  author: {
    id: string;
    name: string | null;
    image: string | null;
  } | null;
  comments: {
    id: string;
    text: string;
    author: {
      id: string;
      name: string | null;
      image: string | null;
    } | null;
  }[];
  isComment?: boolean;
}

const PostCard = ({
  id,
  content,
  ImagePost,
  author,
  createAt,
  authorId,
  comments,
  isComment,
}: Props) => {
  return (
    <Container
      size="4"
      p="6"
      className={`flex w-full flex-col rounded-xl ${
        isComment ? "px-0 xs:px-7" : "bg-dark-2 p-7"
      }`}
    >
      <Flex gap="3">
        <Link href={`/profile/${author?.id}`}>
          <Avatar className="w-14 h-14">
            {author?.image && (
              <AvatarImage
                src={author?.image}
                alt="profileImage"
                width={100}
                height={100}
              />
            )}
          </Avatar>
        </Link>
        <Grid align="start" gap="3">
          <Flex direction="column">
            <Link href={`/profile/${author?.id}`} className="">
              <Text size="7">{author && author.name}</Text>
            </Link>
            <Text size="1">{createAt}</Text>
          </Flex>
        </Grid>
      </Flex>
      <div className="mt-3 mb-10 w-[560px]">
        <p>{content}</p>
      </div>
      <div className="">
        {ImagePost && (
          <Image
            className="
            object-fill
            artboard 
            artboard-horizontal phone-2 rounded-xl"
            src={ImagePost}
            alt="image"
            width={1920}
            height={1080}
            quality={100}
          />
        )}
      </div>
      <div className="">
        <Link href={`/post/${id}`}>
          <FaCommentDots className="cursor-pointer" />
        </Link>
      </div>

      {!isComment && comments.length > 0 && (
        <div className="ml-1 mt-3 flex items-center gap-2">
          {comments.slice(0, 2).map((comment, index) => (
            <Image
              key={index}
              src={comment.author?.image || ""}
              alt={`user_${index}`}
              width={24}
              height={24}
              className={`${index !== 0 && "-ml-5"} rounded-full object-cover`}
            />
          ))}

          <Link href={`/post/${id}`}>
            <p className="mt-1 text-subtle-medium text-gray-1">
              {comments.length} repl{comments.length > 1 ? "ies" : "y"}
            </p>
          </Link>
        </div>
      )}
    </Container>
  );
};

export default PostCard;
