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
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <Image 
              src={user?.avatar || "/placeholder.svg"} 
              alt={user?.username || ""}
              width={32}
              height={32}
            />
          </div>
          <span className="font-medium">{user?.username}</span>
          <button
            onClick={() => {
              logout();
              signOut();
            }}
            className="bg-red-500 px-3 py-1 rounded text-white"
          >
            Déconnexion
          </button>
        </div>
      </Link>
    </header>
  )
} 