import { WebSocketServer, WebSocket } from "ws"

const wss = new WebSocketServer({ port: 8080 });

interface User{
    socket: WebSocket;
    room: string;
}

let Users: User[] = [];

wss.on('connection', (socket) =>{
    socket.on('error', console.error);

    socket.on('message', (msg) =>{
      const parsedMessage = JSON.parse(msg as unknown as string);

      if(parsedMessage.type === "join"){
         Users.push({
            socket: socket,
            room: parsedMessage.payload.room
         })
      }

      if(parsedMessage.type === "chat"){
       const currentUserRoom = Users.find(x => x.socket == socket)?.room;
       for(let i = 0; i < Users.length; i++){
        if(Users[i]?.room == currentUserRoom){
            Users[i]?.socket.send(parsedMessage.payload.message);
        }
       }
      }
    })
})
