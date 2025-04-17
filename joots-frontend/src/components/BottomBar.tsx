import { Button } from "./ui/button"
import { Home, User } from "lucide-react"
import { ExperienceLogo } from "./ExperienceLogo"
import { memo } from "react"
import { useUserStore } from "@/features/user/stores/userStore"
import Link from "next/link"
import Image from 'next/image'

interface BottomBarProps {
  experience: "hub" | "icebreaker" | "socioscopy" | "revelio"
}

export const BottomBar = memo(function BottomBar({ experience }: BottomBarProps) {
  const setMobileMenuOpen = useUserStore((state) => state.setMobileMenuOpen)

  const handleUserClick = () => {
    setMobileMenuOpen(true)
  }

  return (
    <div className="border-t-2 border-gray-300 flex p-3 w-full bg-white shadow-md">
      <div className="flex-1 flex items-center justify-center">
        <Link href="/hub">
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100 transition duration-300">
            <Home className="h-6 w-6" />
          </Button>
        </Link>
      </div>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
        <button className="w-18 h-18 rounded-full bg-white shadow-lg flex items-center justify-center border border-gray-300 hover:shadow-xl transition duration-300">
          <Image 
            src="/icebreaker_oo.png"
            alt="Icebreaker"
            width={45}
            height={45}
            className="align-center content-center absolute bottom-3"
          />
        </button>
      </div>
      {/* <div className="flex-1 flex items-center justify-center">
      <ExperienceLogo experience={experience} />
      </div> */}
      <div className="flex-1 flex items-center justify-center">
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full hover:bg-gray-100 transition duration-300"
          onClick={handleUserClick}
        >
          <User className="h-6 w-6" />
        </Button>
      </div>
    </div>
  )
}) 