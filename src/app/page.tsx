import HomePageContent1 from '@/components/homepage/HomePageContent1'
import HomePageContent from '../components/homepage/HomePageContent'
import HomePageHeader from '../components/homepage/HomePageHeader'
import Footer from '@/components/Footer'
import Navbars from '../components/Navbar'
import { useSession } from 'next-auth/react'
import { getCurrentUser } from '../lib/session'

export default async function Home() {
  const user = await getCurrentUser()

  return (
    <>
      <Navbars userId={user?.id || ' '} />
      <div
        className="
         h-full
        w-full
        
      "
      >
        {/* Cover Image */}
        <div className="">
          <HomePageHeader />
        </div>
        {/* Main Content Section */}
        <div className="  grid  items-center justify-center text-center">
          <HomePageContent />
        </div>
        <div className="mt-14 items-center justify-center text-center">
          <HomePageContent1 />
        </div>
        <Footer />
      </div>
    </>
  )
}
