import z from "zod";
import { Dto } from "@/api/schemas";

export type DtoRegistrationRequest = z.infer<typeof Dto.RegistrationRequestSchema>;
export type DtoLoginRequest = z.infer<typeof Dto.LoginSchema.Request>;
export type DtoLoginResponse = z.infer<typeof Dto.LoginSchema.Response>;
export type DtoProfileUpdateRequest = z.infer<typeof Dto.ProfileUpdateSchema.Request>;
export type DtoProfileUpdateResponse = z.infer<typeof Dto.ProfileUpdateSchema.Response>;
export type DtoPasswordChange = z.infer<typeof Dto.PasswordChangeSchema>;
export type DtoCreateGroupRequest = z.infer<typeof Dto.CreateGroupSchema>;
export type DtoGroupInfo = z.infer<typeof Dto.GroupInfoSchema>;
export type DtoGroup = z.infer<typeof Dto.GroupSchema>;
export type DtoGroupInvite = z.infer<typeof Dto.GroupInviteSchema>;
export type DtoUserList = z.infer<typeof Dto.UserListSchema>;
export type DtoUser = z.infer<typeof Dto.UserSchema>;
export type DtoConversationList = z.infer<typeof Dto.ConversationListSchema>
export type DtoMessagesPage = z.infer<typeof Dto.MessagesPagedSchema>;
export type DtoMemberList = z.infer<typeof Dto.MemberListSchema>;