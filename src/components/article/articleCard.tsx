import { Flex, Grid, Text } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";
import { FaCommentDots } from "react-icons/fa";
import { Avatar, AvatarImage } from "../ui/avatar";

interface Props {
  id: string;
  title: string | null;
  articleContent: string | null;
  ArticleImage: string | null;
  createAt: string;
  tag: {
    id: string | null;
    tag: string | null;
  }[];
  authorId: string | null;
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

export default function ArticleCard({
  id,
  title,
  articleContent,
  ArticleImage,
  tag,
  author,
  authorId,
  comments,
  createAt,
  isComment,
}: Props) {
  return (
    <div className="card bg-base-200 mb-3 w-96">
      <figure>
        {ArticleImage && (
          <Image
            className="
             rounded-xl
            "
            src={ArticleImage}
            alt="image"
            width={386}
            height={100}
          />
        )}
      </figure>
      <div className="mt-3 mb-10  card-body">
        <div className="card-title">
          <p>{title}</p>
        </div>
        <p>{articleContent}</p>

        <Flex gap="3">
          <Link href={`/profile/${author?.id}`}>
            <Avatar className="w-14 h-14">
              {author?.image && (
                <AvatarImage
                  src={author?.image || ""}
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
              <div className="flex place-items-center text-center justify-center items-center gap-3">
                <Text size="1">{createAt}</Text>
                {tag.map((tag) => (
                  <h1 key={tag.id}>#{tag.tag}</h1>
                ))}
              </div>
            </Flex>
          </Grid>
        </Flex>
        <div className="">
          <Link href={`/article/${id}`}>
            <FaCommentDots className="cursor-pointer" />
          </Link>
        </div>

        {!isComment && comments.length > 0 && (
          <div className="ml-1 mt-3 flex items-center gap-5">
            {comments.slice(0, 2).map((comment, index) => (
              <>
                <Image
                  key={index}
                  src={comment.author?.image || ""}
                  alt={`user_${index}`}
                  width={24}
                  height={24}
                  className={`${
                    index !== 0 && "-ml-5"
                  } rounded-full object-cover`}
                />
              </>
            ))}

            <Link href={`/article/${id}`}>
              <p className="mt-1 text-subtle-medium text-gray-1">
                {comments.length} repl{comments.length > 1 ? "ies" : "y"}
              </p>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
