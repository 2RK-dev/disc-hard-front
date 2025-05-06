import { CommonErrors } from "./error";
import { DtoCreateGroupRequest, DtoGroup, DtoGroupInfo, DtoGroupInvite } from "@/api/types";
import { http } from "./axios";
import { Dto } from "@/api/schemas";
import axios from "axios";

export const CreateGroupErrors = {
    MEMBER_NOT_FOUND: 'MEMBER_NOT_FOUND',
    ...CommonErrors,
} as const;

export type CreateGroupError = typeof CreateGroupErrors[keyof typeof CreateGroupErrors];

export const createGroup = async (data: DtoCreateGroupRequest): Promise<{
    success: boolean;
    data?: DtoGroupInfo;
    error?: CreateGroupError;
}> => {
    try {
        const {data: responseData} = await http.priv.post("/groups", data);
        return {success: true, data: Dto.GroupInfoSchema.parse(responseData)};
    } catch (e) {
        if (!axios.isAxiosError(e)) return {success: false, error: "UNKNOWN_ERROR"};
        switch (e.response?.status) {
            case 404:
                return {success: false, error: "MEMBER_NOT_FOUND"};
            case 500:
                return {success: false, error: "SERVER_ERROR"};
        }
        return {success: false, error: "UNKNOWN_ERROR"};
    }
}

export const LeaveGroupErrors = {
    NOT_A_GROUP: "NOT_A_GROUP",
    ...CommonErrors,
} as const;

export type LeaveGroupError = typeof LeaveGroupErrors[keyof typeof LeaveGroupErrors];

export const leaveGroup = async (groupId: string): Promise<{
    success: boolean;
    error?: LeaveGroupError;
}> => {
    try {
        await http.priv.delete(`/groups/${groupId}/members/me`);
        return {success: true}
    } catch (e) {
        if (!axios.isAxiosError(e)) return {success: false, error: "UNKNOWN_ERROR"};
        switch (e.response?.status) {
            case 400:
                return {success: false, error: "NOT_A_GROUP"};
            case 500:
                return {success: false, error: "SERVER_ERROR"};
        }
        return {success: false, error: "UNKNOWN_ERROR"};
    }
}

export const FetchGroupErrors = {
    NOT_A_GROUP: "NOT_A_GROUP",
    NOT_A_MEMBER: "NOT_A_MEMBER",
    NOT_FOUND: "NOT_FOUND",
    ...CommonErrors,
} as const;

export type FetchGroupError = typeof FetchGroupErrors[keyof typeof FetchGroupErrors];

export const fetchGroup = async (groupId: string): Promise<{
    success: boolean;
    data?: DtoGroup;
    error?: FetchGroupError;
}> => {
    try {
        const {data: responseData} = await http.priv.get(`/groups/${groupId}`);
        const parsed = Dto.GroupSchema.parse(responseData);
        return {success: true, data: parsed};
    } catch (e) {
        if (!axios.isAxiosError(e)) return {success: false, error: "UNKNOWN_ERROR"};
        switch (e.response?.status) {
            case 400:
                return {success: false, error: "NOT_A_GROUP"};
            case 403:
                return {success: false, error: "NOT_A_MEMBER"};
            case 404:
                return {success: false, error: "NOT_FOUND"}
            case 500:
                return {success: false, error: "SERVER_ERROR"};
        }
        return {success: false, error: "UNKNOWN_ERROR"};
    }
}

export const GroupInviteErrors = {
    NOT_A_GROUP: "NOT_A_GROUP",
    NO_PERMISSION: "NO_PERMISSION",
    NOT_FOUND: "NOT_FOUND",
    ...CommonErrors,
} as const;

export type GroupInviteError = typeof GroupInviteErrors[keyof typeof GroupInviteErrors];

export const inviteToGroup = async (groupId: string, data: DtoGroupInvite): Promise<{
    success: boolean;
    error?: GroupInviteError;
}> => {
    try {
        await http.priv.post(`/groups/${groupId}/members`, data);
        return {success: true};
    } catch (e) {
        if (!axios.isAxiosError(e)) return {success: false, error: "UNKNOWN_ERROR"};
        switch (e.response?.status) {
            case 400:
                return {success: false, error: "NOT_A_GROUP"};
            case 403:
                return {success: false, error: "NO_PERMISSION"};
            case 404:
                return {success: false, error: "NOT_FOUND"};
            case 500:
                return {success: false, error: "SERVER_ERROR"};
        }
        return {success: false, error: "UNKNOWN_ERROR"};
    }
}