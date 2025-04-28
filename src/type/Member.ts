import z from "zod";
import {UserSchema} from "@/type/User";

export const RoleSchema = z.enum(["owner", "admin", "member"]);

export const MemberSchema = z.object({
	id: z.number(),
	alias: z.string(),
	user: UserSchema.optional(),
	role: RoleSchema,
});
export type Member = z.infer<typeof MemberSchema>;

export type Role = z.infer<typeof RoleSchema>;
