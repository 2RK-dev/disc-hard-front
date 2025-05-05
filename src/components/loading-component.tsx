"use client";

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

export default function Loading() {
	const [stars] = useState(() => generateStars(100));

	return (
		<div className="relative flex h-screen w-full items-center justify-center bg-[#313338] overflow-hidden">
			{/* Étoiles */}
			{stars}

			<div className="relative flex items-center justify-center">
				{/* Planète */}
				<div className="relative h-32 w-32 rounded-full bg-gradient-to-br from-blue-500 to-blue-800 shadow-lg shadow-blue-500/50">
					{/* Détails de surface de la planète */}
					<div className="absolute left-5 top-6 h-6 w-10 rounded-full bg-blue-300/20"></div>
					<div className="absolute bottom-8 right-7 h-8 w-12 rounded-full bg-blue-300/20"></div>
				</div>

				{/* Orbite de la lune */}
				<div className="absolute h-64 w-64 rounded-full border border-gray-700/30 animate-[spin_10s_linear_infinite]">
					{/* Lune */}
					<div className="absolute -right-3 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 shadow-md"></div>
				</div>

				{/* Texte de chargement */}
				<div className="absolute -bottom-16 text-center text-white">
					<p className="text-sm font-medium">Chargement en cours...</p>
				</div>
			</div>
		</div>
	);
}
