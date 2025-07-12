import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MobileNav from "@/components/Navigation"
import TopMenu from "@/components/top-menu"
import ProfileCompletion from "@/components/profile/profile-completion"
import ProfileForm from "@/components/profile/profile-form"
import UserAnswers from "@/components/profile/user-answers"
import UserQuestions from "@/components/profile/user-questions"

export default function ProfilePage() {
  return (
    <>
      <TopMenu />
      <div className="container mx-auto p-4 pb-20 max-w-5xl">
        <h1 className="text-4xl font-bold text-purple-700 mb-6">MON COMPTE</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ProfileForm />
          </div>

          <div className="lg:col-span-1">
            <ProfileCompletion percentage={35} />

            <Card className="mt-6">
              <CardContent className="p-4 text-sm text-gray-500">
                <p className="mb-4">
                  Nous sommes conscient que certaines des informations demandées ci-contre sont personnelles. Seul votre
                  nom, prénom et email sont requis pour jootser à votre guise.
                </p>
                <p className="mb-4">
                  Néanmoins, plus vous renseignez d'informations vous concernant, plus nous pourrons affiner les
                  statistiques qui vous seront proposées lorsque vous répondrez à des questions.
                </p>
                <p>
                  D'autre part, ces données sont protégées par nos conditions générales d'utilisations et ne seront
                  jamais diffusées sans votre accord préalable.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-8">
          <Tabs defaultValue="my-answers" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="my-answers" className="text-lg py-3">
                Mes Réponses
              </TabsTrigger>
              <TabsTrigger value="my-questions" className="text-lg py-3">
                Mes Questions
              </TabsTrigger>
            </TabsList>

            <TabsContent value="my-answers">
              <UserAnswers />
            </TabsContent>

            <TabsContent value="my-questions">
              <UserQuestions />
            </TabsContent>
          </Tabs>
        </div>

        <MobileNav />
      </div>
    </>
  )
}
