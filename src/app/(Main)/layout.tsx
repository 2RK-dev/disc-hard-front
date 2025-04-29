"use client";

import type React from "react";

import { SalonSidebar } from "@/components/salon-sidebar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomeLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const router = useRouter();

	useEffect(() => {
		const isAuthenticated =
			sessionStorage.getItem("isAuthenticated") === "true";

		if (!isAuthenticated) {
			sessionStorage.setItem("isAuthenticated", "true");
		}
	}, [router]);

	return (
		<div className="flex h-screen bg-[#1e1f22] text-white overflow-hidden">
			<SalonSidebar />
			{children}
		</div>
	);
}
