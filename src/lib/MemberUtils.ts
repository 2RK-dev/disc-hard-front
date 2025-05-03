import { Member } from "@/type/Member";
import { User } from "@/type/User";

/**
 * Check if the current user can manage the target member's role.
 * @description
 * This function checks if the current user can manage the target member's role.
 * It returns true if the current user is an admin or owner and false otherwise.
 * @param currentUserMember - The current user's member object.
 * @param targetMember - The target member's object.
 * @returns True if the current user can manage the target member's role, false otherwise.
 * */
export function CanManageMemberRole(
	currentUserMember: Member,
	targetMember: Member
): boolean {
	if (currentUserMember.id === targetMember.id) return false;
	if (currentUserMember.role === "member") return false;

	if (currentUserMember.role === "admin" && targetMember.role === "owner")
		return false;

	if (currentUserMember.role === "owner") return true;

	return currentUserMember.role === "admin" && targetMember.role !== "owner";
}

/**
 * Convert a list of members to a list of users.
 * @description
 * This function takes a list of members and converts it to a list of users.
 * It filters out any members that do not have a user associated with them.
 * @param memberList - The list of members to convert.
 * @returns The list of users.
 * */
export function convertMemberListToUserList(memberList: Member[]): User[] {
	return memberList
		.map((member) => member.user)
		.filter((user) => user !== undefined) as User[];
}
