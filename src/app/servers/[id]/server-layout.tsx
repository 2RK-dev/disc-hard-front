"use client";

import { SalonSidebar } from "@/components/salon-sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getCookie } from "@/services/cookie";
import { useServers } from "@/test/server-context";
import { Member, Role } from "@/type/Member";
import { user } from "@/type/User";
import { Crown, Plus, Settings, Shield, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { InviteMemberModal } from "./invite-member-modal";
import { MemberRoleMenu } from "./member-role-menu";
import { ServerChat } from "./server-chat";
import { UserDropdownMenu } from "./user-dropdown-menu";

interface ServerLayoutProps {
	serverId: number;
}

export function ServerLayout({ serverId }: ServerLayoutProps) {
	const [currentUser, setCurrentUser] = useState<user>();
	const { servers, getServer, addMemberToServer, updateMemberRole } =
		useServers();
	const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

	useEffect(() => {
		const fetchCurrentUser = async () => {
			const userCookie = await getCookie("currentUser");
			if (userCookie) {
				setCurrentUser(JSON.parse(userCookie));
			}
		};

		fetchCurrentUser();
	}, []);

	// Trouver le serveur actuel
	const currentServer = getServer(serverId) || servers[0];

	// Vérifier si l'utilisateur actuel est le propriétaire ou un admin
	const currentUserMember = currentServer.members.find(
		(member: Member) => member.id === currentUser?.id
	);
	const isCurrentUserOwner = currentUserMember?.role === "owner";
	const isCurrentUserAdmin = currentUserMember?.role === "admin";
	const canManageRoles = isCurrentUserOwner || isCurrentUserAdmin;

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

	const handleInviteMember = (member: Member) => {
		addMemberToServer(serverId, member);
	};

	const handleChangeRole = (memberId: number, role: Member["role"]) => {
		updateMemberRole(serverId, memberId, role);
	};

	const getroleIndex = (role: string) => {
		switch (role) {
			case "owner":
				return 0;
			case "admin":
				return 1;
			case "member":
				return 2;
			default:
				return 3;
		}
	};

	// Trier les membres par rôle: propriétaire, administrateurs, puis membres
	const sortedMembers = [...currentServer.members].sort((a, b) => {
		return getroleIndex(a.role) - getroleIndex(b.role);
	});

	// Grouper les membres par statut
	const onlineMembers = sortedMembers.filter((m) => m.status !== "offline");
	const offlineMembers = sortedMembers.filter((m) => m.status === "offline");

	return (
		<div className="flex flex-row h-screen bg-[#1e1f22] text-white overflow-hidden ">
			<SalonSidebar activePage={`salon-${serverId}`} />
			<div className="flex-1 flex flex-col bg-[#313338]">
				<div className="h-12 border-b border-[#1e1f22] shadow-sm flex items-center px-4">
					<h2 className="font-bold text-white">{currentServer.name}</h2>
				</div>

				<div className="flex-1 flex min-h-0">
					<div className="flex-1 flex flex-col min-h-0">
						<div className="bg-[#2b2d31] rounded-lg p-6 m-6 mb-0">
							<div className="flex items-center mb-4">
								<div className="h-16 w-16 rounded-full bg-[#5865f2] flex items-center justify-center text-2xl font-bold mr-4">
									{currentServer.initial}
								</div>
								<div>
									<h1 className="text-2xl font-bold">{currentServer.name}</h1>
									<p className="text-gray-400">{currentServer.description}</p>
								</div>
							</div>
							<div className="flex items-center text-gray-400 text-sm">
								<Users className="h-4 w-4 mr-1" />
								<span>{currentServer.members.length} membres</span>
							</div>

							<div className="flex flex-col sm:flex-row gap-4 mt-4">
								<Button
									className="bg-[#5865f2] hover:bg-[#4752c4] text-white"
									onClick={() => setIsInviteModalOpen(true)}>
									<Plus className="h-5 w-5 mr-2" /> Inviter des amis
								</Button>
								<Button
									variant="outline"
									className="border-gray-600 text-gray-300 hover:bg-[#3f4147]">
									<Settings className="h-5 w-5 mr-2" /> Paramètres du serveur
								</Button>
							</div>
						</div>

						{/* Zone de chat */}
						<ServerChat serverId={serverId} />
					</div>

					<div className="w-60 bg-[#2b2d31] border-l border-[#1e1f22]">
						<div className="p-4 border-b border-[#1e1f22]">
							<h3 className="font-semibold text-gray-300 flex items-center">
								<Users className="h-4 w-4 mr-2" /> Membres -{" "}
								{currentServer.members.length}
							</h3>
						</div>

						<div
							className="overflow-y-auto"
							style={{ maxHeight: "calc(100vh - 12rem)" }}>
							{/* Membres en ligne */}
							{onlineMembers.length > 0 && (
								<div className="mb-2">
									<div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase">
										En ligne — {onlineMembers.length}
									</div>
									{onlineMembers.map((member) => (
										<div
											key={member.id}
											className="flex items-center justify-between px-2 py-1.5 mx-2 rounded hover:bg-[#35373c] group">
											<div className="flex items-center">
												<div className="relative">
													<Avatar className="h-8 w-8 mr-3">
														<AvatarImage
															src={member.avatar || "/placeholder.svg"}
														/>
														<AvatarFallback>{member.name[0]}</AvatarFallback>
													</Avatar>
													<div
														className={`absolute bottom-0 right-2 h-3 w-3 rounded-full border-2 border-[#2b2d31] ${getStatusColor(
															member.status
														)}`}
													/>
												</div>
												<div className="flex items-center">
													<span
														className={`text-sm font-medium ${
															member.role === "owner"
																? "text-yellow-400"
																: member.role === "admin"
																? "text-blue-400"
																: "text-gray-300"
														}`}>
														{member.name}
													</span>
													{member.role === "owner" && (
														<Crown className="h-3.5 w-3.5 ml-1 text-yellow-400" />
													)}
													{member.role === "admin" && (
														<Shield className="h-3.5 w-3.5 ml-1 text-blue-400" />
													)}
												</div>
											</div>

											<div className="opacity-0 group-hover:opacity-100">
												{canManageRoles && (
													<MemberRoleMenu
														member={member}
														serverId={serverId}
														onChangeRole={(role: Role) =>
															handleChangeRole(member.id, role)
														}
													/>
												)}
											</div>
										</div>
									))}
								</div>
							)}

							{/* Membres hors ligne */}
							{offlineMembers.length > 0 && (
								<div>
									<div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase">
										Hors ligne — {offlineMembers.length}
									</div>
									{offlineMembers.map((member) => (
										<div
											key={member.id}
											className="flex items-center justify-between px-2 py-1.5 mx-2 rounded hover:bg-[#35373c] group">
											<div className="flex items-center">
												<div className="relative">
													<Avatar className="h-8 w-8 mr-3">
														<AvatarImage
															src={member.avatar || "/placeholder.svg"}
														/>
														<AvatarFallback>{member.name[0]}</AvatarFallback>
													</Avatar>
													<div
														className={`absolute bottom-0 right-2 h-3 w-3 rounded-full border-2 border-[#2b2d31] ${getStatusColor(
															member.status
														)}`}
													/>
												</div>
												<div className="flex items-center">
													<span
														className={`text-sm font-medium text-gray-500 ${
															member.role === "owner"
																? "text-yellow-400/70"
																: member.role === "admin"
																? "text-blue-400/70"
																: ""
														}`}>
														{member.name}
													</span>
													{member.role === "owner" && (
														<Crown className="h-3.5 w-3.5 ml-1 text-yellow-400/70" />
													)}
													{member.role === "admin" && (
														<Shield className="h-3.5 w-3.5 ml-1 text-blue-400/70" />
													)}
												</div>
											</div>

											<div className="opacity-0 group-hover:opacity-100">
												{canManageRoles && (
													<MemberRoleMenu
														member={member}
														serverId={serverId}
														onChangeRole={(role: Role) =>
															handleChangeRole(member.id, role)
														}
													/>
												)}
											</div>
										</div>
									))}
								</div>
							)}
						</div>
					</div>
				</div>

				<div className="h-[52px] bg-[#232428] px-2 flex items-center">
					<UserDropdownMenu />
				</div>
			</div>

			{/* Modal d'invitation de membres */}
			<InviteMemberModal
				isOpen={isInviteModalOpen}
				onClose={() => setIsInviteModalOpen(false)}
				onInviteMember={handleInviteMember}
				existingMembers={currentServer.members}
			/>
		</div>
	);
}
