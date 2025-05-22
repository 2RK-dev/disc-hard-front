import { DtoReceivedMessage, DtoSendMessage } from "@/api/types";
import { publish, subscribe, unsubscribe } from "./core";
import { IMessage } from "@stomp/stompjs";
import { Dto } from "@/api/schemas";

export const sendMessage = (data: DtoSendMessage) => {
    publish("/app/messages", data);
}

export const receiveUserMessages = (callback: (data: DtoReceivedMessage) => void) => {
    const destination = "/user/queue/messages";
    subscribe(destination, (message: IMessage) => {
        const data = Dto.ReceivedMessageSchema.parse(JSON.parse(message.body));
        callback(data);
    });
    return () => unsubscribe(destination);
}

export const receiveConversationMessages = (conversationId: number, callback: (data: DtoReceivedMessage) => void) => {
    const destination = `/topic/conversations/${conversationId}`;
    subscribe(destination, (message: IMessage) => {
        const data = Dto.ReceivedMessageSchema.parse(JSON.parse(message.body));
        callback(data);
    });
    return () => unsubscribe(destination);
}