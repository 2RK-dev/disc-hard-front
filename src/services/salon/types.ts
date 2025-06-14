import { Server } from "@/type/Server";
import { Member } from "@/type/Member";
import { Message } from "@/type/Message";
import { User } from "@/type/User";

export interface ISalon {
    getMySalons: (userId: number) => Promise<Server[]>;
    getSalonById: (id: number) => Promise<Server | null>;
    sendMessage: (salonId: number, user: Member, message: string) => Promise<Message[]>;
    addSalon: (salonName: string, description: string, creator: User) => Promise<Server>;
    addMemberToSalon: (salonId: number, member: Member) => Promise<Server | null>;
}