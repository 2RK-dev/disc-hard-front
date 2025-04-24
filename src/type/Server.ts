import z from "zod";
import { MemberSchema } from "./Member";
import { MessageShema } from "./Message";

const ServerSchema = z.object({
	id: z.number(),
	name: z.string(),
	initial: z.string(),
	description: z.string(),
	members: MemberSchema.array(),
	messages: MessageShema.array(),
	creatorId: z.number(),
});

export type server = z.infer<typeof ServerSchema>;
