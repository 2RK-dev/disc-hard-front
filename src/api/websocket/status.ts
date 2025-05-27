import { DtoUpdateUserStatus, DtoUserStatusUpdate } from "@/api/types";
import { publish, subscribe } from "./core";
import { IMessage } from "@stomp/stompjs";
import { Dto } from "@/api/schemas";

export const updateUserStatus = (data: DtoUpdateUserStatus) => {
    publish("/app/status", data);
}

export const receiveUserStatusUpdates = (callback: (data: DtoUserStatusUpdate) => void) => {
    const destination = "/topic/users/status";
    subscribe(destination, (message: IMessage) => {
        const data = Dto.UserStatusUpdateSchema.parse(JSON.parse(message.body));
        callback(data);
    });
}