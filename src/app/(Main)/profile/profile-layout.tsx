"use client"

import {useState} from "react"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Textarea} from "@/components/ui/textarea"
import {Badge} from "@/components/ui/badge"
import {AtSign, Calendar, Edit, Flag} from "lucide-react"
import {useCurrentUserStore} from "@/contexts/userStore";
import {User} from "@/type/User"

export function ProfileLayout() {
    const [isEditing, setIsEditing] = useState(false)
    const currentUser = useCurrentUserStore((s) => s.currentUser);
    const setCurrentUser = useCurrentUserStore((s) => s.setCurrentUser);
    const [username, setUsername] = useState(currentUser?.name);
    const [about, setAbout] = useState("Passionné de technologie et de gaming. Discord enthusiast!")

    const handleSaveProfile = () => {
        ChangeName();
        setIsEditing(false)
    }

    const ChangeName = () => {
        if (username == undefined || username.trim() === "") {
            alert("Le nom d'utilisateur ne peut pas être vide.");
            return;
        }
        if(currentUser == null) return;
        currentUser.name = username;
        setCurrentUser(currentUser as User);
        setIsEditing(false);
    };

    return (
        <div className="flex flex-1 bg-[#1e1f22] text-white overflow-hidden">
            <div className="flex-1 flex flex-col bg-[#313338]">
                <div className="h-12 border-b border-[#1e1f22] shadow-sm flex items-center px-4">
                    <h2 className="font-bold text-white">Mon Profil</h2>
                </div>

                <div className="flex-1 overflow-auto p-6">
                    <div className="h-40 rounded-t-lg bg-[#5865F2]"/>

                    <div className="bg-[#2b2d31] rounded-b-lg p-6 relative">
                        <div className="absolute -top-16 left-6 border-8 border-[#2b2d31] rounded-full">
                            <Avatar className="h-32 w-32">
                                <AvatarImage src={currentUser?.avatar}/>
                                <AvatarFallback>{currentUser?.name[0]}</AvatarFallback>
                            </Avatar>
                            <div
                                className={`absolute bottom-0 right-0 h-6 w-6 rounded-full border-4 border-[#2b2d31] bg-green-500`}
                            />
                        </div>

                        <div className="mt-16 flex justify-between items-start">
                            <div>
                                <div className="flex items-center">
                                    <h1 className="text-2xl font-bold">{currentUser?.name}</h1>
                                    <span className="text-gray-400 ml-1">#{currentUser?.id}</span>
                                </div>
                                <div className="flex gap-2 mt-2">
                                    <Badge variant="secondary" className="bg-[#23a559] text-white">
                                        Online
                                    </Badge>
                                </div>
                            </div>
                            <Button
                                variant="outline"
                                className="border-gray-600 text-black hover:bg-[#3f4147] hover:text-white"
                                onClick={() => setIsEditing(!isEditing)}
                            >
                                <Edit className="h-4 w-4 mr-2"/>
                                {isEditing ? "Annuler" : "Modifier le profil"}
                            </Button>
                        </div>

                        <Tabs defaultValue="about" className="mt-6">
                            <TabsList className="">
                                <TabsTrigger value="about">À propos</TabsTrigger>
                                <TabsTrigger value="activity">Activité</TabsTrigger>
                                <TabsTrigger value="connections">Connexions</TabsTrigger>
                                <TabsTrigger value="settings">Paramètres</TabsTrigger>
                            </TabsList>

                            <TabsContent value="about" className="mt-4  ">
                                {isEditing ? (
                                    <Card className="bg-[#36393f] text-white border-none">
                                        <CardHeader>
                                            <CardTitle>Modifier votre profil</CardTitle>
                                            <CardDescription className={"text-white"}>
                                                Mettez à jour vos informations personnelles
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="username">Nom d&#39;utilisateur</Label>
                                                <Input
                                                    id="username"
                                                    value={username}
                                                    onChange={(e) => setUsername(e.target.value)}
                                                    className="bg-[#202225] border-none "
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="about">À propos de moi</Label>
                                                <Textarea
                                                    id="about"
                                                    value={about}
                                                    onChange={(e) => setAbout(e.target.value)}
                                                    className="bg-[#202225] border-none  min-h-[100px]"
                                                />
                                            </div>
                                            <div className="flex justify-end">
                                                <Button className="bg-[#5865F2] hover:bg-[#4752c4]"
                                                        onClick={handleSaveProfile}>
                                                    Enregistrer
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ) : (
                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="text-lg font-semibold mb-2">À propos de moi</h3>
                                            <p className="text-gray-300">{about}</p>
                                        </div>

                                        <div>
                                            <h3 className="text-lg font-semibold mb-2">Informations</h3>
                                            <div className="space-y-2">
                                                <div className="flex items-center">
                                                    <AtSign className="h-5 w-5 text-gray-400 mr-2"/>
                                                    <span className="text-gray-300">
                                                        {currentUser?.name}#{currentUser?.id}
                                                    </span>
                                                </div>
                                                <div className="flex items-center">
                                                    <Calendar className="h-5 w-5 text-gray-400 mr-2"/>
                                                    <span
                                                        className="text-gray-300">Membre depuis le 15 avril 2023</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <Flag className="h-5 w-5 text-gray-400 mr-2"/>
                                                    <span className="text-gray-300">Propriétaire de 1 serveur</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </TabsContent>

                            <TabsContent value="activity">
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold mb-4">Mes activités récentes</h3>
                                </div>
                            </TabsContent>

                            <TabsContent value="connections">
                                <div className="p-4 text-center text-gray-400">
                                    <p>Aucune connexion à afficher</p>
                                    <Button className="mt-4 bg-[#5865F2] hover:bg-[#4752c4]">Ajouter une
                                        connexion</Button>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    )
}
