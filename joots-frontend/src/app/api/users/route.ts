import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { getServerSession } from 'next-auth'
import axiosInstance from '@/app/api/axios-instance'
import { AxiosError } from 'axios'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session?.user) {
      return new NextResponse('Non autorisé', { status: 401 })
    }

    const id = request.nextUrl.searchParams.get('id')
    const conversationId = request.nextUrl.searchParams.get('conversationId')

    if (!id) {
      return NextResponse.json({ error: 'ID manquant' }, { status: 400 })
    }

    // Si conversationId est fourni, récupérer le profil filtré
    if (conversationId) {
      const response = await axiosInstance.get(`/users/profile/${id}/${conversationId}`)
      return NextResponse.json(response.data)
    }

    // Sinon, récupérer les informations de base de l'utilisateur
    const response = await axiosInstance.get(`/users/${id}`)
    return NextResponse.json(response.data)
  } catch (error: unknown) {
    console.error("Erreur lors de la récupération de l'utilisateur:", error)

    if (error instanceof AxiosError && error.response?.status === 404) {
      return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 })
    }

    return new NextResponse('Erreur serveur', { status: 500 })
  }
}
