import Link from 'next/link'
import { Badge } from '@chakra-ui/react'
import {
  CheckFollow,
  getTotalFollowers,
  getTotalFollowing,
} from '@/lib/actions/user.follow'
import { fetchUserProfileByID } from '@/lib/actions/user.post'
import { getCurrentUser } from '@/lib/session'

import {
  fetchBlogByFollowing,
  fetchInBlogPage,
  fetchInEnentPage,
  fetchPostcarosule,
} from '@/lib/actions/user.carousel'
import Posthome from '@/components/post/posthome'
import CommentPostInHome from '@/components/post/commentPostInHome'
import CommentPostHome from '@/components/post/commentPostHome'
import VisitBtnPOSTAll from '@/components/visit/visitPost'
import { Metadata } from 'next'
import { format, formatDistanceToNow } from 'date-fns'
import { th } from 'date-fns/locale'
import React from 'react'

export const metadata: Metadata = {
  title: 'Home',
}

export default async function Page() {
  const user = await getCurrentUser()

  //Todo: ตรวจสอบ user พื่อดึงข้อมูลผู้ใช้มาแสดงผล โดยตัวแปร user จะดึงค่า session จาก getCurrentUser เพื่อใช้ในการยืนยันว่าผู้ใช้ที่เข้าถึง Profile Page เป็นเจ้าของหรือไม่
  //* หากเป็นเจ้าของ จะสามารถเข้าถึงหน้าต่างบางอย่างได้ เช่น ตั้งค่า และอื่นๆ

  const userInfo = await fetchUserProfileByID(user?.id || '')
  const otherInfo = await fetchInBlogPage()

  const otherEvent = await fetchInEnentPage()
  const otherPost = await fetchPostcarosule()
  const checkFollower = await CheckFollow('', user?.id || '')

  //Todo: โดยใช้ Params.id ในการยืนยันจากฐานข้อมูล หากข้อมูลตรงกัน จะทำการแสดงเนื้อหาต่างๆที่โค้ดด้านล่าง
  // TODO:แสดงการติดตาม
  const userfollow = await getTotalFollowers(user?.id || '')
  const userfollowing = await getTotalFollowing(user?.id || '')
  const followBlog = await fetchBlogByFollowing(user?.id || '')

  return (
    <div className="  mb-[790px]  h-screen max-w-full flex-col gap-0 xl:w-full xl:flex-row ">
      <main className="ml-16 mt-8 w-[690px]  items-center justify-center ">
        <div className=" place-items-center justify-center text-center ">
          <div className="mb-3 mt-5 place-items-center p-3 text-center ">
            {otherPost.map((post, index) => (
              <div key={index}>
                <div className="w-full rounded-lg p-3 shadow-xl">
                  <div className="">
                    <Posthome
                      key={post?.id}
                      id={post?.id}
                      content={post.content}
                      ImagePost={post?.ImagePost || ''}
                      tag={post.tag}
                      currentId={user?.id || ''}
                      authorId={post.authorId}
                      author={post.author}
                      comments={post.comments}
                      createAt={formatDistanceToNow(new Date(post.createdAt), {
                        locale: th,
                        addSuffix: true,
                      })}
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
                    {post.comments.slice(0, 4).map((comments: any) => (
                      <>
                        <CommentPostHome
                          key={comments.id}
                          id={comments.id}
                          comments={comments?.text}
                          postId={comments.articleId}
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
                      <VisitBtnPOSTAll id={post.id} userId={user?.id || ''} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
