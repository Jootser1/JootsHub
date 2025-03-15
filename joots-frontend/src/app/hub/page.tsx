"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import LandingCard from "@/components/LandingCard";

export default function HubPage() {
  const { status } = useSession();

  if (status === "loading") {
    return <p>Chargement...</p>; // 🔥 Évite de rendre la page tant que la session charge
  }

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-screen space-y-4 bg-gray-100">
        <LandingCard
          title="Socioscopy"
          description="Découvrez ce que les autres pensent vraiment, challengez vos certitudes et ouvrez le débat."
          icon={<span>🔮</span>}
          link="/socioscopy"
          color="#6B46C1"
        />
        <LandingCard
          title="Icebreaker"
          description="Un inconnu, des questions, un échange sans préjugés."
          icon={<span>❄️</span>}
          link="/icebreaker"
          color="#E67E22"
        />
        <LandingCard
          title="Revelio"
          description="Défiez vos proches et testez vos connaissances !"
          icon={<span>🎭</span>}
          link="/revelio"
          color="#2ECC71"
        />
      </div>
    </Layout>
  );
}
