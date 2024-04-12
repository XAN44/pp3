import Emty from "@/components/stage/emty"
import Header from "./components/Header"
import getConversationRoomById from "@/lib/actions/user.getRomebyId"
import Body from "./components/body"
import Form from "./components/Form"
import getMessages from "@/lib/actions/getMessages"
import { Metadata } from "next"

interface IParams {
    conversationroomId: string
}


export const metadata: Metadata = {
    title: 'Conversation'
}

const ConversationroomId = async ({ params }: { params: IParams }) => {

    const conversation = await getConversationRoomById(params.conversationroomId)
    const message = await getMessages(params.conversationroomId)

    if (!conversation) {
        return (
            <div className="lg:pl-80 h-screen w-full">
                <div className="h-full w-full flex flex-col">
                    <Emty />
                </div>
            </div>
        )
    }
    return (
        <div className="lg:pl-80 h-screen w-full">
            <div className="h-full flex flex-col">
                <Header room={conversation} />
                <Body initialMessages={message} />
                <Form />
            </div>
        </div>
    )
}

export default ConversationroomId