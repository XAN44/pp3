import DesktopSidebar from "@/components/sidebar/DesktopSidebar"
import Sidebar from "@/components/sidebar/Sidebar"
import { getCurrentUser } from "@/lib/session"
import getUser from "@/lib/actions/user.chat"
import ListUser from "./components/listuser"
import Chatsidebar from "@/components/sidebar/Chatsidebar"

export default async function ChatLayout({
    children }: {
        children: React.ReactNode
    }) {
    const users = await getUser()
    return (

        <Chatsidebar>
            <main className="h-full w-full">
                <ListUser items={users!} />
                {children}
            </main>
        </Chatsidebar>
    )
}