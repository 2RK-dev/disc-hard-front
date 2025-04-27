import {Participant} from "@/type/conversation";
import users from "./user.json"
import {StatusSchema} from "@/type/User";

export const participantFromUserId = (id: number): Participant => {
    const user = users[id];
    return {
        id: user.id,
        alias: user.name,
        user: {...user, status: StatusSchema.parse(user.status)},
    }
}