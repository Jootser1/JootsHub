import { Button } from "./ui/button"
import { Home, User } from "lucide-react"
import { ExperienceLogo } from "./ExperienceLogo"
import { memo } from "react"
import { useUserStore } from "@/features/user/stores/userStore"
import Link from "next/link"

interface BottomBarProps {
  experience: "hub" | "icebreaker" | "socioscopy" | "revelio"
}

export const BottomBar = memo(function BottomBar({ experience }: BottomBarProps) {
  const setMobileMenuOpen = useUserStore((state) => state.setMobileMenuOpen)

  const handleUserClick = () => {
    setMobileMenuOpen(true)
  }

  return (
    <div className="border-t flex p-3 w-full bg-white">
      <div className="flex-1 flex items-center justify-center"><Link href="/hub">
        <Button variant="ghost" size="icon" className="rounded-full">
          <Home className="h-6 w-6" />
        </Button>
      </Link>
      </div>
      <div className="flex-1 flex items-center justify-center">
      <ExperienceLogo experience={experience} />
      </div>
      <div className="flex-1 flex items-center justify-center">
      <Button 
        variant="ghost" 
        size="icon" 
        className="rounded-full"
        onClick={handleUserClick}
      >
        <User className="h-6 w-6" />
      </Button>
      </div>
    </div>
  )
}) 