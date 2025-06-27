"use client";

import {useState} from "react";
import {generateStars} from "@/components/Star";


export default function Loading() {
    const [stars] = useState(() => generateStars(100));

    return (
        <div className="relative flex h-screen w-full items-center justify-center bg-[#313338] overflow-hidden">
            {/* Étoiles */}
            {stars}

            <div className="relative flex items-center justify-center">
                {/* Planète */}
                <div
                    className="relative h-32 w-32 rounded-full bg-gradient-to-br from-blue-500 to-blue-800 shadow-lg shadow-blue-500/50">
                    {/* Détails de surface de la planète */}
                    <div className="absolute left-5 top-6 h-6 w-10 rounded-full bg-blue-300/20"></div>
                    <div className="absolute bottom-8 right-7 h-8 w-12 rounded-full bg-blue-300/20"></div>
                </div>

                {/* Orbite de la lune */}
                <div
                    className="absolute h-64 w-64 rounded-full border border-gray-700/30 animate-[spin_10s_linear_infinite]">
                    {/* Lune */}
                    <div
                        className="absolute -right-3 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 shadow-md"></div>
                </div>

                {/* Texte de chargement */}
                <div className="absolute -bottom-16 text-center text-white">
                    <p className="text-sm font-medium">Chargement en cours...</p>
                </div>
            </div>
        </div>
    );
}
