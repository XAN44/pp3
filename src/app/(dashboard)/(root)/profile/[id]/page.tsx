// import FollowerCard from "@/components/follow/followerCard";
import ArticleCard from '@/components/article/articleCard'
import ArticleForm from '@/components/article/articleForm'
import PostCard from '@/components/post/postCard'
import { PostForm } from '@/components/post/postForm'
import ProfileHeader from '@/components/profile/ProfileHeader'
import TabmenuinProfile from '@/components/profile/tabmenuinProfile'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  CheckFollow,
  getTotalFollowers,
  getTotalFollowing,
} from '@/lib/actions/user.follow'
import { fetchUserProfileByID } from '@/lib/actions/user.post'
import { getCurrentUser } from '@/lib/session'
import { Container } from '@radix-ui/themes'
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
    <Container className="relative mt-44">
      <div className=" flex flex-col place-items-center justify-center lg:flex-row ">
        {userInfo.map((Account) => (
          <>
            <div
              className="
                            fixed
                            inset-x-0 
                            inset-y-[20%]
                            left-[32px]
                            grid
                            h-32 w-96 flex-grow  place-items-start 
                            bg-base-200
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
              />
            </div>

            <div className="relative h-32 place-items-center justify-center text-center">
              <TabmenuinProfile
                activity={false}
                content={false}
                article={false}
                product={false}
              />
              <Tabs defaultValue="post">
                <TabsList>
                  <TabsTrigger value="post"> POST</TabsTrigger>
                  <TabsTrigger value="article"> ARTICLE</TabsTrigger>
                </TabsList>
                <TabsContent value="post">
                  <div className="place-items-start text-center ">
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
                    {Account.post.map((PostBy) => (
                      //*ส่วนแสดงเนื้อหาโพสต์
                      //Todo:ใช้ Params จากการ Login ในการแสดงข้อมูล
                      <>
                        <div className="place-items-start text-start">
                          <Suspense fallback={<p> LOADING </p>}>
                            <PostCard
                              key={PostBy.id}
                              id={PostBy.id}
                              content={PostBy.content}
                              ImagePost={PostBy.ImagePost}
                              authorId={PostBy.authorId}
                              createAt={new Date(
                                PostBy.createdAt
                              ).toLocaleString()}
                              author={PostBy.author}
                              comments={PostBy.comments}
                            />
                          </Suspense>
                        </div>
                      </>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="article">
                  <div className="place-items-start text-center">
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

                  {Account.Article.map((ArticleBy) => (
                    <div
                      key={ArticleBy.id}
                      className="place-items-start text-start"
                    >
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
                        createAt={new Date(ArticleBy.createAt).toLocaleString()}
                      />
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
            </div>
          </>
        ))}
      </div>
    </Container>
  )
}
