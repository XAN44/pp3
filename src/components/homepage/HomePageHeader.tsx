import Image from 'next/image'
import React from 'react'
import HomePageContent from './HomePageContent'

type Props = {}

export default function HomePageHeader({}: Props) {
  return (
    <>
      {/* Image header homePage */}
      <div
        className="
    
      "
      >
        <div className="relative">
          <div className="grid grid-cols-1 items-center justify-between">
            <Image
              className="left-0 top-0 h-full w-full object-cover "
              src="/coverImage.png"
              alt="Cover Image"
              width={500}
              height={500}
              quality={100}
              layout="responsive"
              objectFit="cover"
            />
            {/* text in image header */}
            <div
              className="
            absolute inset-0 
            bottom-10 right-20 flex flex-col 
            items-center 
            justify-center 
            text-white 
            sm:bottom-1
            md:bottom-[80px] 
            md:right-[400px] 
            lg:bottom-[140px]
            lg:right-[670px]
            xl:bottom-[140px]
            xl:right-[790px] 

           
            "
            >
              <h1
                className="
              whitespace-nowrap 
              text-3xl 
              font-extrabold
              text-white
              drop-shadow-lg
              md:text-sm lg:text-3xl"
              >
                ค้นหาชุมชนของคุณ
              </h1>
              <h1
                className="
              whitespace-nowrap 
              text-xl 
              font-semibold
              text-white
              md:text-sm/[17px]
            lg:text-xl"
              >
                เว็บไซต์ที่พร้อมช่วยให้คุณ <br />
                ได้ประสบการณ์ดีๆจากชุมชน
              </h1>
            </div>
            {/* btn */}
            <div
              className="

              lg:bottm-[690px] 
              absolute 
              inset-x-0 bottom-10 left-96
              flex 
              justify-center
              space-x-10
              sm:bottom-[30px]
              md:bottom-[70px]
              md:left-[400px]
              lg:left-[700px]
              xl:left-[900px]
              "
            >
              <button
                className="
              btn 
              btn-xs
              w-36
              bg-stone-800
              bg-opacity-80 
              text-white
              ring-1
              ring-white
              sm:btn-xs
              md:btn-md
              hover:bg-zinc-500
               "
              >
                REGISTER
              </button>
              <button
                className="
              btn 
              btn-xs
              w-36              
              bg-stone-800
              bg-opacity-80 
              text-white
              ring-1    
              ring-white
              sm:btn-xs
              md:btn-md
              hover:bg-zinc-500

              "
              >
                LEARN MORE
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
