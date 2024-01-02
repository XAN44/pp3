import Image from "next/image";
import React from "react";
import HomePageContent from "./HomePageContent";

type Props = {};

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
              className="w-full h-full top-0 left-0 object-cover "
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
            flex flex-col items-center justify-center 
            text-white 
            right-20 
            md:right-[400px] 
            lg:right-[670px]
            xl:right-[790px] 
            bottom-10 
            sm:bottom-1
            md:bottom-[80px]
            lg:bottom-[140px]
            xl:bottom-[140px] 

           
            "
            >
              <h1
                className="
              whitespace-nowrap 
              font-extrabold 
              text-3xl
              md:text-sm
              lg:text-3xl
              text-white drop-shadow-lg"
              >
                ค้นหาชุมชนของคุณ
              </h1>
              <h1
                className="
              whitespace-nowrap 
              font-semibold 
              text-xl
              md:text-sm/[17px]
              lg:text-xl
            text-white"
              >
                เว็บไซต์ที่พร้อมช่วยให้คุณ <br />
                ได้ประสบการณ์ดีๆจากชุมชน
              </h1>
            </div>
            {/* btn */}
            <div
              className="

              absolute 
              inset-x-0 
              flex justify-center space-x-10
              bottom-10 
              sm:bottom-[30px]
              md:bottom-[70px]
              lg:bottm-[690px]
              left-96
              md:left-[400px]
              lg:left-[700px]
              xl:left-[900px]
              "
            >
              <button
                className="
              btn 
              bg-stone-800
              w-36
              bg-opacity-80
              btn-xs 
              sm:btn-xs
              md:btn-md
              ring-1
              ring-white
              hover:bg-zinc-500
              text-white
               "
              >
                REGISTER
              </button>
              <button
                className="
              btn 
              bg-stone-800
              bg-opacity-80              
              w-36
              btn-xs 
              sm:btn-xs
              md:btn-md    
              ring-1
              ring-white
              hover:bg-zinc-500
              text-white

              "
              >
                LEARN MORE
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
