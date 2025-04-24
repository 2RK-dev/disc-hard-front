"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function RegisterForm() {
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		// Simuler une inscription
		setTimeout(() => {
			setIsLoading(false);
			// Rediriger vers l'application principale après inscription
			router.push("/home");
		}, 1500);
	};

	return (
		<div className="min-h-screen bg-[#5865F2] flex items-center justify-center p-4">
			<Card className="w-full max-w-md bg-[#36393f] text-white border-none">
				<CardHeader className="space-y-1 text-center">
					<CardTitle className="text-2xl font-bold flex items-center justify-center space-x-2 ">
						<Link href={"/"}>
							<Image
								src={"/Logo-transpa-white.png"}
								alt="DiscHard"
								width={40}
								height={40}
								className="cursor-pointer"
							/>
						</Link>
						<p>Créer un compte</p>
					</CardTitle>
					<CardDescription className="text-gray-400">
						Rejoignez des millions d'utilisateurs sur DiscHard
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="space-y-2">
							<Label
								htmlFor="email"
								className="text-sm font-medium text-gray-300">
								E-mail
							</Label>
							<Input
								id="email"
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="bg-[#202225] border-none text-white shadow- hover:shadow-indigo-500"
								required
							/>
						</div>
						<div className="space-y-2">
							<Label
								htmlFor="username"
								className="text-sm font-medium text-gray-300">
								Nom d'utilisateur
							</Label>
							<Input
								id="username"
								type="text"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								className="bg-[#202225] border-none text-white hover:shadow-indigo-500"
								required
							/>
						</div>
						<div className="space-y-2">
							<Label
								htmlFor="password"
								className="text-sm font-medium text-gray-300">
								Mot de passe
							</Label>
							<Input
								id="password"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="bg-[#202225] border-none text-white hover:shadow-indigo-500"
								required
							/>
						</div>
						<div className="space-y-2">
							<Label
								htmlFor="dob"
								className="text-sm font-medium text-gray-300">
								Date de naissance
							</Label>
							<div className="flex gap-2">
								<Select>
									<SelectTrigger className="bg-[#202225] border-none text-white hover:shadow-indigo-500">
										<SelectValue placeholder="Jour" />
									</SelectTrigger>
									<SelectContent className="bg-[#2f3136] border-none text-white">
										{Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
											<SelectItem key={day} value={day.toString()}>
												{day}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<Select>
									<SelectTrigger className="bg-[#202225] border-none text-white hover:shadow-indigo-500">
										<SelectValue placeholder="Mois" />
									</SelectTrigger>
									<SelectContent className="bg-[#2f3136] border-none text-white">
										<SelectItem value="1">Janvier</SelectItem>
										<SelectItem value="2">Février</SelectItem>
										<SelectItem value="3">Mars</SelectItem>
										<SelectItem value="4">Avril</SelectItem>
										<SelectItem value="5">Mai</SelectItem>
										<SelectItem value="6">Juin</SelectItem>
										<SelectItem value="7">Juillet</SelectItem>
										<SelectItem value="8">Août</SelectItem>
										<SelectItem value="9">Septembre</SelectItem>
										<SelectItem value="10">Octobre</SelectItem>
										<SelectItem value="11">Novembre</SelectItem>
										<SelectItem value="12">Décembre</SelectItem>
									</SelectContent>
								</Select>
								<Select>
									<SelectTrigger className="bg-[#202225] border-none text-white hover:shadow-indigo-500">
										<SelectValue placeholder="Année" />
									</SelectTrigger>
									<SelectContent className="bg-[#2f3136] border-none text-white">
										{Array.from(
											{ length: 100 },
											(_, i) => new Date().getFullYear() - i
										).map((year) => (
											<SelectItem key={year} value={year.toString()}>
												{year}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
						</div>
						<div className="flex space-x-2">
							<Checkbox
								id="terms"
								className="border-gray-500 hover:border-[#5865F2]"
							/>
							<Label
								htmlFor="terms"
								className="text-sm text-gray-300 flex flex-wrap whitespace-normal break-words">
								J'ai lu et j'accepte les{" "}
								<Link href="#" className="text-[#00a8fc] hover:underline">
									Conditions d'utilisation
								</Link>
								et la
								<Link href="#" className="text-[#00a8fc] hover:underline">
									Politique de confidentialité
								</Link>
							</Label>
						</div>
						<Button
							type="submit"
							className="w-full bg-[#5865F2] hover:bg-[#4752c4]"
							disabled={isLoading}>
							{isLoading ? "Inscription en cours..." : "S'inscrire"}
						</Button>
					</form>
				</CardContent>
				<CardFooter className="flex flex-col space-y-4">
					<div className="text-sm text-gray-400">
						Vous avez déjà un compte ?{" "}
						<Link href="/login" className="text-[#00a8fc] hover:underline">
							Se connecter
						</Link>
					</div>
				</CardFooter>
			</Card>
		</div>
	);
}
