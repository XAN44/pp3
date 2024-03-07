import { Badge } from '@chakra-ui/react'
import { Avatar, Card, CardBody, CardFooter, Image } from '@nextui-org/react'
import Link from 'next/link'
import VisitEvent from '../visit/visitEvent'

interface Props {
  id: string
  title: string | null
  articleContent: string | null
  ArticleImage: string | null
  eventlocation: string | null
  eventstartTime: string | null
  eventparticipants: string | null
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
  registerCount: number
  totalVisit: number
}

export default function EventCard({
  id,
  title,
  articleContent,
  ArticleImage,
  tag,
  author,
  authorId,
  eventstartTime,
  eventparticipants,
  eventlocation,
  registerCount,
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
        key={ArticleImage}
        isPressable
        className="  rounded-l-none rounded-r-none bg-zinc-300"
      >
        <CardBody className=" overflow-visible p-0 pt-0">
          <Image
            isZoomed
            src={ArticleImage || ''}
            alt="articleImage"
            radius="md"
            width="100%"
            className="h-[140px] w-full rounded-xl object-cover"
          />
        </CardBody>
        <CardFooter className="flex place-items-center items-center justify-between px-3 text-small">
          <aside className="w-full ">
            <div className="w-40">
              <b>{title}</b>
              <p>{eventlocation}</p>
              <p>เริ่มกิจกรรมเมื่อ </p>
              {eventstartTime}
              <p>
                จำนวนผู้เข้าร่วมกิจกรรม {registerCount} / {eventparticipants}
              </p>
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
                  <div className="badge badge-neutral w-max " key={hashTag.id}>
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
      <Link href={`/event/${id}`}>
        <VisitEvent id={id} userId={authorId || ''} />
      </Link>
    </div>
  )
}
