import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get('avatar') as File | null;
  if (!file) {
    return NextResponse.json({ error: 'Aucun fichier envoyé' }, { status: 400 });
  }

  // Générer un nom de fichier unique
  const ext = file.name.split('.').pop();
  const fileName = `avatar_${Date.now()}.${ext}`;
  const filePath = path.join(process.cwd(), 'public', 'avatars', fileName);

  // Lire le contenu du fichier
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Créer le dossier s'il n'existe pas
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  // Sauvegarder le fichier
  await fs.writeFile(filePath, buffer);

  // Retourner l'URL publique
  const url = `/avatars/${fileName}`;
  return NextResponse.json({ url });
} 