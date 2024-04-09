import Sidebar from "@/components/sidebar/Sidebar"
import ConversationList from "./components/conversationList"
import getConverSation from "@/lib/actions/user.getConversation"

export default async function ConversationLayout({
    children
}: {
    children: React.ReactNode
}) {

    const conversation = await getConverSation()
    return (
        <Sidebar>
            <div className=" h-full">
                <ConversationList initialItem={conversation} />
                {children}
            </div>
        </Sidebar>
    )
}