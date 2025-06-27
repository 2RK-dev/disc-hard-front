"use client";

import Loading from "@/components/loading-component";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import {useCurrentUserStore} from "@/contexts/userStore";
import {UpdateMemberRole} from "@/services/member";
import {addMemberToSalon, getSalonById} from "@/services/salon";
import {Member, Role} from "@/type/Member";
import {Server} from "@/type/Server";
import {Crown, Plus, Settings, Shield, Users} from "lucide-react";
import {useEffect, useState} from "react";
import {InviteMemberModal} from "./invite-member-modal";
import {MemberRoleMenu} from "./member-role-menu";
import {ServerChat} from "./server-chat";

interface ServerLayoutProps {
    serverId: number;
}

export function ServerLayout({serverId}: ServerLayoutProps) {
    const currentUser = useCurrentUserStore((s) => s.currentUser);
    const [currentSalon, setCurrentSalon] = useState<Server | null>(null);
    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

    useEffect(() => {
        if (currentUser) {
            getSalonById(serverId).then((salon) => {
                if (salon) {
                    setCurrentSalon(salon);
                }
            });
        }
    }, [currentUser, serverId]);

    if (currentSalon === null) {
        return <Loading/>;
    }

    const currentUserMember = currentSalon.members.find(
        (member: Member) => member.user?.id === currentUser?.id
    );
    const isCurrentUserOwner = currentUserMember?.role === "owner";
    const isCurrentUserAdmin = currentUserMember?.role === "admin";
    const canManageRoles = isCurrentUserOwner || isCurrentUserAdmin;

    const getStatusColor = (status: string) => {
        switch (status) {
            case "online":
                return "bg-green-500";
            case "idle":
                return "bg-yellow-500";
            case "dnd":
                return "bg-red-500";
            default:
                return "bg-gray-500";
        }
    };

    const handleInviteMember = async (member: Member) => {
        const updatedSalon = await addMemberToSalon(currentSalon.id, member);
        if (updatedSalon) {
            setCurrentSalon(updatedSalon);
        }
    };

    const handleChangeRole = (member: Member, role: Member["role"]) => {
        UpdateMemberRole(member, role).then((updatedMember) => {
            currentSalon.members.forEach((m) => {
                if (m.id === updatedMember.id) {
                    m.role = updatedMember.role;
                }
            });
            setCurrentSalon({...currentSalon});
        })
    };

    const getRoleIndex = (role: string) => {
        switch (role) {
            case "owner":
                return 0;
            case "admin":
                return 1;
            case "member":
                return 2;
            default:
                return 3;
        }
    };

    const sortedMembers = [...currentSalon?.members].sort((a, b) => {
        return getRoleIndex(a.role) - getRoleIndex(b.role);
    });

    const onlineMembers = sortedMembers.filter(
        (m) => m.user?.status !== "offline"
    );
    const offlineMembers = sortedMembers.filter(
        (m) => m.user?.status === "offline"
    );

    return (
        <div className="flex-1 flex flex-col bg-[#313338] min-h-0">
            <div className=" border-b border-[#1e1f22] shadow-sm flex items-center px-4"></div>

            <div className="flex-1 flex min-h-0 min-w-0">
                <div className="flex-1 flex flex-col min-h-0 min-w-0">
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger
                                className="bg-[#2b2d31] px-6 py-4 rounded-t-xl hover:bg-[#3a3c41] transition-colors">
                                <h2 className="text-lg sm:text-xl font-semibold text-white">
                                    {currentSalon.name}
                                </h2>
                            </AccordionTrigger>

                            <AccordionContent className="bg-[#2b2d31] px-6 py-6 rounded-b-xl border-t border-[#3f4147]">
                                <div className="flex items-start gap-4">
                                    <div
                                        className="h-16 w-16 rounded-full bg-[#5865f2] flex items-center justify-center text-2xl font-bold text-white shadow-md">
                                        {currentSalon.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="flex-1">
                                        <h1 className="text-xl font-semibold text-white">
                                            {currentSalon.name}
                                        </h1>
                                        <p className="text-sm text-gray-400 mt-1">
                                            {currentSalon.description}
                                        </p>

                                        <div className="flex items-center text-gray-400 text-sm mt-3">
                                            <Users className="h-4 w-4 mr-1"/>
                                            <span>{currentSalon.members.length} membres</span>
                                        </div>

                                        <div className="flex flex-col sm:flex-row gap-3 mt-5">
                                            <Button
                                                className="bg-[#5865f2] hover:bg-[#4752c4] text-white transition"
                                                onClick={() => setIsInviteModalOpen(true)}>
                                                <Plus className="h-5 w-5 mr-2"/> Inviter des amis
                                            </Button>
                                            <Button
                                                variant="outline"
                                                className="border border-gray-600 text-gray-300 hover:bg-[#3f4147] transition">
                                                <Settings className="h-5 w-5 mr-2"/> Paramètres du
                                                serveur
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                    {/* Zone de chat */}
                    <ServerChat serverId={serverId}/>
                </div>

                <div className="w-60 bg-[#2b2d31] border-l border-[#1e1f22]">
                    <div className="p-4 border-b border-[#1e1f22]">
                        <h3 className="font-semibold text-gray-300 flex items-center">
                            <Users className="h-4 w-4 mr-2"/> Membres -{" "}
                            {currentSalon.members.length}
                        </h3>
                    </div>

                    <div
                        className="overflow-y-auto"
                        style={{maxHeight: "calc(100vh - 12rem)"}}>
                        {/* Membres en ligne */}
                        {onlineMembers.length > 0 && (
                            <div className="mb-2">
                                <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase">
                                    En ligne — {onlineMembers.length}
                                </div>
                                {onlineMembers.map((member) => (
                                    <div
                                        key={member.id}
                                        className="flex items-center justify-between px-2 py-1.5 mx-2 rounded hover:bg-[#35373c] group">
                                        <div className="flex items-center">
                                            <div className="relative">
                                                <Avatar className="h-8 w-8 mr-3">
                                                    <AvatarImage
                                                        src={member.user?.avatar || "/placeholder.svg"}
                                                    />
                                                    <AvatarFallback>
                                                        {member.user?.name?.charAt(0) || "?"}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div
                                                    className={`absolute bottom-0 right-2 h-3 w-3 rounded-full border-2 border-[#2b2d31] ${getStatusColor(
                                                        member.user?.status || "offline"
                                                    )}`}
                                                />
                                            </div>
                                            <div className="flex items-center">
												<span
                                                    className={`text-sm font-medium ${
                                                        member.role === "owner"
                                                            ? "text-yellow-400"
                                                            : member.role === "admin"
                                                                ? "text-blue-400"
                                                                : "text-gray-300"
                                                    }`}>
													{member.user?.name || "Utilisateur inconnu"}
												</span>
                                                {member.role === "owner" && (
                                                    <Crown className="h-3.5 w-3.5 ml-1 text-yellow-400"/>
                                                )}
                                                {member.role === "admin" && (
                                                    <Shield className="h-3.5 w-3.5 ml-1 text-blue-400"/>
                                                )}
                                            </div>
                                        </div>

                                        <div className="opacity-0 group-hover:opacity-100">
                                            {canManageRoles && (
                                                <MemberRoleMenu
                                                    member={member}
                                                    salon={currentSalon}
                                                    onChangeRole={(role: Role) => {
                                                        handleChangeRole(member, role);
                                                    }}
                                                />
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Membres hors ligne */}
                        {offlineMembers.length > 0 && (
                            <div>
                                <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase">
                                    Hors ligne — {offlineMembers.length}
                                </div>
                                {offlineMembers.map((member) => (
                                    <div
                                        key={member.id}
                                        className="flex items-center justify-between px-2 py-1.5 mx-2 rounded hover:bg-[#35373c] group">
                                        <div className="flex items-center">
                                            <div className="relative">
                                                <Avatar className="h-8 w-8 mr-3">
                                                    <AvatarImage
                                                        src={member.user?.avatar || "/placeholder.svg"}
                                                    />
                                                    <AvatarFallback>
                                                        {member.user?.name?.charAt(0) || "?"}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div
                                                    className={`absolute bottom-0 right-2 h-3 w-3 rounded-full border-2 border-[#2b2d31] ${getStatusColor(
                                                        member.user?.status || "offline"
                                                    )}`}
                                                />
                                            </div>
                                            <div className="flex items-center">
												<span
                                                    className={`text-sm font-medium text-gray-500 ${
                                                        member.role === "owner"
                                                            ? "text-yellow-400/70"
                                                            : member.role === "admin"
                                                                ? "text-blue-400/70"
                                                                : ""
                                                    }`}>
													{member.user?.name || "Utilisateur inconnu"}
												</span>
                                                {member.role === "owner" && (
                                                    <Crown className="h-3.5 w-3.5 ml-1 text-yellow-400/70"/>
                                                )}
                                                {member.role === "admin" && (
                                                    <Shield className="h-3.5 w-3.5 ml-1 text-blue-400/70"/>
                                                )}
                                            </div>
                                        </div>

                                        <div className="opacity-0 group-hover:opacity-100">
                                            {canManageRoles && (
                                                <MemberRoleMenu
                                                    member={member}
                                                    salon={currentSalon}
                                                    onChangeRole={(role: Role) =>
                                                        handleChangeRole(member, role)
                                                    }
                                                />
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <InviteMemberModal
                isOpen={isInviteModalOpen}
                onClose={() => setIsInviteModalOpen(false)}
                onInviteMember={handleInviteMember}
                existingMembers={currentSalon.members}
            />
        </div>
    );
}
