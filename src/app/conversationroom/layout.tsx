import Chatsidebar from '@/components/sidebar/Chatsidebar'
import getRoom from '@/lib/actions/user.getRome'
import RoomList from './components/RoomList'

export default async function ConversationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const conversation = await getRoom()
  return (
    <Chatsidebar>
      <div className="h-full w-full ">
        <RoomList initialItem={conversation} />
        {children}
      </div>
    </Chatsidebar>
  )
}
