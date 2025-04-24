"use client";

import { Member } from "@/type/Member";
import { Message } from "@/type/Message";
import { server } from "@/type/Server";
import { user } from "@/type/User";
import { createContext, useContext, useState, type ReactNode } from "react";
import users from "./user.json";

interface ServerContextType {
	servers: server[];
	currentUserId: number; // ID de l'utilisateur connecté
	currentUser: user; // Utilisateur connecté
	users: user[]; // Liste des utilisateurs disponibles
	addServer: (
		server: Omit<server, "id" | "members" | "messages" | "creatorId">
	) => void;
	addMemberToServer: (serverId: number, member: Member) => void;
	updateMemberRole: (
		serverId: number,
		memberId: number,
		role: Member["role"]
	) => void;
	getServer: (serverId: number) => server | undefined;
	addMessage: (serverId: number, content: string) => void;
	canManageRole: (currentUser: Member, targetMember: Member) => boolean;
	getUserById: (userId: number) => user | undefined;
}

// Liste des utilisateurs disponibles
const availableUsers: user[] = users as user[];

// Convertir les utilisateurs en membres pour les serveurs
const getUserAsMember = (user: user, role: Member["role"]): Member => {
	return {
		id: user.id,
		name: user.name,
		status: user.status,
		role: role,
		avatar: user.avatar || "/placeholder.svg?height=80&width=80",
	};
};

// Messages par défaut pour les serveurs
const defaultMessages: Message[] = [
	{
		id: 1,
		content: "Bienvenue sur le serveur Discord!",
		authorId: 1,
		timestamp: new Date(Date.now() - 86400000 * 2).toLocaleString(), // 2 jours avant
	},
	{
		id: 2,
		content: "N'hésitez pas à vous présenter dans ce canal.",
		authorId: 1,
		timestamp: new Date(Date.now() - 86400000 * 2 + 60000).toLocaleString(),
	},
	{
		id: 3,
		content: "Salut tout le monde! Je suis ravi de rejoindre ce serveur.",
		authorId: 3,
		timestamp: new Date(Date.now() - 86400000).toLocaleString(), // 1 jour avant
	},
	{
		id: 4,
		content: "Bienvenue! Heureux de te voir ici.",
		authorId: 2,
		timestamp: new Date(Date.now() - 86400000 + 120000).toLocaleString(),
	},
	{
		id: 5,
		content: "Quelqu'un a des recommandations de jeux à partager?",
		authorId: 4,
		timestamp: new Date(Date.now() - 3600000).toLocaleString(), // 1 heure avant
	},
];
const now = new Date();
// Créer des serveurs avec différents rôles pour l'utilisateur de test
const createTestServers = (): server[] => {
	// Serveur où l'utilisateur de test est propriétaire
	const ownerServer: server = {
		id: 1,
		name: "AI Scalability & Innovation",
		initial: "A",
		description:
			"Discussion entre leaders de l'industrie sur l'avenir des modèles d'IA, leur scalabilité et les défis éthiques à surmonter.",
		members: [
			getUserAsMember(availableUsers[0], "owner"),
			getUserAsMember(availableUsers[1], "admin"),
			getUserAsMember(availableUsers[2], "member"),
			getUserAsMember(availableUsers[3], "member"),
			getUserAsMember(availableUsers[7], "member"),
		],
		messages: [
			// 1ère session : Discussions pendant 1-10 minutes avec des espacements de 1-5 minutes
			{
				id: 4031,
				content: "Hey Elon, Mark! How's everything going?",
				authorId: 1, // Test (Utilisateur)
				timestamp: now.toISOString(),
			},
			{
				id: 9032,
				content: "Hey, things are going well. Just working on some new ideas.",
				authorId: 2, // Elon Musk
				timestamp: new Date(now.getTime() + 1000 * 60 * 2).toISOString(), // 2 minutes plus tard
			},
			{
				id: 5394,
				content:
					"I'm brainstorming a few things myself, trying to stay ahead of the curve.",
				authorId: 3, // Mark Zuckerberg
				timestamp: new Date(now.getTime() + 1000 * 60 * 4).toISOString(), // 4 minutes plus tard
			},
			{
				id: 6818,
				content:
					"Nice! I've been thinking about how to improve scalability for AI. What do you guys think?",
				authorId: 1, // Test
				timestamp: new Date(now.getTime() + 1000 * 60 * 7).toISOString(), // 7 minutes plus tard
			},
			{
				id: 7448,
				content:
					"AI scalability is huge. We're working on some new models at X.",
				authorId: 2, // Elon Musk
				timestamp: new Date(now.getTime() + 1000 * 60 * 9).toISOString(), // 9 minutes plus tard
			},
			{
				id: 3260,
				content:
					"I agree, AI models will drive the next wave of innovation. How do we keep them ethical?",
				authorId: 3, // Mark Zuckerberg
				timestamp: new Date(now.getTime() + 1000 * 60 * 10).toISOString(), // 10 minutes plus tard
			},
			{
				id: 3920,
				content:
					"Ethics are crucial. We need better regulation and transparency.",
				authorId: 1, // Test
				timestamp: new Date(now.getTime() + 1000 * 60 * 12).toISOString(), // 12 minutes plus tard
			},
			{
				id: 1521,
				content:
					"I think we should aim to build models that can explain their decisions.",
				authorId: 2, // Elon Musk
				timestamp: new Date(now.getTime() + 1000 * 60 * 15).toISOString(), // 15 minutes plus tard
			},
			{
				id: 7333,
				content: "Transparency is key. It's about building trust with users.",
				authorId: 3, // Mark Zuckerberg
				timestamp: new Date(now.getTime() + 1000 * 60 * 20).toISOString(), // 20 minutes plus tard
			},
			{
				id: 7694,
				content:
					"Agreed. So, let's discuss the next steps next week. I have some ideas on this.",
				authorId: 1, // Test
				timestamp: new Date(now.getTime() + 1000 * 60 * 25).toISOString(), // 25 minutes plus tard
			},

			// 2ème session : Discussions après quelques heures, espacées de 30 min à 1h
			{
				id: 8234,
				content:
					"Hey Mark, Elon, you still around? I was thinking about scaling AI models further.",
				authorId: 1, // Test
				timestamp: new Date(now.getTime() + 1000 * 60 * 4320).toISOString(), // 1 heure plus tard
			},
			{
				id: 6512,
				content:
					"Yeah, still here! Scaling AI requires huge computational power. What’s your plan?",
				authorId: 2, // Elon Musk
				timestamp: new Date(now.getTime() + 1000 * 60 * 4380).toISOString(), // 1 heure 10 min plus tard
			},
			{
				id: 7856,
				content:
					"I think focusing on smaller, specialized models could help reduce resource consumption. What do you think?",
				authorId: 3, // Mark Zuckerberg
				timestamp: new Date(now.getTime() + 1000 * 60 * 4500).toISOString(), // 1 heure 15 min plus tard
			},
			{
				id: 9321,
				content:
					"That’s an interesting approach, Mark. Smaller models could definitely be more efficient.",
				authorId: 1, // Test
				timestamp: new Date(now.getTime() + 1000 * 60 * 4600).toISOString(), // 1 heure 17 min plus tard
			},
			{
				id: 1125,
				content:
					"Let’s discuss how to deploy these models at scale. I’ll review some papers tonight.",
				authorId: 2, // Elon Musk
				timestamp: new Date(now.getTime() + 1000 * 60 * 4800).toISOString(), // 1 heure 20 min plus tard
			},
			{
				id: 9322,
				content:
					"Great idea. Let’s have a more detailed meeting about this next week.",
				authorId: 3, // Mark Zuckerberg
				timestamp: new Date(now.getTime() + 1000 * 60 * 5000).toISOString(), // 1 heure 23 min plus tard
			},
			{
				id: 9321,
				content: "Looking forward to it. I'll prepare a proposal by then.",
				authorId: 1, // Test
				timestamp: new Date(now.getTime() + 1000 * 60 * 5200).toISOString(), // 1 heure 27 min plus tard
			},
		],
		creatorId: 1,
	};

	// Serveur où l'utilisateur de test est administrateur
	const adminServer: server = {
		id: 2,
		name: "Tech Hub",
		initial: "T",
		description: "Discussions sur les dernières technologies",
		members: [
			getUserAsMember(availableUsers[0], "admin"),
			getUserAsMember(availableUsers[1], "owner"),
			getUserAsMember(availableUsers[5], "admin"),
			getUserAsMember(availableUsers[6], "member"),
			getUserAsMember(availableUsers[7], "member"),
		],
		messages: [
			{
				id: 1,
				content:
					"Hey everyone, great to have this chat about technology. Let's focus on the latest advancements at Nvidia, especially with their GPUs. Thoughts on the RTX 40 series?",
				authorId: 1,
				timestamp: new Date().toISOString(),
			},
			{
				id: 2,
				content:
					"Yeah, the RTX 40 series is a game changer. The architectural improvements are massive, especially with the DLSS 3.0 and frame generation. It's pushing gaming and rendering to new heights.",
				authorId: 2,
				timestamp: new Date(Date.now() + 10000).toISOString(), // 10 seconds later
			},
			{
				id: 3,
				content:
					"Absolutely, Elon. I think the impact Nvidia has on AI applications outside of just gaming is huge, especially in areas like high-performance computing and data centers.",
				authorId: 6,
				timestamp: new Date(Date.now() + 30000).toISOString(), // 30 seconds later
			},
			{
				id: 4,
				content:
					"That's right, Sandar. The GPUs are not just for gaming anymore. Nvidia's focus on AI-powered computing is revolutionizing fields like healthcare and autonomous vehicles.",
				authorId: 7,
				timestamp: new Date(Date.now() + 60000).toISOString(), // 1 minute later
			},
			{
				id: 5,
				content:
					"Exactly, and Nvidia's approach to merging hardware with software is what makes them stand out. The CUDA toolkit has opened up a whole new world for developers in scientific research and simulations.",
				authorId: 8,
				timestamp: new Date(Date.now() + 120000).toISOString(), // 2 minutes later
			},
			{
				id: 6,
				content:
					"Let's not forget about Nvidia's contributions to the automotive industry. With their Drive platform, they’re accelerating the development of self-driving technologies.",
				authorId: 2,
				timestamp: new Date(Date.now() + 180000).toISOString(), // 3 minutes later
			},
			{
				id: 7,
				content:
					"True, Elon. The Nvidia Drive platform is key to making autonomous driving a reality. It’s not just about the tech, it’s about the partnerships with car manufacturers to integrate it into real-world applications.",
				authorId: 1,
				timestamp: new Date(Date.now() + 240000).toISOString(), // 4 minutes later
			},
			{
				id: 8,
				content:
					"And Sundar, Nvidia’s role in AI infrastructure is unparalleled. They’ve made GPUs the backbone of AI development, particularly for training massive models. Their software stack has also evolved to support more complex AI workflows.",
				authorId: 6,
				timestamp: new Date(Date.now() + 300000).toISOString(), // 5 minutes later
			},
			{
				id: 9,
				content:
					"Nvidia's GPUs are definitely paving the way for the future of high-performance computing. From scientific research to content creation, they’re an essential part of the ecosystem.",
				authorId: 7,
				timestamp: new Date(Date.now() + 360000).toISOString(), // 6 minutes later
			},
			{
				id: 10,
				content:
					"I agree, Jensen. And with the continuous advancements in ray tracing and the Metaverse, Nvidia is leading the way in making virtual environments more realistic and immersive.",
				authorId: 8,
				timestamp: new Date(Date.now() + 420000).toISOString(), // 7 minutes later
			},
			{
				id: 11,
				content:
					"For sure, the future is incredibly exciting with Nvidia’s leadership in this space. Their technology is shaping industries, and it's exciting to think about where we’ll be in the next 5 years.",
				authorId: 2,
				timestamp: new Date(Date.now() + 480000).toISOString(), // 8 minutes later
			},
			{
				id: 12,
				content:
					"It’s amazing to think that the tech we’re discussing today is already being implemented in real-world use cases. We’re on the edge of some incredible breakthroughs in multiple sectors.",
				authorId: 1,
				timestamp: new Date(Date.now() + 540000).toISOString(), // 9 minutes later
			},
			{
				id: 13,
				content:
					"And as these advancements unfold, we’ll continue to see innovation not only in gaming and AI but also in sectors like robotics, medical imaging, and climate modeling.",
				authorId: 6,
				timestamp: new Date(Date.now() + 600000).toISOString(), // 10 minutes later
			},
			{
				id: 14,
				content:
					"Exactly, Sundar. The applications are endless, and with Nvidia at the helm, we’re definitely heading toward a future where technology serves even broader societal needs.",
				authorId: 8,
				timestamp: new Date(Date.now() + 660000).toISOString(), // 11 minutes later
			},
			{
				id: 15,
				content:
					"Alright, I think we’ve covered the big topics. I’m excited to see what’s coming next from Nvidia. Let’s catch up again soon and discuss the next big tech revolution.",
				authorId: 2,
				timestamp: new Date(Date.now() + 720000).toISOString(), // 12 minutes later
			},
		],
		creatorId: 2,
	};

	// Serveur où l'utilisateur de test est membre
	const memberServer: server = {
		id: 3,
		name: "AI Revolution",
		initial: "A",
		description: "Tout sur l'intelligence artificielle",
		members: [
			getUserAsMember(availableUsers[0], "member"),
			getUserAsMember(availableUsers[7], "owner"),
			getUserAsMember(availableUsers[1], "admin"),
			getUserAsMember(availableUsers[3], "member"),
			getUserAsMember(availableUsers[5], "member"),
		],
		messages: [
			{
				id: 1,
				content:
					"So, I’ve been thinking about ChatGPT lately. I’ve been hearing a lot about its capabilities, but also about how much power it requires. Anyone else notice how much the CPUs heat up when running such models?",
				authorId: 2, // Elon Musk
				timestamp: new Date().toISOString(),
			},
			{
				id: 6,
				content:
					"Yeah, that's true. The processing required to run models like ChatGPT puts a significant load on the CPU, especially with the massive scale of the computations. But it’s not just the CPUs – the GPUs are taking a huge hit too.",
				authorId: 6, // Sundar Pichai
				timestamp: new Date(Date.now() + 5000).toISOString(), // 5 seconds later
			},
			{
				id: 4,
				content:
					"Definitely. When you think about how complex these neural networks are, it makes sense that they generate a lot of heat. It's one of the reasons Nvidia's GPUs have been so popular – they handle parallel processing much better than standard CPUs.",
				authorId: 4, // Satya Nadella
				timestamp: new Date(Date.now() + 12000).toISOString(), // 12 seconds later
			},
			{
				id: 1,
				content:
					"Right, Satya. But the challenge remains in cooling. It's getting harder to balance power efficiency with the demand for processing power. Imagine having to deal with those cooling systems in data centers running ChatGPT at full scale.",
				authorId: 1, // Ryan
				timestamp: new Date(Date.now() + 25000).toISOString(), // 25 seconds later
			},
			{
				id: 8,
				content:
					"The cooling aspect is key. I know from personal experience that building systems that can scale while maintaining temperature control is a major hurdle. We're looking at new ways to integrate liquid cooling, especially in systems running AI models like ChatGPT.",
				authorId: 8, // Sam Altman
				timestamp: new Date(Date.now() + 35000).toISOString(), // 35 seconds later
			},
			{
				id: 2,
				content:
					"Exactly. The power consumption alone can be crazy. A single model running at full scale can draw a lot of electricity. It's one of the things I think about when we consider the sustainability of such systems. We need better, more efficient hardware.",
				authorId: 2, // Elon Musk
				timestamp: new Date(Date.now() + 47000).toISOString(), // 47 seconds later
			},
			{
				id: 6,
				content:
					"And it's not just about performance; it's about cooling the performance, like you said. The whole architecture of these chips needs to evolve to not just be faster, but also better at managing heat while maintaining peak efficiency.",
				authorId: 6, // Sundar Pichai
				timestamp: new Date(Date.now() + 60000).toISOString(), // 1 minute later
			},
			{
				id: 4,
				content:
					"Exactly. AI models like ChatGPT are pushing the limits of current hardware, and this requires an entirely new approach to chip design. We've been exploring ways to optimize chips for specific AI workloads, but we need something revolutionary to keep up.",
				authorId: 4, // Satya Nadella
				timestamp: new Date(Date.now() + 70000).toISOString(), // 1 minute later
			},
			{
				id: 1,
				content:
					"The future of these models relies on how we innovate the hardware around them. More energy-efficient GPUs, better cooling techniques, and integration of AI hardware optimized for specific tasks could change the game.",
				authorId: 1, // Ryan
				timestamp: new Date(Date.now() + 80000).toISOString(), // 1 minute later
			},
			{
				id: 8,
				content:
					"It’s also a matter of working with manufacturers to ensure that these innovations are scalable. We can't just innovate on the hardware side; we need to think about infrastructure too, making sure we can build these systems affordably at scale.",
				authorId: 8, // Sam Altman
				timestamp: new Date(Date.now() + 95000).toISOString(), // 1 minute 35 seconds later
			},
			{
				id: 2,
				content:
					"Definitely. And as we push for more AI-powered systems like ChatGPT, we'll need a more sustainable energy model to keep them running. I think this is where companies like Tesla and others can really help lead the way with green energy solutions for data centers.",
				authorId: 2, // Elon Musk
				timestamp: new Date(Date.now() + 110000).toISOString(), // 2 minutes later
			},
			{
				id: 6,
				content:
					"Agreed. Sustainability and green energy are going to be critical. But we can't just rely on energy efficiency alone – we also need to ensure that the entire lifecycle of the hardware is sustainable. From sourcing materials to disposal, the whole process matters.",
				authorId: 6, // Sundar Pichai
				timestamp: new Date(Date.now() + 120000).toISOString(), // 2 minutes later
			},
			{
				id: 4,
				content:
					"It’s about creating a circular economy for AI hardware. Recycling, reusing, and rethinking how we build these systems could make a huge difference in the long term.",
				authorId: 4, // Satya Nadella
				timestamp: new Date(Date.now() + 130000).toISOString(), // 2 minutes later
			},
			{
				id: 1,
				content:
					"That’s a very important point. We need to make sure that as we advance technologically, we’re also advancing responsibly. This includes making sure that our energy use, hardware production, and disposal processes all align with sustainability goals.",
				authorId: 1, // Ryan
				timestamp: new Date(Date.now() + 140000).toISOString(), // 2 minutes later
			},
		],
		creatorId: 8,
	};

	// Serveur supplémentaire
	const extraServer: server = {
		id: 4,
		name: "Gaming Zone",
		initial: "G",
		description: "Pour les passionnés de jeux vidéo",
		members: [
			getUserAsMember(availableUsers[0], "admin"),
			getUserAsMember(availableUsers[2], "owner"),
			getUserAsMember(availableUsers[4], "member"),
			getUserAsMember(availableUsers[6], "member"),
		],
		messages: [],
		creatorId: 3,
	};

	return [ownerServer, adminServer, memberServer, extraServer];
};

const ServerContext = createContext<ServerContextType | undefined>(undefined);

export function ServerProvider({ children }: { children: ReactNode }) {
	const [servers, setServers] = useState<server[]>(createTestServers());

	// ID de l'utilisateur connecté (utilisateur de test)
	const currentUserId = 1;
	const currentUser = availableUsers.find((user) => user.id === currentUserId)!;

	const addServer = (
		newServer: Omit<server, "id" | "members" | "messages" | "creatorId">
	) => {
		const newId = Math.max(...servers.map((s) => s.id)) + 1;
		// Ajouter le créateur comme propriétaire du serveur
		const initialMember: Member = {
			id: currentUserId,
			name: currentUser.name,
			status: currentUser.status,
			role: "owner",
			avatar: currentUser.avatar || "/placeholder.svg?height=80&width=80",
		};

		setServers([
			...servers,
			{
				...newServer,
				id: newId,
				members: [initialMember],
				messages: [],
				creatorId: currentUserId,
			},
		]);
	};

	const addMemberToServer = (serverId: number, member: Member) => {
		setServers(
			servers.map((server) => {
				if (server.id === serverId) {
					// Vérifier si le membre existe déjà
					const memberExists = server.members.some((m) => m.id === member.id);
					if (memberExists) return server;

					return {
						...server,
						members: [...server.members, member],
					};
				}
				return server;
			})
		);
	};

	// Fonction pour vérifier si un utilisateur peut gérer le rôle d'un autre
	const canManageRole = (currentUser: Member, targetMember: Member) => {
		// Un membre normal ne peut pas modifier les rôles
		if (currentUser.role === "member") return false;

		// Un admin ne peut pas modifier un owner
		if (currentUser.role === "admin" && targetMember.role === "owner")
			return false;

		// Un owner peut tout modifier
		if (currentUser.role === "owner") return true;

		// Un admin peut modifier un membre ou un autre admin
		return currentUser.role === "admin" && targetMember.role !== "owner";
	};

	const updateMemberRole = (
		serverId: number,
		memberId: number,
		role: Member["role"]
	) => {
		setServers(
			servers.map((server) => {
				if (server.id === serverId) {
					// Trouver l'utilisateur actuel et le membre cible
					const currentUserMember = server.members.find(
						(m) => m.id === currentUserId
					);
					const targetMember = server.members.find((m) => m.id === memberId);

					// Si l'un des deux n'existe pas, ne rien faire
					if (!currentUserMember || !targetMember) return server;

					// Vérifier les permissions
					if (!canManageRole(currentUserMember, targetMember)) return server;

					return {
						...server,
						members: server.members.map((member) =>
							member.id === memberId ? { ...member, role } : member
						),
					};
				}
				return server;
			})
		);
	};

	const getServer = (serverId: number) => {
		return servers.find((server) => server.id === serverId);
	};

	const getUserById = (userId: number) => {
		return availableUsers.find((user) => user.id === userId);
	};

	const addMessage = (serverId: number, content: string) => {
		setServers(
			servers.map((server) => {
				if (server.id === serverId) {
					const newMessageId =
						server.messages.length > 0
							? Math.max(...server.messages.map((m) => m.id)) + 1
							: 1;

					const newMessage: Message = {
						id: newMessageId,
						content,
						authorId: currentUserId,
						timestamp: new Date().toLocaleString(),
					};

					return {
						...server,
						messages: [...server.messages, newMessage],
					};
				}
				return server;
			})
		);
	};

	return (
		<ServerContext.Provider
			value={{
				servers,
				currentUserId,
				currentUser,
				users: availableUsers,
				addServer,
				addMemberToServer,
				updateMemberRole,
				getServer,
				addMessage,
				canManageRole,
				getUserById,
			}}>
			{children}
		</ServerContext.Provider>
	);
}

export function useServers() {
	const context = useContext(ServerContext);
	if (context === undefined) {
		throw new Error("useServers must be used within a ServerProvider");
	}
	return context;
}
