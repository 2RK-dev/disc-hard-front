import z from "zod";

const UserStatusSchema = z.enum(["online", "idle", "dnd", "offline"]);

export const UserSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
    createdAt: z.string().datetime().optional(),
    avatar: z.string().optional(),
    status: UserStatusSchema,
});

export const UserListSchema = z.array(UserSchema);

export const ProfileUpdateResponseSchema = z.object({
    email: z.string(),
    name: z.string(),
});

export const ProfileUpdateRequestSchema = z.object({
    name: z.string(),
});

export const UpdateUserStatusSchema = z.object({
    status: UserStatusSchema,
});

export const UserStatusUpdateSchema = z.object({
    user: UserSchema,
    status: UserStatusSchema,
});