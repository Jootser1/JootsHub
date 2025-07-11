import { Button } from '@/components/ui/Button';
import { ArrowRight, Sparkles, Users, Shield, Zap } from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">Joots</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="https://app.joots.com" className="text-gray-600 hover:text-blue-600 transition-colors">
              Se connecter
            </Link>
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link href="https://app.joots.com">
                Commencer
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Connectez-vous
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {' '}autrement
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
            Joots révolutionne vos interactions sociales avec une plateforme innovante 
            qui privilégie l'authenticité et les connexions significatives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3">
              <Link href="https://app.joots.com">
                Découvrir l'app
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-3">
              En savoir plus
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Pourquoi choisir Joots ?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Connexions authentiques
              </h3>
              <p className="text-gray-600">
                Créez des liens véritables avec des personnes qui partagent vos passions et vos valeurs.
              </p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                <Shield className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Sécurité garantie
              </h3>
              <p className="text-gray-600">
                Vos données sont protégées avec les plus hauts standards de sécurité et de confidentialité.
              </p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <Zap className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Expérience fluide
              </h3>
              <p className="text-gray-600">
                Interface intuitive et performante, disponible sur tous vos appareils.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prêt à commencer votre aventure ?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Rejoignez la communauté Joots et découvrez une nouvelle façon de vous connecter.
          </p>
          <Button size="lg" asChild className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-3">
            <Link href="https://app.joots.com">
              Lancer l'application
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-12 border-t border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Sparkles className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">Joots</span>
            </div>
            <div className="flex space-x-6 text-gray-600">
              <Link href="#" className="hover:text-blue-600 transition-colors">
                Confidentialité
              </Link>
              <Link href="#" className="hover:text-blue-600 transition-colors">
                Conditions
              </Link>
              <Link href="#" className="hover:text-blue-600 transition-colors">
                Contact
              </Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-600">
            <p>&copy; 2024 Joots. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 