"use client";

import type React from "react";
import {useState} from "react";

import {Button} from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {User} from "@/type/User";
import {Upload} from "lucide-react";
import {useCurrentUserStore} from "@/contexts/userStore";

interface CreateServerModalProps {
	isOpen: boolean;
	onClose: () => void;
	onCreateSalon: (
		salonName: string,
		description: string,
		creator: User
	) => void;
}

export function CreateServerModal({
	isOpen,
	onClose,
	onCreateSalon,
}: CreateServerModalProps) {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const currentUser = useCurrentUserStore((s) => s.currentUser) ;

	if (!currentUser) {
		return null;
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			await new Promise((resolve) => setTimeout(resolve, 1000));

			onCreateSalon(name, description, currentUser);

			setName("");
			setDescription("");
			onClose();
		} catch (error) {
			console.error("Erreur lors de la création du serveur:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="bg-[#313338] text-white border-none sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle className="text-center text-2xl font-bold">
						Créer un serveur
					</DialogTitle>
					<DialogDescription className="text-center text-gray-400">
						Votre serveur est un endroit où vous et vos amis pouvez vous
						retrouver. Créez le vôtre et commencez à discuter.
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="flex justify-center mb-4">
						<div className="relative">
							<div className="h-24 w-24 rounded-full bg-[#5865f2] flex items-center justify-center text-3xl font-bold">
								{name ? name.charAt(0).toUpperCase() : "?"}
							</div>
							<div className="absolute bottom-0 right-0 bg-[#5865f2] rounded-full p-1.5 cursor-pointer">
								<Upload className="h-4 w-4" />
							</div>
						</div>
					</div>
					<div className="space-y-2">
						<Label htmlFor="name" className="text-sm font-medium text-gray-300">
							Nom du serveur <span className="text-red-500">*</span>
						</Label>
						<Input
							id="name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							className="bg-[#1e1f22] border-none text-white"
							placeholder="Ex: Club de Gaming"
							required
						/>
					</div>
					<div className="space-y-2">
						<Label
							htmlFor="description"
							className="text-sm font-medium text-gray-300">
							Description (optionnelle)
						</Label>
						<Textarea
							id="description"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							className="bg-[#1e1f22] border-none text-white min-h-[80px]"
							placeholder="Décrivez votre serveur en quelques mots"
						/>
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
							type="submit"
							className="bg-[#5865f2] hover:bg-[#4752c4]"
							disabled={!name || isLoading}>
							{isLoading ? "Création en cours..." : "Créer"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
