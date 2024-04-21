import { Text } from '@chakra-ui/react'
import React from 'react'

export default function Emty() {
  return (
    <div
      className="
         flex 
        h-full 
        items-center 
        justify-center 
        bg-gray-100 
        px-4 
        py-10 
        sm:px-6 
        lg:px-8 
        lg:py-6"
    >
      <div className="flex flex-col items-center text-center">
        <Text fontSize={'medium'} fontWeight={'bold'}>
          เลือกแชทหรือเริ่มการสนทนาของคุณ
        </Text>
      </div>
    </div>
  )
}
