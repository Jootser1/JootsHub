import { JootsLogo } from "./joots-logo"
import Link from "next/link"
import Image from "next/image"
import { useStore } from "@/app/store/store"
import { signOut } from "next-auth/react"

export function Header() {
  const user = useStore((state) => state.user)
  const logout = useStore((state) => state.logout)

  return (
    <header className="p-4 flex items-center justify-between border-b">
      <JootsLogo className="w-24 h-auto" />
      <Link href="/profile">
        <div className="flex items-center space-x-2">
          <span className="font-medium">{user?.username || "Non connecté"}</span>
        </div>
      </Link>
    </header>
  )
} 