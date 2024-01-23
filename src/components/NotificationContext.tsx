import { ReactNode, createContext, useContext, useState } from 'react'

type NotificationContextType = {
  notifications: string[]
  addNotification: (notification: string) => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
)

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<string[]>([])

  const addNotification = (notification: string) => {
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      notification,
    ])
  }

  return (
    <NotificationContext.Provider value={{ notifications, addNotification }}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error(
      'useNotification must be used within a NotificationProvider'
    )
  }
  return context
}
