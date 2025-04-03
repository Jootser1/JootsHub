
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import axiosInstance from '@/app/api/axiosInstance';

// Route pour marquer les messages comme lus  
export async function POST(
  request: Request,
  { params }: { params: { conversationId: string } }
) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return new NextResponse('Non autorisé', { status: 401 });
    }

    const body = await request.json();
    const { messageIds } = body;

    const response = await axiosInstance.post(
      `/conversations/${params.conversationId}/messages/read`,
      { messageIds }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Erreur lors du marquage des messages comme lus:', error);
    return new NextResponse('Erreur serveur', { status: 500 });
  }
} 