import {
    ConversationEventSchema,
    ConversationListSchema,
    GroupInfoSchema,
    GroupSchema,
    MemberListSchema,
    MemberSchema, MessageSchema,
    MessagesPagedSchema,
    ReceivedMessageSchema,
    SendMessageSchema,
    StartConversationSchema,
    TypingIndicatorSchema,
} from "./conversation";
import {
    ProfileUpdateRequestSchema,
    ProfileUpdateResponseSchema,
    UpdateUserStatusSchema,
    UserListSchema,
    UserSchema,
    UserStatusUpdateSchema
} from "./user";
import { CreateGroupSchema, GroupInviteSchema } from "./group";
import { LoginRequestSchema, LoginResponseSchema, PasswordChangeSchema, RegistrationRequestSchema } from "./auth";

export const Dto = {
    // Common and HTTP schemas
    MemberSchema,
    UserSchema,
    MessageSchema,
    MemberListSchema,
    GroupInfoSchema,
    GroupSchema,
    MessagesPagedSchema,
    ConversationListSchema,
    UserListSchema,
    GroupInviteSchema,
    CreateGroupSchema,
    PasswordChangeSchema,
    ProfileUpdateSchema: {
        Request: ProfileUpdateRequestSchema,
        Response: ProfileUpdateResponseSchema,
    },
    LoginSchema: {
        Request: LoginRequestSchema,
        Response: LoginResponseSchema,
    },
    RegistrationRequestSchema,
    // Websocket schemas
    StartConversationSchema,
    SendMessageSchema,
    ReceivedMessageSchema,
    TypingIndicatorSchema,
    UpdateUserStatusSchema,
    UserStatusUpdateSchema,
    ConversationEventSchema,
};