import React from 'react'
import create from 'zustand'

type Notification = {
  notificationCount: number
  notificationIncrement: (currentNotifications: number) => void
  notificationRead: () => void
  statusRead: boolean
}

export const UseStoreNotification = create<Notification>((set) => ({
  notificationCount: 0,
  notificationIncrement: (currentNotifications) => {
    set({ notificationCount: currentNotifications })
  },
  notificationRead: () => set({ notificationCount: 0 }),
  statusRead: false,
}))
