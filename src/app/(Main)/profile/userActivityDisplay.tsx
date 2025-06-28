"use client"
import {Music, GamepadIcon, Edit, Clock, Eye, EyeOff} from "lucide-react"
import {Button} from "@/components/ui/button"
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip"
import {useCurrentUserStore} from "@/contexts/userStore";
import Image from "next/image";

interface UserActivityDisplayProps {
    showControls?: boolean
    className?: string
}

export function UserActivityDisplay({showControls = false, className = ""}: UserActivityDisplayProps) {
    const currentUser = useCurrentUserStore((s => s.currentUser))
    const activity = {
        name: "Spotify",
        type: "spotify"
    };
    if (!currentUser) return null

    const formatDuration = (timestamp: number | undefined) => {
        if (!timestamp) return ""

        const now = Date.now()
        const duration = now - timestamp

        const hours = Math.floor(duration / (1000 * 60 * 60))
        const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60))

        if (hours > 0) {
            return `depuis ${hours}h ${minutes}m`
        } else {
            return `depuis ${minutes}m`
        }
    }

    const getActivityIcon = (type: string) => {
        switch (type) {
            case "spotify":
                return <Music className="h-4 w-4 text-green-500"/>
            case "youtube":
                return <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>YouTube</title>
                    <path
                        d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
            case "game":
                return <GamepadIcon className="h-4 w-4 text-purple-500"/>
            case "custom":
                return <Edit className="h-4 w-4 text-blue-500"/>
            default:
                return null
        }
    }

    return (
        <div className={`space-y-2 ${className}`}>
            <div className="bg-[#232428] rounded-md p-2 relative">
                <div className="flex items-center">
                    {getActivityIcon(activity.type)}
                    <span className="ml-2 font-medium text-sm">
              {activity.type === "spotify" ? "Écoute" : activity.type === "youtube" ? "Regarde" : "Joue à"}{" "}
                        {activity.name}
            </span>

                    {showControls && currentUser && (
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="ml-auto p-0 h-6 w-6"
                                    >
                                      
                                            <Eye className="h-4 w-4 text-gray-400"/>
                                        
                                            <EyeOff className="h-4 w-4 text-gray-400"/>
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p> Masquer l&#39;activité</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    )}
                </div>


                {new Date() && (
                    <div className="flex items-center text-xs text-gray-500 mt-1 ml-6">
                        <Clock className="h-3 w-3 mr-1"/>
                        {formatDuration(new Date().getTime())}
                    </div>
                )}

                <div className="absolute top-2 right-2 h-12 w-12 rounded overflow-hidden">
                    <Image
                        src={"/placeholder.svg"}
                        width={200}
                        height={200}
                        alt={activity.name}
                        className="h-full w-full object-cover"
                    />
                    <div
                        className="absolute bottom-0 right-0 h-5 w-5 rounded-full overflow-hidden border-2 border-[#232428]">
                        <Image src={"/placeholder.svg"} alt=""
                               width={200}
                                 height={200}
                               className="h-full w-full object-cover"/>
                    </div>

                </div>

            </div>

        </div>
    )
}
