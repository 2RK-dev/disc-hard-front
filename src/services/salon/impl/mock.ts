"use server";

import data from "@/test/fake_servers.json";
import { Member } from "@/type/Member";
import { Message } from "@/type/Message";
import { Server } from "@/type/Server";
import { User } from "@/type/User";

const salons = data as Server[];

export async function getMySalons(userId: number): Promise<Server[]> {
    return salons.filter((a_salon) =>
        a_salon.members.some((member) => member.user?.id === userId)
    );
}

export async function getSalonById(id: number): Promise<Server | null> {
    const salon = salons.find((salon) => salon.id === id);
    if (!salon) {
        throw new Error(`Salon with id ${id} not found`);
    }
    return salon;
}

export async function sendMessage(
    salonId: number,
    user: Member,
    message: string
): Promise<Message[]> {
    const id = Math.floor(Math.random() * 1000000);
    const newMessage: Message = {
        id: id,
        textContent: message,
        author: user,
        timestamp: new Date().toISOString(),
    };
    const salon = salons.find((salon) => salon.id === salonId);
    if (!salon) {
        throw new Error(`Salon with id ${salonId} not found`);
    }
    salon.messages.push(newMessage);
    return salon.messages;
}

export async function addSalon(
    salonName: string,
    description: string,
    creator: User
): Promise<Server> {
    const creatorInMember: Member = {
        id: creator.id,
        alias: creator.name,
        role: "owner",
        user: creator,
    };

    const newSalon: Server = {
        id: (await getLastSalonId()) + 1,
        description: description,
        name: salonName,
        members: [creatorInMember],
        messages: [],
    };

    salons.push(newSalon);

    return newSalon;
}

async function getLastSalonId(): Promise<number> {
    const lastSalon = salons[salons.length - 1];
    if (!lastSalon) {
        throw new Error("No salons found");
    }

    return lastSalon.id;
}

export async function addMemberToSalon(
    salonId: number,
    member: Member
): Promise<Server | null> {
    const salon = salons.find((salon) => salon.id === salonId);
    if (!salon) {
        throw new Error(`Salon with id ${salonId} not found`);
    }
    salon.members.push(member);
    console.log("salon", salon.members);
    return salon;
}
