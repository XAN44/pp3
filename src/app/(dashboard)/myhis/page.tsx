import Footer from '@/components/Footer'
import Agrichistory from '@/components/agrichistory/agrichistory'
import HomePageContent from '@/components/homepage/HomePageContent'
import { Divider } from '@nextui-org/react'
import React from 'react'

export default function page() {
  return (
    <>
      <div className="mb-20 mt-[715px] h-full w-full items-center justify-center">
        <Agrichistory />
      </div>

      <Divider className="my-1 w-[500px] ring-0 ring-black " />
      <div className=" mb-20 mt-20 grid items-center justify-center text-center">
        <HomePageContent />
      </div>
      <Divider className="my-4 w-[500px] ring-0 ring-black " />
      <Footer />
    </>
  )
}
