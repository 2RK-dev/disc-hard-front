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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCurrentUserStore } from "@/contexts/userStore";
import { login } from "@/services/user";
import { User } from "@/type/User";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function LoginForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const setCurrentUser = useCurrentUserStore((s) => s.setCurrentUser);
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		// Simuler une connexion

		login(email, password)
			.then((finduser: User | null) => {
				if (!finduser) {
					alert("Identifiants incorrects. Veuillez réessayer.");
					setIsLoading(false);
					return;
				}
				setIsLoading(false);
				setCurrentUser(finduser);
				router.push("/home");
			})
			.catch((error) => {
				console.error("Erreur lors de la connexion :", error);
				alert("Une erreur est survenue. Veuillez réessayer.");
				setIsLoading(false);
			});
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
						<p>Bienvenue !</p>
					</CardTitle>
					<CardDescription className="text-gray-400">
						Nous sommes ravis de vous revoir !
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="space-y-2">
							<Label
								htmlFor="email"
								className="text-sm font-medium text-gray-300">
								E-mail ou numéro de téléphone
							</Label>
							<Input
								id="email"
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="bg-[#202225] border-none text-white"
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
								className="bg-[#202225] border-none text-white"
								required
							/>
						</div>
						<Link
							href="#"
							className="text-[#00a8fc] text-sm hover:underline block">
							Mot de passe oublié ?
						</Link>
						<Button
							type="submit"
							className="w-full bg-[#5865F2] hover:bg-[#4752c4]"
							disabled={isLoading}>
							{isLoading ? "Connexion en cours..." : "Se connecter"}
						</Button>
					</form>
				</CardContent>
				<CardFooter className="flex flex-col space-y-4">
					<div className="text-sm text-gray-400">
						Besoin d&apos;un compte ?{" "}
						<Link href="/register" className="text-[#00a8fc] hover:underline">
							S&apos;inscrire
						</Link>
					</div>
				</CardFooter>
			</Card>
		</div>
	);
}
