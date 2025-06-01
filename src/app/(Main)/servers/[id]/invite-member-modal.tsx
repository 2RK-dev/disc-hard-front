"use client";

import { StellarParticlesLoader } from "@/components/stellar-particles-loader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { convertMemberListToUserList } from "@/lib/MemberUtils";
import { getUserWithoutTheseUsers } from "@/services/user";
import { Member } from "@/type/Member";
import { User } from "@/type/User";
import { Check, Search, UserPlus } from "lucide-react";
import { useEffect, useState } from "react";

interface InviteMemberModalProps {
	isOpen: boolean;
	onClose: () => void;
	onInviteMember: (member: Member) => void;
	existingMembers: Member[];
}

export function InviteMemberModal({
	isOpen,
	onClose,
	onInviteMember,
	existingMembers,
}: InviteMemberModalProps) {
	const [searchQuery, setSearchQuery] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [selectedUser, setSelectedUser] = useState<Member | null>(null);
	const [users, setUsers] = useState<User[]>([]);
	const [isLoadingUsers, setIsLoadingUsers] = useState(true);

	useEffect(() => {
		async function fetchUsers() {
			const result = await getUserWithoutTheseUsers(
				convertMemberListToUserList(existingMembers)
			);
			setUsers(result);
			setTimeout(() => {
				setIsLoadingUsers(false);
			}, 2000);
		}
		setIsLoadingUsers(true);
		fetchUsers();
	}, [existingMembers]);

	// Convertir les utilisateurs en membres potentiels
	const availableMembers: Member[] = users
		.filter((user) => !existingMembers.some((member) => member.id === user.id))
		.map((user) => ({
			id: user.id,
			alias: user.name,
			role: "member",
			user: user,
		}));

	// Filtrer les membres disponibles selon la recherche
	const filteredMembers = availableMembers.filter((member) =>
		member.alias.toLowerCase().includes(searchQuery.toLowerCase())
	);

	const handleInvite = async () => {
		if (!selectedUser) return;

		setIsLoading(true);

		try {
			// Simuler un délai d'invitation
			await new Promise((resolve) => setTimeout(resolve, 1000));

			onInviteMember(selectedUser);
			setSelectedUser(null);
			setSearchQuery("");
			onClose();
		} catch (error) {
			console.error("Erreur lors de l'invitation:", error);
		} finally {
			setIsLoading(false);
		}
	};

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
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="bg-[#313338] text-white border-none sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle className="text-center text-xl font-bold">
						Inviter des membres
					</DialogTitle>
					<DialogDescription className="text-center text-gray-400">
						Invitez des amis à rejoindre votre serveur
					</DialogDescription>
				</DialogHeader>

				<div className="space-y-4">
					<div className="relative">
						<Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
						<Input
							placeholder="Rechercher un utilisateur"
							className="bg-[#1e1f22] border-none text-white pl-8"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
					</div>

					{isLoadingUsers ? (
						<StellarParticlesLoader
							showBackgroundColor={false}
							speed={2}
							loadingText="Chargment des utilisateurs"
							particleSize={8}
						/>
					) : (
						<div className="max-h-[240px] overflow-y-auto space-y-1 pr-1">
							{filteredMembers.length > 0 ? (
								filteredMembers.map((member) => (
									<div
										key={member.id}
										className={`flex items-center justify-between p-2 rounded-md cursor-pointer ${
											selectedUser?.id === member.id
												? "bg-[#404249]"
												: "hover:bg-[#35373c]"
										}`}
										onClick={() => setSelectedUser(member)}>
										<div className="flex items-center">
											<div className="relative">
												<Avatar className="h-8 w-8 mr-3">
													<AvatarImage
														src={member.user?.avatar || "/placeholder.svg"}
													/>
													<AvatarFallback>{member.alias[0]}</AvatarFallback>
												</Avatar>
												<div
													className={`absolute bottom-0 right-2 h-3 w-3 rounded-full border-2 border-[#313338] ${getStatusColor(
														member.user?.status || "offline"
													)}`}
												/>
											</div>
											<span className="text-sm font-medium">
												{member.alias}
											</span>
										</div>

										{selectedUser?.id === member.id && (
											<Check className="h-5 w-5 text-green-500" />
										)}
									</div>
								))
							) : (
								<div className="text-center py-4 text-gray-400">
									{searchQuery
										? "Aucun utilisateur trouvé"
										: "Tous les utilisateurs sont déjà membres"}
								</div>
							)}
						</div>
					)}
				</div>

				<DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
					<Button
						type="button"
						variant="ghost"
						onClick={onClose}
						className="text-gray-400 hover:text-white hover:bg-transparent"
						disabled={isLoading}>
						Annuler
					</Button>
					<Button
						type="button"
						className="bg-[#5865f2] hover:bg-[#4752c4]"
						disabled={!selectedUser || isLoading}
						onClick={handleInvite}>
						{isLoading ? (
							"Invitation en cours..."
						) : (
							<>
								<UserPlus className="h-4 w-4 mr-2" />
								Inviter
							</>
						)}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
