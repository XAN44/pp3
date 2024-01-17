import { ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
} from '@nextui-org/react'
import { Flex, Grid, Heading, Text } from '@radix-ui/themes'
import Link from 'next/link'

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
    <div className=" grid w-full items-center  justify-center ">
      {ArticleImage && (
        <Card
          shadow="sm"
          radius="lg"
          isFooterBlurred
          key={ArticleImage}
          isPressable
          className="bg-zinc-300  "
        >
          <CardBody className=" overflow-visible p-0 pt-0">
            <Image
              isZoomed
              src={ArticleImage}
              alt="articleImage"
              radius="md"
              width="100%"
              className="h-[140px] w-full rounded-xl object-cover"
            />
          </CardBody>
          <CardFooter className="flex justify-between px-3 text-small">
            <aside>
              <div className="w-40">
                <b>{title}</b>
                <p className="text-default-500">{articleContent}</p>
              </div>
            </aside>
            <main>
              {author?.image && (
                <Avatar alt="profile" src={author?.image} isBordered />
              )}
              <footer>
                <Link href={`/article/${id}`}>
                  <Button>READ MORE</Button>
                </Link>
              </footer>
            </main>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
