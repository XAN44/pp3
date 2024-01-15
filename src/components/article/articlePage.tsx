import { Flex, Heading, Text } from '@radix-ui/themes'
import Image from 'next/image'
import Link from 'next/link'
import { Avatar, AvatarImage } from '../ui/avatar'

interface Props {
  id: string
  title: string | null
  articleContent: string | null
  ArticleImage: string | null
  createAt: string
  tag: {
    id: string | null
    tag: string | null
  }[]
  authorId: string | null
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
}

export default function ArticleCardPage({
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
    <div className="h-full w-full rounded-lg p-3 shadow-xl ring-1 ring-black">
      {/* TODO: Image && Name */}
      <Flex align="center" justify="end">
        <p>{createAt}</p>
      </Flex>
      <Flex align="center" justify="start">
        <Avatar className="h-14 w-14">
          {author?.image && (
            <AvatarImage
              src={author?.image || ''}
              alt="profileImage"
              width={250}
              height={250}
            />
          )}
        </Avatar>
        <Text> {author && author.name}</Text>
        <Link href={`/profile/${author?.id}`}>
          <div className="divider  before:bg-primary after:bg-secondary">
            เยี่ยมชมโปรไฟล์
          </div>
        </Link>
      </Flex>

      <div className="mt-5">
        <Heading align="center">{title}</Heading>
      </div>
      <div className="mt-3">
        <Text align="left" trim="start">
          {articleContent}
        </Text>
      </div>
      <div className="mt-3">
        {ArticleImage && (
          <Image alt="Blog Image" src={ArticleImage} width={600} height={600} />
        )}
      </div>
    </div>
  )
}
