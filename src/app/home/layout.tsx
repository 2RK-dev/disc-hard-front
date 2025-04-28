"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  // Simulation d'une vérification d'authentification
  // Dans une application réelle, vous vérifieriez un token ou une session
  useEffect(() => {
    // Vérifier si l'utilisateur vient de la page de connexion ou d'inscription
    // Ceci est une simulation simplifiée
    const isAuthenticated = sessionStorage.getItem("isAuthenticated") === "true"

    if (!isAuthenticated) {
      // Simuler une authentification réussie pour la démo
      sessionStorage.setItem("isAuthenticated", "true")
    }
  }, [router])

  return <>{children}</>
}
