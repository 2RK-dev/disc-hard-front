"use client";

import type React from "react";

import { SalonSidebar } from "@/components/salon-sidebar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { UserDropdownMenu } from "./user-dropdown-menu";

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

			<div className="flex flex-col flex-1">
				<div className="flex-1 min-h-0 flex">{children}</div>
				<div className="h-[52px] bg-[#232428] px-2 flex items-center">
					<UserDropdownMenu />
				</div>
			</div>
		</div>
	);
}

