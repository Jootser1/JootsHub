'use client';

import { useEffect, useRef } from 'react';

interface RevealControlsProps {
  currentPalier: number;
  setCurrentPalier: (palier: number | ((prev: number) => number)) => void;
  isAutoPlay: boolean;
  setIsAutoPlay: (autoPlay: boolean) => void;
}

export const RevealControls: React.FC<RevealControlsProps> = ({
  currentPalier,
  setCurrentPalier,
  isAutoPlay,
  setIsAutoPlay
}) => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Gestion de l'auto-play
  useEffect(() => {
    if (isAutoPlay) {
      intervalRef.current = setInterval(() => {
        setCurrentPalier((prev) => {
          if (prev >= 10) {
            setIsAutoPlay(false);
            return 10;
          }
          return prev + 1;
        });
      }, 2000); // Change de palier toutes les 2 secondes
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlay, setCurrentPalier, setIsAutoPlay]);

  const handlePreviousPalier = () => {
    if (currentPalier > 1) {
      setCurrentPalier(currentPalier - 1);
    }
  };

  const handleNextPalier = () => {
    if (currentPalier < 10) {
      setCurrentPalier(currentPalier + 1);
    }
  };

  const handlePalierSelect = (palier: number) => {
    setCurrentPalier(palier);
  };

  const handleAutoPlayToggle = () => {
    setIsAutoPlay(!isAutoPlay);
  };

  const resetToStart = () => {
    setCurrentPalier(1);
    setIsAutoPlay(false);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-white">Contrôles</h3>
      
      {/* Contrôles principaux */}
      <div className="space-y-4">
        {/* Navigation par boutons */}
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={handlePreviousPalier}
            disabled={currentPalier <= 1}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{currentPalier}/10</div>
            <div className="text-sm text-slate-400">{currentPalier * 10}%</div>
          </div>
          
          <button
            onClick={handleNextPalier}
            disabled={currentPalier >= 10}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Slider pour navigation rapide */}
        <div className="px-2">
          <input
            type="range"
            min="1"
            max="10"
            value={currentPalier}
            onChange={(e) => handlePalierSelect(parseInt(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(currentPalier - 1) * 11.11}%, #475569 ${(currentPalier - 1) * 11.11}%, #475569 100%)`
            }}
          />
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>1</span>
            <span>5</span>
            <span>10</span>
          </div>
        </div>

        {/* Sélection directe des paliers */}
        <div className="grid grid-cols-5 gap-2">
          {Array.from({ length: 10 }, (_, i) => i + 1).map((palier) => (
            <button
              key={palier}
              onClick={() => handlePalierSelect(palier)}
              className={`
                h-8 rounded text-sm font-medium transition-all
                ${currentPalier === palier
                  ? 'bg-blue-600 text-white shadow-lg scale-105'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }
                ${palier === 5 ? 'ring-2 ring-yellow-500 ring-opacity-50' : ''}
              `}
            >
              {palier}
            </button>
          ))}
        </div>
        
        {/* Indication du seuil critique */}
        <div className="text-xs text-yellow-400 text-center">
          ⚠️ Palier 5 = Seuil critique d'anonymité
        </div>
      </div>

      {/* Contrôles d'auto-play */}
      <div className="border-t border-slate-600 pt-4 space-y-4">
        <h4 className="font-semibold text-white">Auto-Play</h4>
        
        <div className="flex items-center justify-between">
          <button
            onClick={handleAutoPlayToggle}
            className={`
              flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all
              ${isAutoPlay
                ? 'bg-green-600 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }
            `}
          >
            {isAutoPlay ? (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Pause</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.5a2.5 2.5 0 110 5H9m0-5v5m0-5h4.5a2.5 2.5 0 110 5H12" />
                </svg>
                <span>Play</span>
              </>
            )}
          </button>
          
          <button
            onClick={resetToStart}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium bg-slate-700 text-slate-300 hover:bg-slate-600 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>Reset</span>
          </button>
        </div>
        
        {isAutoPlay && (
          <div className="text-sm text-slate-400">
            Progression automatique toutes les 2 secondes
          </div>
        )}
      </div>

      {/* Raccourcis clavier */}
      <div className="border-t border-slate-600 pt-4">
        <h4 className="font-semibold text-white mb-2">Raccourcis</h4>
        <div className="text-xs text-slate-400 space-y-1">
          <div>← → : Navigation entre paliers</div>
          <div>Espace : Play/Pause auto-play</div>
          <div>R : Reset au palier 1</div>
          <div>1-9,0 : Sélection directe palier</div>
        </div>
      </div>
    </div>
  );
}; 