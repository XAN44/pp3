import { useParams } from 'next/navigation'
import { useMemo } from 'react'

const useRoom = () => {
  const params = useParams()

  const conversationroomId = useMemo(() => {
    if (!params?.conversationroomId) {
      return ' '
    }
    return params.conversationroomId as string
  }, [params?.conversationroomId])
  const isOpen = useMemo(() => !!conversationroomId, [conversationroomId])

  return useMemo(
    () => ({
      isOpen,
      conversationroomId,
    }),
    [isOpen, conversationroomId]
  )
}

export default useRoom
