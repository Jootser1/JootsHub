import { NextResponse } from 'next/server';

// Exemple de profil factice (à remplacer par ta logique réelle)
const fakeProfile = {
  CITY: 'Paris',
  AGE: '25-35',
  GENDER: 'Femme',
  JOB: 'Développeuse',
  ORIGIN: 'Française',
  ORIENTATION: 'Hétérosexuel',
  PASSIONS: ['Musique', 'Voyages', 'Lecture'],
  QUALITY: 'Empathie',
  FLAW: 'Impatience',
  BIO: "J'aime apprendre et partager.",
};

export async function GET(request: Request) {
  // Remplace par ta logique de récupération du profil
  return NextResponse.json(fakeProfile);
}

export async function PUT(request: Request) {
  // Remplace par ta logique de mise à jour du profil
  const data = await request.json();
  // Ici, on retourne juste ce qui a été envoyé (mock)
  return NextResponse.json({ ...fakeProfile, ...data });
}
