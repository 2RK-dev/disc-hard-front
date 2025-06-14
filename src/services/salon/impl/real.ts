import { Member } from "@/type/Member";
import { Message } from "@/type/Message";
import { Server } from "@/type/Server";
import { User } from "@/type/User";
import { fetchConversations, fetchMessages } from "@/api/http/conversation";
import { createGroup, fetchGroup, inviteToGroup } from "@/api/http/group";
import { unwrapResult } from "@/services/util";
import { sendMessage as sendMessageWebsocket } from "@/api/websocket/message"

export async function getMySalons (): Promise<Server[]> {
    const conversations = unwrapResult(await fetchConversations());
    return conversations?.filter(convo => convo.type === "group")
        .map(convo => {
            const salon: Server = {
                id: convo.conversationId,
                description: convo.description,
                name: convo.name,
                members: [],
                messages: [],
            };
            return salon;
        }) || [];
}

export async function getSalonById (id: number): Promise<Server | null> {
    const salon = unwrapResult(await fetchGroup(id + ""));
    if (!salon) throw new Error(`Salon with id ${id} not found`);
    const messages = unwrapResult(await fetchMessages(salon.info.conversationId + ""));
    return {
        id: salon.info.conversationId,
        description: salon.info.description,
        name: salon.info.name,
        members: salon.members,
        messages: messages?.messages || [],
    };
}

export async function sendMessage (
    salonId: number,
    _user: Member,
    message: string
): Promise<Message[]> {
    sendMessageWebsocket({
        message: {
            type: "text",
            textContent: message,
            timestamp: (new Date()).toISOString()
        },
        conversationId: salonId
    });
    return [];
}

export async function addSalon (
    salonName: string,
    description: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _creator: User
): Promise<Server> {
    const salon = unwrapResult(await createGroup({
        description: description, members: [], name: salonName
    }));
    if (!salon) throw new Error("Salon creation failed");
    return {
        id: salon.conversationId,
        description: salon.description,
        name: salon.name,
        members: [],
        messages: [],
    };
}

export async function addMemberToSalon (
    salonId: number,
    member: Member
): Promise<Server | null> {
    if (!member.user?.id) throw new Error("Member has no user");
    await inviteToGroup(salonId, {userIds: [member.user.id + ""]});
    return null;
}
