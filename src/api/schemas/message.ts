import z from "zod";
import { MemberSchema } from "./conversation";

export const MessageSchema = z.object({
    id: z.number(),
    type: z.enum<string, ["text"]>(["text"]).default("text"),
    textContent: z.string().optional(),
    timestamp: z.string().datetime(),
    author: MemberSchema,
});