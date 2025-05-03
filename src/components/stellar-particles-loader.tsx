"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface StellarParticlesLoaderProps {
	speed?: number;
	color1?: string;
	color2?: string;
	showStars?: boolean;
	showBackgroundColor?: boolean;
	backgroundColor?: string;
	loadingText?: string;
	particleSize?: number;
	width?: string;
	height?: string;
	className?: string;
}

const NUMBER_OF_STARS = 50;
const BASE_ANIMATION_SPEED = 8;
const PADDING_AROUND_ANIMATION = 40;
const PARTICLE_SCALE_FACTOR = 1.5;
const EXTRA_MARGIN = 20;
const LOADING_TEXT_HEIGHT = 30;

export function StellarParticlesLoader({
	speed = 1,
	color1 = "#3b82f6", // bleu par défaut
	color2 = "#a78bfa", // violet par défaut
	showStars = true,
	showBackgroundColor = true,
	backgroundColor = "#000000", // noir par défaut
	loadingText = "Connexion en cours...",
	particleSize = 6,
	width,
	height,
	className = "",
}: StellarParticlesLoaderProps) {
	const [stars] = useState(() => generateStars(NUMBER_OF_STARS));

	const animationDuration = BASE_ANIMATION_SPEED / speed;

	const animationSize =
		PADDING_AROUND_ANIMATION * 2 +
		particleSize * PARTICLE_SCALE_FACTOR +
		EXTRA_MARGIN;

	const textHeight = loadingText ? LOADING_TEXT_HEIGHT : 0;
	const minHeight = animationSize + textHeight + PADDING_AROUND_ANIMATION;
	const minWidth = animationSize + PADDING_AROUND_ANIMATION;

	const getRgbaFromHex = (hex: string, alpha: number) => {
		const r = Number.parseInt(hex.slice(1, 3), 16);
		const g = Number.parseInt(hex.slice(3, 5), 16);
		const b = Number.parseInt(hex.slice(5, 7), 16);
		return `rgba(${r},${g},${b},${alpha})`;
	};

	const getShadowValues = (color: string) => {
		const rgba = (alpha: number) => getRgbaFromHex(color, alpha);
		return [
			`0 0 15px 5px ${rgba(0.5)}`,
			`0 0 15px 5px ${rgba(0.5)}`,
			`0 0 20px 8px ${rgba(0.6)}`,
			`0 0 25px 12px ${rgba(0.7)}`,
			`0 0 40px 20px ${rgba(0.9)}`,
			`0 0 25px 12px ${rgba(0.7)}`,
			`0 0 20px 8px ${rgba(0.6)}`,
			`0 0 15px 5px ${rgba(0.5)}`,
			`0 0 15px 5px ${rgba(0.5)}`,
		];
	};

	return (
		<div
			className={`relative flex items-center justify-center overflow-hidden ${className}`}
			style={{
				backgroundColor: showBackgroundColor ? backgroundColor : "transparent",
				width: width || "100%",
				height: height || "100%",
				minWidth: `${minWidth}px`,
				minHeight: `${minHeight}px`,
			}}>
			{showStars &&
				stars.map((props, i) => (
					<div
						key={i}
						className="absolute rounded-full bg-white animate-twinkle"
						style={{
							width: `${props.size}px`,
							height: `${props.size}px`,
							top: props.top,
							left: props.left,
							opacity: props.opacity,
							animationDelay: props.delay,
						}}
					/>
				))}

			<div className="relative flex flex-col items-center justify-center p-5">
				<motion.div
					className="relative flex items-center justify-center"
					animate={{
						x: [0, 1, -1, 1, 0],
						y: [0, 1, -1, 0, 1],
					}}
					transition={{
						duration: 2,
						repeat: Number.POSITIVE_INFINITY,
						repeatType: "mirror",
						ease: "easeInOut",
					}}>
					<motion.div
						className="absolute rounded-full"
						style={{
							backgroundColor: color1,
							width: `${particleSize}px`,
							height: `${particleSize}px`,
							boxShadow: `0 0 15px 5px ${getRgbaFromHex(color1, 0.5)}`,
						}}
						initial={{ x: -40, y: 0 }}
						animate={{
							x: [-40, -30, -20, -10, 0, -10, -20, -30, -40],
							y: [0, -30, -40, -30, 0, 30, 40, 30, 0],
							scale: [1, 1, 1, 1.1, 1.5, 1.1, 1, 1, 1],
							boxShadow: getShadowValues(color1),
						}}
						transition={{
							duration: animationDuration,
							times: [0, 0.2, 0.35, 0.45, 0.5, 0.55, 0.65, 0.8, 1],
							ease: "easeInOut",
							repeat: Number.POSITIVE_INFINITY,
						}}
					/>

					<motion.div
						className="absolute rounded-full"
						style={{
							backgroundColor: color2,
							width: `${particleSize}px`,
							height: `${particleSize}px`,
							boxShadow: `0 0 15px 5px ${getRgbaFromHex(color2, 0.5)}`,
						}}
						initial={{ x: 40, y: 0 }}
						animate={{
							x: [40, 30, 20, 10, 0, 10, 20, 30, 40],
							y: [0, 30, 40, 30, 0, -30, -40, -30, 0],
							scale: [1, 1, 1, 1.1, 1.5, 1.1, 1, 1, 1],
							boxShadow: getShadowValues(color2),
						}}
						transition={{
							duration: animationDuration,
							times: [0, 0.2, 0.35, 0.45, 0.5, 0.55, 0.65, 0.8, 1],
							ease: "easeInOut",
							repeat: Number.POSITIVE_INFINITY,
						}}
					/>

					<motion.div
						className="absolute rounded-full bg-white"
						style={{
							width: `${particleSize * 0.7}px`,
							height: `${particleSize * 0.7}px`,
						}}
						animate={{
							opacity: [0, 0, 0, 0.3, 1, 0.3, 0, 0, 0],
							scale: [0, 0, 0, 1, 3, 1, 0, 0, 0],
							boxShadow: [
								"0 0 0px 0px rgba(255,255,255,0)",
								"0 0 0px 0px rgba(255,255,255,0)",
								"0 0 0px 0px rgba(255,255,255,0)",
								"0 0 20px 10px rgba(255,255,255,0.5)",
								"0 0 60px 30px rgba(255,255,255,0.8)",
								"0 0 20px 10px rgba(255,255,255,0.5)",
								"0 0 0px 0px rgba(255,255,255,0)",
								"0 0 0px 0px rgba(255,255,255,0)",
								"0 0 0px 0px rgba(255,255,255,0)",
							],
						}}
						transition={{
							duration: animationDuration,
							times: [0, 0.2, 0.35, 0.45, 0.5, 0.55, 0.65, 0.8, 1],
							ease: "easeInOut",
							repeat: Number.POSITIVE_INFINITY,
						}}
					/>
				</motion.div>

				{loadingText && (
					<div className="mt-9 text-center text-white whitespace-nowrap overflow-hidden text-ellipsis max-w-full">
						<p className="text-sm font-medium">{loadingText}</p>
					</div>
				)}
			</div>
		</div>
	);
}

function generateStars(count: number) {
	const stars = [];
	for (let i = 0; i < count; i++) {
		stars.push({
			size: Math.random() * 2 + 1,
			top: `${Math.random() * 100}%`,
			left: `${Math.random() * 100}%`,
			opacity: Math.random() * 0.7 + 0.3,
			delay: `${Math.random() * 3}s`,
		});
	}
	return stars;
}
