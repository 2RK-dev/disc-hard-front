import z from "zod";
import { UserSchema } from "./user";

export const PasswordChangeSchema = z.object({
    old: z.string(),
    new: z.string(),
    confirm: z.string(),
});

export const LoginResponseSchema = z.object({
    accessToken: z.string(),
    user: UserSchema
});

export const LoginRequestSchema = z.object({
    email: z.string(),
    password: z.string(),
});

export const RegistrationRequestSchema = z.object({
    email: z.string(),
    password: z.string(),
    passwordConfirm: z.string(),
    name: z.string(),
});