import Link from "next/link"
import { Button } from "@/components/ui/Button"

export default function TopMenu() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold text-purple-700">Joots</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center space-x-2">
            <Button variant="ghost" asChild>
              <Link href="/questions">Questions</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/profile">Profil</Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  )
} 