import { Card, CardContent } from "@/components/ui/card"
import { Cog } from "lucide-react"

interface ProfileCompletionProps {
  percentage: number
}

export default function ProfileCompletion({ percentage }: ProfileCompletionProps) {
  // Calculate the SVG path for the progress circle
  const radius = 90
  const circumference = 2 * Math.PI * radius
  const dashOffset = circumference * (1 - percentage / 100)

  return (
    <Card>
      <CardContent className="p-6 flex flex-col items-center">
        <div className="relative w-48 h-48">
          {/* Progress circle */}
          <svg width="100%" height="100%" viewBox="0 0 200 200" className="transform -rotate-90">
            {/* Background circle */}
            <circle cx="100" cy="100" r={radius} fill="transparent" stroke="#e2d9f3" strokeWidth="15" />
            {/* Progress arc - purple only */}
            <circle
              cx="100"
              cy="100"
              r={radius}
              fill="transparent"
              stroke="#7e22ce"
              strokeWidth="15"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              strokeLinecap="round"
            />
          </svg>

          {/* Cog icon */}
          <div className="absolute top-0 right-0">
            <Cog className="h-8 w-8 text-purple-700" />
          </div>

          {/* Percentage text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl font-bold text-purple-700">{percentage}%</span>
          </div>
        </div>

        <p className="text-center text-purple-600 mt-4">
          Votre profil est compléter à {percentage}%,
          <br />
          renseignez plus d'informatons pour
          <br />
          jootser encore plus efficacement!
        </p>
      </CardContent>
    </Card>
  )
}
