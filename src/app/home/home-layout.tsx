import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SalonSidebar } from "./salon-sidebar";

export function HomeLayout() {
	return (
		<div className="flex h-screen bg-[#1e1f22] text-white overflow-hidden">
			<SalonSidebar activePage="home" />
			<div className="flex-1 flex flex-col items-center justify-center bg-[#313338] p-6">
				<div className="max-w-2xl text-center">
					<div className="flex justify-center mb-6">
						<Image
							src="/Logo-transpa-white-without.png"
							alt="DiscHard"
							width={96}
							height={96}
						/>
					</div>
					<h1 className="text-4xl font-bold mb-4">Bienvenue sur DiscHard</h1>
					<p className="text-gray-300 text-lg mb-8">
						Un endroit où vous pouvez discuter, partager et vous connecter avec
						vos amis et communautés
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Link href="/direct-messages">
							<Button className="bg-[#5865f2] hover:bg-[#4752c4] text-white px-6 py-6 rounded-md flex items-center gap-2">
								Messages Directs
								<ArrowRight className="h-5 w-5" />
							</Button>
						</Link>
						<Link href="/servers/1">
							<Button className="bg-[#23a559] hover:bg-[#1e9150] text-white px-6 py-6 rounded-md flex items-center gap-2">
								Explorer les Salons
								<ArrowRight className="h-5 w-5" />
							</Button>
						</Link>
					</div>
					<div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
						<div className="bg-[#2b2d31] p-4 rounded-lg">
							<h3 className="font-bold text-xl mb-2">Communautés</h3>
							<p className="text-gray-400">
								Rejoignez des salons et connectez-vous avec des personnes
								partageant les mêmes intérêts
							</p>
						</div>
						<div className="bg-[#2b2d31] p-4 rounded-lg">
							<h3 className="font-bold text-xl mb-2">Discussions</h3>
							<p className="text-gray-400">
								Chattez en privé ou en groupe avec vos amis et collègues
							</p>
						</div>
						<div className="bg-[#2b2d31] p-4 rounded-lg">
							<h3 className="font-bold text-xl mb-2">Personnalisation</h3>
							<p className="text-gray-400">
								Créez et personnalisez vos propres serveurs selon vos besoins
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
