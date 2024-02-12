import ArticleCard from '@/components/article/articleCard'
import ArticleForm from '@/components/article/articleForm'
import EventCard from '@/components/event/eventCard'
import EventForm from '@/components/event/eventForm'
import NotificationCard from '@/components/notification/notificationCard'
import PostCard from '@/components/post/postCard'
import { PostForm } from '@/components/post/postForm'
import ProfileHeader from '@/components/profile/ProfileHeader'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  CheckFollow,
  getTotalFollowers,
  getTotalFollowing,
} from '@/lib/actions/user.follow'
import { checkLike, getLike } from '@/lib/actions/user.like'
import { fetchUserProfileByID } from '@/lib/actions/user.post'
import {
  TotalVisit,
  TotalVisit1,
  TotalVisitEvent,
} from '@/lib/actions/user.visit'
import { getCurrentUser } from '@/lib/session'
import { Divider } from '@nextui-org/react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'

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

  if (!userInfo) redirect('/sign-in') // ! และถ้าหากว่าไม่มี Prarams.id จะทำการ redireact ไปที่หน้า Sign-ins

  return (
    <div className=" mb-96 flex h-32 flex-col gap-0 xl:flex-row ">
      {userInfo &&
        userInfo.map((Account) => (
          <>
            <aside
              className=" 

              inset-x-0  left-[32px]  h-[600px] w-full place-items-start   px-3 xl:fixed xl:h-64 xl:w-64"
            >
              <Link href={`/profilez/${Account.id}`}>CLick</Link>
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
              />
            </aside>
            <Divider orientation="vertical" />
            <main className="w-[690px]">
              <div className="relative place-items-center justify-center text-center ">
                <div className=" ">
                  <Tabs defaultValue="post">
                    <TabsList className="">
                      <TabsTrigger value="post"> POST</TabsTrigger>
                      <TabsTrigger value="article"> บทความ</TabsTrigger>
                      <TabsTrigger value="event"> กิจกรรม</TabsTrigger>
                    </TabsList>
                    <TabsContent value="post">
                      <div
                        key={Account.id}
                        className="place-items-center text-center"
                      >
                        {userInfo.map((Account) => (
                          <>
                            <PostForm
                              key={Account.id}
                              accountId={Account.id}
                              authUserId={user.id}
                              imagePost={''}
                              content={''}
                            />
                          </>
                        ))}
                      </div>
                      {Account.post.map(async (PostBy) => (
                        //*ส่วนแสดงเนื้อหาโพสต์
                        //Todo:ใช้ Params จากการ Login ในการแสดงข้อมูล
                        <div key={Account.id} className="text-start ">
                          <Suspense fallback={<p> LOADING </p>}>
                            <PostCard
                              key={PostBy.id}
                              id={PostBy.id}
                              current={user.id}
                              content={PostBy.content}
                              ImagePost={PostBy.ImagePost}
                              authorId={PostBy.authorId}
                              createAt={new Date(
                                PostBy.createdAt
                              ).toLocaleString()}
                              author={PostBy.author}
                              comments={PostBy.comments}
                              checkLike={await checkLike(PostBy.id, user.id)}
                              totalLike={await getLike(PostBy.id)}
                              totalVisit={await TotalVisit(PostBy.id)}
                            />
                          </Suspense>
                        </div>
                      ))}
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
                            ArticleImage={ArticleBy.ArticleImage}
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
                          eventImage={''}
                          eventContent={''}
                          tag={''}
                          title={''}
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
                            totalVisit={await TotalVisitEvent(Event.id)}
                          />
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
