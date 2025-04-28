"use client";

import type React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useServers } from "@/test/server-context";
import { Message } from "@/type/Message";
import {
	GiftIcon as GIF,
	Gift,
	PlusCircle,
	Send,
	Smile,
	Sticker,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface ServerChatProps {
	serverId: number;
}

export function ServerChat({ serverId }: ServerChatProps) {
	const { getServer, addMessage, currentUserId, getUserById } = useServers();
	const [messageInput, setMessageInput] = useState("");
	const scrollAreaRef = useRef<HTMLDivElement>(null);
	const [server, setServer] = useState(getServer(serverId));

	useEffect(() => {
		setServer(getServer(serverId));
	}, [serverId, getServer]);

	// Si le serveur n'existe pas, ne rien afficher
	if (!server) return null;

	const { messages, members } = server;

	// Fonction pour obtenir les informations d'un membre à partir de son ID
	const getMemberById = (id: number) => {
		return members.find((member) => member.id === id);
	};

	// Fonction pour envoyer un message
	const handleSendMessage = (e: React.FormEvent) => {
		e.preventDefault();

		if (messageInput.trim() === "") return;

		addMessage(serverId, messageInput);
		setMessageInput("");
	};

	// Faire défiler automatiquement vers le bas lorsque de nouveaux messages sont ajoutés
	useEffect(() => {
		if (scrollAreaRef.current) {
			const scrollContainer = scrollAreaRef.current.querySelector(
				"[data-radix-scroll-area-viewport]"
			);
			if (scrollContainer) {
				scrollContainer.scrollTop = scrollContainer.scrollHeight;
			}
		}
	}, [messages]);

	// Grouper les messages par jour
	const groupMessagesByDate = () => {
		const groups: { date: string; messages: Message[] }[] = [];

		messages.forEach((message) => {
			const messageDate = new Date(message.timestamp).toLocaleDateString();
			const existingGroup = groups.find((group) => group.date === messageDate);

			if (existingGroup) {
				existingGroup.messages.push(message);
			} else {
				groups.push({ date: messageDate, messages: [message] });
			}
		});

		return groups;
	};

	const messageGroups = groupMessagesByDate();

	return (
		<div className="flex-1 flex flex-col min-h-0">
			<ScrollArea className=" flex-1 p-4 min-h-0" ref={scrollAreaRef}>
				<div className="space-y-6">
					{messageGroups.map((group, groupIndex) => (
						<div key={group.date} className="space-y-4">
							<div className="relative">
								<div className="absolute inset-0 flex items-center">
									<div className="w-full border-t border-gray-700"></div>
								</div>
								<div className="relative flex justify-center">
									<span className="bg-[#313338] px-2 text-xs text-gray-400">
										{group.date}
									</span>
								</div>
							</div>

							{group.messages.map((message, messageIndex) => {
								const member = getMemberById(message.author.id);
								const user = getUserById(message.author.id);

								// Vérifier si le message précédent est du même auteur et dans un délai court
								const prevMessage =
									messageIndex > 0 ? group.messages[messageIndex - 1] : null;
								const isContinuation =
									prevMessage &&
									prevMessage.author.id === message.author.id &&
									new Date(message.timestamp).getTime() -
										new Date(prevMessage.timestamp).getTime() <
										300000; // 5 minutes

								if (isContinuation) {
									// Message de continuation (sans avatar et nom)
									return (
										<div
											key={message.id}
											className="pl-14 group hover:bg-[#2e3035] rounded py-0.5 -mt-3">
											<div className="flex items-start">
												<div className="flex-1">
													<p className="text-gray-200">{message.textContent}</p>
													<span className="text-xs text-gray-400 opacity-0 group-hover:opacity-100">
														{new Date(message.timestamp).toLocaleTimeString(
															[],
															{ hour: "2-digit", minute: "2-digit" }
														)}
													</span>
												</div>
											</div>
										</div>
									);
								}

								// Message complet avec avatar et nom
								return (
									<div
										key={message.id}
										className="flex group hover:bg-[#2e3035] rounded py-1">
										<Avatar className="h-10 w-10 mr-4 mt-0.5">
											<AvatarImage
												src={
													member?.avatar || user?.avatar || "/placeholder.svg"
												}
											/>
											<AvatarFallback>
												{(member?.user?.name || user?.name || "?")[0]}
											</AvatarFallback>
										</Avatar>
										<div className="flex-1">
											<div className="flex items-center">
												<span
													className={`font-semibold hover:underline cursor-pointer ${
														member?.role === "owner"
															? "text-yellow-400"
															: member?.role === "admin"
															? "text-blue-400"
															: "text-white"
													}`}>
													{member?.user?.name || user?.name || "Utilisateur inconnu"}
												</span>
												<span className="text-xs text-gray-400 ml-2">
													{new Date(message.timestamp).toLocaleTimeString([], {
														hour: "2-digit",
														minute: "2-digit",
													})}
												</span>
											</div>
											<p className="text-gray-200 mt-0.5">{message.textContent}</p>
										</div>
									</div>
								);
							})}
						</div>
					))}

					{messages.length === 0 && (
						<div className="text-center py-8">
							<p className="text-gray-400">
								Aucun message dans ce serveur. Soyez le premier à écrire!
							</p>
						</div>
					)}
				</div>
			</ScrollArea>

			<div className="p-4 pt-0">
				<form
					onSubmit={handleSendMessage}
					className="bg-[#383a40] rounded-lg p-3">
					<div className="flex items-center gap-2 mb-2">
						<PlusCircle className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-200" />
					</div>
					<div className="flex items-center">
						<Input
							placeholder={`Envoyer un message dans ${server.name}`}
							className="flex-1 bg-transparent border-none text-white focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
							value={messageInput}
							onChange={(e) => setMessageInput(e.target.value)}
						/>
						<div className="flex items-center gap-2 ml-2">
							<Gift className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-200" />
							<GIF className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-200" />
							<Sticker className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-200" />
							<Smile className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-200" />
							<button
								type="submit"
								disabled={messageInput.trim() === ""}
								className="text-gray-400 hover:text-white disabled:opacity-50">
								<Send className="h-6 w-6" />
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}
