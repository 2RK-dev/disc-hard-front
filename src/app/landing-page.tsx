import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function LandingPage() {
	return (
		<div className="min-h-screen bg-[#404EED] text-white">
			{/* Navigation */}
			<nav className="container mx-auto px-6 py-4 flex items-center justify-between">
				<div className="flex items-center">
					<Image
						src={"/Logo-transpa-white.png"}
						alt="DiscHard"
						width={40}
						height={40}
					/>

					<span className="ml-2 text-xl font-bold">DiscHard</span>
				</div>
				<div className="hidden md:flex space-x-6">
					<a href="#" className="hover:underline">
						Télécharger
					</a>
					<a href="#" className="hover:underline">
						Découvrir
					</a>
					<a href="#" className="hover:underline">
						Sécurité
					</a>
					<a href="#" className="hover:underline">
						Support
					</a>
				</div>
				<Link href="/login">
					<Button className="bg-white text-black hover:bg-gray-200 rounded-full px-4">
						Se connecter
					</Button>
				</Link>
			</nav>

			{/* Hero Section */}
			<div className="container mx-auto px-6 py-16 md:py-24 text-center">
				<h1 className="text-4xl md:text-6xl font-bold mb-6">
					IMAGINE UN ENDROIT...
				</h1>
				<p className="text-lg md:text-xl max-w-3xl mx-auto mb-8">
					...où vous pouvez rejoindre un club scolaire, un groupe de gamers, ou
					une communauté d'art mondiale. Un endroit où vous pouvez simplement
					passer du temps avec vos amis. Un endroit qui rend facile de parler
					tous les jours et de se retrouver plus souvent.
				</p>
				<div className="flex flex-col md:flex-row justify-center gap-4">
					<Link href="/register">
						<Button className="bg-white text-black hover:bg-gray-200 rounded-full px-8 py-6 text-lg">
							S'inscrire
						</Button>
					</Link>
					<Link href="/login">
						<Button className="bg-[#23272A] hover:bg-[#36393f] rounded-full px-8 py-6 text-lg">
							Se connecter
						</Button>
					</Link>
				</div>
			</div>

			{/* Features Section */}
			<div className="bg-white text-black py-16">
				<div className="container mx-auto px-6">
					<div className="flex flex-col md:flex-row items-center mb-20">
						<div className="md:w-1/2 mb-8 md:mb-0">
							<Image
								src="/Salon.png"
								alt="DisHard chat"
								className="rounded-lg"
								width={500}
								height={300}
							/>
						</div>
						<div className="md:w-1/2 md:pl-12">
							<h2 className="text-3xl font-bold mb-4">
								Créez un espace où vous vous sentez chez vous
							</h2>
							<p className="text-lg text-gray-700">
								Rejoignez ou façonnez des espaces dédiés à vos envies :
								entraide, discussions détendues, projets collectifs ou simples
								moments de partage. Ici, vous avancez à votre rythme, entouré de
								personnes qui comptent, dans un lieu où vous vous sentez bien.
							</p>
						</div>
					</div>

					<div className="flex flex-col md:flex-row-reverse items-center mb-20">
						<div className="md:w-1/2 mb-8 md:mb-0">
							<Image
								src="/Chill-Illustration.png"
								alt="Just Chill"
								className="rounded-lg"
								width={500}
								height={300}
							/>
						</div>
						<div className="md:w-1/2 md:pr-12">
							<h2 className="text-3xl font-bold mb-4">Où traîner est facile</h2>
							<p className="text-lg text-gray-700">
								Sur DiscHard, vous pouvez profiter d’un espace relax pour
								discuter, rigoler et décompresser. Mais si l’inspiration frappe
								ou que le travail s’invite, c’est aussi le lieu idéal pour
								collaborer et faire avancer vos projets, sans stress, juste à
								votre rythme.
							</p>
						</div>
					</div>

					<div className="flex flex-col md:flex-row items-center">
						<div className="md:w-1/2 mb-8 md:mb-0">
							<Image
								src="/Community.png"
								alt="DiscHard Community"
								className="rounded-lg"
								width={500}
								height={300}
							/>
						</div>
						<div className="md:w-1/2 md:pl-12">
							<h2 className="text-3xl font-bold mb-4">
								De quelques personnes à une communauté
							</h2>
							<p className="text-lg text-gray-700">
								Au début, c’est juste quelques têtes qui se croisent. Puis,
								petit à petit, ça devient une team qui se capte pour échanger,
								rigoler, et bosser ensemble. Sur DiscHard, vous n’êtes jamais
								seuls, même quand vous êtes en mode chill. Un projet ici, une
								idée là, et voilà, la communauté grandit naturellement. C’est
								simple, c’est fun, et ça fonctionne.
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* CTA Section */}
			<div className="bg-[#F6F6F6] text-black py-16 text-center">
				<div className="container mx-auto px-6">
					<h2 className="text-3xl md:text-4xl font-bold mb-6">
						Prêt à commencer votre aventure?
					</h2>
					<Link href="/register">
						<Button className="bg-[#5865F2] hover:bg-[#4752c4] text-white rounded-full px-8 py-6 text-lg">
							S'inscrire maintenant <ArrowRight className="ml-2 h-5 w-5" />
						</Button>
					</Link>
				</div>
			</div>

			{/* Footer */}
			<footer className="bg-[#23272A] text-white py-12">
				<div className="container mx-auto px-6">
					<div className="flex flex-col md:flex-row justify-between">
						<div className="mb-8 md:mb-0">
							<h3 className="text-[#5865F2] text-2xl font-bold mb-4">
								IMAGINE UN ENDROIT
							</h3>
							<div className="flex space-x-4">
								<a href="#" className="text-white hover:text-[#5865F2]">
									<span className="sr-only">Twitter</span>
									<svg
										className="h-6 w-6"
										fill="currentColor"
										viewBox="0 0 24 24"
										aria-hidden="true">
										<path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
									</svg>
								</a>
								<a href="#" className="text-white hover:text-[#5865F2]">
									<span className="sr-only">Instagram</span>
									<svg
										className="h-6 w-6"
										fill="currentColor"
										viewBox="0 0 24 24"
										aria-hidden="true">
										<path
											fillRule="evenodd"
											d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
											clipRule="evenodd"
										/>
									</svg>
								</a>
								<a href="#" className="text-white hover:text-[#5865F2]">
									<span className="sr-only">Facebook</span>
									<svg
										className="h-6 w-6"
										fill="currentColor"
										viewBox="0 0 24 24"
										aria-hidden="true">
										<path
											fillRule="evenodd"
											d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
											clipRule="evenodd"
										/>
									</svg>
								</a>
								<a href="#" className="text-white hover:text-[#5865F2]">
									<span className="sr-only">YouTube</span>
									<svg
										className="h-6 w-6"
										fill="currentColor"
										viewBox="0 0 24 24"
										aria-hidden="true">
										<path
											fillRule="evenodd"
											d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
											clipRule="evenodd"
										/>
									</svg>
								</a>
							</div>
						</div>
						<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
							<div>
								<h4 className="text-[#5865F2] font-semibold mb-4">Produit</h4>
								<ul className="space-y-2">
									<li>
										<a href="#" className="hover:underline">
											Télécharger
										</a>
									</li>
									<li>
										<a href="#" className="hover:underline">
											Status
										</a>
									</li>
								</ul>
							</div>
							<div>
								<h4 className="text-[#5865F2] font-semibold mb-4">
									Entreprise
								</h4>
								<ul className="space-y-2">
									<li>
										<a href="#" className="hover:underline">
											À propos
										</a>
									</li>
									<li>
										<a href="#" className="hover:underline">
											Emplois
										</a>
									</li>
									<li>
										<a href="#" className="hover:underline">
											Marque
										</a>
									</li>
								</ul>
							</div>
							<div>
								<h4 className="text-[#5865F2] font-semibold mb-4">
									Ressources
								</h4>
								<ul className="space-y-2">
									<li>
										<a href="#" className="hover:underline">
											Université
										</a>
									</li>
									<li>
										<a href="#" className="hover:underline">
											Support
										</a>
									</li>
									<li>
										<a href="#" className="hover:underline">
											Sécurité
										</a>
									</li>
								</ul>
							</div>
							<div>
								<h4 className="text-[#5865F2] font-semibold mb-4">
									Politiques
								</h4>
								<ul className="space-y-2">
									<li>
										<a href="#" className="hover:underline">
											Conditions
										</a>
									</li>
									<li>
										<a href="#" className="hover:underline">
											Confidentialité
										</a>
									</li>
									<li>
										<a href="#" className="hover:underline">
											Paramètres
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
						<div className="flex items-center mb-4 md:mb-0">
							<Image
								src={"/Logo-transpa-white.png"}
								alt="DiscHard"
								width={40}
								height={40}
							/>
							<span className="ml-2 font-bold">DiscHard</span>
						</div>
						<Link href="/register">
							<Button className="bg-[#5865F2] hover:bg-[#4752c4] text-white rounded-full">
								S'inscrire
							</Button>
						</Link>
					</div>
				</div>
			</footer>
		</div>
	);
}
