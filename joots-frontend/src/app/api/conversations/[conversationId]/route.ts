import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import axiosInstance from '@/app/api/axios-instance'

// Route pour récupérer les messages d'une conversation
export async function GET(
  request: Request,
  { params }: { params: Promise<{ conversationId: string }> }
) {
  try {
    const session = await getServerSession()
    if (!session?.user) {
      return new NextResponse('Non autorisé', { status: 401 })
    }

    const response = await axiosInstance.get(`/conversations/${params}/messages`)

    return NextResponse.json(response.data)
  } catch (error) {
    console.error('Erreur lors de la récupération des messages:', error)
    return new NextResponse('Erreur serveur', { status: 500 })
  }
}
