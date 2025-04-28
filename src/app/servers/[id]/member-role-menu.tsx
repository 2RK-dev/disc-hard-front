"use client";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useServers } from "@/test/server-context";
import { Member } from "@/type/Member";
import { Crown, MoreHorizontal, Shield, User } from "lucide-react";

interface MemberRoleMenuProps {
	member: Member;
	serverId: number;
	onChangeRole: (role: Member["role"]) => void;
}

export function MemberRoleMenu({
	member,
	serverId,
	onChangeRole,
}: MemberRoleMenuProps) {
	const { currentUserId, getServer, canManageRole } = useServers();

	const server = getServer(serverId);
	if (!server) return null;

	// Trouver l'utilisateur actuel dans les membres du serveur
	const currentUser = server.members.find((m) => m.id === currentUserId);
	if (!currentUser) return null;

	// Vérifier si l'utilisateur actuel peut gérer ce membre
	const canManage = canManageRole(currentUser, member);

	// Si l'utilisateur ne peut pas gérer ce membre, désactiver le menu
	const isDisabled = !canManage;

	// Vérifier si l'utilisateur actuel est le créateur du serveur
	const isCreator = currentUserId === server.creatorId;

	return (
		<DropdownMenu>
			<DropdownMenuTrigger disabled={isDisabled} asChild>
				<button
					className={`p-1 rounded-md ${
						isDisabled ? "opacity-50 cursor-not-allowed" : "hover:bg-[#35373c]"
					}`}>
					<MoreHorizontal className="h-4 w-4 text-gray-400" />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-48 bg-[#1e1f22] text-white border-none">
				<DropdownMenuLabel>Changer le rôle</DropdownMenuLabel>
				<DropdownMenuSeparator className="bg-gray-700" />

				<DropdownMenuItem
					className={`flex items-center ${
						member.role === "owner"
							? "bg-[#35373c]"
							: "hover:bg-[#5865F2] hover:text-white"
					} cursor-pointer`}
					onClick={() => onChangeRole("owner")}
					disabled={
						member.role === "owner" ||
						(!isCreator && currentUser.role !== "owner")
					}>
					<Crown className="h-4 w-4 mr-2 text-yellow-400" />
					<span>Propriétaire</span>
				</DropdownMenuItem>

				<DropdownMenuItem
					className={`flex items-center ${
						member.role === "admin"
							? "bg-[#35373c]"
							: "hover:bg-[#5865F2] hover:text-white"
					} cursor-pointer`}
					onClick={() => onChangeRole("admin")}
					disabled={
						member.role === "admin" ||
						(currentUser.role !== "owner" && member.role === "owner")
					}>
					<Shield className="h-4 w-4 mr-2 text-blue-400" />
					<span>Administrateur</span>
				</DropdownMenuItem>

				<DropdownMenuItem
					className={`flex items-center ${
						member.role === "member"
							? "bg-[#35373c]"
							: "hover:bg-[#5865F2] hover:text-white"
					} cursor-pointer`}
					onClick={() => onChangeRole("member")}
					disabled={
						member.role === "member" ||
						(currentUser.role !== "owner" && member.role === "owner")
					}>
					<User className="h-4 w-4 mr-2 text-gray-400" />
					<span>Membre</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
