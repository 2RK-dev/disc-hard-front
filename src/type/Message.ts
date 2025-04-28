import z from "zod";
import { MemberSchema } from "@/type/Member";

export const MessageSchema = z.object({
	id: z.number(),
	textContent: z.string(),
	author: MemberSchema,
	timestamp: z.string(),
});

export type Message = z.infer<typeof MessageSchema>;