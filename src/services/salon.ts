"use server";

import data from "@/test/serverData.json";
import { Member } from "@/type/Member";
import { Message } from "@/type/Message";
import { Server } from "@/type/Server";

const salons = data as Server[];

export async function getMySalons(userId: number): Promise<Server[]> {
	return salons.filter((a_salon) =>
		a_salon.members.some((member) => member.id === userId)
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
): Promise<Message> {
	//genera number
	const id = Math.floor(Math.random() * 1000000);

	const newMessage: Message = {
		id: id,
		textContent: message,
		author: user,
		timestamp: new Date().toISOString(),
	};
	return newMessage;
}
