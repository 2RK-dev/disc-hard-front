import { Member } from "@/type/Member";

export type IUpdateMemberRole = (member: Member, newRole: Member["role"]) => Promise<Member>;