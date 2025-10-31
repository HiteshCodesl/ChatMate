import type { Chat, Store } from "./store.js";

let globalChatId = 0;

export interface Room{
    roomId: string;
    chats: Chat[];
}
export class InMememoryStore implements Store{
    private store: Map<string, Room>;

    constructor(){
        this.store = new Map<string, Room>();
    }

    initRoom(roomId: string) {
        this.store.set(roomId, {
            roomId,
            chats: []
        })
    }

    getChat(roomId: string, limit: number, offset: number) {
         const room = this.store.get(roomId);
         if(!room){
            return []
         }
         return room.chats.reverse().slice(-1 * limit)
    }

    addChat(roomId: string, userId: string, message: string, name: string) {
        const room = this.store.get(roomId);
        if(!room){
            return []
        }

        const chat = {
            id: (globalChatId++).toString(),
            userId,
            name,
            message
        }

        room.chats.push(chat);

        return chat;
    }
}