'use server'
import { PostForm } from '@/components/post/postForm'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  FetchBio,
  FetchImageProfile,
  FetchName,
  FetchNickname,
  fetchAccount,
} from '@/lib/actions/user.action'
import { AlertAuth } from '@/lib/alert/alertSession'
import { getCurrentUser } from '@/lib/session'
import { Flex, Grid, Text } from '@radix-ui/themes'
import { Suspense } from 'react'

export default async function Page() {
  const session = await getCurrentUser()
  const UserBio = await FetchBio()
  const UserNickname = await FetchNickname()
  const UserProfile = await FetchImageProfile()
  const UserName = await FetchName()

  const ac = await fetchAccount()

  if (!session?.id) {
    return (
      <>
        <AlertAuth />
      </>
    )
  }

  if (session.id) {
    return (
      <>
        <Flex justify="center" align="center">
          <Grid
            justify="center"
            align="center"
            columns="1"
            gap="3"
            className="w-[400px] p-6 text-center shadow-inner 
            ring-1
            "
          >
            {ac?.image ? (
              <Avatar className="left-1/2 h-36 w-36 -translate-x-16 ">
                <AvatarImage src={ac.image} />
                <AvatarFallback>{ac?.name}</AvatarFallback>
              </Avatar>
            ) : (
              <Avatar className="left-1/2 h-36 w-36 -translate-x-14 ">
                <AvatarImage src="defaultAvatar.png" />
              </Avatar>
            )}
            <div>
              <Text>
                {ac?.name} {ac?.nickname}
              </Text>
            </div>

            <h1>
              bio
              {ac?.bio}
            </h1>
          </Grid>

          <div className="divider divider-horizontal "></div>

          <Grid>
            <div className="divider text-lg font-bold"> POST </div>
          </Grid>
        </Flex>
      </>
    )
  }
}
