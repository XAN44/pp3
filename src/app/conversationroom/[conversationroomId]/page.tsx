import Emty from '@/components/stage/emty'
import Header from './components/Header'
import getConversationRoomById from '@/lib/actions/user.getRomebyId'
import Body from './components/body'
import Form from './components/Form'
import getMessages from '@/lib/actions/getMessages'
import { Metadata } from 'next'

interface IParams {
  conversationroomId: string
}

export const metadata: Metadata = {
  title: 'Conversation',
}

const ConversationroomId = async ({ params }: { params: IParams }) => {
  const conversation = await getConversationRoomById(params.conversationroomId)
  const message = await getMessages(params.conversationroomId)

  if (!conversation) {
    return (
      <div className="h-screen w-full lg:pl-80">
        <div className="flex h-full w-full flex-col">
          <Emty />
        </div>
      </div>
    )
  }
  return (
    <div className="h-screen w-full lg:pl-80">
      <div className="flex h-full flex-col">
        <Header room={conversation} />
        <Body initialMessages={message} />
        <Form />
      </div>
    </div>
  )
}

export default ConversationroomId
