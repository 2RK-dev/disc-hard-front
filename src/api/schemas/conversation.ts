import z from "zod";
import { UserSchema } from "./user";
import { PageSchema } from "./pagination";

export const MemberSchema = z.object({
    id: z.number(),
    alias: z.string(),
    user: UserSchema.optional(),
    role: z.enum(["owner", "admin", "member"]),
});

export const MemberListSchema = z.array(MemberSchema);

export const MessageSchema = z.object({
    id: z.number(),
    type: z.enum<string, ["text"]>(["text"]).default("text"),
    textContent: z.string().default(""),
    timestamp: z.string().datetime(),
    author: MemberSchema,
});
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
    z.discriminatedUnion("type", [PrivateConversationSchema, GroupInfoSchema])
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

export const ConversationEventBaseSchema = z.object({
    eventType: z.enum([
        "conversation_created",
        "conversation_updated",
        "members_added",
        "members_removed"
    ]),
    conversationId: z.number(),
    timestamp: z.string().datetime(),
});

export const ConversationCreatedSchema = ConversationEventBaseSchema.extend({
    eventType: z.literal("conversation_created"),
    type: z.enum(["private", "group"]),
    name: z.string().optional(),
    createdByMemberId: z.number(),
    members: z.array(MemberSchema),
});

export const ConversationUpdatedSchema = ConversationEventBaseSchema.extend({
    eventType: z.literal("conversation_updated"),
    name: z.string().optional(),
    description: z.string().optional(),
    updatedByMemberId: z.number(),
});

export const MembersAddedSchema = ConversationEventBaseSchema.extend({
    eventType: z.literal("members_added"),
    members: z.array(MemberSchema),
    addedByMemberId: z.number(),
});

export const MembersRemovedSchema = ConversationEventBaseSchema.extend({
    eventType: z.literal("members_removed"),
    memberIds: z.array(z.number()),
    removedByMemberId: z.number().optional(),
});

export const ConversationEventSchema = z.discriminatedUnion("eventType", [
    ConversationCreatedSchema,
    ConversationUpdatedSchema,
    MembersAddedSchema,
    MembersRemovedSchema
]);