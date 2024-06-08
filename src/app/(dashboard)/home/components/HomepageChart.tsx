import { Text } from '@chakra-ui/react'
import Link from 'next/link'
import { Button } from '../../../../components/ui/button'

const HomepageChat = () => {
  return (
    <div className="">
      <Link href="/conversationroom">
        <Text className="hover:cursor-pointer hover:underline" as="b">
          <Button>แชทกับเพื่อน</Button>
        </Text>
      </Link>
    </div>
  )
}

export default HomepageChat
