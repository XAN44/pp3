import { ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { Button, Card, CardBody, CardHeader, Image } from '@nextui-org/react'
import { Flex, Grid, Heading, Text } from '@radix-ui/themes'
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
    <div className="grid items-center justify-center  ">
      {ArticleImage && (
        <Card shadow="sm" key={ArticleImage} isPressable>
          <CardBody className=" pt-1">
            <Image
              src={ArticleImage}
              alt="articleImage"
              shadow="sm"
              radius="lg"
              width="100%"
              className="h-[140px] w-full rounded-xl object-cover"
            />
          </CardBody>
        </Card>
      )}
    </div>
  )
}
