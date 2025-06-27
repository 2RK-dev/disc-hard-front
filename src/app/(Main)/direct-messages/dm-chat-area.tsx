"use client";

import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Input} from "@/components/ui/input";
import {ScrollArea} from "@/components/ui/scroll-area";
import {useCurrentUserStore} from "@/contexts/userStore";
import {getStatusColor} from "@/lib/UserUtils";
import {getDirectMessageByID, sendMessage} from "@/services/direct-message";
import {Member} from "@/type/Member";
import {Server} from "@/type/Server";
import {
    Bell,
    GiftIcon as GIF,
    Gift,
    HelpCircle,
    Phone,
    Pin,
    PlusCircle,
    Send,
    Smile,
    Sticker,
    Video,
} from "lucide-react";
import React, {useEffect, useRef, useState} from "react";
import {toast} from "sonner";
import Image from "next/image";

interface DMChatAreaProps {
    selectedDM: number | null;
}

export function DMChatArea({selectedDM}: DMChatAreaProps) {
    const [message, setMessage] = useState("");
    const [yourFriend, setYourFriend] = useState<Member | null>(null);
    const [DMContent, setDMContent] = useState<Server | null>(null);
    const currentUser = useCurrentUserStore((s) => s.currentUser);
    const [currentUserAsMember, setCurrentUserAsMember] = useState<Member | null>(
        null
    );
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!DMContent) return;

        const scrollContainer = scrollAreaRef.current?.querySelector(
            "[data-radix-scroll-area-viewport]"
        ) as HTMLElement | null;

        if (!scrollContainer) return;

        scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }, [DMContent]);

    useEffect(() => {
        if (selectedDM && currentUser) {
            getDirectMessageByID(selectedDM)
                .then((dmContent) => {
                    setDMContent(dmContent);
                    if (dmContent) {
                        const friend = dmContent.members.find(
                            (member) => member.user?.id !== currentUser?.id
                        );
                        setYourFriend(friend || null);
                        const currentUserMember = dmContent.members.find(
                            (member) => member.user?.id === currentUser?.id
                        );
                        setCurrentUserAsMember(currentUserMember || null);
                    } else {
                        setYourFriend(null);
                    }
                })
                .catch((error) => {
                    console.error("Failed to fetch DM content:", error);
                });
        }
    }, [selectedDM, currentUser]);

    if (!DMContent || !yourFriend) {
        return (
            <div className="flex-1 flex items-center justify-center bg-[#313338] text-gray-400">
                <p>Please select a direct message to start chatting.</p>
            </div>
        );
    }

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();

        if (message.trim() === "") return;

        if (!currentUserAsMember) {
            toast.error("You are not a member of this DM.");
            return;
        }

        sendMessage(message, currentUserAsMember, DMContent.id)
            .then((newMessage) => {
                const updatedMessages = [...DMContent.messages, newMessage];
                const updatedDMContent: Server = {
                    ...DMContent,
                    messages: updatedMessages,
                };
                setDMContent(updatedDMContent);
                setMessage("");
            })
            .catch((error) => {
                toast.error("Failed to send message: " + error.message);
            });
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case "online":
                return "Online";
            case "idle":
                return "Idle";
            case "dnd":
                return "Do Not Disturb";
            default:
                return "Offline";
        }
    };

    if (!DMContent) {
        return (
            <div className="flex-1 flex flex-col bg-[#313338] items-center justify-center min-h-0">
                <div className="text-center max-w-md px-4">
                    <h3 className="text-2xl font-bold text-white mb-2">
                        Welcome to Direct Messages!
                    </h3>
                    <p className="text-gray-400 mb-6">
                        Select a contact from the list to start chatting
                    </p>
                    <Image
                        src="/placeholder.svg?height=200&width=200"
                        alt="Discord DM"
                        className="mx-auto mb-6"
                    />
                    <p className="text-gray-400 text-sm">
                        You can search for users using the search bar on the left
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col bg-[#313338] min-h-0">
            <div className="h-12 border-b border-[#1e1f22] shadow-sm flex items-center px-4">
                <div className="relative">
                    <Avatar className="h-7 w-7 mr-2">
                        <AvatarImage src={yourFriend.user?.avatar || "/placeholder.svg"}/>
                        <AvatarFallback>{yourFriend.alias[0]}</AvatarFallback>
                    </Avatar>
                    <div
                        className={`absolute bottom-0 right-1 h-2.5 w-2.5 rounded-full border-2 border-[#313338] ${getStatusColor(
                            yourFriend.user?.status || "offline"
                        )}`}></div>
                </div>
                <h3 className="font-bold text-white">{yourFriend.alias}</h3>
                <span className="text-xs text-gray-400 ml-2">
					({getStatusText(yourFriend.user?.status || "offline")})
				</span>

                <div className="ml-auto flex items-center gap-4">
                    <Phone className="h-5 w-5 text-gray-400 cursor-pointer hover:text-gray-200"/>
                    <Video className="h-5 w-5 text-gray-400 cursor-pointer hover:text-gray-200"/>
                    <Pin className="h-5 w-5 text-gray-400 cursor-pointer hover:text-gray-200"/>
                    <Bell className="h-5 w-5 text-gray-400 cursor-pointer hover:text-gray-200"/>
                    <HelpCircle className="h-5 w-5 text-gray-400 cursor-pointer hover:text-gray-200"/>
                </div>
            </div>

            <ScrollArea ref={scrollAreaRef} className="flex-1 flex p-4 min-h-0">
                <div className="space-y-4">
                    {DMContent.messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex group ${
                                msg.author.id !== yourFriend.id ? "justify-end" : ""
                            }`}>
                            {msg.author.id === yourFriend.id && (
                                <Avatar className="h-10 w-10 mr-4 mt-0.5">
                                    <AvatarImage
                                        src={yourFriend.user?.avatar || "/placeholder.svg"}
                                    />
                                    <AvatarFallback>{yourFriend.alias[0]}</AvatarFallback>
                                </Avatar>
                            )}
                            <div
                                className={`max-w-[80%] ${
                                    msg.author.id !== yourFriend.id
                                        ? "bg-[#5865f2] rounded-lg p-2"
                                        : ""
                                }`}>
                                {msg.author.id === yourFriend.id && (
                                    <div className="flex items-center">
										<span className="font-semibold text-white hover:underline cursor-pointer">
											{yourFriend.alias}
										</span>
                                        <span className="text-xs text-gray-400 ml-2">
											{new Date(msg.timestamp).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "2-digit",
                                                day: "2-digit",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
										</span>
                                    </div>
                                )}
                                <p
                                    className={`${
                                        msg.author.id !== yourFriend.id
                                            ? "text-white"
                                            : "text-gray-200"
                                    } ${msg.author.id !== yourFriend.id ? "" : "mt-0.5"}`}>
                                    {msg.textContent}
                                </p>
                                {msg.author.id !== yourFriend.id && (
                                    <span className="text-xs text-[#c9cdfb] block text-right mt-1">
										{new Date(msg.timestamp).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "2-digit",
                                            day: "2-digit",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
									</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>

            <div className="p-4 pt-0">
                <form
                    onSubmit={handleSendMessage}
                    className="bg-[#383a40] rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                        <PlusCircle className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-200"/>
                    </div>
                    <div className="flex items-center">
                        <Input
                            placeholder={`Envoyer un message à @${yourFriend.alias || "lui"}`}
                            className="flex-1 bg-transparent border-none text-white focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <div className="flex items-center gap-2 ml-2">
                            <Gift className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-200"/>
                            <GIF className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-200"/>
                            <Sticker className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-200"/>
                            <Smile className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-200"/>
                            <button
                                type="submit"
                                disabled={message.trim() === ""}
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
