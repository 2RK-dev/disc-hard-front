"use server";

import { Member } from "@/type/Member";

export async function UpdateMemberRole (
    member: Member,
    newRole: Member["role"]
) {
    console.error("[NOT IMPLEMENTED] This is not yet supported");
    return {...member, role: newRole};
}
