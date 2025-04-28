import {Member} from "@/type/Member";
import users from "./user.json"
import {StatusSchema} from "@/type/User";

export const createMemberFromUserId = (id: number): Member => {
    const user = users[id];
    return {
        id: user.id,
        alias: user.name,
        user: {...user, status: StatusSchema.parse(user.status)},
        role: "member",
    };
}

export const getMemberWithUserId = (id: number, members: Member[] | undefined): Member => {
    if (!members) {
        return createMemberFromUserId(id);
    }
    const find = members.find((member) => member.user?.id === id);
    if (!find) {
        throw new Error("Member not found");
    }
    return find;
}
