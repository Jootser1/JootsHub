import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { WifiOff, RefreshCw } from "lucide-react"
import Link from "next/link"

export default function OfflinePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="bg-purple-50">
          <CardTitle className="text-center text-2xl text-purple-700">Vous êtes hors ligne</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center space-y-6 py-8 text-center">
            <div className="rounded-full bg-purple-100 p-6">
              <WifiOff className="h-12 w-12 text-purple-600" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Connexion Internet perdue</h3>
              <p className="text-gray-500">
                Vous semblez être hors ligne. Veuillez vérifier votre connexion et réessayer.
              </p>
            </div>
            <div className="flex flex-col space-y-2">
              <Button asChild className="bg-purple-700 hover:bg-purple-800">
                <Link href="/">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Réessayer
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/">Retour à l'accueil</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
