"use server";

import { Member } from "@/type/Member";

export async function UpdateMemberRole(
	member: Member,
	newRole: Member["role"]
) {
	console.log("Updating member role:", newRole);
	member.role = newRole;
	console.log("Updated member role:", member);
	return { ...member };
}
