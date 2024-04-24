import ArticleCardPage from '@/components/article/articlePage'
import CommentAndReplyArticle from '@/components/article/commentAndReplyArticle'
import CommentArticleHome from '@/components/article/commentArticleHome'
import CommentArticleInHome from '@/components/article/commentArticleInHome'
import SWRcomment from '@/components/article/swrcomment'
import Recommand from '@/components/compoinhome/recommand'
import CommentCard from '@/components/post/commentCard'
import Reply from '@/components/post/replyForm'
import { fetchUser } from '@/lib/actions/user.action'
import { FetchArticleByID } from '@/lib/actions/user.article'
import {
  CheckFollow,
  getTotalFollowers,
  getTotalFollowing,
} from '@/lib/actions/user.follow'
import { TotalVisit1 } from '@/lib/actions/user.visit'
import { getCurrentUser } from '@/lib/session'
import { Container, Heading } from '@radix-ui/themes'
import { format, formatDistanceToNow } from 'date-fns'
import { th } from 'date-fns/locale'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Article',
}

const Page = async ({ params }: { params: { id: string } }) => {
  if (!params.id) return null

  const user = await getCurrentUser()
  if (!user) return null

  const userInfo = await fetchUser(user.id)
  if (!userInfo) redirect('/profile')

  const ArticleBy = await FetchArticleByID(params.id)
  const userfollow = await getTotalFollowers(params.id)
  const userfollowing = await getTotalFollowing(params.id)
  const checkFollower = await CheckFollow(params.id, user.id)

  return (
    <Container className=" inset-y-28 top-24 mt-32 h-full max-w-full place-items-start ">
      <div className="">
        <ArticleCardPage
          key={ArticleBy?.id}
          id={ArticleBy?.id}
          currentId={user.id}
          title={ArticleBy?.title}
          articleContent={ArticleBy?.articleContent}
          ArticleImage={ArticleBy.ArticleImage}
          tag={ArticleBy.tag.map((tagItem) => ({
            tag: tagItem.tag || '',
          }))}
          totalFollower={userfollow}
          totalFollowing={userfollowing}
          isFollow={checkFollower}
          authorId={ArticleBy.authorId}
          author={ArticleBy.author}
          comments={ArticleBy.comment}
          createAt={formatDistanceToNow(new Date(ArticleBy.createAt), {
            locale: th,
            addSuffix: true,
          })}
          totalVisit={await TotalVisit1(ArticleBy.id)}
        />
      </div>
      <div className="left-3 mt-7 ">
        <CommentArticleInHome
          articleId={params.id}
          currentUserImage={user?.image || ''}
          currentUserId={user?.id || ''}
        />
      </div>
      <div className="mt-10">
        <Heading align="center" trim="normal">
          ความคิดเห็นทั้งหมด
        </Heading>
        {ArticleBy.comment.map((comment: any) => (
          <CommentAndReplyArticle
            key={comment.id}
            comment={comment.text}
            id={comment.id}
            articleId={ArticleBy.id}
            current={
              user || {
                id: '',
                name: '',
                image: '',
              }
            }
            authorId={comment.authorid}
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
        ))}

        <div className="mt-6 text-center">
          <Recommand
            id={ArticleBy.id}
            currentId={user.id}
            tag={ArticleBy.tag.map((tagItem) => ({
              tag: tagItem.tag || '',
            }))}
          />
        </div>
      </div>
    </Container>
  )
}

export default Page
