import z from "zod";
import { MemberSchema } from "./Member";
import { MessageSchema } from "./Message";

export const ServerSchema = z.object({
	id: z.number(),
	name: z.string(),
	description: z.string(),
	members: MemberSchema.array(),
	messages: MessageSchema.array(),
});

export type Server = z.infer<typeof ServerSchema>;
