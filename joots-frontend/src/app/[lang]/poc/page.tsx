'use client';

import { useState, useEffect } from 'react';
import { ImageRevealDemo } from './components/ImageRevealDemo';
import { RevealControls } from './components/RevealControls';
import { PalierInfo } from './components/PalierInfo';
import { AlternativeTests } from './components/AlternativeTests';

export default function POCPage() {
  const [currentPalier, setCurrentPalier] = useState(1);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [showAlternatives, setShowAlternatives] = useState(false);

  // Gestion des raccourcis clavier
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Éviter les conflits si l'utilisateur tape dans un input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          if (currentPalier > 1) {
            setCurrentPalier(currentPalier - 1);
          }
          break;
        case 'ArrowRight':
          e.preventDefault();
          if (currentPalier < 10) {
            setCurrentPalier(currentPalier + 1);
          }
          break;
        case ' ':
          e.preventDefault();
          setIsAutoPlay(!isAutoPlay);
          break;
        case 'r':
        case 'R':
          e.preventDefault();
          setCurrentPalier(1);
          setIsAutoPlay(false);
          break;
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
          e.preventDefault();
          setCurrentPalier(parseInt(e.key));
          break;
        case '0':
          e.preventDefault();
          setCurrentPalier(10);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentPalier, isAutoPlay]);

  return (
    <>
      {/* Styles CSS personnalisés */}
      <style jsx global>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid #1e293b;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid #1e293b;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
        
        .gradient-border {
          background: linear-gradient(45deg, #3b82f6, #8b5cf6, #06b6d4);
          padding: 2px;
          border-radius: 1rem;
        }
        
        .gradient-border > * {
          background: rgb(30 41 59);
          border-radius: calc(1rem - 2px);
        }
        
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 5px rgba(59, 130, 246, 0.5);
          }
          50% {
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.8);
          }
        }
        
        .pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8">
        <div className="max-w-6xl mx-auto">
          {/* En-tête */}
          <header className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">
              POC - Paliers de Révélation Progressive
            </h1>
            <p className="text-slate-300 text-lg max-w-3xl mx-auto">
              Test des 10 paliers de révélation d'images avec flou progressif, 
              désaturation contrôlée et respect de l'anonymité ethnique jusqu'au palier 5.
            </p>
            
            {/* Indicateur global de progression */}
            <div className="mt-8 max-w-md mx-auto">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-400">Progression globale</span>
                <span className="text-sm font-medium text-white">{currentPalier * 10}%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full transition-all duration-700 ${
                    currentPalier <= 5 
                      ? currentPalier === 5 
                        ? 'bg-gradient-to-r from-green-500 to-yellow-500 pulse-glow' 
                        : 'bg-green-500'
                      : 'bg-gradient-to-r from-blue-500 to-purple-500'
                  }`}
                  style={{ width: `${currentPalier * 10}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>Anonyme</span>
                <span className="text-yellow-400">Seuil</span>
                <span>Révélé</span>
              </div>
            </div>
          </header>

          {/* Contenu principal */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Zone d'affichage de l'image */}
            <div className="lg:col-span-2">
              <div className={`${
                currentPalier === 5 ? 'gradient-border' : 'bg-slate-800/50'
              } backdrop-blur-sm rounded-2xl p-6 ${
                currentPalier === 5 ? '' : 'border border-slate-700'
              }`}>
                <ImageRevealDemo 
                  currentPalier={currentPalier}
                  isAutoPlay={isAutoPlay}
                />
              </div>

              {/* Section Tests Alternatifs */}
              <div className="mt-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-white">Approches Alternatives</h2>
                  <button
                    onClick={() => setShowAlternatives(!showAlternatives)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      showAlternatives
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                  >
                    {showAlternatives ? 'Masquer' : 'Afficher'} les tests
                  </button>
                </div>
                
                {showAlternatives && (
                  <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
                    <AlternativeTests currentPalier={currentPalier} />
                  </div>
                )}
              </div>
            </div>

            {/* Panneau de contrôle */}
            <div className="space-y-6">
              {/* Contrôles de palier */}
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
                <RevealControls
                  currentPalier={currentPalier}
                  setCurrentPalier={setCurrentPalier}
                  isAutoPlay={isAutoPlay}
                  setIsAutoPlay={setIsAutoPlay}
                />
              </div>

              {/* Informations sur le palier actuel */}
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
                <PalierInfo currentPalier={currentPalier} />
              </div>
            </div>
          </div>

          {/* Spécifications techniques */}
          <section className="mt-12 bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-6">Spécifications Techniques</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-slate-300">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Techniques Utilisées</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Flou progressif (blur/déblur)</li>
                  <li>• Désaturation contrôlée</li>
                  <li>• Masques de révélation dynamiques</li>
                  <li>• Simplification polygonale (low-poly)</li>
                  <li>• Filtres CSS avancés</li>
                  <li>• Canvas 2D avec traitement d'image</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Points de Contrôle</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Anonymité garantie jusqu'au palier 5 (50%)</li>
                  <li>• Progression naturelle et agréable</li>
                  <li>• Optimisation pour pré-calcul</li>
                  <li>• Tests utilisateurs intégrés</li>
                  <li>• Respect des guidelines ethniques</li>
                  <li>• Performance optimisée</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Fonctionnalités</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Navigation par clavier</li>
                  <li>• Mode auto-play intelligent</li>
                  <li>• Sélection directe de paliers</li>
                  <li>• Indicateurs visuels temps réel</li>
                  <li>• Analyse détaillée par palier</li>
                  <li>• Interface responsive</li>
                </ul>
              </div>
            </div>
            
            {/* Métriques temps réel */}
            <div className="mt-8 p-6 bg-slate-700/50 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-4">Métriques Temps Réel</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="bg-slate-600/50 rounded-lg p-3">
                  <div className="text-2xl font-bold text-blue-400">{currentPalier}</div>
                  <div className="text-xs text-slate-400">Palier Actuel</div>
                </div>
                <div className="bg-slate-600/50 rounded-lg p-3">
                  <div className="text-2xl font-bold text-green-400">{currentPalier <= 5 ? 'OUI' : 'NON'}</div>
                  <div className="text-xs text-slate-400">Anonyme</div>
                </div>
                <div className="bg-slate-600/50 rounded-lg p-3">
                  <div className="text-2xl font-bold text-yellow-400">{currentPalier * 10}%</div>
                  <div className="text-xs text-slate-400">Révélation</div>
                </div>
                <div className="bg-slate-600/50 rounded-lg p-3">
                  <div className="text-2xl font-bold text-purple-400">{isAutoPlay ? 'ON' : 'OFF'}</div>
                  <div className="text-xs text-slate-400">Auto-Play</div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
