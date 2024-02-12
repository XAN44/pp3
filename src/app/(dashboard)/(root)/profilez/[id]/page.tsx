import ProfileHeader from '@/components/profile/ProfileHeader'
import { getCurrentUser } from '@/lib/session'

async function GETDATA(id: string) {
  const response = await fetch(`http:localhost:3000/api/profile?id=` + id, {
    cache: 'force-cache',
  })
  if (!response.ok) {
    throw new Error('cannot fetch data from')
  }
  return response.json()
}

export default async function Page({ params }: { params: { id: string } }) {
  if (!params.id) return null
  const user = await getCurrentUser()
  if (!user) return null
  const getData = await GETDATA(params.id)
  console.log('getData', getData)
  return (
    <>
      <div className="">
        {getData?.map((Account: any, index: any) => (
          <div key={index}>
            <ProfileHeader
              accountId={Account.id}
              authUserId={user.id || ''}
              name={Account.name}
              nickname={''}
              image={Account.image}
              bio={''}
              totalFollower={1}
              totalFollowing={2}
              isFollow={false}
              contact={{
                facebook: '',
                ig: '',
                twitter: '',
                tiktok: '',
              }}
            />
          </div>
        ))}
      </div>
    </>
  )
}
