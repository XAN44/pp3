import { getCurrentUser } from "@/lib/session"
import DesktopSidebar from "./DesktopSidebar"
import ChatdesktopSidebar from "./ChatdesktopSidebar"

async function Chatsidebar({ children }: {
    children: React.ReactNode
}) {
    const user = await getCurrentUser()
    return (
        <div className=" max-h-full w-full ">
            <ChatdesktopSidebar currentUser={user as any} />
            <main className="lg:pl-20 h-full">
                {children}
            </main>
        </div>
    )
}

export default Chatsidebar