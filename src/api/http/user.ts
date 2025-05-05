import { DtoProfileUpdateRequest, DtoProfileUpdateResponse, DtoUser, DtoUserList } from "@/api/types";
import { http } from "./axios";
import { Dto } from "@/api/schemas";
import { CommonErrors } from "./error";
import { AxiosError } from "axios";

export const UpdateProfileErrors = {
    INVALID_NAME: "INVALID_NAME",
    ...CommonErrors,
} as const;

export type UpdateProfileError = typeof UpdateProfileErrors[keyof typeof UpdateProfileErrors];

export const updateProfile = async (data: DtoProfileUpdateRequest): Promise<{
    success: boolean,
    data?: DtoProfileUpdateResponse,
    error?: UpdateProfileError,
}> => {
    try {
        const {data: responseData} = await http.priv.patch<DtoProfileUpdateRequest>("/profile", data);
        const parsed = Dto.ProfileUpdateSchema.Response.parse(responseData);
        return {success: true, data: parsed};
    } catch (e) {
        if (!(e instanceof AxiosError)) return {success: false, error: "UNKNOWN_ERROR"};
        switch (e.response?.status) {
            case 400:
                return {success: false, error: "INVALID_NAME"};
            case 500:
                return {success: false, error: "SERVER_ERROR"};
        }
        return {success: false, error: "UNKNOWN_ERROR"};
    }
}

export const FetchUserListErrors = {
    ...CommonErrors,
} as const;

export type FetchUserListError = typeof FetchUserListErrors[keyof typeof FetchUserListErrors];

export const fetchUserList = async (): Promise<{
    success: boolean;
    data?: DtoUserList;
    error?: FetchUserListError;
}> => {
    try {
        const {data} = await http.pub.get("/users");
        return {success: true, data: Dto.UserListSchema.parse(data)};
    } catch (e) {
        if (e instanceof AxiosError && e.response?.status === 500) {
            return {success: false, error: "SERVER_ERROR"};
        } else return {success: false, error: "UNKNOWN_ERROR"};
    }
}

export const FetchUserErrors = {
    NOT_FOUND: "NOT FOUND",
    ...CommonErrors,
} as const;

export type FetchUserError = typeof FetchUserErrors[keyof typeof FetchUserErrors];

export const fetchUser = async (userId: string): Promise<{
    success: boolean;
    data?: DtoUser;
    error?: FetchUserError;
}> => {
    try {
        const {data} = await http.pub.get(`/users/${userId}`);
        return {success: true, data: Dto.UserSchema.parse(data)};
    } catch (e) {
        if (!(e instanceof AxiosError)) return {success: false, error: "UNKNOWN_ERROR"};
        switch (e.response?.status) {
            case 404:
                return {success: false, error: "NOT FOUND"};
            case 500:
                return {success: false, error: "SERVER_ERROR"};
        }
        return {success: false, error: "UNKNOWN_ERROR"};
    }
}