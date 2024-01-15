import { ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { Flex, Grid, Text } from '@radix-ui/themes'
import Image from 'next/image'
import Link from 'next/link'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'

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
    <div>
      <div className="card bg-base-200 mb-3 w-96 ring-1 ring-black shadow-xl">
        <figure>
          {ArticleImage && (
            <Image
              className="
             rounded-xl
            "
              src={ArticleImage}
              alt="image"
              width={1080}
              height={1080}
            />
          )}
        </figure>
        <div className="mt-3 mb-10  card-body text-center">
          <div className="card-title">
            <p>{title}</p>
          </div>

          <ResizablePanelGroup
            direction="horizontal"
            className="min-h-[200px] max-w-md rounded-lg "
          >
            <ResizablePanel defaultSize={65}>
              <div className="flex h-full items-center justify-center p-6">
                <div className="flex place-items-start text-start justify-start items-start gap-3">
                  <span className="font-semibold">
                    <p>{articleContent}</p>

                    <Text size="1">สร้างเมื่อ {createAt}</Text>
                  </span>
                </div>
              </div>
            </ResizablePanel>
            <ResizablePanel defaultSize={25}>
              <div className="flex h-full items-center justify-center p-6">
                <span className="font-semibold">
                  <Flex gap="3">
                    <Grid align="start" gap="3">
                      <Flex direction="column">
                        <Link href={`/profile/${author?.id}`}>
                          <Avatar className="w-14 h-14">
                            {author?.image && (
                              <AvatarImage
                                src={author?.image || ''}
                                alt="profileImage"
                                width={250}
                                height={250}
                              />
                            )}
                          </Avatar>
                        </Link>
                        <Link href={`/profile/${author?.id}`} className="">
                          <Text size="7">{author && author.name}</Text>
                        </Link>
                      </Flex>
                    </Grid>
                  </Flex>
                  <div className="grid items-end justify-end place-items-end ">
                    <Link href={`/article/${id}`}>
                      <Button> เยี่ยมชม </Button>
                    </Link>
                  </div>

                  {!isComment && comments.length > 0 && (
                    <div className="ml-1 mt-3 flex items-center gap-5">
                      {comments.slice(0, 2).map((comment, index) => (
                        <>
                          <Image
                            key={index}
                            src={comment.author?.image || ''}
                            alt={`user_${index}`}
                            width={24}
                            height={24}
                            className={`${
                              index !== 0 && '-ml-5'
                            } rounded-full object-cover`}
                          />
                        </>
                      ))}
                    </div>
                  )}
                  <Link href={`/article/${id}`}>
                    <p className="mt-1 text-subtle-medium text-gray-1 text-center items-center justify-center place-items-center">
                      {comments.length} repl
                      {comments.length > 1 ? 'ies' : 'y'}
                    </p>
                  </Link>
                </span>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
          <div className="card-actions justify-startr">
            {tag.map((tag) => (
              <>
                <div className="badge badge-outline" key={tag.id}>
                  #{tag.tag}
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
