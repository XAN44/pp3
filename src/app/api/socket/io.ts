// io.js

import { CommentInPost } from '@/lib/actions/user.comment'
import { createServer } from 'http'
import { Server } from 'socket.io'

const httpServer = createServer()
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})

io.on('connection', (socket) => {
  console.log('a user connected', socket.id)

  // Handle client events, e.g., new comments
  socket.on('newComment', async ({ postId, comment, authorId, path }) => {
    try {
      await CommentInPost(postId, comment, authorId, path)

      // Notify clients about the new comment
      io.emit('newCommentNotification', { postId, comment, authorId })
    } catch (error: any) {
      console.error('Error handling new comment:', error.message)
    }
  })

  // More event handlers if needed
})

httpServer.listen(5000, () => {
  console.log('Server is listening on port 5000')
})
