import { DtoConversationEvent, DtoStartConversation, DtoTypingIndicator } from "@/api/types";
import { publish, subscribe, unsubscribe } from "./core";
import { Dto } from "@/api/schemas";
import { IMessage } from "@stomp/stompjs";

export const startNewConversation = (data: DtoStartConversation) => {
    publish("/app/conversations/new", data);
}

export const sendTypingIndicator = (data: DtoTypingIndicator) => {
    publish(`/app/typing`, data);
}

export const receiveConversationUpdates = (callback: (data: DtoConversationEvent) => void) => {
    const destination = "/topic/conversations/updates";
    subscribe(destination, (message: IMessage) => {
        const data = Dto.ConversationEventSchema.parse(JSON.parse(message.body));
        callback(data);
    });
    return () => unsubscribe(destination);
}

export const receiveTypingIndicators = (conversationId: number, callback: (data: DtoTypingIndicator) => void) => {
    const destination = `/topic/conversations/${conversationId}/typing`;
    subscribe(destination, (message: IMessage) => {
        const data = Dto.TypingIndicatorSchema.parse(JSON.parse(message.body));
        callback(data);
    });
    return () => unsubscribe(destination);
}