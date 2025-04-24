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
import { setCookie } from "@/services/cookie";
import user from "@/test/user.json";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function LoginForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		// Simuler une connexion

		const finduser = user.find((user) => user.email === email);
		if (!finduser) {
			alert("Identifiants incorrects");
			setIsLoading(false);
			return;
		}

		setTimeout(() => {
			setIsLoading(false);
			// Rediriger vers l'application principale après connexion
			setCookie("currentUser", JSON.stringify(finduser));
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
						Besoin d'un compte ?{" "}
						<Link href="/register" className="text-[#00a8fc] hover:underline">
							S'inscrire
						</Link>
					</div>
				</CardFooter>
			</Card>
		</div>
	);
}
