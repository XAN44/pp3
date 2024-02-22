import HomePageContent1 from '@/components/homepage/HomePageContent1'
import HomePageContent from '../components/homepage/HomePageContent'
import HomePageHeader from '../components/homepage/HomePageHeader'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <div
        className="
        -mt-[400px]
        h-96
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
