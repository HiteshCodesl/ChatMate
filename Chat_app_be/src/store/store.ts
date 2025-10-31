export type UserId = string;

export interface Chat{
    id: string;
    userId: string;
    name: string;
    message: string;
}

export abstract class Store{
    constructor(){

    }
    initRoom(roomId: string){

    }
    getChat(roomId: string, limit: number, offset: number){

    }
    addChat(roomId: string, userId: string, message: string, name: string){
       
    }
}