import z from "zod";

export enum SupportedMessage {
    JoinRoom = "JOIN_ROOM",
    SendMessage = "SEND_MESSAGE"
}

export type IncomingMessage = {
    type: SupportedMessage.JoinRoom,
    payload: InitMessageType
} | {
    type: SupportedMessage.SendMessage,
    payload: UserMessageType
}

export type InitMessageType = z.infer<typeof InitMessage>;

export const InitMessage = z.object({
    name: z.string(),
    userId: z.string(),
    roomId: z.string(),
})

export type UserMessageType = z.infer<typeof UserMessage>

export const UserMessage = z.object({
    userId: z.string(),
    roomId: z.string(),
    message: z.string()
})