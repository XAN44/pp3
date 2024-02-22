import { ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
  Slider,
} from '@nextui-org/react'
import Link from 'next/link'
import { Badge } from '@chakra-ui/react'
import VisitBtnArticle from '../visit/visitArticle'

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
  totalVisit: number
}

export default function ArticleinHome({
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
  totalVisit,
}: Props) {
  return (
    <div className="  grid h-full w-full items-center justify-center p-3  ">
      <Card
        shadow="sm"
        radius="lg"
        isFooterBlurred
        key="cas"
        isPressable
        className="  rounded-l-none rounded-r-none bg-zinc-300"
      >
        <CardBody className=" overflow-visible p-0 pt-0">
          <Image
            isZoomed
            src={ArticleImage || ' '}
            alt="articleImage"
            radius="md"
            width="100%"
            className="h-[140px] w-full rounded-xl object-cover"
          />
        </CardBody>
        <CardFooter className="flex place-items-center items-center justify-between px-3 text-small">
          <aside className="w-full ">
            <div className="w-40">
              <b className="">{title}</b>
              <p className="text-start text-default-500">{articleContent}</p>
            </div>
          </aside>
          <div className=" grid place-items-center items-center justify-center">
            <main className="w-10 ">
              <Link href={`/profile/${author?.id}`}>
                <Avatar alt="profile" src={author?.image || ''} />
              </Link>
            </main>

            <footer className="mt-3">
              {tag ? (
                tag.map((hashTag) => (
                  <div className="badge badge-neutral  " key={hashTag.id}>
                    {hashTag.tag}
                  </div>
                ))
              ) : (
                <Badge>ไม่มีแฮชแท็ก</Badge>
              )}
              <p>ยอดผู้เข้าชม {totalVisit}</p>
            </footer>
          </div>
        </CardFooter>
      </Card>
      <Link href={`/article/${id}`}>
        <VisitBtnArticle id={id} userId={authorId || ''} />
      </Link>
    </div>
  )
}
