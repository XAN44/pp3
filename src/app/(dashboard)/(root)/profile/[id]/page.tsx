import PostCard from "@/components/post/postCard";
import { PostForm } from "@/components/post/postForm";
import ProfileHeader from "@/components/profile/ProfileHeader";
import { fetchUserProfileByID } from "@/lib/actions/user.post";
import { getCurrentUser } from "@/lib/session";
import { Container } from "@radix-ui/themes";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function Page({ params }: { params: { id: string } }) {
  const user = await getCurrentUser();
  if (!user) return null;

  //Todo: ตรวจสอบ user พื่อดึงข้อมูลผู้ใช้มาแสดงผล โดยตัวแปร user จะดึงค่า session จาก getCurrentUser เพื่อใช้ในการยืนยันว่าผู้ใช้ที่เข้าถึง Profile Page เป็นเจ้าของหรือไม่
  //* หากเป็นเจ้าของ จะสามารถเข้าถึงหน้าต่างบางอย่างได้ เช่น ตั้งค่า และอื่นๆ

  const userInfo = await fetchUserProfileByID(params.id); //Todo: โดยใช้ Params.id ในการยืนยันจากฐานข้อมูล หากข้อมูลตรงกัน จะทำการแสดงเนื้อหาต่างๆที่โค้ดด้านล่าง

  console.log(userInfo);
  if (!userInfo) redirect("/sign-in"); // ! และถ้าหากว่าไม่มี Prarams.id จะทำการ redireact ไปที่หน้า Sign-ins

  return (
    <Container className="relative mt-44">
      <div className=" flex flex-col place-items-center justify-center lg:flex-row ">
        {userInfo.map((Account) => (
          <>
            <div
              className="
                            card
                            fixed
                            inset-x-0
                            inset-y-[20%]
                            left-[32px]
                            grid
                            h-32 w-96 flex-grow  place-items-start rounded-box border
                            border-red-100 
                            bg-base-300
                            p-3 
                            ">
              <ProfileHeader
                // *ส่วนของ Profile
                //Todo:ใช้ Params จากการ Login ในการแสดงข้อมูล ผสมผสานกับการใช้ข้อมูลจาก DATABASE

                accountId={Account.id}
                authUserId={user.id} //*ใช้ user.id จาก session เพื่อตรวจสอบว่า id ตรงไหม หากตรง จะสามารถเข้าถึงการทำงานบางฟังก์ชันได้
                name={Account.name || ""}
                nickname={Account.nickname || ""}
                image={Account.image || " "}
                bio={Account.bio || ""}
              />
              <div className="divider divider-horizontal absolute ml-[400px] h-32  " />
            </div>
            <div className="relative h-32">
              <div className="text-center ">
                <PostForm
                  //*ส่วนของ Post Form
                  user={{
                    authorid: "",
                    content: "",
                    imagePost: "",
                  }}
                />
              </div>
              {Account.post.map((PostBy) => (
                //*ส่วนแสดงเนื้อหาโพสต์
                //Todo:ใช้ Params จากการ Login ในการแสดงข้อมูล
                <>
                  <div className=" ">
                    <Suspense fallback={<p> LOADING </p>}>
                      <PostCard
                        key={PostBy.id}
                        id={PostBy.id}
                        content={PostBy.content}
                        ImagePost={PostBy.ImagePost}
                        authorId={PostBy.authorId}
                        createAt={new Date(PostBy.createdAt).toLocaleString()}
                        author={PostBy.author}
                        comments={PostBy.comments}
                      />
                    </Suspense>
                  </div>
                </>
              ))}
            </div>
          </>
        ))}
      </div>
    </Container>
  );
}
