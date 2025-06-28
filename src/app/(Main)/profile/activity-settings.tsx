"use client"

import {useState} from "react"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Switch} from "@/components/ui/switch"
import {Label} from "@/components/ui/label"
import {Activity, GamepadIcon, Music} from "lucide-react"

export function ActivitySettings() {
    const [isShowActivity, setIsShowActivity] = useState(true);

    return (
        <div className="space-y-6">
            <Card className="bg-[#36393f] border-none">
                <CardHeader>
                    <CardTitle className="text-white">Paramètres d&#39;activité</CardTitle>
                    <CardDescription className="text-gray-400">
                        Contrôlez quelles activités sont visibles pour les autres utilisateurs
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Activity className="h-5 w-5 text-gray-400"/>
                            <Label htmlFor="show-activity" className="text-white">
                                Afficher mon activité actuelle
                            </Label>
                        </div>
                        <Switch
                            id="show-activity"
                            checked={isShowActivity}
                            onCheckedChange={() => {
                                setIsShowActivity(!isShowActivity);
                            }}
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Music className="h-5 w-5 text-green-500"/>
                            <Label htmlFor="show-spotify" className="text-white">
                                Afficher l&#39;activité Spotify
                            </Label>
                        </div>
                        <Switch
                            id="show-spotify"
                            disabled={!isShowActivity}
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <title>YouTube</title>
                                <path
                                    d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                            </svg>
                            <Label htmlFor="show-youtube" className="text-white">
                                Afficher l&#39;activité YouTube
                            </Label>
                        </div>
                        <Switch
                            id="show-youtube"
                            disabled={!isShowActivity}
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <GamepadIcon className="h-5 w-5 text-purple-500"/>
                            <Label htmlFor="show-games" className="text-white">
                                Afficher les jeux auxquels je joue
                            </Label>
                        </div>
                        <Switch
                            id="show-games"
                            disabled={!isShowActivity}
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
