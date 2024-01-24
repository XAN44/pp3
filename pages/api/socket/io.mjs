import { createServer} from "http"
import {Server  } from 'socket.io'

const httpSerever = createServer();
const io = new Server(httpSerever,{
    cors:{
        origin:"*",
        methods:["GET","POST"]
    }}
)

io.on("connection",async(socket) => {
    console.log("a user connected" , socket.id)
}
)

httpSerever.listen(5000, () => {
    console.log('Server is listn ot the port 5000')
})