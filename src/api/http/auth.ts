import { DtoLoginRequest, DtoLoginResponse, DtoPasswordChange, DtoRegistrationRequest } from "@/api/types";
import { http } from "./axios";
import { AxiosError } from "axios";
import { Dto } from "@/api/schemas";
import { CommonErrors } from "./error";

export const RegisterErrors = {
    EMAIL_TAKEN: "EMAIL_TAKEN",
    PASSWORD_MISMATCH: "PASSWORD_MISMATCH",
    ...CommonErrors,
} as const;

export type RegisterError = typeof RegisterErrors[keyof typeof RegisterErrors];

export const register = async (data: DtoRegistrationRequest): Promise<{
    success: boolean;
    error?: RegisterError;
}> => {
    try {
        await http.pub.post<void>("/register", data);
        return {success: true};
    } catch (e) {
        if (!(e instanceof AxiosError)) return {success: false, error: RegisterErrors.UNKNOWN_ERROR};
        switch (e.response?.status) {
            case 400:
                return {success: false, error: "PASSWORD_MISMATCH"};
            case 409:
                return {success: false, error: "EMAIL_TAKEN"};
            case 500:
                return {success: false, error: "SERVER_ERROR"};
        }
        return {success: false, error: "UNKNOWN_ERROR"};
    }
}

export const LoginErrors = {
    INCORRECT_CREDENTIALS: "INCORRECT_CREDENTIALS",
    ...CommonErrors,
} as const;

export type LoginError = typeof LoginErrors[keyof typeof LoginErrors];

export const login = async (data: DtoLoginRequest): Promise<{
    success: boolean;
    data?: DtoLoginResponse;
    error?: LoginError;
}> => {
    try {
        const {data: responseData} = await http.pub.post<DtoLoginResponse>("/login", data);
        const parsed = Dto.LoginSchema.Response.parse(responseData);
        return {success: true, data: parsed};
    } catch (e) {
        if (!(e instanceof AxiosError)) return {success: false, error: "UNKNOWN_ERROR"};
        switch (e.response?.status) {
            case 401:
                return {success: false, error: "INCORRECT_CREDENTIALS"};
            case 500:
                return {success: false, error: "SERVER_ERROR"};
        }
        return {success: false, error: "UNKNOWN_ERROR"};
    }
}

export const PasswordChangeErrors = {
    PASSWORD_MISMATCH: "PASSWORD_MISMATCH",
    PASSWORD_INCORRECT: "PASSWORD_INCORRECT",
    ...CommonErrors,
} as const;

export type PasswordChangeError = typeof PasswordChangeErrors[keyof typeof PasswordChangeErrors];

export const changePassword = async (data: DtoPasswordChange): Promise<{
    success: boolean;
    error?: PasswordChangeError;
}> => {
    try {
        await http.priv.put<void>("/password", data);
        return {success: true};
    } catch (e) {
        if (!(e instanceof AxiosError)) return {success: false, error: PasswordChangeErrors.UNKNOWN_ERROR};
        switch (e.response?.status) {
            case 400:
                return {success: false, error: "PASSWORD_MISMATCH"};
            case 401:
                return {success: false, error: "PASSWORD_INCORRECT"};
            case 500:
                return {success: false, error: "SERVER_ERROR"};
        }
        return {success: false, error: "UNKNOWN_ERROR"};
    }
}