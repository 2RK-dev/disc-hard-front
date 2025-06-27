import z from "zod";
import { MemberSchema } from "./Member";

export const DirectMessageListSchema = z.object({
	user: MemberSchema,
	direct_messageID: z.number(),
});
export type DirectMessageList = z.infer<typeof DirectMessageListSchema>;
