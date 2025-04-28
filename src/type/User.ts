import z from "zod";

export const StatusSchema = z.enum(["online", "idle", "dnd", "offline"]);

export const UserSchema = z.object({
	id: z.number(),
	name: z.string().min(1).max(20),
	email: z.string().min(1).max(50),
	createdAt: z.string().optional(),
	avatar: z.string().optional(),
	status: StatusSchema,
});

export type User = z.infer<typeof UserSchema>;
