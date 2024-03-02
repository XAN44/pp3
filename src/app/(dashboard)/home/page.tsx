import ArticleForm from '@/components/article/articleForm'
import EventCard from '@/components/event/eventCard'
import EventForm from '@/components/event/eventForm'
import HomePageHeader from '@/components/homepage/HomePageHeader'
import ProfileHeader from '@/components/profile/ProfileHeader'
import Fetchprofilehome from '@/components/profile/fetchprofilehome'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
} from '@nextui-org/react'
import Link from 'next/link'
import { Badge } from '@chakra-ui/react'
import {
  CheckFollow,
  getTotalFollowers,
  getTotalFollowing,
} from '@/lib/actions/user.follow'
import { fetchUserProfileByID } from '@/lib/actions/user.post'
import { TotalVisit1, TotalVisitEvent } from '@/lib/actions/user.visit'
import { getCurrentUser } from '@/lib/session'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import ArticleinHome from '@/components/article/articleinhome'
import Articleinhomepage from '@/components/compoinhome/articleinhomepage'

import ArticleHome from '@/components/article/articlehome'
import Reply from '@/components/post/replyForm'
import CommentCard from '@/components/post/commentCard'
import { Heading } from '@radix-ui/themes'
import CommentInarticle from '@/components/article/commentinArticle'
import { FetchArticleByID } from '@/lib/actions/user.article'
import CommentArticleInHome from '@/components/article/commentArticleInHome'
import CommentArticleHome from '@/components/article/commentArticleHome'
import VisitBtnArticleAll from '@/components/visit/visitArticleAll'
import {
  fetchBlogByFollowing,
  fetchInBlogPage,
  fetchInEnentPage,
} from '@/lib/actions/user.carousel'

export default async function Page() {
  const user = await getCurrentUser()

  //Todo: ตรวจสอบ user พื่อดึงข้อมูลผู้ใช้มาแสดงผล โดยตัวแปร user จะดึงค่า session จาก getCurrentUser เพื่อใช้ในการยืนยันว่าผู้ใช้ที่เข้าถึง Profile Page เป็นเจ้าของหรือไม่
  //* หากเป็นเจ้าของ จะสามารถเข้าถึงหน้าต่างบางอย่างได้ เช่น ตั้งค่า และอื่นๆ

  const userInfo = await fetchUserProfileByID(user?.id || '')
  const otherInfo = await fetchInBlogPage()
  const otherEvent = await fetchInEnentPage()
  const checkFollower = await CheckFollow('', user?.id || '')

  //Todo: โดยใช้ Params.id ในการยืนยันจากฐานข้อมูล หากข้อมูลตรงกัน จะทำการแสดงเนื้อหาต่างๆที่โค้ดด้านล่าง
  // TODO:แสดงการติดตาม
  const userfollow = await getTotalFollowers(user?.id || '')
  const userfollowing = await getTotalFollowing(user?.id || '')
  const followBlog = await fetchBlogByFollowing(user?.id || '')

  return (
    <>
      <div
        className="
        mt-[250px]
        w-full 
        xl:w-full
        "
      >
        <HomePageHeader />
      </div>
      <div className="  mb-[590px] flex h-32 flex-col gap-0 xl:w-full xl:flex-row ">
        <aside
          className=" 
                inset-x-0 left-[32px] w-full
                place-items-start px-3 
                xl:ml-16 xl:mt-10 xl:h-full
                xl:w-96 "
        >
          {userInfo?.map((Account) => (
            <>
              <Fetchprofilehome
                key={Account.id}
                accountId={Account.id}
                authUserId={user?.id || ''}
                name={Account.name || ''}
                nickname={Account.nickname || ''}
                image={Account.image || ' '}
                bio={Account.bio || ''}
                totalFollower={userfollow}
                totalFollowing={userfollowing}
                article={{
                  id: user?.id || '',
                }}
                event={{
                  id: user?.id || '',
                }}
              />
            </>
          ))}

          {!user && (
            <Fetchprofilehome
              key={''}
              accountId={''}
              authUserId={''}
              name={''}
              nickname={''}
              image={' '}
              bio={''}
              totalFollower={0}
              totalFollowing={0}
              article={{
                id: '',
              }}
              event={{
                id: '',
              }}
            />
          )}
        </aside>
        <main className="ml-16 mt-8 w-[690px]  ">
          <div className=" place-items-center justify-center text-center ">
            <div className=" ">
              <Tabs defaultValue="article">
                <TabsList className="">
                  <TabsTrigger value="article"> บทความ</TabsTrigger>
                  <TabsTrigger value="event"> กิจกรรม</TabsTrigger>
                  <TabsTrigger value="follow"> ติดตาม</TabsTrigger>
                </TabsList>

                <TabsContent value="article">
                  <div className="mb-6">
                    <Articleinhomepage />
                  </div>

                  <div className="mb-3 mt-5 place-items-center p-3 text-center ">
                    {userInfo?.map((Account) => (
                      <>
                        <ArticleForm
                          key={Account.id}
                          accountId={Account.id}
                          authUserId={user?.id || ''}
                          ArticleImage={''}
                          articleContent={''}
                          tag={''}
                          title={''}
                        />
                      </>
                    ))}

                    {otherInfo.map(async (ArticleBy: any, index: any) => (
                      <>
                        <div className="w-full rounded-lg p-3 shadow-xl">
                          <div className="">
                            <ArticleHome
                              key={ArticleBy?.id}
                              id={ArticleBy?.id}
                              title={ArticleBy?.title}
                              articleContent={ArticleBy?.articleContent}
                              ArticleImage={ArticleBy.ArticleImage}
                              tag={ArticleBy.tag}
                              currentId={user?.id || ''}
                              authorId={ArticleBy.authorId}
                              author={ArticleBy.author}
                              comments={ArticleBy.comment}
                              createAt={new Date(
                                ArticleBy.createAt
                              ).toLocaleString()}
                            />
                          </div>
                          <div className="left-3 mt-7 ">
                            <CommentArticleInHome
                              articleId={ArticleBy.id}
                              currentUserImage={user?.image || ''}
                              currentUserId={user?.id || ''}
                            />
                          </div>
                          <div className="mb-10 mt-10">
                            {ArticleBy.comment
                              .slice(0, 4)
                              .map((comment: any) => (
                                <>
                                  <CommentArticleHome
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
                                    createAt={new Date(
                                      comment.createdAt
                                    ).toLocaleString()}
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
                            <Link href={`/article/${ArticleBy.id}`}>
                              <VisitBtnArticleAll
                                id={ArticleBy.id}
                                userId={user?.id || ''}
                              />
                            </Link>
                          </div>
                        </div>
                      </>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="event">
                  <div className="place-items-center text-center">
                    {userInfo?.map((Account) => (
                      <>
                        <EventForm
                          key={Account.id}
                          accountId={Account.id}
                          authUserId={user?.id || ''}
                          eventImage={''}
                          eventContent={''}
                          tag={''}
                          title={''}
                        />
                      </>
                    ))}
                    {otherEvent.map(async (Event: any) => (
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

                <TabsContent value="follow">
                  <div className="mb-6">
                    <Articleinhomepage />
                  </div>

                  <div className="mb-3 mt-5 place-items-center p-3 text-center ">
                    {followBlog.map(async (ArticleBy, index: any) => (
                      <>
                        <div className="w-full rounded-lg p-3 shadow-xl">
                          <div className="">
                            <ArticleHome
                              key={ArticleBy?.id}
                              id={ArticleBy?.id}
                              title={ArticleBy?.title}
                              articleContent={ArticleBy?.articleContent}
                              ArticleImage={ArticleBy.ArticleImage}
                              tag={ArticleBy.tag}
                              currentId={user?.id || ''}
                              authorId={ArticleBy.authorId}
                              author={ArticleBy.author}
                              comments={ArticleBy.comment}
                              createAt={new Date(
                                ArticleBy.createAt
                              ).toLocaleString()}
                            />
                          </div>
                          <div className="left-3 mt-7 ">
                            <CommentArticleInHome
                              articleId={ArticleBy.id}
                              currentUserImage={user?.image || ''}
                              currentUserId={user?.id || ''}
                            />
                          </div>
                          <div className="mb-10 mt-10">
                            {ArticleBy.comment
                              .slice(0, 4)
                              .map((comment: any) => (
                                <>
                                  <CommentArticleHome
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
                                    createAt={new Date(
                                      comment.createdAt
                                    ).toLocaleString()}
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
                            <Link href={`/article/${ArticleBy.id}`}>
                              <VisitBtnArticleAll
                                id={ArticleBy.id}
                                userId={user?.id || ''}
                              />
                            </Link>
                          </div>
                        </div>
                      </>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
