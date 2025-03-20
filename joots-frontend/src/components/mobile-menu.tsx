"use client"

import type React from "react"

import { ShoppingBag, Package, Mail, Gift, HelpCircle, Settings, ChevronRight, Copy } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useStore } from "@/app/store/store"

export default function MobileMenu() {
  const { mobileMenuOpen, setMobileMenuOpen, user } = useStore()

  const copyClientId = () => {
    navigator.clipboard.writeText(user?.id || "")
    // Vous pourriez ajouter une notification de succès ici
  }

  return (
    <>
      {/* Overlay qui apparaît derrière le menu */}
      {mobileMenuOpen && <div className="fixed inset-0 bg-black/20 z-40 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />}

      {/* Menu popup */}
      <div
        className={`fixed top-0 right-0 h-full w-[85%] max-w-md bg-white rounded-l-3xl shadow-xl z-50 transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-6 pt-8">
          {/* ID de clientèle */}
          <div className="mb-6">
            <div className="text-gray-500 text-sm mb-2">ID de clientèle</div>
            <div className="flex items-center bg-gray-100 rounded-full py-2 px-4">
              <span className="text-gray-700 flex-1">{user?.id || "Non connecté"}</span>
              <button onClick={copyClientId} className="text-gray-400 hover:text-gray-600" aria-label="Copier l'ID">
                <Copy className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Profil utilisateur */}
          <Link href="/profile" className="flex items-center bg-gray-100 rounded-full py-2 px-4 mb-4">
            <div className="relative w-10 h-10 mr-3">
              <Image
                src={user?.avatar || "/placeholder.svg?height=40&width=40"}
                alt="Avatar"
                width={40}
                height={40}
                className="rounded-full"
              />
            </div>
            <span className="text-gray-800 font-medium flex-1">{user?.username || "Non connecté"}</span>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </Link>

          {/* Pass standard */}
          <Link href="/pass" className="flex items-center bg-gray-100 rounded-full py-3 px-4 mb-8">
            <div className="relative w-6 h-6 mr-3">
              <Image src="/placeholder.svg?height=24&width=24" alt="Pass" width={24} height={24} />
            </div>
            <span className="text-gray-600">Pass standard</span>
          </Link>

          {/* Menu items */}
          <div className="flex flex-col space-y-6">
            <MenuItem href="/boutique" icon={<ShoppingBag />} label="Boutique" hasNotification />
            <MenuItem href="/inventaire" icon={<Package />} label="Inventaire" />
            <MenuItem href="/actualites" icon={<Mail />} label="Actualités" hasNotification />
            <MenuItem href="/cadeaux" icon={<Gift />} label="Cadeaux" hasNotification />
            <MenuItem href="/astuces" icon={<HelpCircle />} label="Astuces" />
            <MenuItem href="/autres" icon={<Settings />} label="Autres" />
          </div>
        </div>
      </div>
    </>
  )
}

interface MenuItemProps {
  href: string
  icon: React.ReactNode
  label: string
  hasNotification?: boolean
}

function MenuItem({ href, icon, label, hasNotification = false }: MenuItemProps) {
  return (
    <Link href={href} className="flex items-center text-gray-600 hover:text-gray-900">
      <div className="relative w-8 h-8 mr-3 text-gray-500">
        {icon}
        {hasNotification && <span className="absolute -top-1 -right-1 bg-red-500 w-2.5 h-2.5 rounded-full" />}
      </div>
      <span className="text-lg">{label}</span>
    </Link>
  )
}

