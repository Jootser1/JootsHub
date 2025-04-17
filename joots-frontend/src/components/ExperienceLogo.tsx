import { IcebreakerLogo } from "./icebreaker-logo"
import { Button } from "./ui/button"

type Experience = "hub" | "icebreaker" | "socioscopy" | "revelio"

interface ExperienceLogoProps {
  experience: Experience
  size?: number
}

export function ExperienceLogo({ experience, size = 48 }: ExperienceLogoProps) {
  switch (experience) {
    case "hub":
      return null
    case "icebreaker":
      return (
        <Button variant="ghost" size="icon" className="rounded-full bg-black">
          <div className="relative w-12 h-12">
            <IcebreakerLogo size={size} />
          </div>
        </Button>
      )
    case "socioscopy":
      // À implémenter quand nécessaire
      return null
    case "revelio":
      // À implémenter quand nécessaire
      return null
    default:
      return null
  }
} 