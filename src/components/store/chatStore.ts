import create from 'zustand'

interface ChatStore {
    selectedUser: string
    setSelectedUser: (userId: string) => void
}

const useChatStore = create<ChatStore>((set) => ({
    selectedUser: '',
    setSelectedUser: (userId: string) => set({ selectedUser: userId }),

}))

export default useChatStore
