import z from "zod";

export const MessageShema = z.object({
	id: z.number(),
	content: z.string(),
	authorId: z.number(),
	timestamp: z.string(),
});

export type Message = z.infer<typeof MessageShema>;
