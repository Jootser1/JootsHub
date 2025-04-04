"use client"

import Layout from "@/components/Layout"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Search, Plus } from "lucide-react"
import Link from "next/link"
import { useSession } from "next-auth/react"
import axiosInstance from "@/app/api/axiosInstance"
import { toast } from "sonner"
import { ConversationList } from "@/components/icebreaker/ConversationList"

export default function IcebreakerHome() {
  const { data: session } = useSession()
  const user = session?.user
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  console.log("session dans icebreaker page", session)

  const handleStartRandomChat = async () => {
    try {
      setIsLoading(true)
      // 1. Trouver un utilisateur aléatoire
      const response = await axiosInstance.get('/users/random/available')
      const randomUser = response.data
      console.log('randomUser:', randomUser)
      
      // 2. Créer une conversation avec cet utilisateur
      const conversationResponse = await axiosInstance.post('/conversations', {
        receiverId: randomUser.id
      })
      const conversation = conversationResponse.data
      
      toast.success('Conversation créée ! Redirection vers le chat...')
      router.push(`/conversations/${conversation.id}`)
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Aucun utilisateur disponible pour le moment')
    } finally {
      setIsLoading(false)
    }
  }

  if (!user) {
    return <div className="flex items-center justify-center min-h-screen">Chargement...</div>
  }

  return (
    <Layout experience="icebreaker">
      <main className="flex min-h-screen flex-col bg-gray-50">
        <div className="max-w-md w-full mx-auto bg-white min-h-screen">
          {/* Header */}
          <div className="sticky top-0 z-10 bg-white border-b">
            <div className="p-4 flex items-center">
              <Link href="/hub">
                <div className="w-10 h-10 rounded-full bg-[#E59C45] flex items-center justify-center">
                  <ChevronLeft className="h-5 w-5 text-white" />
                </div>
              </Link>
              <h1 className="text-xl font-semibold ml-4">Icebreaker</h1>
            </div>

            {/* Action buttons */}
            <div className="px-4 pb-4 flex space-x-2">
              <Button 
                className="flex-1 bg-[#E59C45] hover:bg-[#E59C45]/90 text-white rounded-full text-sm py-6"
                onClick={handleStartRandomChat}
                disabled={isLoading}
              >
                <Plus className="h-5 w-5 mr-2" />
                {isLoading ? 'Recherche...' : 'Nouvelle Aventure Humaine'}
              </Button>

              <Button
                variant="outline"
                className="flex-1 border-[#E59C45] text-[#E59C45] hover:bg-[#E59C45]/10 rounded-full text-sm py-6"
              >
                Nouveau Contact selon critères
              </Button>

              <Button variant="ghost" size="icon" className="rounded-full w-12 h-12">
                <Search className="h-5 w-5 text-gray-500" />
              </Button>
            </div>
          </div>

          {/* Conversations list */}
          <div className="flex-1 overflow-y-auto">
            <ConversationList />
          </div>
        </div>
      </main>
    </Layout>
  )
}

