'use client';

import { useState, useRef, useEffect } from 'react';

interface AlternativeTestsProps {
  currentPalier: number;
}

export const AlternativeTests: React.FC<AlternativeTestsProps> = ({ currentPalier }) => {
  const [selectedTest, setSelectedTest] = useState<'mosaic' | 'circle' | 'gradient' | 'geometric' | 'fourier' | 'hybrid'>('hybrid');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isLoadingNewImage, setIsLoadingNewImage] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const [currentImageId, setCurrentImageId] = useState<string>('');

  // Collection d'IDs d'images de visages pour les tests alternatifs
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

  // Fonction pour charger une nouvelle image aléatoire
  const loadRandomImage = () => {
    setIsLoadingNewImage(true);
    setImageLoaded(false);
    
    let newImageId;
    do {
      newImageId = faceImageIds[Math.floor(Math.random() * faceImageIds.length)];
    } while (newImageId === currentImageId && faceImageIds.length > 1);
    
    setCurrentImageId(newImageId);
    loadImage(newImageId);
  };

  // Fonction pour charger une image spécifique
  const loadImage = (imageId: string) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    // Gérer les images Unsplash dynamiques
    if (imageId.startsWith('unsplash-')) {
      // Pour les images Unsplash dynamiques, utiliser l'ID sans le préfixe
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
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      canvas.width = 400;
      canvas.height = 400;
      
      const isAlternate = imageId.includes('494790') || imageId.includes('552058') || imageId.startsWith('unsplash-');
      
      ctx.fillStyle = isAlternate ? '#e8d5c5' : '#f4d3b7';
      ctx.fillRect(0, 0, 400, 400);
      
      ctx.fillStyle = isAlternate ? '#d4b8a0' : '#e8c4a0';
      ctx.beginPath();
      ctx.ellipse(200, 200, 120, 160, 0, 0, 2 * Math.PI);
      ctx.fill();
      
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          img.src = url;
        }
      });
    };
  };

  // Charger l'image de test
  useEffect(() => {
    const defaultImageId = faceImageIds[0];
    setCurrentImageId(defaultImageId);
    loadImage(defaultImageId);
  }, []);

  // Fonction pour appliquer un filtre gaussien (simulation basses fréquences)
  const applyGaussianBlur = (imageData: ImageData, sigma: number): ImageData => {
    const data = new Uint8ClampedArray(imageData.data);
    const width = imageData.width;
    const height = imageData.height;
    const result = new ImageData(width, height);
    
    // Noyau gaussien simplifié
    const kernelSize = Math.ceil(sigma * 3) * 2 + 1;
    const kernel = [];
    let kernelSum = 0;
    
    for (let i = 0; i < kernelSize; i++) {
      const x = i - Math.floor(kernelSize / 2);
      const value = Math.exp(-(x * x) / (2 * sigma * sigma));
      kernel[i] = value;
      kernelSum += value;
    }
    
    // Normaliser le noyau
    for (let i = 0; i < kernelSize; i++) {
      kernel[i] /= kernelSum;
    }
    
    // Appliquer le flou horizontal puis vertical
    const temp = new Uint8ClampedArray(data.length);
    
    // Flou horizontal
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        let r = 0, g = 0, b = 0, a = 0;
        
        for (let k = 0; k < kernelSize; k++) {
          const px = Math.min(Math.max(x + k - Math.floor(kernelSize / 2), 0), width - 1);
          const idx = (y * width + px) * 4;
          const weight = kernel[k];
          
          r += data[idx] * weight;
          g += data[idx + 1] * weight;
          b += data[idx + 2] * weight;
          a += data[idx + 3] * weight;
        }
        
        const idx = (y * width + x) * 4;
        temp[idx] = r;
        temp[idx + 1] = g;
        temp[idx + 2] = b;
        temp[idx + 3] = a;
      }
    }
    
    // Flou vertical
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        let r = 0, g = 0, b = 0, a = 0;
        
        for (let k = 0; k < kernelSize; k++) {
          const py = Math.min(Math.max(y + k - Math.floor(kernelSize / 2), 0), height - 1);
          const idx = (py * width + x) * 4;
          const weight = kernel[k];
          
          r += temp[idx] * weight;
          g += temp[idx + 1] * weight;
          b += temp[idx + 2] * weight;
          a += temp[idx + 3] * weight;
        }
        
        const idx = (y * width + x) * 4;
        result.data[idx] = r;
        result.data[idx + 1] = g;
        result.data[idx + 2] = b;
        result.data[idx + 3] = a;
      }
    }
    
    return result;
  };

  // Effet de révélation par fréquences spatiales (Fourier)
  const applyFourierReveal = (ctx: CanvasRenderingContext2D, image: HTMLImageElement) => {
    const canvas = ctx.canvas;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Dessiner l'image originale
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    const originalData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    
    // Calculer les paramètres basés sur le palier
    const lowFreqWeight = Math.max(0, 1 - (currentPalier - 1) / 9); // 1 → 0
    const highFreqWeight = Math.min(1, (currentPalier - 1) / 9); // 0 → 1
    const blurSigma = Math.max(1, 15 - currentPalier * 1.4); // 15 → 1
    
    // Extraire les basses fréquences (flou gaussien)
    const lowFreqData = applyGaussianBlur(originalData, blurSigma);
    
    // Calculer les hautes fréquences (original - basses fréquences)
    const highFreqData = new ImageData(canvas.width, canvas.height);
    for (let i = 0; i < originalData.data.length; i += 4) {
      // Hautes fréquences = Original - Basses fréquences
      highFreqData.data[i] = originalData.data[i] - lowFreqData.data[i] + 128;
      highFreqData.data[i + 1] = originalData.data[i + 1] - lowFreqData.data[i + 1] + 128;
      highFreqData.data[i + 2] = originalData.data[i + 2] - lowFreqData.data[i + 2] + 128;
      highFreqData.data[i + 3] = 255;
    }
    
    // Mélanger les fréquences selon le palier
    const result = new ImageData(canvas.width, canvas.height);
    for (let i = 0; i < originalData.data.length; i += 4) {
      // Reconstruction: Basses fréquences + facteur * Hautes fréquences
      const lowR = lowFreqData.data[i];
      const lowG = lowFreqData.data[i + 1];
      const lowB = lowFreqData.data[i + 2];
      
      const highR = (highFreqData.data[i] - 128) * highFreqWeight;
      const highG = (highFreqData.data[i + 1] - 128) * highFreqWeight;
      const highB = (highFreqData.data[i + 2] - 128) * highFreqWeight;
      
      result.data[i] = Math.max(0, Math.min(255, lowR + highR));
      result.data[i + 1] = Math.max(0, Math.min(255, lowG + highG));
      result.data[i + 2] = Math.max(0, Math.min(255, lowB + highB));
      result.data[i + 3] = 255;
    }
    
    // Appliquer une désaturation pour les premiers paliers
    if (currentPalier <= 5) {
      const saturation = Math.max(0, (currentPalier - 1) / 4);
      for (let i = 0; i < result.data.length; i += 4) {
        const gray = 0.299 * result.data[i] + 0.587 * result.data[i + 1] + 0.114 * result.data[i + 2];
        result.data[i] = gray + (result.data[i] - gray) * saturation;
        result.data[i + 1] = gray + (result.data[i + 1] - gray) * saturation;
        result.data[i + 2] = gray + (result.data[i + 2] - gray) * saturation;
      }
    }
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.putImageData(result, 0, 0);
  };

  // Effet mosaïque 
  const applyMosaicEffect = (ctx: CanvasRenderingContext2D, image: HTMLImageElement) => {
    const canvas = ctx.canvas;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Taille des tuiles basée sur le palier
    const tileSize = Math.max(2, 50 - (currentPalier * 4));
    
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let y = 0; y < canvas.height; y += tileSize) {
      for (let x = 0; x < canvas.width; x += tileSize) {
        // Obtenir la couleur moyenne de la tuile
        let r = 0, g = 0, b = 0, count = 0;
        
        for (let dy = 0; dy < tileSize && y + dy < canvas.height; dy++) {
          for (let dx = 0; dx < tileSize && x + dx < canvas.width; dx++) {
            const pixelIndex = ((y + dy) * canvas.width + (x + dx)) * 4;
            r += data[pixelIndex];
            g += data[pixelIndex + 1];
            b += data[pixelIndex + 2];
            count++;
          }
        }
        
        r = Math.round(r / count);
        g = Math.round(g / count);
        b = Math.round(b / count);
        
        // Appliquer la désaturation selon le palier
        const saturation = Math.min(1, (currentPalier - 1) / 9);
        const gray = Math.round(0.299 * r + 0.587 * g + 0.114 * b);
        r = Math.round(gray + (r - gray) * saturation);
        g = Math.round(gray + (g - gray) * saturation);
        b = Math.round(gray + (b - gray) * saturation);
        
        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
        ctx.fillRect(x, y, tileSize, tileSize);
      }
    }
  };

  // Effet de révélation circulaire
  const applyCircleReveal = (ctx: CanvasRenderingContext2D, image: HTMLImageElement) => {
    const canvas = ctx.canvas;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Rayon basé sur le palier
    const maxRadius = Math.sqrt(canvas.width * canvas.width + canvas.height * canvas.height) / 2;
    const radius = (currentPalier / 10) * maxRadius;
    
    // Dessiner l'image floue en arrière-plan
    ctx.filter = `blur(${20 - (currentPalier * 2)}px) saturate(${currentPalier / 10})`;
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    
    // Créer un masque circulaire pour la zone nette
    ctx.save();
    ctx.filter = 'none';
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, radius, 0, 2 * Math.PI);
    ctx.clip();
    
    // Dessiner la version nette dans le cercle
    ctx.filter = `saturate(${Math.min(1, currentPalier / 8)})`;
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    ctx.restore();
  };

  // Effet de dégradé
  const applyGradientReveal = (ctx: CanvasRenderingContext2D, image: HTMLImageElement) => {
    const canvas = ctx.canvas;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Position du dégradé basée sur le palier
    const revealHeight = (currentPalier / 10) * canvas.height;
    
    // Image floue en haut
    ctx.save();
    ctx.rect(0, 0, canvas.width, canvas.height - revealHeight);
    ctx.clip();
    ctx.filter = `blur(${15 - currentPalier}px) saturate(0)`;
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    ctx.restore();
    
    // Image nette en bas
    if (revealHeight > 0) {
      ctx.save();
      ctx.rect(0, canvas.height - revealHeight, canvas.width, revealHeight);
      ctx.clip();
      ctx.filter = `saturate(${Math.min(1, currentPalier / 7)})`;
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      ctx.restore();
    }
    
    // Dégradé de transition
    const gradient = ctx.createLinearGradient(0, canvas.height - revealHeight - 20, 0, canvas.height - revealHeight + 20);
    gradient.addColorStop(0, 'rgba(30, 41, 59, 1)');
    gradient.addColorStop(1, 'rgba(30, 41, 59, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, canvas.height - revealHeight - 20, canvas.width, 40);
  };

  // Effet géométrique
  const applyGeometricReveal = (ctx: CanvasRenderingContext2D, image: HTMLImageElement) => {
    const canvas = ctx.canvas;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Nombre de polygones basé sur le palier
    const polygonCount = Math.max(50, 500 - (currentPalier * 40));
    
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Générer des triangles aléatoires
    for (let i = 0; i < polygonCount; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const size = Math.random() * 20 + 10;
      
      // Obtenir la couleur au centre du triangle
      const pixelIndex = (Math.floor(y) * canvas.width + Math.floor(x)) * 4;
      let r = data[pixelIndex] || 0;
      let g = data[pixelIndex + 1] || 0;
      let b = data[pixelIndex + 2] || 0;
      
      // Appliquer la désaturation
      const saturation = Math.min(1, (currentPalier - 1) / 8);
      const gray = Math.round(0.299 * r + 0.587 * g + 0.114 * b);
      r = Math.round(gray + (r - gray) * saturation);
      g = Math.round(gray + (g - gray) * saturation);
      b = Math.round(gray + (b - gray) * saturation);
      
      ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
      ctx.beginPath();
      ctx.moveTo(x, y - size);
      ctx.lineTo(x - size, y + size);
      ctx.lineTo(x + size, y + size);
      ctx.closePath();
      ctx.fill();
    }
  };

  // Fonction pour générer un visage "moyen" neutre (simulation eigenface base)
  const generateNeutralFace = (width: number, height: number): ImageData => {
    const neutralFace = new ImageData(width, height);
    const centerX = width / 2;
    const centerY = height / 2;
    
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * 4;
        
        // Distance du centre
        const distFromCenter = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
        const maxDist = Math.sqrt(centerX ** 2 + centerY ** 2);
        const normalizedDist = distFromCenter / maxDist;
        
        // Créer une forme ovale de base avec gradient
        const isInside = distFromCenter < (Math.min(width, height) * 0.35);
        const faceIntensity = isInside ? 
          Math.max(0, 1 - normalizedDist * 1.5) : 0;
        
        // Couleur neutre (beige moyen)
        const baseColor = 220 - (normalizedDist * 40);
        neutralFace.data[idx] = baseColor * faceIntensity + 180 * (1 - faceIntensity);     // R
        neutralFace.data[idx + 1] = (baseColor - 10) * faceIntensity + 175 * (1 - faceIntensity); // G  
        neutralFace.data[idx + 2] = (baseColor - 20) * faceIntensity + 170 * (1 - faceIntensity); // B
        neutralFace.data[idx + 3] = 255; // A
      }
    }
    
    return neutralFace;
  };

  // Fonction de morphage progressif entre deux images
  const morphImages = (base: ImageData, target: ImageData, ratio: number): ImageData => {
    const result = new ImageData(base.width, base.height);
    
    for (let i = 0; i < base.data.length; i += 4) {
      // Interpolation linéaire entre base et target
      result.data[i] = base.data[i] * (1 - ratio) + target.data[i] * ratio;         // R
      result.data[i + 1] = base.data[i + 1] * (1 - ratio) + target.data[i + 1] * ratio; // G
      result.data[i + 2] = base.data[i + 2] * (1 - ratio) + target.data[i + 2] * ratio; // B
      result.data[i + 3] = 255; // A
    }
    
    return result;
  };

  // Simulation de décomposition en eigenfaces (PCA simplifié)
  const applyEigenfaceReconstruction = (imageData: ImageData, components: number): ImageData => {
    const result = new ImageData(imageData.width, imageData.height);
    const totalComponents = 10; // Simulation de 10 composantes principales
    
    // Ratio de reconstruction basé sur le nombre de composantes
    const reconstructionRatio = components / totalComponents;
    
    for (let i = 0; i < imageData.data.length; i += 4) {
      // Simuler la reconstruction incrémentale
      // Plus on a de composantes, plus on se rapproche de l'image originale
      const avgColor = (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3;
      
      // Mélange entre moyenne (composantes faibles) et couleurs réelles (composantes fortes)
      result.data[i] = avgColor + (imageData.data[i] - avgColor) * reconstructionRatio;
      result.data[i + 1] = avgColor + (imageData.data[i + 1] - avgColor) * reconstructionRatio;
      result.data[i + 2] = avgColor + (imageData.data[i + 2] - avgColor) * reconstructionRatio;
      result.data[i + 3] = 255;
    }
    
    return result;
  };

  // Test Hybrid : Combinaison de toutes les techniques avancées
  const applyHybridReveal = (ctx: CanvasRenderingContext2D, image: HTMLImageElement) => {
    const canvas = ctx.canvas;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 1. Obtenir l'image originale
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    const originalData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    
    // 2. Paramètres évolutifs selon le palier
    const morphRatio = Math.min(1, (currentPalier - 1) / 9); // 0 → 1
    const eigenfaceComponents = Math.floor(currentPalier); // 1 → 10 composantes
    const freqBlend = Math.min(1, (currentPalier - 3) / 7); // Fréquences à partir du palier 3
    
    // 3. ÉTAPE 1 : Morphage progressif (visage neutre → visage cible)
    const neutralFace = generateNeutralFace(canvas.width, canvas.height);
    const morphedData = morphImages(neutralFace, originalData, morphRatio);
    
    // 4. ÉTAPE 2 : Reconstruction eigenface (composantes principales)
    const eigenfaceData = applyEigenfaceReconstruction(morphedData, eigenfaceComponents);
    
    // 5. ÉTAPE 3 : Séparation fréquentielle (basses → hautes fréquences)
    let finalData = eigenfaceData;
    
    if (currentPalier >= 3) {
      // Appliquer la logique de fréquences spatiales
      const blurSigma = Math.max(1, 12 - currentPalier * 1.2);
      const lowFreqData = applyGaussianBlur(eigenfaceData, blurSigma);
      
      // Calculer les hautes fréquences
      const highFreqData = new ImageData(canvas.width, canvas.height);
      for (let i = 0; i < eigenfaceData.data.length; i += 4) {
        highFreqData.data[i] = eigenfaceData.data[i] - lowFreqData.data[i] + 128;
        highFreqData.data[i + 1] = eigenfaceData.data[i + 1] - lowFreqData.data[i + 1] + 128;
        highFreqData.data[i + 2] = eigenfaceData.data[i + 2] - lowFreqData.data[i + 2] + 128;
        highFreqData.data[i + 3] = 255;
      }
      
      // Mélanger basses et hautes fréquences
      finalData = new ImageData(canvas.width, canvas.height);
      for (let i = 0; i < eigenfaceData.data.length; i += 4) {
        const lowR = lowFreqData.data[i];
        const lowG = lowFreqData.data[i + 1];
        const lowB = lowFreqData.data[i + 2];
        
        const highR = (highFreqData.data[i] - 128) * freqBlend;
        const highG = (highFreqData.data[i + 1] - 128) * freqBlend;
        const highB = (highFreqData.data[i + 2] - 128) * freqBlend;
        
        finalData.data[i] = Math.max(0, Math.min(255, lowR + highR));
        finalData.data[i + 1] = Math.max(0, Math.min(255, lowG + highG));
        finalData.data[i + 2] = Math.max(0, Math.min(255, lowB + highB));
        finalData.data[i + 3] = 255;
      }
    }
    
    // 6. ÉTAPE 4 : Contrôle final de saturation pour l'anonymat
    if (currentPalier <= 5) {
      const saturation = Math.max(0, (currentPalier - 1) / 4);
      for (let i = 0; i < finalData.data.length; i += 4) {
        const gray = 0.299 * finalData.data[i] + 0.587 * finalData.data[i + 1] + 0.114 * finalData.data[i + 2];
        finalData.data[i] = gray + (finalData.data[i] - gray) * saturation;
        finalData.data[i + 1] = gray + (finalData.data[i + 1] - gray) * saturation;
        finalData.data[i + 2] = gray + (finalData.data[i + 2] - gray) * saturation;
      }
    }
    
    // 7. Afficher le résultat final
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.putImageData(finalData, 0, 0);
  };

  // Redessiner quand le palier ou le test change
  useEffect(() => {
    if (!imageLoaded || !imageRef.current || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    switch (selectedTest) {
      case 'hybrid':
        applyHybridReveal(ctx, imageRef.current);
        break;
      case 'fourier':
        applyFourierReveal(ctx, imageRef.current);
        break;
      case 'mosaic':
        applyMosaicEffect(ctx, imageRef.current);
        break;
      case 'circle':
        applyCircleReveal(ctx, imageRef.current);
        break;
      case 'gradient':
        applyGradientReveal(ctx, imageRef.current);
        break;
      case 'geometric':
        applyGeometricReveal(ctx, imageRef.current);
        break;
    }
  }, [currentPalier, selectedTest, imageLoaded]);

  const testDescriptions = {
    hybrid: "🧬 Révélation multi-technique (morphage + eigenfaces + fréquences)",
    fourier: "Révélation par fréquences spatiales (basses → hautes)",
    mosaic: "Effet mosaïque avec tuiles progressivement plus petites",
    circle: "Révélation circulaire du centre vers l'extérieur",
    gradient: "Révélation par dégradé vertical",
    geometric: "Simplification géométrique avec triangles"
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-white">Tests Alternatifs</h3>
        <div className="flex items-center space-x-3">
          <button
            onClick={loadRandomImage}
            disabled={isLoadingNewImage}
            className="flex items-center space-x-1 px-2 py-1 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs rounded transition-colors"
          >
            {isLoadingNewImage ? (
              <>
                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                <span>Chargement...</span>
              </>
            ) : (
              <>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Nouvelle</span>
              </>
            )}
          </button>
          <div className="text-sm text-slate-400">Palier {currentPalier}/10</div>
        </div>
      </div>

      {/* Sélection du test */}
      <div className="grid grid-cols-3 gap-2">
        {Object.entries(testDescriptions).map(([key, description]) => (
          <button
            key={key}
            onClick={() => setSelectedTest(key as any)}
            className={`p-2 rounded-lg text-xs font-medium transition-all ${
              selectedTest === key
                ? 'bg-blue-600 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            {key === 'hybrid' && '🧬'} 
            {key === 'fourier' && '🌊'} 
            {key === 'mosaic' && '🔲'} 
            {key === 'circle' && '⭕'} 
            {key === 'gradient' && '📐'} 
            {key === 'geometric' && '🔺'}
            <div className="mt-1">{key.charAt(0).toUpperCase() + key.slice(1)}</div>
          </button>
        ))}
      </div>

      {/* Description du test actuel */}
      <div className="bg-slate-700/50 rounded-lg p-3">
        <p className="text-slate-300 text-sm">{testDescriptions[selectedTest]}</p>
        {selectedTest === 'hybrid' && (
          <div className="text-blue-400 text-xs mt-2 space-y-1">
            <p>🧠 <strong>Morphage:</strong> Visage neutre → Visage cible</p>
            <p>🔬 <strong>Eigenfaces:</strong> Reconstruction incrémentale (PCA)</p>
            <p>🌊 <strong>Fréquences:</strong> Basses → Hautes fréquences</p>
            <p>⚡ <strong>Contrôle maximal</strong> de l'anonymat ethnique</p>
          </div>
        )}
        {selectedTest === 'fourier' && (
          <p className="text-blue-400 text-xs mt-1">
            🧠 Préserve l'anonymat en révélant d'abord les formes générales avant les détails caractéristiques
          </p>
        )}
      </div>

      {/* Canvas pour les tests */}
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          className="w-full max-w-sm mx-auto rounded-lg border border-slate-600"
          style={{ aspectRatio: '1/1' }}
        />
        
        {(!imageLoaded || isLoadingNewImage) && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-700/90 rounded-lg">
            <div className="text-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mx-auto mb-2"></div>
              <p className="text-slate-400 text-sm">
                {isLoadingNewImage ? 'Chargement nouvelle image...' : 'Chargement...'}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Informations sur l'image actuelle */}
      {imageLoaded && (
        <div className="bg-slate-700/30 rounded-lg p-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">Image :</span>
            <span className="text-slate-300 font-mono">
              {currentImageId.split('-').pop()?.substring(0, 6)}...
            </span>
          </div>
        </div>
      )}

      {/* Paramètres du test actuel */}
      <div className="bg-slate-700/50 rounded-lg p-4">
        <h4 className="font-semibold text-white mb-2">Paramètres - {selectedTest.charAt(0).toUpperCase() + selectedTest.slice(1)}</h4>
        <div className="grid grid-cols-2 gap-4 text-xs">
          {selectedTest === 'hybrid' && (
            <>
              <div>
                <span className="text-slate-400">Morphage:</span>
                <span className="text-white ml-2">{Math.round(Math.min(1, (currentPalier - 1) / 9) * 100)}%</span>
              </div>
              <div>
                <span className="text-slate-400">Eigenfaces:</span>
                <span className="text-white ml-2">{Math.floor(currentPalier)}/10</span>
              </div>
              <div>
                <span className="text-slate-400">Fréquences:</span>
                <span className="text-white ml-2">{currentPalier >= 3 ? Math.round(Math.min(1, (currentPalier - 3) / 7) * 100) : 0}%</span>
              </div>
              <div>
                <span className="text-slate-400">Saturation:</span>
                <span className="text-white ml-2">{currentPalier <= 5 ? Math.round(Math.max(0, (currentPalier - 1) / 4) * 100) : 100}%</span>
              </div>
            </>
          )}
          {selectedTest === 'fourier' && (
            <>
              <div>
                <span className="text-slate-400">Basses freq:</span>
                <span className="text-white ml-2">{Math.round((1 - (currentPalier - 1) / 9) * 100)}%</span>
              </div>
              <div>
                <span className="text-slate-400">Hautes freq:</span>
                <span className="text-white ml-2">{Math.round(((currentPalier - 1) / 9) * 100)}%</span>
              </div>
              <div>
                <span className="text-slate-400">Sigma blur:</span>
                <span className="text-white ml-2">{Math.max(1, 15 - currentPalier * 1.4).toFixed(1)}</span>
              </div>
              <div>
                <span className="text-slate-400">Saturation:</span>
                <span className="text-white ml-2">{currentPalier <= 5 ? Math.round(Math.max(0, (currentPalier - 1) / 4) * 100) : 100}%</span>
              </div>
            </>
          )}
          {selectedTest === 'mosaic' && (
            <>
              <div>
                <span className="text-slate-400">Taille tuile:</span>
                <span className="text-white ml-2">{Math.max(2, 50 - (currentPalier * 4))}px</span>
              </div>
              <div>
                <span className="text-slate-400">Saturation:</span>
                <span className="text-white ml-2">{Math.round(((currentPalier - 1) / 9) * 100)}%</span>
              </div>
            </>
          )}
          {selectedTest === 'circle' && (
            <>
              <div>
                <span className="text-slate-400">Rayon révélé:</span>
                <span className="text-white ml-2">{Math.round((currentPalier / 10) * 100)}%</span>
              </div>
              <div>
                <span className="text-slate-400">Flou ext:</span>
                <span className="text-white ml-2">{20 - (currentPalier * 2)}px</span>
              </div>
            </>
          )}
          {selectedTest === 'gradient' && (
            <>
              <div>
                <span className="text-slate-400">Zone révélée:</span>
                <span className="text-white ml-2">{Math.round((currentPalier / 10) * 100)}%</span>
              </div>
              <div>
                <span className="text-slate-400">Flou haut:</span>
                <span className="text-white ml-2">{15 - currentPalier}px</span>
              </div>
            </>
          )}
          {selectedTest === 'geometric' && (
            <>
              <div>
                <span className="text-slate-400">Polygones:</span>
                <span className="text-white ml-2">{Math.max(50, 500 - (currentPalier * 40))}</span>
              </div>
              <div>
                <span className="text-slate-400">Saturation:</span>
                <span className="text-white ml-2">{Math.round(((currentPalier - 1) / 8) * 100)}%</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}; 