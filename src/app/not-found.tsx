"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Composant Étoile
const Star = ({
	size,
	top,
	left,
	delay,
}: {
	size: number;
	top: string;
	left: string;
	delay: string;
}) => (
	<div
		className="absolute rounded-full bg-white animate-twinkle"
		style={{
			width: `${size}px`,
			height: `${size}px`,
			top,
			left,
			opacity: Math.random() * 0.7 + 0.3,
			animationDelay: delay,
		}}></div>
);

// Générer des étoiles aléatoires
const generateStars = (count: number) => {
	const stars = [];
	for (let i = 0; i < count; i++) {
		const size = Math.random() * 2 + 1;
		const top = `${Math.random() * 100}%`;
		const left = `${Math.random() * 100}%`;
		const delay = `${Math.random() * 3}s`;
		stars.push(
			<Star key={i} size={size} top={top} left={left} delay={delay} />
		);
	}
	return stars;
};

export default function NotFound() {
	const [stars] = useState(() => generateStars(100)); // Générer 100 étoiles

	return (
		<div className="relative flex h-screen w-full items-center justify-center bg-[#313338] overflow-hidden">
			{/* Étoiles */}
			{stars}

			<div className="relative flex flex-col items-center justify-center text-center">
				<div className="relative mb-12 animate-float">
					<Image
						src={"/lost.png"}
						alt="Astronaute perdu"
						width={200}
						height={200}></Image>
				</div>

				{/* Texte d'erreur */}
				<h1 className="mb-2 text-4xl font-bold text-white">404</h1>
				<h2 className="mb-6 text-2xl font-semibold text-white">
					Astronaute perdu dans l'espace
				</h2>
				<p className="mb-8 max-w-md text-gray-300">
					On dirait que vous avez dérivé trop loin. Cette page n'existe pas ou a
					été déplacée vers une autre galaxie.
				</p>

				{/* Bouton de retour */}
				<Button asChild className="bg-blue-600 hover:bg-blue-700">
					<Link href="/">Retour à la Terre</Link>
				</Button>
			</div>
		</div>
	);
}
