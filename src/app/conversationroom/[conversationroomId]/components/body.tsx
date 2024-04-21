'use client'

import useRoom from '@/app/hooks/useRoom'
import { FullmessageSender } from '@/types/chatindex'
import { useEffect, useRef, useState } from 'react'
import MessageBox from './Messagesbox'
import axios from 'axios'
import { pusherClient } from '@/lib/pusher'
import { find } from 'lodash'

interface BodyProps {
  initialMessages: FullmessageSender[]
}

const Body: React.FC<BodyProps> = ({ initialMessages }) => {
  const [messages, setMessages] = useState(initialMessages)
  const bottomRef = useRef<HTMLDivElement>(null)

  const { conversationroomId } = useRoom()

  useEffect(() => {
    axios.post(`/api/conversationroom/${conversationroomId}/seen`)
  }, [conversationroomId])

  useEffect(() => {
    pusherClient.subscribe(conversationroomId)
    bottomRef?.current?.scrollIntoView()

    const messageHandler = (message: FullmessageSender) => {
      axios.post(`/api/conversationroom/${conversationroomId}/seen`)
      setMessages((current) => {
        if (find(current, { id: message.id })) {
          return current
        }
        return [...current, message]
      })
      bottomRef?.current?.scrollIntoView()
    }

    const updateMessageHandler = (newMessage: FullmessageSender) => {
      setMessages((current) =>
        current.map((currentMessage) => {
          if (currentMessage.id === newMessage.id) {
            return newMessage
          }
          return currentMessage
        })
      )
    }
    pusherClient.bind('messages:new', messageHandler)
    pusherClient.bind('message:update', updateMessageHandler)

    return () => {
      pusherClient.unsubscribe(conversationroomId)
      pusherClient.unbind('messages:new', messageHandler)
      pusherClient.unbind('message:update', updateMessageHandler)
    }
  }, [conversationroomId])

  return (
    <div className="flex-1 overflow-y-auto ">
      {messages.map((message, i) => (
        <MessageBox
          isLast={i === messages.length - 1}
          key={message.id}
          data={message}
        />
      ))}
      <div ref={bottomRef} className="pt-24" />
    </div>
  )
}

export default Body
