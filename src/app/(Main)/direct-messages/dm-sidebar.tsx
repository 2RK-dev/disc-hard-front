"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getMyDirectMessagesList } from "@/services/direct-message";
import { DirectMessageList } from "@/type/direct-message";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface DMSidebarProps {
	onSelectDM: (id: number) => void;
	SelectedDM: number | null;
}

export function DMSidebar({ onSelectDM, SelectedDM }: DMSidebarProps) {
	const [searchQuery, setSearchQuery] = useState("");
	const [DMList, setUsers] = useState<DirectMessageList[]>([]);

	useEffect(() => {
		const fetchUsers = async () => {
			await getMyDirectMessagesList(1)
				.then((dmList) => {
					setUsers(dmList);
				})
				.catch((error) => {
					console.error("Failed to fetch users:", error);
				});
		};
		fetchUsers();
	}, []);

	const getStatusColor = (status: string) => {
		switch (status) {
			case "online":
				return "bg-green-500";
			case "idle":
				return "bg-yellow-500";
			case "dnd":
				return "bg-red-500";
			default:
				return "bg-gray-500";
		}
	};

	return (
		<div className="w-60 h-full bg-[#2b2d31] flex flex-col">
			<div className="h-12 border-b border-[#1e1f22] shadow-sm flex items-center px-4">
				<Input
					placeholder="Find or start a conversation"
					className="h-7 bg-[#1e1f22] border-none text-sm"
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
				/>
			</div>

			<div className="p-3">
				<Link href="/home">
					<button className="w-full text-left px-2 py-1.5 rounded text-gray-400 hover:bg-[#35373c] hover:text-gray-200 transition-colors">
						Friends
					</button>
				</Link>
				<button className="w-full text-left px-2 py-1.5 rounded text-gray-400 hover:bg-[#35373c] hover:text-gray-200 transition-colors">
					Nitro
				</button>
				<button className="w-full text-left px-2 py-1.5 rounded text-gray-400 hover:bg-[#35373c] hover:text-gray-200 transition-colors flex items-center justify-between">
					<span>Direct Messages</span>
					<Plus className="h-4 w-4" />
				</button>
			</div>

			<ScrollArea className="flex-1 px-2">
				<div className="space-y-0.5">
					{DMList.map((DM) => (
						<button
							key={DM.direct_messageID}
							className={`w-full flex items-center px-2 py-1.5 rounded cursor-pointer ${
								SelectedDM === DM.direct_messageID
									? "bg-[#404249]"
									: "hover:bg-[#35373c]"
							}`}
							onClick={() => onSelectDM(DM.direct_messageID)}>
							<div className="relative">
								<Avatar className="h-8 w-8 mr-3">
									<AvatarImage
										src={DM.user.user?.avatar || "/placeholder.svg"}
									/>
									<AvatarFallback>{DM.user.alias}</AvatarFallback>
								</Avatar>
								<div
									className={`absolute bottom-0 right-2 h-3 w-3 rounded-full border-2 border-[#2b2d31] ${getStatusColor(
										DM.user.user?.status || "offline"
									)}`}></div>
							</div>
							<div className="text-left">
								<span
									className={`text-sm font-medium ${
										DM.user.user?.status === "offline"
											? "text-gray-500"
											: "text-gray-300"
									}`}>
									{DM.user.user?.name}
								</span>
								<p className="text-xs text-gray-500 truncate">
									{DM.user.user?.status === "online"
										? "Online"
										: DM.user.user?.status === "idle"
										? "Idle"
										: DM.user.user?.status === "dnd"
										? "Do Not Disturb"
										: "Offline"}
								</p>
							</div>
						</button>
					))}
				</div>
			</ScrollArea>
		</div>
	);
}
