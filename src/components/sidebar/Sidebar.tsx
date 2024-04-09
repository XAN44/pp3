import { getCurrentUser } from "@/lib/session"
import DesktopSidebar from "./DesktopSidebar"

async function Sidebar({ children }: {
    children: React.ReactNode
}) {
    const user = await getCurrentUser()
    return (
        <div className=" max-h-full w-full ">
            <DesktopSidebar currentUser={user!} />
            <main className="lg:pl-20 h-full">
                {children}
            </main>
        </div>
    )
}

export default Sidebar