import z from "zod";
import {ParticipantSchema} from "@/type/conversation";

export const MessageSchema = z.object({
	id: z.number(),
	textContent: z.string(),
	author: ParticipantSchema,
	timestamp: z.string(),
});

export type Message = z.infer<typeof MessageSchema>;