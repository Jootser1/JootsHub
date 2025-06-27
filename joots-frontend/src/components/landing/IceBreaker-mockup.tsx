"use client"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/Avatar"
import { Badge } from "@/components/ui/Badge"
import { MessageCircle, Heart, Zap, Users } from "lucide-react"

export default function IcebreakerMockup() {
  const [activeChat, setActiveChat] = useState(0)
  const [messageIndex, setMessageIndex] = useState(0)

  const connections = [
    { name: "Sophie", status: "online", avatar: "S", color: "bg-pink-500" },
    { name: "Marc", status: "away", avatar: "M", color: "bg-blue-500" },
    { name: "Julie", status: "online", avatar: "J", color: "bg-green-500" },
    { name: "Thomas", status: "offline", avatar: "T", color: "bg-purple-500" },
  ]

  const messages = [
    "Hey! How's your day going? 😊",
    "Just discovered this amazing coffee place!",
    "Want to grab lunch tomorrow?",
    "That movie recommendation was perfect! 🎬",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="h-96 bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <div className="p-4 bg-white border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-500 rounded-xl">
              <MessageCircle className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Icebreaker</h3>
              <p className="text-sm text-gray-500">Connect & Chat</p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-green-100 text-green-700">
            <Users className="h-3 w-3 mr-1" />
            {connections.filter((c) => c.status === "online").length} online
          </Badge>
        </div>
      </div>

      {/* Connections */}
      <div className="p-4 space-y-3">
        {connections.map((connection, index) => (
          <div
            key={index}
            className={`flex items-center space-x-3 p-3 rounded-xl cursor-pointer transition-all duration-300 ${
              index === activeChat ? "bg-white shadow-md" : "hover:bg-white/50"
            }`}
            onClick={() => setActiveChat(index)}
          >
            <div className="relative">
              <Avatar className={`${connection.color} text-white`}>
                <AvatarFallback className="text-white font-semibold">{connection.avatar}</AvatarFallback>
              </Avatar>
              <div
                className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                  connection.status === "online"
                    ? "bg-green-400"
                    : connection.status === "away"
                      ? "bg-yellow-400"
                      : "bg-gray-400"
                }`}
              ></div>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-900">{connection.name}</span>
                <span className="text-xs text-gray-500">2m</span>
              </div>
              <p className="text-sm text-gray-600 truncate">
                {index === activeChat ? messages[messageIndex] : "Click to view conversation"}
              </p>
            </div>
            {index === activeChat && (
              <div className="flex items-center space-x-1">
                <Heart className="h-4 w-4 text-red-400" />
                <Zap className="h-4 w-4 text-yellow-400" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="flex justify-center space-x-2">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-100"></div>
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-200"></div>
        </div>
      </div>
    </div>
  )
}
