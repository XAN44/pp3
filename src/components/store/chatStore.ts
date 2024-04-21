import create from 'zustand'

interface chatInfo {
  selectUser: {
    id: string
    name: string
    image: string
  }
  setSelectUser: (setId: string, setName: string, setImage: string) => void
}

const useChatStore = create<chatInfo>((set) => ({
  selectUser: {
    id: '',
    name: '',
    image: '',
  },
  setSelectUser: (setId: string, setName: string, setImage: string) =>
    set({
      selectUser: {
        id: setId,
        name: setName,
        image: setImage,
      },
    }),
}))

export default useChatStore
