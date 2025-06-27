"use client";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCurrentUserStore } from "@/contexts/userStore";
import { CanManageMemberRole } from "@/lib/MemberUtils";
import { Member } from "@/type/Member";
import { Server } from "@/type/Server";
import { Crown, MoreHorizontal, Shield, User as UserIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface MemberRoleMenuProps {
	member: Member;
	salon: Server;
	onChangeRole: (role: Member["role"]) => void;
}

export function MemberRoleMenu({
	member,
	salon,
	onChangeRole,
}: MemberRoleMenuProps) {
	const currentUser = useCurrentUserStore((s) => s.currentUser);
	const [canManage, setCanManage] = useState(false);
	const currentUserMember = salon.members.find(
		(m) => m.user?.id === currentUser?.id
	);

	useEffect(() => {
		if (currentUserMember) {
			setCanManage(CanManageMemberRole(currentUserMember, member));
		} else {
			setCanManage(false);
		}
	}, [currentUserMember, member]);

	if (!currentUserMember) return null;

	if (!salon) return null;

	return (
		<DropdownMenu>
			<DropdownMenuTrigger disabled={!canManage} asChild>
				<button
					className={`p-1 rounded-md ${
						!canManage ? "opacity-50 cursor-not-allowed" : "hover:bg-[#35373c]"
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
						member.role === "owner" || currentUserMember.role !== "owner"
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
						(currentUserMember.role !== "owner" && member.role === "owner")
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
						(currentUserMember.role !== "owner" && member.role === "owner")
					}>
					<UserIcon className="h-4 w-4 mr-2 text-gray-400" />
					<span>Membre</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
