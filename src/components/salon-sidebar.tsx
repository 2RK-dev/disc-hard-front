"use client";

import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,} from "@/components/ui/tooltip";
import {addSalon, getMySalons} from "@/services/salon";
import {Server} from "@/type/Server";
import {User} from "@/type/User";
import {Download, Plus, User as UserIcon} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {usePathname, useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {CreateServerModal} from "./create-server-modal";
import {useCurrentUserStore} from "@/contexts/userStore";

export function SalonSidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const [activePage, setActivePage] = useState("home");
    const currentUser = useCurrentUserStore((s) => s.currentUser);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [salons, setSalons] = useState<Server[]>([]);

    useEffect(() => {
            if (currentUser) {
                getMySalons(currentUser.id).then((salons) => {
                    setSalons(salons);
                });
            }
        }
        , [currentUser]);

    useEffect(() => {
        if (pathname.startsWith("/servers/")) {
            const salonId = pathname.split("/")[2];
            setActivePage(`salon-${salonId}`);
        } else if (pathname === "/home") {
            setActivePage("home");
        } else if (pathname === "/profile") {
            setActivePage("profile");
        } else {
            setActivePage("dm");
        }
    }, [pathname
    ]);

    const handleCreateSalon = async (
        salonName: string,
        description: string,
        creator: User
    ) => {
        const newSalon = await addSalon(salonName, description, creator);
        setSalons((prevSalons) => [...prevSalons, newSalon]);

        router.push(`/servers/${newSalon.id}`);
    };

    return (
        <div className="w-[72px] h-full bg-[#1e1f22] flex flex-col items-center py-3 gap-2 overflow-y-auto">
            <TooltipProvider delayDuration={100}>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Link href="/home">
                            <Button
                                className={`h-12 w-12 rounded-[24px] ${
                                    activePage === "dm" || "home"
                                        ? "bg-white hover:bg-white"
                                        : "bg-[#5865f2] hover:bg-[#4752c4]"
                                } flex items-center relative justify-center hover:rounded-[16px] transition-all duration-200 `}
                                >
                                <Image
                                    src="/Logo-transpa-original-without.png"
                                    alt="DiscHard"
                                    width={32}
                                    height={32}
                                    className="absolute"
                                />
                            </Button>
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                        <p className="font-semibold">Accueil</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>

            <TooltipProvider delayDuration={100}>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Link href="/profile">
                            <Button
                                className={`h-12 w-12 rounded-[24px] ${
                                    activePage === "profile"
                                        ? "bg-[#5865f2]"
                                        : "bg-[#313338] hover:bg-[#5865f2]"
                                } flex items-center justify-center hover:rounded-[16px] transition-all duration-200`}
                                >
                                <UserIcon className="h-5 w-5 text-white"/>
                            </Button>
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                        <p className="font-semibold">Mon Profil</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>

            <Separator className="h-[2px] w-8 bg-gray-700 rounded-full my-1"/>

            {salons.map((salon) => (
                <TooltipProvider key={salon.id} delayDuration={100}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link href={`/servers/${salon.id}`}>
                                <Button
                                    className={`h-12 w-12 rounded-[24px] bg-[#313338] flex items-center justify-center hover:rounded-[16px] ${
                                        activePage === `salon-${salon.id}`
                                            ? "bg-[#5865f2]"
                                            : "hover:bg-[#5865f2]"
                                    } transition-all duration-200`}
                                    >
									<span className="text-white font-semibold text-xl">
										{salon.name.charAt(0)}
									</span>
                                </Button>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                            <p className="font-semibold">{salon.name}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            ))}

            <TooltipProvider delayDuration={100}>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <button
                            className="h-12 w-12 rounded-[24px] bg-[#313338] flex items-center justify-center hover:rounded-[16px] hover:bg-[#23a559] transition-all duration-200"
                            onClick={() => setIsCreateModalOpen(true)}>
                            <Plus className="h-5 w-5 text-[#23a559]"/>
                        </button>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                        <p className="font-semibold">Ajouter un serveur</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>

            <Separator className="h-[2px] w-8 bg-gray-700 rounded-full my-1"/>

            <TooltipProvider delayDuration={100}>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            className="h-12 w-12 rounded-[24px] bg-[#313338] text-[#5865f2] flex items-center justify-center hover:rounded-[16px] hover:bg-[#5865f2] hover:text-white transition-all duration-200">
                            <Download className="h-5 w-5 "/>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                        <p className="font-semibold">Download Apps</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>

            <CreateServerModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onCreateSalon={handleCreateSalon}
            />
        </div>
    );
}
