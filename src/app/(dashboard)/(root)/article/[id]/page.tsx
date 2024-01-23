import ArticleCardPage from '@/components/article/articlePage'
import CommentInarticle from '@/components/article/commentinArticle'
import CommentCard from '@/components/post/commentCard'
import Reply from '@/components/post/replyForm'
import { fetchUser } from '@/lib/actions/user.action'
import { FetchArticleByID } from '@/lib/actions/user.article'
import { getCurrentUser } from '@/lib/session'
import { Container, Heading } from '@radix-ui/themes'
import { redirect } from 'next/navigation'

const Page = async ({ params }: { params: { id: string } }) => {
  if (!params.id) return null

  const user = await getCurrentUser()
  if (!user) return null

  const userInfo = await fetchUser(user.id)
  if (!userInfo) redirect('/profile')

  const ArticleBy = await FetchArticleByID(params.id)

  return (
    <Container className=" inset-y-28 top-24 mt-32 h-full place-items-start ">
      <div className="">
        <ArticleCardPage
          key={ArticleBy?.id}
          id={ArticleBy?.id}
          title={ArticleBy?.title}
          articleContent={ArticleBy?.articleContent}
          ArticleImage={ArticleBy.ArticleImage}
          tag={ArticleBy.tag}
          authorId={ArticleBy.authorId}
          author={ArticleBy.author}
          comments={ArticleBy.comment}
          createAt={new Date(ArticleBy.createAt).toLocaleString()}
        />
      </div>
      <div className="left-3 mt-7 ">
        <CommentInarticle
          articleId={params.id}
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
