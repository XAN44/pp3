import Footer from '@/components/Footer'
import Workus from '@/components/agrichistory/Workus'
import Workwithus from '@/components/agrichistory/workwith'
import React from 'react'

export default function page() {
  return (
    <>
      <div className=" mb-20 mt-[80px]  h-full w-full items-center justify-center">
        <Workus />
        <Footer />
      </div>
    </>
  )
}
