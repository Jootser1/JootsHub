'use client';

import { useEffect, useRef, useState } from 'react';
import { ImageGallery } from './ImageGallery';

interface ImageRevealDemoProps {
  currentPalier: number;
  isAutoPlay: boolean;
}

export const ImageRevealDemo: React.FC<ImageRevealDemoProps> = ({ 
  currentPalier, 
  isAutoPlay 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isLoadingNewImage, setIsLoadingNewImage] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const [currentImageId, setCurrentImageId] = useState<string>('');

  // Collection d'IDs d'images de visages sur Unsplash pour la variété
  const faceImageIds = [
    // Diversité ethnique et de genre équilibrée
    'photo-1507003211169-0a1dd7228f2d', // Homme blanc jeune
    'photo-1494790108755-2616b332c81b', // Femme blanche jeune
    'photo-1521572267360-ee0c2909d518', // Homme noir jeune
    'photo-1517841905240-472988babdf9', // Femme noire jeune
    'photo-1582750433449-648ed127bb54', // Homme arabe jeune
    'photo-1509909756405-be0199881695', // Femme arabe jeune
    'photo-1624298357597-fd92dfbec01d', // Homme asiatique jeune
    'photo-1519648023493-d82b5f8d7b8a', // Femme asiatique jeune
    'photo-1535713875002-d1d0cf377fde', // Homme blanc âgé
    'photo-1595152772835-219674b2a8a6', // Femme blanche âgée
    'photo-1559526324-593bc54d88ae', // Homme noir âgé
    'photo-1573496359142-b8d87734a5a2', // Femme noire âgée
    'photo-1578662996442-48f60103fc96', // Homme arabe âgé
    'photo-1551836022-d5c2a2d6a71c', // Femme arabe âgée
    'photo-1571769929831-52f8d1299d9d', // Homme asiatique âgé
    'photo-1571771894228-90d7dd6ec040', // Femme asiatique âgée
    'photo-1552058544-f2b08422138a', // Homme blanc jeune (alt)
    'photo-1531746020798-e6953c6e8e04', // Femme blanche jeune (alt)
    'photo-1519085360753-af0119f7cbe7', // Homme noir jeune (alt)
    'photo-1531123897727-8f129e1688ce'  // Femme noire jeune (alt)
  ];

  // Configuration des paliers selon les spécifications
  const getPalierConfig = (palier: number) => {
    const configs = [
      { // Palier 1 (10%)
        blur: 25,
        saturation: 0,
        brightness: 0.7,
        contrast: 0.3,
        description: "Silhouette floue abstraite, gris uniforme"
      },
      { // Palier 2 (20%)
        blur: 20,
        saturation: 0,
        brightness: 0.75,
        contrast: 0.4,
        description: "Silhouette floue, nuances de gris"
      },
      { // Palier 3 (30%)
        blur: 16,
        saturation: 0,
        brightness: 0.8,
        contrast: 0.5,
        description: "Formes globales du visage, très abstraites"
      },
      { // Palier 4 (40%)
        blur: 12,
        saturation: 0,
        brightness: 0.85,
        contrast: 0.6,
        description: "Zones yeux/nez/bouche identifiables mais abstraites"
      },
      { // Palier 5 (50%) - SEUIL CRITIQUE
        blur: 8,
        saturation: 0,
        brightness: 0.9,
        contrast: 0.7,
        description: "Traits basiques nets, monochromie neutre"
      },
      { // Palier 6 (60%)
        blur: 6,
        saturation: 0.1,
        brightness: 0.95,
        contrast: 0.8,
        description: "Début d'ombres et relief, nuances variées"
      },
      { // Palier 7 (70%)
        blur: 4,
        saturation: 0.3,
        brightness: 1,
        contrast: 0.9,
        description: "Introduction couleur de peau désaturée"
      },
      { // Palier 8 (80%)
        blur: 2,
        saturation: 0.6,
        brightness: 1,
        contrast: 1,
        description: "Couleur plus fidèle, détails fins commencent"
      },
      { // Palier 9 (90%)
        blur: 1,
        saturation: 0.9,
        brightness: 1,
        contrast: 1,
        description: "Couleurs réelles, détails fins visibles"
      },
      { // Palier 10 (100%)
        blur: 0,
        saturation: 1,
        brightness: 1,
        contrast: 1,
        description: "Révélation complète, image nette et détaillée"
      }
    ];
    return configs[palier - 1] || configs[9];
  };

  // Fonction pour charger une nouvelle image aléatoire
  const loadRandomImage = () => {
    setIsLoadingNewImage(true);
    setImageLoaded(false);
    
    // Sélectionner un ID d'image aléatoire différent de l'actuel
    let newImageId;
    do {
      newImageId = faceImageIds[Math.floor(Math.random() * faceImageIds.length)];
    } while (newImageId === currentImageId && faceImageIds.length > 1);
    
    setCurrentImageId(newImageId);
    loadImage(newImageId);
  };

  // Fonction pour charger une image spécifique (depuis la galerie)
  const handleImageSelect = (imageId: string) => {
    if (imageId !== currentImageId) {
      setIsLoadingNewImage(true);
      setImageLoaded(false);
      setCurrentImageId(imageId);
      loadImage(imageId);
    }
  };

  // Fonction pour charger une image spécifique
  const loadImage = (imageId: string) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    // Gérer les images Unsplash dynamiques
    if (imageId.startsWith('unsplash-')) {
      // Pour les images Unsplash dynamiques, nous devons utiliser l'URL complète
      // qui sera fournie par la galerie. Pour l'instant, utiliser l'ID sans le préfixe
      const actualId = imageId.replace('unsplash-', '');
      img.src = `https://images.unsplash.com/${actualId}?w=400&h=400&fit=crop&crop=face`;
    } else {
      // Images statiques existantes
      img.src = `https://images.unsplash.com/${imageId}?w=400&h=400&fit=crop&crop=face`;
    }
    
    img.onload = () => {
      imageRef.current = img;
      setImageLoaded(true);
      setIsLoadingNewImage(false);
    };
    
    img.onerror = () => {
      // Fallback: créer une image de test programmatiquement
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      canvas.width = 400;
      canvas.height = 400;
      
      // Dessiner un visage simple pour la démo avec variation selon l'ID
      const isAlternate = imageId.includes('494790') || imageId.includes('552058') || imageId.startsWith('unsplash-');
      
      ctx.fillStyle = isAlternate ? '#e8d5c5' : '#f4d3b7';
      ctx.fillRect(0, 0, 400, 400);
      
      // Visage ovale
      ctx.fillStyle = isAlternate ? '#d4b8a0' : '#e8c4a0';
      ctx.beginPath();
      ctx.ellipse(200, 200, 120, 160, 0, 0, 2 * Math.PI);
      ctx.fill();
      
      // Yeux
      ctx.fillStyle = '#333';
      ctx.beginPath();
      ctx.ellipse(170, 170, 15, 20, 0, 0, 2 * Math.PI);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(230, 170, 15, 20, 0, 0, 2 * Math.PI);
      ctx.fill();
      
      // Nez
      ctx.strokeStyle = isAlternate ? '#c4a074' : '#d4a574';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(200, 190);
      ctx.lineTo(195, 210);
      ctx.moveTo(195, 210);
      ctx.lineTo(205, 210);
      ctx.stroke();
      
      // Bouche
      ctx.strokeStyle = isAlternate ? '#976c5a' : '#a67c5a';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(200, 240, 20, 0, Math.PI);
      ctx.stroke();
      
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          img.src = url;
        }
      });
    };
  };

  // Fonction pour appliquer les effets sur le canvas
  const applyEffects = (ctx: CanvasRenderingContext2D, image: HTMLImageElement, config: any) => {
    const canvas = ctx.canvas;
    
    // Nettoyer le canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Appliquer les filtres CSS
    ctx.filter = `
      blur(${config.blur}px)
      saturate(${config.saturation})
      brightness(${config.brightness})
      contrast(${config.contrast})
    `;
    
    // Dessiner l'image
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    
    // Effet de pixellisation/low-poly pour les premiers paliers
    if (currentPalier <= 3) {
      applyLowPolyEffect(ctx, canvas.width, canvas.height);
    }
  };

  // Effet low-poly/pixellisation pour les premiers paliers
  const applyLowPolyEffect = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    const blockSize = currentPalier === 1 ? 40 : currentPalier === 2 ? 30 : 20;
    
    for (let y = 0; y < height; y += blockSize) {
      for (let x = 0; x < width; x += blockSize) {
        const pixelIndex = (y * width + x) * 4;
        const r = data[pixelIndex];
        const g = data[pixelIndex + 1];
        const b = data[pixelIndex + 2];
        
        // Convertir en gris pour les premiers paliers
        const gray = Math.round(0.299 * r + 0.587 * g + 0.114 * b);
        
        ctx.fillStyle = `rgb(${gray}, ${gray}, ${gray})`;
        ctx.fillRect(x, y, blockSize, blockSize);
      }
    }
  };

  // Initialiser l'image de démonstration
  useEffect(() => {
    const defaultImageId = faceImageIds[0];
    setCurrentImageId(defaultImageId);
    loadImage(defaultImageId);
  }, []);

  // Redessiner quand le palier change
  useEffect(() => {
    if (!imageLoaded || !imageRef.current || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const config = getPalierConfig(currentPalier);
    applyEffects(ctx, imageRef.current, config);
  }, [currentPalier, imageLoaded]);

  const config = getPalierConfig(currentPalier);

  return (
    <div className="space-y-6">
      {/* En-tête avec palier actuel */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">
          Palier {currentPalier}/10 ({currentPalier * 10}%)
        </h2>
        <div className="flex items-center space-x-3">
          {/* Bouton pour ouvrir la galerie */}
          <button
            onClick={() => setShowGallery(true)}
            className="flex items-center space-x-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <span>Galerie</span>
          </button>

          {/* Bouton pour charger une nouvelle image */}
          <button
            onClick={loadRandomImage}
            disabled={isLoadingNewImage}
            className="flex items-center space-x-2 px-3 py-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm rounded-lg transition-colors"
          >
            {isLoadingNewImage ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Chargement...</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Aléatoire</span>
              </>
            )}
          </button>
          
          {isAutoPlay && (
            <div className="flex items-center space-x-2 text-green-400">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm">Auto-play</span>
            </div>
          )}
        </div>
      </div>

      {/* Zone d'affichage de l'image */}
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          className="w-full max-w-md mx-auto rounded-xl border-2 border-slate-600 shadow-2xl"
          style={{ aspectRatio: '1/1' }}
        />
        
        {(!imageLoaded || isLoadingNewImage) && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-700/90 rounded-xl">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
              <p className="text-slate-300">
                {isLoadingNewImage ? 'Chargement nouvelle image...' : 'Chargement de l\'image...'}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Galerie d'images */}
      <ImageGallery
        isVisible={showGallery}
        onClose={() => setShowGallery(false)}
        currentImageId={currentImageId}
        onImageSelect={handleImageSelect}
      />

      {/* Informations sur l'image actuelle */}
      {imageLoaded && (
        <div className="bg-slate-700/30 rounded-lg p-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Image actuelle :</span>
            <div className="flex items-center space-x-2">
              <span className="text-slate-300 font-mono text-xs">
                {currentImageId.split('-').pop()?.substring(0, 8)}...
              </span>
              <button
                onClick={() => setShowGallery(true)}
                className="text-blue-400 hover:text-blue-300 text-xs underline"
              >
                Changer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Description du palier actuel */}
      <div className="bg-slate-700/50 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-white mb-2">
          Caractéristiques du palier {currentPalier}
        </h3>
        <p className="text-slate-300 mb-3">{config.description}</p>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-slate-400">Flou:</span>
            <span className="text-white ml-2">{config.blur}px</span>
          </div>
          <div>
            <span className="text-slate-400">Saturation:</span>
            <span className="text-white ml-2">{Math.round(config.saturation * 100)}%</span>
          </div>
          <div>
            <span className="text-slate-400">Luminosité:</span>
            <span className="text-white ml-2">{Math.round(config.brightness * 100)}%</span>
          </div>
          <div>
            <span className="text-slate-400">Contraste:</span>
            <span className="text-white ml-2">{Math.round(config.contrast * 100)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}; 