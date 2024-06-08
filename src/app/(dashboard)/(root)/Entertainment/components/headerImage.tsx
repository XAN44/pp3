import { Button, Image } from '@nextui-org/react'
import React from 'react'

export default function HeaderImage() {
  return (
    <div className="h-full w-full  ">
      <Image
        radius="none"
        alt="image"
        src="/Rectangle990.png"
        removeWrapper={true}
        className=" w-full object-cover"
      />

      <div className="w-full">
        <div className="right-28 mr-28 mt-6 flex items-center justify-end  gap-x-6">
          <Button
            radius="full"
            className="
          border-1 
          border-yellow-500 bg-black text-white ring-1 
          ring-yellow-600  hover:bg-gradient-to-tr
          hover:from-yellow-400 hover:via-yellow-500 
          hover:to-yellow-200"
          >
            ติดต่อโฆษณา
          </Button>

          <Button
            radius="full"
            className="
          border-1
          border-gray-100 bg-black
          text-white ring-1 ring-white "
          >
            Learn More
          </Button>
        </div>
      </div>
    </div>
  )
}
