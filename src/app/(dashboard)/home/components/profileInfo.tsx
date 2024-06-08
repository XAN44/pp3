import Fetchprofilehome from '../../../../components/profile/fetchprofilehome'
import {
  getTotalFollowers,
  getTotalFollowing,
} from '../../../../lib/actions/user.follow'
import { fetchUserProfileByID } from '../../../../lib/actions/user.post'
import { getCurrentUser } from '../../../../lib/session'
import ProfileInfoAbout from './protileInFoAbout'

const ProfileInfo = async () => {
  const user = await getCurrentUser()
  const userInfo = await fetchUserProfileByID(user?.id || '')
  const userfollow = await getTotalFollowers(user?.id || '')
  const userfollowing = await getTotalFollowing(user?.id || '')
  return (
    <aside
      className=" 
      inset-x-0
      right-0 place-items-start
      px-3  
      xl:ml-16 xl:mt-10 xl:h-full
      xl:w-96
                 "
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
      <div className="mt-3">
        <ProfileInfoAbout />
      </div>
    </aside>
  )
}

export default ProfileInfo
