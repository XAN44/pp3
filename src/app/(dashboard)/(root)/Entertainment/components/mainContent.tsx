import { Text } from '@chakra-ui/react'

const MainContent = () => {
  return (
    <div className="h-full w-full bg-black">
      <div className="  left-28  ml-28 mt-3 grid w-[530px] ">
        <Text as="b" fontSize="x-large" color="whitesmoke ">
          ค้นหาความบันเทิงของคุณได้ที่นี่
        </Text>
        <Text
          as="b"
          fontSize="x-large"
          color="whitesmoke "
          fontFamily="inherit"
        >
          Find your entertainment here.
        </Text>
        <Text as="p" fontSize="medium" color="whitesmoke" fontStyle="inherit">
          ค้นหาความบันเทิงของคุณได้ที่นี่ค้นหาความบันเทิงของคุณได้ที่นี่ Find
          your entertainment here. Find your entertainment here.
          ค้นหาความบันเทิงของคุณได้ที่นี่Find your entertainment here.
        </Text>
      </div>
    </div>
  )
}

export default MainContent
