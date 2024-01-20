import { Container, Flex, Grid, Text } from '@radix-ui/themes'
import Image from 'next/image'
import Link from 'next/link'
import { FaCommentDots } from 'react-icons/fa'
import { Avatar, AvatarImage } from '../ui/avatar'
import Likebtn from './likebtn'
import VisitBtn from '../visit/visitBtn'

interface Props {
  id: string
  content: string | null
  current: string
  ImagePost: string | null
  authorId: string | null
  createAt: string
  author: {
    id: string
    name: string | null
    image: string | null
  } | null
  comments: {
    id: string
    text: string
    author: {
      id: string
      name: string | null
      image: string | null
    } | null
  }[]
  isComment?: boolean
  checkLike: boolean
  totalLike: number
  totalVisit: number
}

const PostCard = ({
  id,
  content,
  ImagePost,
  author,
  createAt,
  authorId,
  comments,
  current,
  isComment,
  checkLike,
  totalLike,
  totalVisit,
}: Props) => {
  return (
    <Container
      size="4"
      p="6"
      className={`flex w-full flex-col rounded-xl ${
        isComment ? 'xs:px-7 px-0' : 'bg-dark-2 p-7'
      }`}
    >
      <Flex gap="3">
        <Link href={`/profile/${author?.id}`}>
          <Avatar className="h-14 w-14">
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
        <Grid align="start" gap="4">
          <Flex direction="column">
            <Link href={`/profile/${author?.id}`} className="">
              <Text size="7">{author && author.name}</Text>
            </Link>
            <Text size="1">{createAt}</Text>
          </Flex>
        </Grid>
      </Flex>
      <div className="mb-10 mt-3 w-[560px]">
        <p>{content}</p>
      </div>
      <div className="">
        {ImagePost && (
          <Image
            className="
            artboard
            artboard-horizontal 
            phone-2 rounded-xl object-fill"
            src={ImagePost}
            alt="image"
            width={1920}
            height={1080}
            quality={100}
          />
        )}
      </div>
      <div className="flex place-items-center items-center justify-start">
        <Link href={`/post/${id}`}>
          <FaCommentDots className="cursor-pointer" />
        </Link>
        <Likebtn key={id} postId={id} userId={current} checkLike={checkLike} />
        <div className="space-x-2">
          <Text>Total Like</Text>
          <Text>{totalLike}</Text>
        </div>
      </div>
      {!isComment && comments.length > 0 && (
        <div className="ml-1 mt-3 flex items-center gap-2">
          {comments.slice(0, 2).map((comment, index) => (
            <Image
              key={index}
              src={comment.author?.image || ''}
              alt={`user_${index}`}
              width={24}
              height={24}
              className={`${index !== 0 && '-ml-5'} rounded-full object-cover`}
            />
          ))}

          <Link href={`/post/${id}`}>
            <p className="text-subtle-medium text-gray-1 mt-1">
              {comments.length} repl{comments.length > 1 ? 'ies' : 'y'}
            </p>
          </Link>
        </div>
      )}
      <VisitBtn pageId={id} userId={author?.id || ''} />

      <p>ยอดผู้เข้าชม {totalVisit}</p>
    </Container>
  )
}

export default PostCard
