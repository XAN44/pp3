import ArticleCard from '@/components/article/articleCard'
import ArticleForm from '@/components/article/articleForm'
import EventCard from '@/components/event/eventCard'
import EventForm from '@/components/event/eventForm'
import CommentPostHome from '@/components/post/commentPostHome'
import CommentPostInHome from '@/components/post/commentPostInHome'
import POSTFORM from '@/components/post/postform'
import Posthome from '@/components/post/posthome'
import ProfileHeader from '@/components/profile/ProfileHeader'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import VisitBtnPOSTAll from '@/components/visit/visitPost'
import { fetchPostcarosuleByID } from '@/lib/actions/user.carousel'
import {
  CheckFollow,
  getTotalFollowers,
  getTotalFollowing,
} from '@/lib/actions/user.follow'
import { fetchUserProfileByID } from '@/lib/actions/user.post'
import { TotalVisit1, TotalVisitEvent } from '@/lib/actions/user.visit'
import { getCurrentUser } from '@/lib/session'
import { Divider, ScrollShadow } from '@nextui-org/react'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function Page({ params }: { params: { id: string } }) {
  if (!params.id) return null

  const user = await getCurrentUser()
  if (!user) return null

  //Todo: ตรวจสอบ user พื่อดึงข้อมูลผู้ใช้มาแสดงผล โดยตัวแปร user จะดึงค่า session จาก getCurrentUser เพื่อใช้ในการยืนยันว่าผู้ใช้ที่เข้าถึง Profile Page เป็นเจ้าของหรือไม่
  //* หากเป็นเจ้าของ จะสามารถเข้าถึงหน้าต่างบางอย่างได้ เช่น ตั้งค่า และอื่นๆ

  const userInfo = await fetchUserProfileByID(params.id)
  if (!userInfo) redirect('/')

  //Todo: โดยใช้ Params.id ในการยืนยันจากฐานข้อมูล หากข้อมูลตรงกัน จะทำการแสดงเนื้อหาต่างๆที่โค้ดด้านล่าง
  // TODO:แสดงการติดตาม
  const userfollow = await getTotalFollowers(params.id)
  const userfollowing = await getTotalFollowing(params.id)
  const checkFollower = await CheckFollow(params.id, user.id)

  const otherPost = await fetchPostcarosuleByID(params.id)

  if (!userInfo) redirect('/sign-in') // ! และถ้าหากว่าไม่มี Prarams.id จะทำการ redireact ไปที่หน้า Sign-ins

  return (
    <div className=" animate-in mb-[590px]  flex h-32 flex-col gap-0 ">
      {userInfo.map((Account) => (
        <>
          <aside
            className=" 

              inset-x-0  left-[32px]  w-full   place-items-start  px-3 xl:fixed xl:h-full xl:w-96 
              
              "
          >
            <ProfileHeader
              key={Account.id}
              accountId={Account.id}
              authUserId={user.id}
              name={Account.name || ''}
              nickname={Account.nickname || ''}
              image={Account.image || ' '}
              bio={Account.bio || ''}
              totalFollower={userfollow}
              totalFollowing={userfollowing}
              isFollow={checkFollower}
              contact={{
                facebook: Account.Facebook || '',
                ig: Account.IG || '',
                twitter: Account.Twitter || '',
                tiktok: Account.Tiktok || '',
              }}
              article={{
                id: params.id,
              }}
              event={{
                id: params.id,
              }}
            />
          </aside>
          <main className="mt-8 w-[690px]">
            <div className="relative place-items-center justify-center text-center ">
              <div className=" ">
                <Tabs defaultValue="article">
                  <TabsList className="">
                    <TabsTrigger value="POST">POST</TabsTrigger>

                    <TabsTrigger value="article"> บทความ</TabsTrigger>
                    <TabsTrigger value="event"> กิจกรรม</TabsTrigger>
                  </TabsList>
                  <TabsContent value="POST">

                    <div className="mb-3 mt-5 place-items-center p-3 text-center ">
                      {userInfo?.map((Account) => (
                        <>
                          <POSTFORM
                            key={Account.id}
                            accountId={Account.id}
                            authUserId={user?.id || ''}
                            ArticleImage={''}
                            content={''}
                            tag={''}
                          />
                        </>
                      ))}


                      {otherPost.map(async (post: any, index: any) => (
                        <>
                          <div className="w-full rounded-lg p-3 shadow-xl">
                            <div className="">
                              <Posthome
                                key={post?.id}
                                id={post?.id}
                                content={post.content}
                                ImagePost={post?.ImagePost}
                                tag={post.tag}
                                currentId={user?.id || ''}
                                authorId={post.authorId}
                                author={post.author}
                                comments={post.comments}
                                createAt={new Date(
                                  post.createdAt
                                ).toLocaleString()}
                              />
                            </div>
                            <div className="left-3 mt-7 ">
                              <CommentPostInHome
                                postId={post.id}
                                currentUserImage={user?.image || ''}
                                currentUserId={user?.id || ''}
                              />
                            </div>
                            <div className="mb-10 mt-10">
                              {post.comments
                                .slice(0, 4)
                                .map((comments: any) => (
                                  <>
                                    <CommentPostHome
                                      key={comments.id}
                                      id={comments.id}
                                      comments={comments?.text}
                                      articleId={comments.articleId}
                                      current={
                                        user || {
                                          id: '',
                                          name: '',
                                          image: '',
                                        }
                                      }
                                      authorId={comments.authorId}
                                      createAt={new Date(
                                        comments.createdAt
                                      ).toLocaleString()}
                                      author={
                                        comments.author || {
                                          id: '',
                                          name: '',
                                          image: '',
                                        }
                                      }
                                      reply={comments.Reply}
                                      isComment
                                      isReply
                                    />
                                  </>
                                ))}
                              <Link href={`/post/${post.id}`}>
                                <VisitBtnPOSTAll
                                  id={post.id}
                                  userId={user?.id || ''}
                                />
                              </Link>
                            </div>
                          </div>
                        </>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="article">
                    <div className="place-items-center text-center">
                      <ArticleForm
                        key={Account.id}
                        accountId={Account.id}
                        authUserId={user.id}
                        ArticleImage={''}
                        articleContent={''}
                        tag={''}
                        title={''}
                      />
                    </div>
                    {Account.Article.map(async (ArticleBy) => (
                      <div key={ArticleBy.id}>
                        <ArticleCard
                          key={ArticleBy.id}
                          id={ArticleBy.id}
                          title={ArticleBy.title}
                          articleContent={ArticleBy.articleContent}
                          ArticleImage={ArticleBy.ArticleImage || ''}
                          tag={ArticleBy.tag}
                          authorId={ArticleBy.authorId}
                          author={ArticleBy.author}
                          comments={ArticleBy.comment}
                          createAt={new Date(
                            ArticleBy.createAt
                          ).toLocaleString()}
                          totalVisit={await TotalVisit1(ArticleBy.id)}
                        />
                      </div>
                    ))}
                  </TabsContent>
                  <TabsContent value="event">
                    <div className="place-items-center text-center">
                      <EventForm
                        key={Account.id}
                        accountId={Account.id}
                        authUserId={user.id}
                      />
                      {Account.Event.map(async (Event) => (
                        <EventCard
                          key={Event.id}
                          id={Event.id}
                          title={Event.title}
                          articleContent={Event.eventContent}
                          ArticleImage={Event.eventImage}
                          tag={Event.tag}
                          authorId={Event.authorId}
                          author={Event.author}
                          comments={Event.comment}
                          createAt={new Date(Event.createAt).toLocaleString()}
                          totalVisit={await TotalVisitEvent(Event.id)} eventlocation={null} eventstartTime={null} eventparticipants={null} registerCount={0} />
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </main>
        </>
      ))}
    </div>
  )
}
