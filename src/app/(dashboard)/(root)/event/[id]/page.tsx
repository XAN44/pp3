import ArticleCardPage from '@/components/article/articlePage'
import BlogInEvent from '@/components/event/blogInEvent'
import CardEvent from '@/components/event/cardEvent'
import CommentEventandreply from '@/components/event/commentEventandreply'
import CommentIEvent from '@/components/event/commentinEvent'
import EventInhomepage from '@/components/event/eventInhomepage'
import EventHomePage from '@/components/event/eventPage'
import CommentCard from '@/components/post/commentCard'
import Reply from '@/components/post/replyForm'
import { fetchUser } from '@/lib/actions/user.action'
import { FetchEventByID } from '@/lib/actions/user.event'
import {
  CheckFollow,
  getTotalFollowers,
  getTotalFollowing,
} from '@/lib/actions/user.follow'
import { TotalVisitEvent } from '@/lib/actions/user.visit'
import { getCurrentUser } from '@/lib/session'
import { Container, Heading } from '@radix-ui/themes'
import { readdirSync } from 'fs'
import { Rye } from 'next/font/google'
import { redirect } from 'next/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import EventJoin from '@/components/event/eventJoin'

const Page = async ({ params }: { params: { id: string } }) => {
  if (!params.id) return null

  const user = await getCurrentUser()
  if (!user) return null

  const userInfo = await fetchUser(user.id)
  if (!userInfo) redirect('/profile')

  const ArticleBy = await FetchEventByID(params.id)
  const commentC = ArticleBy.comment.map((c) => c.id)
  const checkFollower = await CheckFollow(params.id, user.id)
  const userfollow = await getTotalFollowers(params.id)
  const userfollowing = await getTotalFollowing(params.id)

  return (
    <Container className=" inset-y-28 top-24 mt-32 grid h-full place-items-center items-center justify-center ">
      <div className="">
        <EventHomePage
          key={ArticleBy?.id}
          id={ArticleBy?.id}
          title={ArticleBy?.title}
          ArticleImage={ArticleBy.eventImage}
          tag={ArticleBy.tag.map((tagItem) => ({
            tag: tagItem.tag || '',
          }))}
          authorId={ArticleBy.authorId}
          author={ArticleBy.author}
          currentId={{
            id: user.id || '',
            image: user.image || '',
            name: user.name || '',
          }}
          isFollow={checkFollower}
          totalFollower={userfollow}
          totalFollowing={userfollowing}
          totalVisit={await TotalVisitEvent(ArticleBy.id)}
          createAt={new Date(ArticleBy.createAt).toLocaleString()}
        />
      </div>
      <Tabs defaultValue="about" className="mt-7 w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="about"> เกี่ยวกับ</TabsTrigger>
          <TabsTrigger value="talk"> พูดคุย</TabsTrigger>
          <TabsTrigger value="join"> ผู้เข้าร่วม</TabsTrigger>
        </TabsList>
        <TabsContent value="about">
          <CardEvent
            key="card"
            articleContent={ArticleBy.eventContent}
            eventcreator={ArticleBy.eventcreator}
            eventlocation={ArticleBy.eventlocation}
            eventmore={ArticleBy.eventmore}
            eventparticipants={ArticleBy.eventparticipants}
            eventstartTime={ArticleBy.eventstartTime}
            tag={ArticleBy.tag.map((tagItem) => ({
              tag: tagItem.tag || '',
            }))}
          />
          <BlogInEvent
            key="blogEvent"
            currentId={user.id}
            Article={{
              id: ArticleBy.blogInArticle?.id || '',
              title: ArticleBy.blogInArticle?.title || '',
              ArticleImage: ArticleBy.blogInArticle?.ArticleImage || '',
              articleContent: ArticleBy.blogInArticle?.articleContent || '',
              createAt: new Date(ArticleBy.blogInArticle?.createAt || ''),
              tag:
                ArticleBy.blogInArticle?.tag.map((tag) => ({
                  Hashtag: tag.tag || '',
                })) || [],
              visit:
                ArticleBy.blogInArticle?.Visit.map((visit) => ({
                  Visitcount: visit.count || 0,
                })) || [],
              author: {
                id: ArticleBy.blogInArticle?.author?.id || '',
                name: ArticleBy.blogInArticle?.author?.name || '',
                image: ArticleBy.blogInArticle?.author?.image || '',
              },
            }}
          />
        </TabsContent>
        <TabsContent value="talk">
          <div className="left-3 mt-7 ">
            <CommentIEvent
              eventId={params.id}
              currentUserImage={user.image}
              currentUserId={JSON.stringify(user.id)}
            />
          </div>
          <div className="mt-10">
            <Heading align="center" trim="normal">
              ความคิดเห็นทั้งหมด
            </Heading>
            {ArticleBy.comment.map((comment: any) => (
              <>
                <CommentEventandreply
                  key={comment.id}
                  id={comment.id}
                  current={
                    user || {
                      id: '',
                      name: '',
                      image: '',
                    }
                  }
                  comment={comment?.text}
                  authorId={comment.authorId}
                  createAt={new Date(comment.createdAt).toLocaleString()}
                  author={
                    comment.author || {
                      id: '',
                      name: '',
                      image: '',
                    }
                  }
                  reply={comment.Reply}
                  isComment
                  isReply
                />
              </>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="join">
          <EventJoin id={ArticleBy.id} />
        </TabsContent>
      </Tabs>
    </Container>
  )
}

export default Page
