"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getCookie } from "@/services/cookie";
import { user } from "@/type/User";
import {
	Bell,
	ChevronDown,
	CreditCard,
	HelpCircle,
	Languages,
	LogOut,
	Settings,
	Shield,
	User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function UserDropdownMenu() {
	const router = useRouter();
	const [currentUser, setCurrentUser] = useState<user>();

	useEffect(() => {
		getCurrentUser();
	}, []);

	const getCurrentUser = async () => {
		const user = await getCookie("user");
		if (user) {
			setCurrentUser(JSON.parse(user));
		}
	};

	const handleLogout = () => {
		// Supprimer les données d'authentification
		sessionStorage.removeItem("isAuthenticated");
		// Rediriger vers la page d'accueil
		router.push("/");
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

	const getStatusText = (status: string) => {
		switch (status) {
			case "online":
				return "En ligne";
			case "idle":
				return "Inactif";
			case "dnd":
				return "Ne pas déranger";
			default:
				return "Hors ligne";
		}
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button className="flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-[#35373c] transition-colors">
					<div className="relative">
						<Avatar className="h-8 w-8">
							<AvatarImage src={currentUser?.avatar || "/placeholder.svg"} />
							<AvatarFallback>{currentUser?.name}</AvatarFallback>
						</Avatar>
						<div
							className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#232428] ${getStatusColor(
								currentUser?.status || "offline"
							)}`}></div>
					</div>
					<div className="flex flex-col items-start">
						<span className="text-sm font-semibold leading-none">
							{currentUser?.name}
						</span>
						<span className="text-xs text-gray-400 leading-tight">
							{getStatusText(currentUser?.status || "offline")}
						</span>
					</div>
					<ChevronDown className="h-4 w-4 text-gray-400" />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56 bg-[#1e1f22] text-white border-none">
				<DropdownMenuLabel>Mon compte</DropdownMenuLabel>
				<DropdownMenuSeparator className="bg-gray-700" />
				<DropdownMenuGroup>
					<DropdownMenuItem
						className="hover:bg-[#5865F2] hover:text-white cursor-pointer"
						onClick={() => router.push("/profile")}>
						<User className="mr-2 h-4 w-4" />
						<span>Profil</span>
					</DropdownMenuItem>
					<DropdownMenuItem className="hover:bg-[#5865F2] hover:text-white cursor-pointer">
						<CreditCard className="mr-2 h-4 w-4" />
						<span>Nitro</span>
					</DropdownMenuItem>
					<DropdownMenuItem className="hover:bg-[#5865F2] hover:text-white cursor-pointer">
						<Bell className="mr-2 h-4 w-4" />
						<span>Notifications</span>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator className="bg-gray-700" />
				<DropdownMenuGroup>
					<DropdownMenuItem className="hover:bg-[#5865F2] hover:text-white cursor-pointer">
						<Settings className="mr-2 h-4 w-4" />
						<span>Paramètres</span>
					</DropdownMenuItem>
					<DropdownMenuItem className="hover:bg-[#5865F2] hover:text-white cursor-pointer">
						<Shield className="mr-2 h-4 w-4" />
						<span>Confidentialité & Sécurité</span>
					</DropdownMenuItem>
					<DropdownMenuItem className="hover:bg-[#5865F2] hover:text-white cursor-pointer">
						<Languages className="mr-2 h-4 w-4" />
						<span>Langue</span>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator className="bg-gray-700" />
				<DropdownMenuItem className="hover:bg-[#5865F2] hover:text-white cursor-pointer">
					<HelpCircle className="mr-2 h-4 w-4" />
					<span>Aide</span>
				</DropdownMenuItem>
				<DropdownMenuSeparator className="bg-gray-700" />
				<DropdownMenuItem
					className="text-red-500 hover:bg-red-500 hover:text-white cursor-pointer"
					onClick={handleLogout}>
					<LogOut className="mr-2 h-4 w-4" />
					<span>Déconnexion</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
