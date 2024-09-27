import HomePageHeader from '../../../components/homepage/HomePageHeader'
import Fetchprofilehome from '../../../components/profile/fetchprofilehome'
import { fetchInBlogPage } from '../../../lib/actions/user.carousel'
import {
  getTotalFollowers,
  getTotalFollowing,
} from '../../../lib/actions/user.follow'
import { fetchUserProfileByID } from '../../../lib/actions/user.post'
import { getCurrentUser } from '../../../lib/session'
import HomePageContent from './components/HomePagecontent'
import ProfileInfo from './components/profileInfo'

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="grid h-full grid-cols-3">
      <div className="sticky col-span-1 h-full max-h-full">
        <ProfileInfo />
      </div>
      <div className="col-span-2 overflow-y-auto">{children}</div>
    </main>
  )
}
