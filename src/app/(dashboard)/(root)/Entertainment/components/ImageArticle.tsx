'use client'
import { Image } from '@nextui-org/react'
import useImage from './imageIndex'
import { useState } from 'react'
import { Text } from '@chakra-ui/react'

const ImageArticle = () => {
  const image = useImage()

  const [isZoomed, setIsZoomed] = useState(null)

  const handleZoom = (src: any) => {
    setIsZoomed(src)
  }

  const closeZoom = (src: any) => [setIsZoomed(null)]

  return (
    <div className="h-full w-full bg-black ">
      <div className="flex items-center justify-center">
        <div className="mt-16 flex w-[500px] items-center justify-center ring-1 ring-white" />
      </div>
      <div className="mt-16 flex flex-col items-center justify-center text-white">
        <Text as="b" fontSize="large">
          เลือกดูรูปภาพที่ต้องการ
        </Text>
        <Text as="b" fontSize="x-large">
          #Entertainment
        </Text>
      </div>
      <div className="items-center justify-center lg:flex ">
        <div className="mx-auto w-screen columns-4 space-y-4 md:p-16 lg:p-16">
          {image.map((m, index) => (
            <div
              key={index}
              className=" 
                overflow-hidden 
               border-1 
              border-white 
              
              "
              onClick={() => handleZoom(m.image)}
            >
              <Image src={m.image} alt={m.alt} isZoomed radius="none" />
            </div>
          ))}
        </div>
        {isZoomed && (
          <div
            className=" 
          fixed
          inset-0 z-50 
          flex items-center justify-center  
          bg-black bg-opacity-85 "
            onClick={closeZoom}
          >
            <div className="w-[600px]">
              <Image src={isZoomed} alt="" isBlurred />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ImageArticle
