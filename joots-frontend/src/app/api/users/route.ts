import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: "ID manquant" }, { status: 400 });
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`);
  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json({ error: "Utilisateur non trouvé" }, { status: 404 });
  }

  return NextResponse.json(data);
}
