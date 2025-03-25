"use client"

import Layout from "@/components/Layout";
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Search, Home, User, Plus } from "lucide-react"
import { IcebreakerLogo } from "@/components/icebreaker-logo"
import Link from "next/link"
import { useSession } from "next-auth/react"

// Types pour les conversations
interface Conversation {
  id: number
  username: string
  avatar: string
  lastMessage: string
  timestamp: string
  status?: "urgent" | "online" | "offline"
  unread?: boolean
}

// Données simulées pour les conversations
const conversations: Conversation[] = [
  {
    id: 123,
    username: "Jooster123",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Urgent! Please reply ASAP.",
    timestamp: "Just now",
    status: "urgent",
    unread: true,
  },
  {
    id: 34,
    username: "Jooster34",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "You: Can we meet tomorrow? I have some news...",
    timestamp: "12 min ago",
    status: "online",
  },
  {
    id: 567,
    username: "Jooster567",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Hey, are you there? Need your help.",
    timestamp: "1 day ago",
    status: "offline",
  },
]


export default function IcebreakerHome() {
  const { data: session, status } = useSession();
  const user = session?.user;
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()


  const handleStartChat = (userId: number) => {
    router.push(`/icebreaker/chat/${userId}`)
  }

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  if (!user) {
    return <div className="flex items-center justify-center min-h-screen">Chargement...</div>
  }

  return (
    <Layout experience="icebreaker">
      <main className="flex min-h-screen flex-col bg-gray-50">
        <div className="max-w-md w-full mx-auto bg-white min-h-screen shadow-lg">
          {/* Header */}
          <div className="p-4 flex items-center bg-white border-b">
            <Link href="/hub">
              <div className="w-10 h-10 rounded-full bg-[#E59C45] flex items-center justify-center">
                <ChevronLeft className="h-5 w-5 text-white" />
              </div>
            </Link>
            <h1 className="text-xl font-bold ml-4">Icebreaker</h1>
          </div>

          {/* Action buttons */}
          <div className="p-4 flex space-x-2">
            <Button className="flex-1 bg-[#E59C45] hover:bg-[#E59C45]/90 text-xs rounded-full">
              <Plus className="h-4 w-4 mr-1" />
              Nouvelle Aventure Humaine
            </Button>

            <Button
              variant="outline"
              className="flex-1 border-[#E59C45] text-[#E59C45] hover:bg-[#E59C45]/10 text-xs rounded-full"
            >
              Nouveau Contact selon critères
            </Button>

            <Button variant="ghost" size="icon" className="rounded-full">
              <Search className="h-5 w-5" />
            </Button>
          </div>

          {/* Conversations list */}
          <div className="divide-y">
            {filteredConversations.map((conv) => (
              <div key={conv.id} className="p-4 hover:bg-gray-50 cursor-pointer" onClick={() => handleStartChat(conv.id)}>
                <div className="flex items-start space-x-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-md overflow-hidden bg-gray-200">
                      <img src={conv.avatar || "/placeholder.svg"} alt={conv.username} className="w-full h-full" />
                    </div>
                    {conv.status && (
                      <div
                        className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                          conv.status === "urgent"
                            ? "bg-red-500"
                            : conv.status === "online"
                              ? "bg-green-500"
                              : "bg-gray-400"
                        }`}
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div className="font-medium">{conv.username}</div>
                      <div className="text-xs text-gray-500">{conv.timestamp}</div>
                    </div>
                    <div className={`text-sm ${conv.unread ? "font-semibold" : "text-gray-600"}`}>{conv.lastMessage}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </Layout>
  )
}

