import z from "zod";

export const RoleSchema = z.enum(["owner", "admin", "member"]);

export const StatusSchema = z.enum(["online", "idle", "dnd", "offline"]);

export const MemberSchema = z.object({
	id: z.number(),
	name: z.string(),
	status: StatusSchema,
	role: RoleSchema,
	avatar: z.string(),
});

export type Member = z.infer<typeof MemberSchema>;

export type Role = z.infer<typeof RoleSchema>;

export type Status = z.infer<typeof StatusSchema>;
