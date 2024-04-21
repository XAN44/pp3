import ArticleCardPage from '@/components/article/articlePage'
import CommentArticleHome from '@/components/article/commentArticleHome'
import CommentArticleInHome from '@/components/article/commentArticleInHome'
import SWRcomment from '@/components/article/swrcomment'
import Recommand from '@/components/compoinhome/recommand'
import CommentCard from '@/components/post/commentCard'
import CommentPostHome from '@/components/post/commentPostHome'
import CommentPostInHome from '@/components/post/commentPostInHome'
import PostPage from '@/components/post/postPage'
import Reply from '@/components/post/replyForm'
import { fetchUser } from '@/lib/actions/user.action'
import { FetchArticleByID, FetchPOSTeByID } from '@/lib/actions/user.article'
import {
  CheckFollow,
  getTotalFollowers,
  getTotalFollowing,
} from '@/lib/actions/user.follow'
import { TotalVisit1, TotalVisitPOST } from '@/lib/actions/user.visit'
import { getCurrentUser } from '@/lib/session'
import { Container, Heading } from '@radix-ui/themes'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'POST',
}

const Page = async ({ params }: { params: { id: string } }) => {
  if (!params.id) return null

  const user = await getCurrentUser()
  if (!user) return null

  const userInfo = await fetchUser(user.id)
  if (!userInfo) redirect('/profile')

  const ArticleBy = await FetchPOSTeByID(params.id)
  const userfollow = await getTotalFollowers(params.id)
  const userfollowing = await getTotalFollowing(params.id)
  const checkFollower = await CheckFollow(params.id, user.id)

  return (
    <Container className=" inset-y-28 top-24 mt-32 h-full place-items-start ">
      <div className="">
        <PostPage
          key={ArticleBy?.id}
          id={ArticleBy?.id}
          currentId={user.id}
          articleContent={ArticleBy?.content}
          ArticleImage={ArticleBy.ImagePost}
          tag={ArticleBy.tag.map((tagItem) => ({
            tag: tagItem.tag || '',
          }))}
          totalFollower={userfollow}
          totalFollowing={userfollowing}
          isFollow={checkFollower}
          authorId={ArticleBy.authorId}
          author={ArticleBy.author}
          comments={ArticleBy.comments}
          createAt={new Date(ArticleBy.createdAt).toLocaleString()}
          totalVisit={await TotalVisitPOST(ArticleBy.id)}
        />
      </div>
      <div className="left-3 mt-7 ">
        <CommentPostInHome
          postId={params.id}
          currentUserImage={user?.image || ''}
          currentUserId={user?.id || ''}
        />
      </div>
      <div className="mt-10">
        <Heading align="center" trim="normal">
          ความคิดเห็นทั้งหมด
        </Heading>
        {ArticleBy.comments.map((comment) => (
          <CommentPostHome
            key={comment.id}
            id={comment.id}
            comments={comment?.text}
            postId={ArticleBy.id}
            current={
              user || {
                id: '',
                name: '',
                image: '',
              }
            }
            authorId={comment.authorid}
            createAt={
              comment.createdAt
                ? new Date(comment.createdAt).toLocaleString()
                : ''
            }
            author={
              comment.author || {
                id: '',
                name: '',
                image: '',
              }
            }
            reply={comment.Reply || []}
            isComment
            isReply
          />
        ))}
      </div>
    </Container>
  )
}

export default Page
