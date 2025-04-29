import fs from "fs";
import { readFile } from "fs/promises";

const now = new Date();

const getMemberWithUserId = (id, members) => {
	if (!members) {
		return createMemberFromUserId(id);
	}
	const find = members.find((member) => member.user?.id === id);
	if (!find) {
		throw new Error("Member not found");
	}
	return find;
};

export const getUserAsMember = (user, role) => {
	return {
		id: user.id,
		alias: user.name,
		user: user,
		role: role,
	};
};

const json = await readFile("./user.json", "utf-8");
const users = JSON.parse(json);

const availableUsers = users;

const createTestServers = () => {
	// Serveur où l'utilisateur de test est propriétaire
	const ownerServerMembers = [
		getUserAsMember(availableUsers[0], "owner"),
		getUserAsMember(availableUsers[1], "admin"),
		getUserAsMember(availableUsers[2], "member"),
		getUserAsMember(availableUsers[3], "member"),
		getUserAsMember(availableUsers[7], "member"),
	];
	const ownerServer = {
		id: 1,
		name: "AI Scalability & Innovation",
		description:
			"Discussion entre leaders de l'industrie sur l'avenir des modèles d'IA, leur scalabilité et les défis éthiques à surmonter.",
		members: ownerServerMembers,
		messages: [
			// 1ère session - Discussions initiales
			{
				id: 4031,
				textContent: "Hey Elon, Mark! How's everything going?",
				author: getMemberWithUserId(1, ownerServerMembers), // Test (Utilisateur)
				timestamp: new Date("2025-04-25T08:00:00Z").toISOString(), // Premier message
			},
			{
				id: 9032,
				textContent:
					"Hey, things are going well. Just working on some new ideas.",
				author: getMemberWithUserId(2, ownerServerMembers), // Elon Musk
				timestamp: new Date("2025-04-25T08:02:00Z").toISOString(), // 2 minutes plus tard
			},
			{
				id: 5394,
				textContent:
					"I'm brainstorming a few things myself, trying to stay ahead of the curve.",
				author: getMemberWithUserId(3, ownerServerMembers), // Mark Zuckerberg
				timestamp: new Date("2025-04-25T08:06:00Z").toISOString(), // 4 minutes plus tard
			},
			{
				id: 6818,
				textContent:
					"Nice! I've been thinking about how to improve scalability for AI. What do you guys think?",
				author: getMemberWithUserId(1, ownerServerMembers), // Test
				timestamp: new Date("2025-04-25T08:13:00Z").toISOString(), // 7 minutes plus tard
			},

			// 2ème session - Discussions après une pause
			{
				id: 7448,
				textContent:
					"AI scalability is huge. We're working on some new models at X.",
				author: getMemberWithUserId(2, ownerServerMembers), // Elon Musk
				timestamp: new Date("2025-04-25T08:30:00Z").toISOString(), // 17 minutes plus tard
			},
			{
				id: 3260,
				textContent:
					"I agree, AI models will drive the next wave of innovation. How do we keep them ethical?",
				author: getMemberWithUserId(3, ownerServerMembers), // Mark Zuckerberg
				timestamp: new Date("2025-04-25T08:35:00Z").toISOString(), // 5 minutes plus tard
			},
			{
				id: 3920,
				textContent:
					"Ethics are crucial. We need better regulation and transparency.",
				author: getMemberWithUserId(1, ownerServerMembers), // Test
				timestamp: new Date("2025-04-25T08:42:00Z").toISOString(), // 7 minutes plus tard
			},

			// 3ème session - Discussion après plusieurs heures
			{
				id: 1521,
				textContent:
					"I think we should aim to build models that can explain their decisions.",
				author: getMemberWithUserId(2, ownerServerMembers), // Elon Musk
				timestamp: new Date("2025-04-25T12:00:00Z").toISOString(), // 3h30 plus tard
			},
			{
				id: 7333,
				textContent:
					"Transparency is key. It's about building trust with users.",
				author: getMemberWithUserId(3, ownerServerMembers), // Mark Zuckerberg
				timestamp: new Date("2025-04-25T12:10:00Z").toISOString(), // 10 minutes plus tard
			},

			// 4ème session - Discussion finale avec des idées concrètes
			{
				id: 7694,
				textContent:
					"Agreed. So, let's discuss the next steps next week. I have some ideas on this.",
				author: getMemberWithUserId(1, ownerServerMembers), // Test
				timestamp: new Date("2025-04-25T12:25:00Z").toISOString(), // 15 minutes plus tard
			},
			{
				id: 8234,
				textContent: "Looking forward to it. I'll prepare a proposal by then.",
				author: getMemberWithUserId(2, ownerServerMembers), // Elon Musk
				timestamp: new Date("2025-04-25T12:30:00Z").toISOString(),
			},
			{
				id: 6512,
				textContent:
					"Great! Let's make sure to address scalability and ethical considerations together.",
				author: getMemberWithUserId(3, ownerServerMembers), // Mark Zuckerberg
				timestamp: new Date("2025-04-25T12:35:00Z").toISOString(),
			},
		],
	};

	// Serveur où l'utilisateur de test est administrateur
	const adminServerMembers = [
		getUserAsMember(availableUsers[0], "admin"),
		getUserAsMember(availableUsers[1], "owner"),
		getUserAsMember(availableUsers[5], "admin"),
		getUserAsMember(availableUsers[6], "member"),
		getUserAsMember(availableUsers[7], "member"),
	];
	const adminServer = {
		id: 2,
		name: "Tech Hub",
		description: "Discussions sur les dernières technologies",
		members: adminServerMembers,
		messages: [
			{
				id: 1,
				textContent:
					"Hey everyone, great to have this chat about technology. Let's focus on the latest advancements at Nvidia, especially with their GPUs. Thoughts on the RTX 40 series?",
				author: getMemberWithUserId(1, adminServerMembers),
				timestamp: new Date().toISOString(),
			},
			{
				id: 2,
				textContent:
					"Yeah, the RTX 40 series is a game changer. The architectural improvements are massive, especially with the DLSS 3.0 and frame generation. It's pushing gaming and rendering to new heights.",
				author: getMemberWithUserId(2, adminServerMembers),
				timestamp: new Date(Date.now() + 10000).toISOString(), // 10 seconds later
			},
			{
				id: 3,
				textContent:
					"Absolutely, Elon. I think the impact Nvidia has on AI applications outside of just gaming is huge, especially in areas like high-performance computing and data centers.",
				author: getMemberWithUserId(6, adminServerMembers),
				timestamp: new Date(Date.now() + 30000).toISOString(), // 30 seconds later
			},
			{
				id: 4,
				textContent:
					"That's right, Sandar. The GPUs are not just for gaming anymore. Nvidia's focus on AI-powered computing is revolutionizing fields like healthcare and autonomous vehicles.",
				author: getMemberWithUserId(7, adminServerMembers),
				timestamp: new Date(Date.now() + 60000).toISOString(), // 1 minute later
			},
			{
				id: 5,
				textContent:
					"Exactly, and Nvidia's approach to merging hardware with software is what makes them stand out. The CUDA toolkit has opened up a whole new world for developers in scientific research and simulations.",
				author: getMemberWithUserId(8, adminServerMembers),
				timestamp: new Date(Date.now() + 120000).toISOString(), // 2 minutes later
			},
			{
				id: 6,
				textContent:
					"Let's not forget about Nvidia's contributions to the automotive industry. With their Drive platform, they’re accelerating the development of self-driving technologies.",
				author: getMemberWithUserId(2, adminServerMembers),
				timestamp: new Date(Date.now() + 180000).toISOString(), // 3 minutes later
			},
			{
				id: 7,
				textContent:
					"True, Elon. The Nvidia Drive platform is key to making autonomous driving a reality. It’s not just about the tech, it’s about the partnerships with car manufacturers to integrate it into real-world applications.",
				author: getMemberWithUserId(1, adminServerMembers),
				timestamp: new Date(Date.now() + 240000).toISOString(), // 4 minutes later
			},
			{
				id: 8,
				textContent:
					"And Sundar, Nvidia’s role in AI infrastructure is unparalleled. They’ve made GPUs the backbone of AI development, particularly for training massive models. Their software stack has also evolved to support more complex AI workflows.",
				author: getMemberWithUserId(6, adminServerMembers),
				timestamp: new Date(Date.now() + 300000).toISOString(), // 5 minutes later
			},
			{
				id: 9,
				textContent:
					"Nvidia's GPUs are definitely paving the way for the future of high-performance computing. From scientific research to content creation, they’re an essential part of the ecosystem.",
				author: getMemberWithUserId(7, adminServerMembers),
				timestamp: new Date(Date.now() + 360000).toISOString(), // 6 minutes later
			},
			{
				id: 10,
				textContent:
					"I agree, Jensen. And with the continuous advancements in ray tracing and the Metaverse, Nvidia is leading the way in making virtual environments more realistic and immersive.",
				author: getMemberWithUserId(8, adminServerMembers),
				timestamp: new Date(Date.now() + 420000).toISOString(), // 7 minutes later
			},
			{
				id: 11,
				textContent:
					"For sure, the future is incredibly exciting with Nvidia’s leadership in this space. Their technology is shaping industries, and it's exciting to think about where we’ll be in the next 5 years.",
				author: getMemberWithUserId(2, adminServerMembers),
				timestamp: new Date(Date.now() + 480000).toISOString(), // 8 minutes later
			},
			{
				id: 12,
				textContent:
					"It’s amazing to think that the tech we’re discussing today is already being implemented in real-world use cases. We’re on the edge of some incredible breakthroughs in multiple sectors.",
				author: getMemberWithUserId(1, adminServerMembers),
				timestamp: new Date(Date.now() + 540000).toISOString(), // 9 minutes later
			},
			{
				id: 13,
				textContent:
					"And as these advancements unfold, we’ll continue to see innovation not only in gaming and AI but also in sectors like robotics, medical imaging, and climate modeling.",
				author: getMemberWithUserId(6, adminServerMembers),
				timestamp: new Date(Date.now() + 600000).toISOString(), // 10 minutes later
			},
			{
				id: 14,
				textContent:
					"Exactly, Sundar. The applications are endless, and with Nvidia at the helm, we’re definitely heading toward a future where technology serves even broader societal needs.",
				author: getMemberWithUserId(8, adminServerMembers),
				timestamp: new Date(Date.now() + 660000).toISOString(), // 11 minutes later
			},
			{
				id: 15,
				textContent:
					"Alright, I think we’ve covered the big topics. I’m excited to see what’s coming next from Nvidia. Let’s catch up again soon and discuss the next big tech revolution.",
				author: getMemberWithUserId(2, adminServerMembers),
				timestamp: new Date(Date.now() + 720000).toISOString(), // 12 minutes later
			},
		],
	};

	// Serveur où l'utilisateur de test est membre
	const memberServerMembers = [
		getUserAsMember(availableUsers[0], "member"),
		getUserAsMember(availableUsers[7], "owner"),
		getUserAsMember(availableUsers[1], "admin"),
		getUserAsMember(availableUsers[3], "member"),
		getUserAsMember(availableUsers[5], "member"),
	];
	const memberServer = {
		id: 3,
		name: "AI Revolution",
		description: "Tout sur l'intelligence artificielle",
		members: memberServerMembers,
		messages: [
			{
				id: 1,
				textContent:
					"So, I’ve been thinking about ChatGPT lately. I’ve been hearing a lot about its capabilities, but also about how much power it requires. Anyone else notice how much the CPUs heat up when running such models?",
				author: getMemberWithUserId(2, memberServerMembers), // Elon Musk
				timestamp: new Date().toISOString(),
			},
			{
				id: 6,
				textContent:
					"Yeah, that's true. The processing required to run models like ChatGPT puts a significant load on the CPU, especially with the massive scale of the computations. But it’s not just the CPUs – the GPUs are taking a huge hit too.",
				author: getMemberWithUserId(6, memberServerMembers), // Sundar Pichai
				timestamp: new Date(Date.now() + 5000).toISOString(), // 5 seconds later
			},
			{
				id: 4,
				textContent:
					"Definitely. When you think about how complex these neural networks are, it makes sense that they generate a lot of heat. It's one of the reasons Nvidia's GPUs have been so popular – they handle parallel processing much better than standard CPUs.",
				author: getMemberWithUserId(4, memberServerMembers), // Satya Nadella
				timestamp: new Date(Date.now() + 12000).toISOString(), // 12 seconds later
			},
			{
				id: 1,
				textContent:
					"Right, Satya. But the challenge remains in cooling. It's getting harder to balance power efficiency with the demand for processing power. Imagine having to deal with those cooling systems in data centers running ChatGPT at full scale.",
				author: getMemberWithUserId(1, memberServerMembers), // Ryan
				timestamp: new Date(Date.now() + 25000).toISOString(), // 25 seconds later
			},
			{
				id: 8,
				textContent:
					"The cooling aspect is key. I know from personal experience that building systems that can scale while maintaining temperature control is a major hurdle. We're looking at new ways to integrate liquid cooling, especially in systems running AI models like ChatGPT.",
				author: getMemberWithUserId(8, memberServerMembers), // Sam Altman
				timestamp: new Date(Date.now() + 35000).toISOString(), // 35 seconds later
			},
			{
				id: 2,
				textContent:
					"Exactly. The power consumption alone can be crazy. A single model running at full scale can draw a lot of electricity. It's one of the things I think about when we consider the sustainability of such systems. We need better, more efficient hardware.",
				author: getMemberWithUserId(2, memberServerMembers), // Elon Musk
				timestamp: new Date(Date.now() + 47000).toISOString(), // 47 seconds later
			},
			{
				id: 6,
				textContent:
					"And it's not just about performance; it's about cooling the performance, like you said. The whole architecture of these chips needs to evolve to not just be faster, but also better at managing heat while maintaining peak efficiency.",
				author: getMemberWithUserId(6, memberServerMembers), // Sundar Pichai
				timestamp: new Date(Date.now() + 60000).toISOString(), // 1 minute later
			},
			{
				id: 4,
				textContent:
					"Exactly. AI models like ChatGPT are pushing the limits of current hardware, and this requires an entirely new approach to chip design. We've been exploring ways to optimize chips for specific AI workloads, but we need something revolutionary to keep up.",
				author: getMemberWithUserId(4, memberServerMembers), // Satya Nadella
				timestamp: new Date(Date.now() + 70000).toISOString(), // 1 minute later
			},
			{
				id: 1,
				textContent:
					"The future of these models relies on how we innovate the hardware around them. More energy-efficient GPUs, better cooling techniques, and integration of AI hardware optimized for specific tasks could change the game.",
				author: getMemberWithUserId(1, memberServerMembers), // Ryan
				timestamp: new Date(Date.now() + 80000).toISOString(), // 1 minute later
			},
			{
				id: 8,
				textContent:
					"It’s also a matter of working with manufacturers to ensure that these innovations are scalable. We can't just innovate on the hardware side; we need to think about infrastructure too, making sure we can build these systems affordably at scale.",
				author: getMemberWithUserId(8, memberServerMembers), // Sam Altman
				timestamp: new Date(Date.now() + 95000).toISOString(), // 1 minute 35 seconds later
			},
			{
				id: 2,
				textContent:
					"Definitely. And as we push for more AI-powered systems like ChatGPT, we'll need a more sustainable energy model to keep them running. I think this is where companies like Tesla and others can really help lead the way with green energy solutions for data centers.",
				author: getMemberWithUserId(2, memberServerMembers), // Elon Musk
				timestamp: new Date(Date.now() + 110000).toISOString(), // 2 minutes later
			},
			{
				id: 6,
				textContent:
					"Agreed. Sustainability and green energy are going to be critical. But we can't just rely on energy efficiency alone – we also need to ensure that the entire lifecycle of the hardware is sustainable. From sourcing materials to disposal, the whole process matters.",
				author: getMemberWithUserId(6, memberServerMembers), // Sundar Pichai
				timestamp: new Date(Date.now() + 120000).toISOString(), // 2 minutes later
			},
			{
				id: 4,
				textContent:
					"It’s about creating a circular economy for AI hardware. Recycling, reusing, and rethinking how we build these systems could make a huge difference in the long term.",
				author: getMemberWithUserId(4, memberServerMembers), // Satya Nadella
				timestamp: new Date(Date.now() + 130000).toISOString(), // 2 minutes later
			},
			{
				id: 1,
				textContent:
					"That’s a very important point. We need to make sure that as we advance technologically, we’re also advancing responsibly. This includes making sure that our energy use, hardware production, and disposal processes all align with sustainability goals.",
				author: getMemberWithUserId(1, memberServerMembers), // Ryan
				timestamp: new Date(Date.now() + 140000).toISOString(), // 2 minutes later
			},
		],
	};

	// Serveur supplémentaire
	const extraServer = {
		id: 4,
		name: "Gaming Zone",
		description: "Pour les passionnés de jeux vidéo",
		members: [
			getUserAsMember(availableUsers[0], "admin"),
			getUserAsMember(availableUsers[2], "owner"),
			getUserAsMember(availableUsers[4], "member"),
			getUserAsMember(availableUsers[6], "member"),
		],
		messages: [],
	};

	return [ownerServer, adminServer, memberServer, extraServer];
};

// Sauvegarder le fichier JSON dans un fichier local
function saveJsonToFile() {
	const serverJson = createTestServers();
	fs.writeFileSync("serverData.json", JSON.stringify(serverJson, null, 2));
	console.log("JSON saved to serverData.json");
}

saveJsonToFile();
