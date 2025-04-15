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
    <div className="bg-white border-t flex justify-around p-3">
      <Link href="/hub">
        <Button variant="ghost" size="icon" className="rounded-full">
          <Home className="h-6 w-6" />
        </Button>
      </Link>

      <ExperienceLogo experience={experience} />

      <Button 
        variant="ghost" 
        size="icon" 
        className="rounded-full"
        onClick={handleUserClick}
      >
        <User className="h-6 w-6" />
      </Button>
    </div>
  )
}) 