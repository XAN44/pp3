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
    <main
      className="
    flex 
    h-full 
    max-h-full 
    w-full 
    max-w-full
     "
    >
      <div className="mt-8  hidden h-full max-h-full w-1/2 md:hidden    lg:flex">
        <HomePageContent />
      </div>
      {children}
      <div
        className="
      fixed 
      right-0  
      hidden 
      max-h-full w-1/4
      overflow-y-scroll md:hidden lg:flex"
      >
        <ProfileInfo />
      </div>
    </main>
  )
}
