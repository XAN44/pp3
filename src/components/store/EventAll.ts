import { create } from "zustand"

type initialState = {
    eventCount: number,
    eventIncrument:(e:number) => void
}

export const EventInitial = create<initialState>((set) => ({
    eventCount: 0,
    eventIncrument(e) {
        set({ eventCount: e })
    },
}))