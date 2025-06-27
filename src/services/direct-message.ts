"use server";

import data from "@/test/fake_DM.json";
import {Member} from "@/type/Member";
import {Message} from "@/type/Message";
import {Server} from "@/type/Server";
import {DirectMessageList} from "@/type/direct-message";

const dmServers = data as Server[];

export async function getMyDirectMessagesList(
	userId: number
): Promise<DirectMessageList[]> {
	return dmServers
		.filter((server) =>
			server.members.some((member) => member.user?.id === userId)
		)
		.map((server) => ({
			user: server.members.find(
				(member) => member.user?.id !== userId
			) as Member,
			direct_messageID: server.id,
		}));
}
export async function getDirectMessageByID(id: number): Promise<Server | null> {
	const dmServer = dmServers.find((server) => server.id === id);
	return dmServer || null;
}

export async function sendMessage(
	msg: string,
	author: Member,
	dmID: number
): Promise<Message> {
	const id = Math.floor(Math.random() * 1000000);
	const dmServer = dmServers.find((server) => server.id === dmID);
	if (!dmServer) {
		throw new Error(`Direct message with ID ${dmID} not found`);
	}
	const message: Message = {
		id: id,
		textContent: msg,
		author: author,
		timestamp: new Date().toISOString(),
	};
	dmServer.messages.push(message);
	return message;
}
