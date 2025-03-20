import { Button } from "./ui/button"
import { Home, User } from "lucide-react"
import { ExperienceLogo } from "./ExperienceLogo"
import { memo } from "react"

interface BottomBarProps {
  experience: "hub" | "icebreaker" | "socioscopy" | "revelio"
}

export const BottomBar = memo(function BottomBar({ experience }: BottomBarProps) {
  return (
    <div className="bg-white border-t flex justify-around p-3">
      <Button variant="ghost" size="icon" className="rounded-full">
        <Home className="h-6 w-6" />
      </Button>

      <ExperienceLogo experience={experience} />

      <Button variant="ghost" size="icon" className="rounded-full">
        <User className="h-6 w-6" />
      </Button>
    </div>
  )
}) 