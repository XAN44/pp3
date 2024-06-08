import { Text } from '@chakra-ui/react'
import Articleinhomepage from '../../../../components/compoinhome/articleinhomepage'
import EventInhomepage from '../../../../components/event/eventInhomepage'
import HomepageSocial from './HomepageSocial'

const HomePageContent = () => {
  return (
    <div className="fixed left-28 h-full w-1/5 flex-col items-center justify-center overflow-y-scroll ">
      <div className="   h-full  text-center">
        <Text as="b" fontSize="larger" align="center">
          เนื้อหาแนะนำ
        </Text>
        <Articleinhomepage />
        <EventInhomepage />
        <HomepageSocial />
      </div>
    </div>
  )
}

export default HomePageContent
