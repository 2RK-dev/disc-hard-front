import {
    ConversationListSchema,
    GroupInfoSchema,
    MemberListSchema,
    MemberSchema,
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
import { MessageSchema } from "./message";
import { CreateGroupSchema, GroupInviteSchema } from "@/api/schemas/group";
import {
    LoginRequestSchema,
    LoginResponseSchema,
    PasswordChangeSchema,
    RegistrationRequestSchema
} from "@/api/schemas/auth";

export const Dto = {
    // Common and HTTP schemas
    MemberSchema,
    UserSchema,
    MessageSchema,
    MemberListSchema,
    GroupInfoSchema,
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
};