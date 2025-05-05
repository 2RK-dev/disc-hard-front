import z from "zod";
import { UserSchema } from "./user";
import { MessageSchema } from "./message";
import { PageSchema } from "./pagination";

export const MemberSchema = z.object({
    id: z.number(),
    alias: z.string(),
    user: UserSchema.optional(),
    role: z.enum(["owner", "admin", "member"]),
});

export const MemberListSchema = z.array(MemberSchema);

export const MessagesPagedSchema = z.object({
    messages: MessageSchema.array(),
    page: PageSchema
});

export const ConversationBaseSchema = z.object({
    id: z.string(),
    type: z.enum<string, ["group", "private"]>(["group", "private"]),
});

export const PrivateConversationSchema = ConversationBaseSchema.extend({
    type: z.literal("private"),
    contact: MemberSchema,
});

export const GroupInfoSchema = ConversationBaseSchema.extend({
    conversationId: z.number(),
    type: z.literal("group"),
    name: z.string(),
    description: z.string(),
    createdAt: z.string().datetime(),
});

export const GroupSchema = z.object({
    info: GroupInfoSchema,
    members: z.array(MemberSchema),
});

export const ConversationListSchema = z.array(
    z.union([PrivateConversationSchema, GroupInfoSchema])
);

export const SendMessageSchema = z.object({
    conversationId: z.number(),
    message: MessageSchema.omit({id: true, author: true}),
});

export const StartConversationSchema = z.object({
    targetUserId: z.string(),
    initialMessage: MessageSchema.omit({id: true, author: true}),
});

export const ReceivedMessageSchema = z.object({
    conversationId: z.number(),
    message: MessageSchema,
});

export const TypingIndicatorSchema = z.object({
    conversationId: z.number(),
    memberId: z.number(),
    isTyping: z.boolean(),
    timestamp: z.string().datetime(),
});