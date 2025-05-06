import { CommonErrors } from "./error";
import { DtoConversationList, DtoMemberList, DtoMessagesPage } from "@/api/types";
import { http } from "./axios";
import { Dto } from "@/api/schemas";
import { AxiosError } from "axios";

export const FetchConversationListErrors = {
    ...CommonErrors,
} as const;

export type FetchConversationListError = typeof FetchConversationListErrors[keyof typeof FetchConversationListErrors];

export const fetchConversations = async (): Promise<{
    success: boolean;
    data?: DtoConversationList;
    error?: FetchConversationListError;
}> => {
    try {
        const {data} = await http.priv.get("/conversations");
        return {success: true, data: Dto.ConversationListSchema.parse(data)};
    } catch (e) {
        if (e instanceof AxiosError && e.response?.status === 500) {
            return {success: false, error: "SERVER_ERROR"};
        } else return {success: false, error: "UNKNOWN_ERROR"};
    }
}

export const FetchMessageListErrors = {
    FORBIDDEN: "FORBIDDEN",
    NOT_FOUND: "NOT_FOUND",
    ...CommonErrors,
} as const;

export type FetchMessageListError = typeof FetchMessageListErrors[keyof typeof FetchMessageListErrors];

export const fetchMessages = async (conversationId: string, page = 0, pageSize = 20): Promise<{
    success: boolean;
    data?: DtoMessagesPage;
    error?: FetchMessageListError;
}> => {
    try {
        const {data} = await http.priv.get(`/conversations/${conversationId}/messages?page=${page}&size=${pageSize}`);
        return {success: true, data: Dto.MessagesPagedSchema.parse(data)};
    } catch (e) {
        if (!(e instanceof AxiosError)) return {success: false, error: "UNKNOWN_ERROR"};
        switch (e.response?.status) {
            case 403:
                return {success: false, error: "FORBIDDEN"};
            case 404:
                return {success: false, error: "NOT_FOUND"};
            case 500:
                return {success: false, error: "SERVER_ERROR"};
        }
        return {success: false, error: "UNKNOWN_ERROR"};
    }
}

export const FetchConversationMembersErrors = {
    FORBIDDEN: "FORBIDDEN",
    NOT_FOUND: "NOT_FOUND",
    ...CommonErrors,
} as const;

export type FetchConversationMembersError = typeof FetchConversationMembersErrors[keyof typeof FetchConversationMembersErrors];

export const fetchMembers = async (conversationId: string): Promise<{
    success: boolean;
    data?: DtoMemberList;
    error?: FetchConversationMembersError;
}> => {
    try {
        const {data} = await http.priv.get(`/conversations/${conversationId}/members`);
        return {success: true, data: Dto.MemberListSchema.parse(data)};
    } catch (e) {
        if (!(e instanceof AxiosError)) return {success: false, error: "UNKNOWN_ERROR"};
        switch (e.response?.status) {
            case 403:
                return {success: false, error: "FORBIDDEN"};
            case 404:
                return {success: false, error: "NOT_FOUND"};
            case 500:
                return {success: false, error: "SERVER_ERROR"};
        }
        return {success: false, error: "UNKNOWN_ERROR"};
    }
}