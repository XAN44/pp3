import Footer from '@/components/Footer'
import Agreement from '@/components/agrichistory/agreement'
import Whatiscookie from '@/components/agrichistory/whatiscookie'
import Workwithus from '@/components/agrichistory/workwith'
import React from 'react'

export default function page() {
  return (
    <>
      <div className=" mb-20 mt-[80px]  h-full w-full items-center justify-center">
        <Whatiscookie />
        <Footer />
      </div>
    </>
  )
}
