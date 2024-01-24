import { CommentInPost } from "@/lib/actions/user.comment";
import { createServer} from "http"
import {Server  } from 'socket.io'

const httpSerever = createServer();
const io = new Server(httpSerever,{
    cors:{
        origin:"*",
        methods:["GET","POST"]
    }}
)

io.on("connection",(socket) => {
    console.log("a user connected" , socket.id)

    socket.on('newComment',async ({postId,comment,authorId,path}) => {
        await CommentInPost(postId,comment,authorId,path)
        io.to(postId).emit('notification',{
              data: {
      body: `${authorId} commented on your post.`,
      userId: authorId,
      postId: postId,
      },
        })
    } )
}
)





httpSerever.listen(5000, () => {
    console.log('Server is listn ot the port 5000')
})