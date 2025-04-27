import z from "zod";
import {StatusSchema, UserSchema} from "@/type/User";

export const RoleSchema = z.enum(["owner", "admin", "member"]);

export const MemberSchema = z.object({
	id: z.number(),
	alias: z.string(),
	user: UserSchema.partial().optional(),
	status: StatusSchema,
	role: RoleSchema,
	avatar: z.string(),
});
export type Member = z.infer<typeof MemberSchema>;

export type Role = z.infer<typeof RoleSchema>;
