import z from "zod";
import { StatusSchema } from "./Member";

export const UserSchema = z.object({
	id: z.number(),
	name: z.string().min(1).max(20),
	email: z.string().min(1).max(50),
	avatar: z.string().optional(),
	status: StatusSchema,
	tag: z.string().optional(),
});

export type user = z.infer<typeof UserSchema>;
