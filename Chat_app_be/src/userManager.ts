import  {WebSocket} from "ws"

interface User{
    id: string;
    name: string;
    conn: WebSocket
}

interface Room{
    users: User[]
}

export class UserManager {
    private rooms: Map<string, Room>;
    constructor(){
        this.rooms = new Map<string, Room>()
    }

    addUser(name: string, userId: string, roomId: string, socket: WebSocket){
        if(!this.rooms.get(roomId)){
            this.rooms.set(roomId, {
                users: []
            })
        }
        this.rooms.get(roomId)?.users.push({
            id: userId,
            conn: socket,
            name: name
        })
    }

    removeUser(roomId: string, userId: string){
         const room = this.rooms.get(roomId);
         if(!room){
            return;
         }
         const remove = room.users.filter(user => user.id != userId)
    }

    getUser(roomId: string, userId: string): User | null{
       const users = this.rooms.get(roomId)?.users;

       const user = users?.find(user => user.id == userId);

       return user ?? null;
    }

    broadcast(roomId: string, userId: string, message: string){
      const user = this.getUser(roomId, userId);
      if(!user){
        return;
        console.log("user not found");
      }

      const room = this.rooms.get(roomId);
      if(!room){
        return;
        console.log("room not found");
      }

      room.users.forEach(({conn, id}) => {
        if(id === userId){
            return;
        }

        conn.send(JSON.stringify(message));
      })
    }
}