import { NextResponse } from "next/server";

export async function GET({ params }: { params: { id: string } }) {
  const { id } = params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`);
  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json({ error: "Utilisateur non trouvé" }, { status: 404 });
  }

  return NextResponse.json(data);
}
