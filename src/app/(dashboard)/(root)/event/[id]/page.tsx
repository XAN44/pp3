import ArticleCardPage from '@/components/article/articlePage'
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
import { redirect } from 'next/navigation'

const Page = async ({ params }: { params: { id: string } }) => {
  if (!params.id) return null

  const user = await getCurrentUser()
  if (!user) return null

  const userInfo = await fetchUser(user.id)
  if (!userInfo) redirect('/profile')

  const ArticleBy = await FetchEventByID(params.id)
  const checkFollower = await CheckFollow(params.id, user.id)
  const userfollow = await getTotalFollowers(params.id)
  const userfollowing = await getTotalFollowing(params.id)

  return (
    <Container className=" inset-y-28 top-24 mt-32 h-full place-items-start ">
      <div className="">
        <EventHomePage
          key={ArticleBy?.id}
          id={ArticleBy?.id}
          title={ArticleBy?.title}
          articleContent={ArticleBy?.eventContent}
          ArticleImage={ArticleBy.eventImage}
          tag={ArticleBy.tag.map((tagItem) => ({
            tag: tagItem.tag || '',
          }))}
          eventlocation={ArticleBy.eventlocation}
          eventparticipants={ArticleBy.eventparticipants}
          eventstartTime={ArticleBy.eventstartTime}
          authorId={ArticleBy.authorId}
          author={ArticleBy.author}
          currentId={user.id}
          isFollow={checkFollower}
          totalFollower={userfollow}
          totalFollowing={userfollowing}
          totalVisit={await TotalVisitEvent(ArticleBy.id)}
          comments={ArticleBy.comment}
          createAt={new Date(ArticleBy.createAt).toLocaleString()}
        />
      </div>
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
            <CommentCard
              key={comment.id}
              id={comment.id}
              comment={comment.text}
              authorId={comment.authorId}
              createAt={new Date(comment.createdAt).toLocaleString()}
              author={comment.author || { id: '', name: '', image: '' }}
              reply={comment.Reply}
              isComment
              isReply
              currentUserId={JSON.stringify(user.id)}
              currentUserImage={user.image}
            />
            <Reply
              commentId={comment.id}
              currentUserImage={user.image}
              currentUserId={JSON.stringify(user.id)}
            />
          </>
        ))}
      </div>
    </Container>
  )
}

export default Page
