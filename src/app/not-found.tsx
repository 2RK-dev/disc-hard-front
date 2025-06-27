"use client";

import {Button} from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import {generateStars} from "@/components/Star";
import {useState} from "react";

export default function NotFound() {
    const [stars] = useState(() => generateStars(100));

    return (
        <div className="relative flex h-screen w-full items-center justify-center bg-[#313338] overflow-hidden">
            {stars}

            <div className="relative flex flex-col items-center justify-center text-center">
                <div className="relative mb-12 animate-float">
                    <Image
                        src={"/lost.png"}
                        alt="Astronaute perdu"
                        width={200}
                        height={200}></Image>
                </div>
                <h1 className="mb-2 text-4xl font-bold text-white">404</h1>
                <h2 className="mb-6 text-2xl font-semibold text-white">
                    Astronaute perdu dans l&apos;espace
                </h2>
                <p className="mb-8 max-w-md text-gray-300">
                    On dirait que vous avez dérivé trop loin. Cette page n&apos;existe pas
                    ou a été déplacée vers une autre galaxie.
                </p>
                <Button asChild className="bg-blue-600 hover:bg-blue-700">
                    <Link href="/">Retour à la Terre</Link>
                </Button>
            </div>
        </div>
    );
}
