"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/Label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "lucide-react"

export default function ProfileForm() {
  const [gender, setGender] = useState<string | null>(null)
  const [country, setCountry] = useState<string | null>(null)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Section 1: Who are you */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-baseline mb-4">
              <h2 className="text-5xl font-bold text-purple-700 mr-2">1</h2>
              <h3 className="text-xl font-medium text-purple-700">QUI ÊTES VOUS ?</h3>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-gray-500 mb-2 block">GENRE</Label>
                <RadioGroup value={gender || ""} onValueChange={setGender} className="flex space-x-4">
                  <div className="flex items-center">
                    <RadioGroupItem value="homme" id="homme" />
                    <Label htmlFor="homme" className="ml-2">
                      HOMME
                    </Label>
                  </div>
                  <div className="flex items-center">
                    <RadioGroupItem value="femme" id="femme" />
                    <Label htmlFor="femme" className="ml-2">
                      FEMME
                    </Label>
                  </div>
                  <div className="flex items-center">
                    <RadioGroupItem value="autre" id="autre" />
                    <Label htmlFor="autre" className="ml-2">
                      AUTRE
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="nom" className="text-gray-500 mb-2 block">
                  NOM
                </Label>
                <Input id="nom" placeholder="" className="bg-gray-100" />
              </div>

              <div>
                <Label htmlFor="prenom" className="text-gray-500 mb-2 block">
                  PRÉNOM
                </Label>
                <Input id="prenom" placeholder="" className="bg-gray-100" />
              </div>

              <div>
                <Label htmlFor="date" className="text-gray-500 mb-2 block">
                  DATE DE NAISSANCE
                </Label>
                <div className="relative">
                  <Input id="date" placeholder="(JJ/MM/AAAA)" className="bg-gray-100 pr-10" />
                  <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-green-500" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 3: How do you live */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-baseline mb-4">
              <h2 className="text-5xl font-bold text-purple-700 mr-2">3</h2>
              <h3 className="text-xl font-medium text-purple-700">COMMENT VIVEZ-VOUS ?</h3>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="marital" className="text-gray-500 mb-2 block">
                  STATUT MARITAL
                </Label>
                <Select>
                  <SelectTrigger className="bg-gray-100">
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Célibataire</SelectItem>
                    <SelectItem value="married">Marié(e)</SelectItem>
                    <SelectItem value="divorced">Divorcé(e)</SelectItem>
                    <SelectItem value="widowed">Veuf/Veuve</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="category" className="text-gray-500 mb-2 block">
                  CATÉGORIE SOCIO-PROFESSIONNELLE
                </Label>
                <Select>
                  <SelectTrigger className="bg-gray-100">
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="employee">Employé</SelectItem>
                    <SelectItem value="worker">Ouvrier</SelectItem>
                    <SelectItem value="executive">Cadre</SelectItem>
                    <SelectItem value="freelance">Indépendant</SelectItem>
                    <SelectItem value="student">Étudiant</SelectItem>
                    <SelectItem value="retired">Retraité</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="income" className="text-gray-500 mb-2 block">
                  TRANCHE DE REVENUS
                </Label>
                <Select>
                  <SelectTrigger className="bg-gray-100">
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Moins de 20 000 €/an</SelectItem>
                    <SelectItem value="medium">20 000 € - 40 000 €/an</SelectItem>
                    <SelectItem value="high">40 000 € - 60 000 €/an</SelectItem>
                    <SelectItem value="very-high">Plus de 60 000 €/an</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 2: Where are you */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-baseline mb-4">
              <h2 className="text-5xl font-bold text-purple-700 mr-2">2</h2>
              <h3 className="text-xl font-medium text-purple-700">OÙ ÊTES VOUS ?</h3>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="country" className="text-gray-500 mb-2 block">
                  PAYS
                </Label>
                <div className="relative">
                  <Select value={country || ""} onValueChange={setCountry}>
                    <SelectTrigger className="bg-gray-100">
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                    <SelectContent className="max-h-[200px]">
                      <SelectItem value="cuba">Cuba</SelectItem>
                      <SelectItem value="danemark">Danemark</SelectItem>
                      <SelectItem value="djibouti">Djibouti</SelectItem>
                      <SelectItem value="dominique">Dominique</SelectItem>
                      <SelectItem value="egypte">Égypte</SelectItem>
                      <SelectItem value="emirats">Émirats arabes unis</SelectItem>
                      <SelectItem value="equateur">Équateur</SelectItem>
                      <SelectItem value="erythree">Érythrée</SelectItem>
                      <SelectItem value="france">France</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 4: Password */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-baseline mb-4">
              <h2 className="text-5xl font-bold text-purple-700 mr-2">4</h2>
              <h3 className="text-xl font-medium text-purple-700">VOTRE MOT DE PASSE</h3>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="current-password" className="text-gray-500 mb-2 block">
                  MOT DE PASSE ACTUEL
                </Label>
                <Input id="current-password" type="password" className="bg-gray-100" />
              </div>

              <div>
                <Label htmlFor="new-password" className="text-gray-500 mb-2 block">
                  NOUVEAU MOT DE PASSE
                </Label>
                <Input id="new-password" type="password" className="bg-gray-100" />
              </div>

              <div>
                <Label htmlFor="confirm-password" className="text-gray-500 mb-2 block">
                  CONFIRMATION MOT DE PASSE
                </Label>
                <Input id="confirm-password" type="password" className="bg-gray-100" />
              </div>

              <div className="flex space-x-4 mt-6">
                <Button className="bg-green-500 hover:bg-green-600 flex-1">VALIDER</Button>
                <Button variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-50 flex-1">
                  LIER COMPTE FACEBOOK
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
