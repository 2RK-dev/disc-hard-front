"use client";

import type React from "react";
import {useEffect, useRef, useState} from "react";

import {StellarParticlesLoader} from "@/components/stellar-particles-loader";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Input} from "@/components/ui/input";
import {ScrollArea} from "@/components/ui/scroll-area";
import {getSalonById, sendMessage} from "@/services/salon";
import {Member} from "@/type/Member";
import {Message} from "@/type/Message";
import {Server} from "@/type/Server";
import {Gift, GiftIcon as GIF, PlusCircle, Send, Smile, Sticker,} from "lucide-react";
import {useCurrentUserStore} from "@/contexts/userStore";

interface ServerChatProps {
    serverId: number;
}

export function ServerChat({serverId}: ServerChatProps) {
    const [messageInput, setMessageInput] = useState("");
    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const CurrentUser = useCurrentUserStore((s) => s.currentUser);
    const [currentSalon, setCurrentSalon] = useState<Server>();
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        setLoading(true);
        getSalonById(serverId).then((salon) => {
            if (salon) {
                setCurrentSalon(salon);
                setMessages(salon.messages);
                setLoading(false);
            }
        }).catch((error) => {
            console.error("Failed to fetch salon:", error);
            setLoading(false);
        });
    }, [serverId]);

    useEffect(() => {
        if (!currentSalon) return;

        const scrollContainer = scrollAreaRef.current?.querySelector(
            "[data-radix-scroll-area-viewport]"
        ) as HTMLElement | null;

        if (!scrollContainer) return;

        scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }, [messages, currentSalon]);

    if (!CurrentUser || !currentSalon) return;

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        const currentMember = currentSalon.members.find(
            (member: Member) => member.user?.id === CurrentUser?.id
        );

        if (messageInput.trim() === "") return;

        if (currentMember != undefined) {
            const updatedMessage = await sendMessage(
                serverId,
                currentMember,
                messageInput
            );
            setMessages(updatedMessage);
        }
        setMessageInput("");
    };

    const groupMessagesByDate = () => {
        const groups: { date: string; messages: Message[] }[] = [];

        messages?.forEach((message) => {
            const messageDate = new Date(message.timestamp).toLocaleDateString();
            const existingGroup = groups.find((group) => group.date === messageDate);

            if (existingGroup) {
                existingGroup.messages.push(message);
            } else {
                groups.push({date: messageDate, messages: [message]});
            }
        });

        return groups;
    };

    const messageGroups = groupMessagesByDate();

    return (
        <div className="flex-1 flex flex-col min-h-0 break-words">
            {loading ? (
                <StellarParticlesLoader
                    showStars={true}
                    showBackgroundColor={false}
                    speed={2}
                    loadingText="Chargment des messages"
                    particleSize={12}
                />
            ) : (
                <ScrollArea
                    className="flex-1 p-4 min-h-0 break-all"
                    ref={scrollAreaRef}>
                    <div className="space-y-6">
                        {messageGroups.map((group) => (
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
                                    const member = message.author;
                                    const user = message.author.user;

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
                                                key={messageIndex}
                                                className="pl-14 group hover:bg-[#2e3035] rounded py-0.5 -mt-3">
                                                <div className="flex items-start min-w-0">
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-gray-200 break-words">
                                                            {message.textContent}
                                                        </p>
                                                        <div
                                                            className=" flex-row space-x-2 text-xs text-gray-400 hidden group-hover:flex">
															<span
                                                                className="text-xs text-gray-400 hidden group-hover:block">
																{new Date(message.timestamp).toLocaleTimeString(
                                                                    [],
                                                                    {
                                                                        hour: "2-digit",
                                                                        minute: "2-digit",
                                                                    }
                                                                )}
															</span>
                                                            <span className="cursor-pointer">
																<Smile
                                                                    className="h-4 text-gray-400 cursor-pointer hover:text-gray-200"/>
															</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    }

                                    return (
                                        <div
                                            key={messageIndex}
                                            className="flex group hover:bg-[#2e3035] rounded py-1">
                                            <Avatar className="h-10 w-10 mr-4 mt-0.5">
                                                <AvatarImage src={user?.avatar || "/placeholder.svg"}/>
                                                <AvatarFallback>
                                                    {(member?.alias || "?")[0]}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1 group">
                                                <div className="flex items-center">
													<span
                                                        className={`font-semibold hover:underline cursor-pointer ${
                                                            member?.role === "owner"
                                                                ? "text-yellow-400"
                                                                : member?.role === "admin"
                                                                    ? "text-blue-400"
                                                                    : "text-white"
                                                        }`}>
														{member?.user?.name ||
                                                            user?.name ||
                                                            "Utilisateur inconnu"}
													</span>
                                                    <span className="text-xs text-gray-400 ml-2">
														{new Date(message.timestamp).toLocaleTimeString(
                                                            [],
                                                            {
                                                                hour: "2-digit",
                                                                minute: "2-digit",
                                                            }
                                                        )}
													</span>
                                                </div>
                                                <p className="text-gray-200 mt-0.5 break-words">
                                                    {message.textContent}
                                                </p>
                                                <div
                                                    className="hidden items-center space-x-2 text-xs text-gray-400 mt-1 group-hover:flex">
													<span className="cursor-pointer">
														<Smile
                                                            className="h-4 text-gray-400 cursor-pointer hover:text-gray-200"/>
													</span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ))}

                        {messages?.length === 0 && (
                            <div className="text-center py-8">
                                <p className="text-gray-400">
                                    Aucun message dans ce serveur. Soyez le premier à écrire!
                                </p>
                            </div>
                        )}
                    </div>
                </ScrollArea>
            )}

            <div className="p-4 pt-0">
                <form
                    onSubmit={handleSendMessage}
                    className="bg-[#383a40] rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                        <PlusCircle className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-200"/>
                    </div>
                    <div className="flex items-center">
                        <Input
                            placeholder={`Envoyer un message dans ${
                                currentSalon?.name || "ce serveur"
                            }`}
                            className="flex-1 bg-transparent border-none text-white focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                        />
                        <div className="flex items-center gap-2 ml-2">
                            <Gift className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-200"/>
                            <GIF className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-200"/>
                            <Sticker className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-200"/>
                            <Smile className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-200"/>
                            <button
                                type="submit"
                                disabled={messageInput.trim() === ""}
                                className="text-gray-400 hover:text-white disabled:opacity-50">
                                <Send className="h-6 w-6"/>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
