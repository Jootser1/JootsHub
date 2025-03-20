import Link from 'next/link';
import { ReactNode } from 'react';

interface LandingCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  link: string;
  color: string;
}

export default function LandingCard({ title, description, icon, link, color }: LandingCardProps) {
  return (
    <div className="flex flex-col items-center justify-center bg-white p-6 rounded-xl shadow-lg w-80">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-center mb-4">{description}</p>
      <div className="mb-4">{icon}</div>
      <Link href={link}>
        <button className={`w-full p-2 rounded text-white`} style={{ backgroundColor: color }}>
          Commencer
        </button>
      </Link>
    </div>
  );
}
