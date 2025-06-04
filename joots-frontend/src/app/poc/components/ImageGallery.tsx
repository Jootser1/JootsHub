'use client';

import { useState, useMemo, useCallback } from 'react';

interface ImageGalleryProps {
  onImageSelect: (imageId: string) => void;
  currentImageId: string;
  isVisible: boolean;
  onClose: () => void;
}

interface ImageData {
  id: string;
  description: string;
  category: string;
  url?: string;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({
  onImageSelect,
  currentImageId,
  isVisible,
  onClose
}) => {
  const [loadingImages, setLoadingImages] = useState<Set<string>>(new Set());
  const [isFetchingNewImages, setIsFetchingNewImages] = useState(false);
  const [dynamicImages, setDynamicImages] = useState<ImageData[]>([]);
  const [useUnsplashImages, setUseUnsplashImages] = useState(false);

  // Termes de recherche pour maintenir la diversité
  const diversitySearchTerms = [
    'portrait man young face headshot',
    'portrait woman young face headshot',
    'portrait elderly man face headshot',
    'portrait elderly woman face headshot',
    'portrait asian man face headshot',
    'portrait asian woman face headshot',
    'portrait black man face headshot',
    'portrait black woman face headshot',
    'portrait hispanic man face headshot',
    'portrait hispanic woman face headshot',
    'portrait middle eastern man face',
    'portrait middle eastern woman face',
    'portrait caucasian man professional',
    'portrait caucasian woman professional',
    'portrait diverse face headshot',
    'portrait multicultural face headshot'
  ];

  // Fonction pour fetcher de nouvelles images depuis Unsplash
  const fetchUnsplashImages = useCallback(async () => {
    setIsFetchingNewImages(true);
    
    try {
      const newImages: ImageData[] = [];
      
      // Fetcher 2-3 images par terme de recherche pour avoir de la variété
      for (let i = 0; i < Math.min(6, diversitySearchTerms.length); i++) {
        const searchTerm = diversitySearchTerms[i];
        const randomPage = Math.floor(Math.random() * 10) + 1; // Pages 1-10 pour variété
        
        try {
          const response = await fetch(
            `https://api.unsplash.com/search/photos?query=${encodeURIComponent(searchTerm)}&page=${randomPage}&per_page=3&orientation=portrait&content_filter=high`,
            {
              headers: {
                'Authorization': 'Client-ID 8f6v6z5iG3Y-l2E6rQzJXXq0K2S8L1h1a6MqE_eJTlw' // Clé publique Unsplash de démo
              }
            }
          );
          
          if (response.ok) {
            const data = await response.json();
            
            // Prendre 1-2 images de cette recherche
            const selectedPhotos = data.results.slice(0, 2);
            
            selectedPhotos.forEach((photo: any, index: number) => {
              newImages.push({
                id: `unsplash-${photo.id}`,
                description: `${searchTerm.split(' ')[1] || 'Personne'} ${searchTerm.split(' ')[2] || ''} (Unsplash)`,
                category: `unsplash-${i}`,
                url: photo.urls.regular
              });
            });
          }
        } catch (error) {
          console.warn(`Erreur pour le terme "${searchTerm}":`, error);
        }
        
        // Petit délai pour éviter de surcharger l'API
        await new Promise(resolve => setTimeout(resolve, 200));
      }
      
      if (newImages.length > 0) {
        // Mélanger les nouvelles images
        const shuffledImages = newImages.sort(() => 0.5 - Math.random());
        setDynamicImages(shuffledImages.slice(0, 12)); // Garder 12 images max
        setUseUnsplashImages(true);
      } else {
        throw new Error('Aucune image trouvée');
      }
      
    } catch (error) {
      console.error('Erreur lors du fetch Unsplash:', error);
      alert('Erreur lors du chargement des nouvelles images. Vérifiez votre connexion internet.');
    } finally {
      setIsFetchingNewImages(false);
    }
  }, []);

  // Collections d'images organisées par diversité (images de base)
  const imageCollections = {
    // Hommes blancs
    hommesBlancsJeunes: [
      { id: 'photo-1507003211169-0a1dd7228f2d', description: 'Homme blanc, jeune, souriant' },
      { id: 'photo-1552058544-f2b08422138a', description: 'Homme blanc, jeune, barbe' },
      { id: 'photo-1506277886164-e25aa3f4ef7f', description: 'Homme blanc, jeune, naturel' },
      { id: 'photo-1472099645785-5658abf4ff4e', description: 'Homme blanc, jeune, expression douce' },
      { id: 'photo-1500648767791-00dcc994a43e', description: 'Homme blanc, jeune, professionnel' },
      { id: 'photo-1566492031773-4f4e44671d66', description: 'Homme blanc, jeune, décontracté' }
    ],
    hommesBlancsAges: [
      { id: 'photo-1535713875002-d1d0cf377fde', description: 'Homme blanc, âgé, confiant' },
      { id: 'photo-1582750433449-648ed127bb54', description: 'Homme blanc, âgé, sage' },
      { id: 'photo-1560250097-0b93528c311a', description: 'Homme blanc, âgé, expérimenté' }
    ],
    
    // Femmes blanches
    femmesBlanchesJeunes: [
      { id: 'photo-1494790108755-2616b332c81b', description: 'Femme blanche, jeune, souriante' },
      { id: 'photo-1531746020798-e6953c6e8e04', description: 'Femme blanche, jeune, blonde' },
      { id: 'photo-1544005313-94ddf0286df2', description: 'Femme blanche, jeune, élégante' },
      { id: 'photo-1463453091185-61582044d556', description: 'Femme blanche, jeune, yeux verts' },
      { id: 'photo-1524504388940-b1c1722653e1', description: 'Femme blanche, jeune, naturelle' }
    ],
    femmesBlanchesAges: [
      { id: 'photo-1595152772835-219674b2a8a6', description: 'Femme blanche, âgée, sagesse' },
      { id: 'photo-1551836022-deb4988cc6c0', description: 'Femme blanche, âgée, expérience' }
    ],
    
    // Hommes noirs
    hommesNoirsJeunes: [
      { id: 'photo-1521572267360-ee0c2909d518', description: 'Homme noir, jeune, souriant' },
      { id: 'photo-1519085360753-af0119f7cbe7', description: 'Homme noir, jeune, confiant' },
      { id: 'photo-1558618666-fcd25c85cd64', description: 'Homme noir, jeune, professionnel' },
      { id: 'photo-1571019613454-1cb2f99b2d8b', description: 'Homme noir, jeune, décontracté' }
    ],
    hommesNoirsAges: [
      { id: 'photo-1559526324-593bc54d88ae', description: 'Homme noir, âgé, sage' },
      { id: 'photo-1558618666-fcd25c85cd64', description: 'Homme noir, âgé, expérience' }
    ],
    
    // Femmes noires
    femmesNoiresJeunes: [
      { id: 'photo-1517841905240-472988babdf9', description: 'Femme noire, jeune, éclatante' },
      { id: 'photo-1531123897727-8f129e1688ce', description: 'Femme noire, jeune, souriante' },
      { id: 'photo-1580489944761-15a19d654956', description: 'Femme noire, jeune, naturelle' },
      { id: 'photo-1594824672681-c7a5c95ab085', description: 'Femme noire, jeune, professionnelle' }
    ],
    femmesNoiresAges: [
      { id: 'photo-1573496359142-b8d87734a5a2', description: 'Femme noire, âgée, sagesse' },
      { id: 'photo-1585559700434-4d0b0e60b0fb', description: 'Femme noire, âgée, expérience' }
    ],
    
    // Hommes arabes/moyen-orientaux
    hommesArabesJeunes: [
      { id: 'photo-1582750433449-648ed127bb54', description: 'Homme arabe, jeune, intelligent' },
      { id: 'photo-1525879000488-bff3b1c63ef2', description: 'Homme arabe, jeune, confiant' },
      { id: 'photo-1603415526960-f7e0328c63b1', description: 'Homme arabe, jeune, professionnel' }
    ],
    hommesArabesAges: [
      { id: 'photo-1578662996442-48f60103fc96', description: 'Homme arabe, âgé, sage' }
    ],
    
    // Femmes arabes/moyen-orientales
    femmesArabesJeunes: [
      { id: 'photo-1509909756405-be0199881695', description: 'Femme arabe, jeune, élégante' },
      { id: 'photo-1573496359142-b8d87734a5a2', description: 'Femme arabe, jeune, professionnelle' }
    ],
    femmesArabesAges: [
      { id: 'photo-1551836022-d5c2a2d6a71c', description: 'Femme arabe, âgée, sagesse' }
    ],
    
    // Hommes asiatiques (chinois/indiens)
    hommesAsiatiquesJeunes: [
      { id: 'photo-1624298357597-fd92dfbec01d', description: 'Homme asiatique, jeune, moderne' },
      { id: 'photo-1582233479366-6d38bc390a08', description: 'Homme asiatique, jeune, souriant' },
      { id: 'photo-1601455763557-db1bea8a9a5a', description: 'Homme asiatique, jeune, professionnel' }
    ],
    hommesAsiatiquesAges: [
      { id: 'photo-1571769929831-52f8d1299d9d', description: 'Homme asiatique, âgé, sage' }
    ],
    
    // Femmes asiatiques (chinoises/indiennes)
    femmesAsiatiquesJeunes: [
      { id: 'photo-1519648023493-d82b5f8d7b8a', description: 'Femme asiatique, jeune, bouclée' },
      { id: 'photo-1595211877493-41a4e5cd4b12', description: 'Femme asiatique, jeune, souriante' },
      { id: 'photo-1578662996442-48f60103fc96', description: 'Femme asiatique, jeune, naturelle' }
    ],
    femmesAsiatiquesAges: [
      { id: 'photo-1571771894228-90d7dd6ec040', description: 'Femme asiatique, âgée, sagesse' }
    ]
  };

  // Génération dynamique d'une galerie équilibrée
  const galleryImages = useMemo(() => {
    // Si on utilise les images Unsplash dynamiques, les retourner
    if (useUnsplashImages && dynamicImages.length > 0) {
      return dynamicImages;
    }

    // Sinon, utiliser la logique existante avec les images statiques
    const balancedGallery: ImageData[] = [];
    
    // Fonction pour sélectionner aléatoirement N éléments d'un tableau
    const getRandomItems = (arr: any[], count: number): any[] => {
      const shuffled = [...arr].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, Math.min(count, arr.length));
    };

    // Sélectionner 1 image de chaque catégorie pour équilibrer
    Object.entries(imageCollections).forEach(([category, images]) => {
      const selected = getRandomItems(images, 1);
      balancedGallery.push(...selected.map(img => ({
        ...img,
        category: category
      })));
    });

    // Ajouter quelques images supplémentaires pour avoir une galerie plus fournie (12-15 images)
    const additionalSlots = 12 - balancedGallery.length;
    if (additionalSlots > 0) {
      const allImages = Object.values(imageCollections).flat();
      const usedIds = new Set(balancedGallery.map(img => img.id));
      const availableImages = allImages.filter(img => !usedIds.has(img.id));
      const additional = getRandomItems(availableImages, additionalSlots);
      
      balancedGallery.push(...additional.map(img => ({
        ...img,
        category: 'supplémentaire'
      })));
    }

    // Mélanger la galerie finale
    return balancedGallery.sort(() => 0.5 - Math.random());
  }, [useUnsplashImages, dynamicImages]); // Se régénère quand on change de source

  const handleImageSelect = (imageId: string) => {
    setLoadingImages(prev => new Set(prev).add(imageId));
    onImageSelect(imageId);
    setTimeout(() => {
      setLoadingImages(prev => {
        const newSet = new Set(prev);
        newSet.delete(imageId);
        return newSet;
      });
      onClose();
    }, 1000);
  };

  // Fonction pour revenir aux images par défaut
  const useDefaultImages = () => {
    setUseUnsplashImages(false);
    setDynamicImages([]);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-800 rounded-2xl border border-slate-600 max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* En-tête */}
        <div className="flex items-center justify-between p-6 border-b border-slate-600">
          <div>
            <h3 className="text-xl font-bold text-white">
              {useUnsplashImages ? 'Galerie Unsplash Dynamique' : 'Galerie Diversifiée'}
            </h3>
            <p className="text-sm text-slate-400 mt-1">
              {useUnsplashImages 
                ? 'Images fraîches depuis Unsplash API' 
                : 'Sélection équilibrée : genres, âges, ethnicités'
              }
            </p>
          </div>
          <div className="flex items-center space-x-3">
            {/* Bouton pour fetcher nouvelles images Unsplash */}
            <button
              onClick={fetchUnsplashImages}
              disabled={isFetchingNewImages}
              className="flex items-center space-x-2 px-3 py-2 bg-orange-600 hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm rounded-lg transition-colors"
            >
              {isFetchingNewImages ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Recherche...</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span>Nouvelles Images</span>
                </>
              )}
            </button>

            {/* Bouton pour revenir aux images par défaut */}
            {useUnsplashImages && (
              <button
                onClick={useDefaultImages}
                className="flex items-center space-x-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                </svg>
                <span>Images par défaut</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-700 hover:bg-slate-600 text-white transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Grille d'images */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryImages.map((image, index) => {
              const isSelected = currentImageId === image.id;
              const isLoading = loadingImages.has(image.id);
              
              return (
                <div
                  key={`${image.id}-${index}`}
                  className={`relative group cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                    isSelected 
                      ? 'border-blue-500 ring-2 ring-blue-500/50' 
                      : 'border-slate-600 hover:border-slate-500'
                  }`}
                  onClick={() => !isLoading && handleImageSelect(image.id)}
                >
                  {/* Image */}
                  <div className="aspect-square bg-slate-700 relative">
                    <img
                      src={image.url || `https://images.unsplash.com/${image.id}?w=200&h=200&fit=crop&crop=face`}
                      alt={image.description}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    
                    {/* Badge Unsplash */}
                    {image.id.startsWith('unsplash-') && (
                      <div className="absolute top-2 left-2">
                        <div className="bg-orange-500 text-white text-xs px-2 py-1 rounded">
                          Unsplash
                        </div>
                      </div>
                    )}
                    
                    {/* Overlay */}
                    <div className={`absolute inset-0 transition-opacity ${
                      isSelected ? 'bg-blue-600/20' : 'bg-black/0 group-hover:bg-black/20'
                    }`}>
                      {isSelected && (
                        <div className="absolute top-2 right-2">
                          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        </div>
                      )}
                      
                      {isLoading && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <div className="p-2 bg-slate-700/50">
                    <p className="text-xs text-slate-300 truncate">{image.description}</p>
                    <p className="text-xs text-slate-500 font-mono mt-1">
                      {image.id.split('-').pop()?.substring(0, 6)}...
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer avec statistiques de diversité */}
        <div className="border-t border-slate-600 p-4 bg-slate-800/50">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-slate-400">
            <div className="text-center">
              <div className="font-semibold text-white">
                {galleryImages.filter(img => img.description.includes('Homme') || img.description.includes('man')).length}
              </div>
              <div>Hommes</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-white">
                {galleryImages.filter(img => img.description.includes('Femme') || img.description.includes('woman')).length}
              </div>
              <div>Femmes</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-white">
                {galleryImages.filter(img => img.description.includes('jeune') || img.description.includes('young')).length}
              </div>
              <div>Jeunes</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-white">
                {galleryImages.filter(img => img.description.includes('âgé') || img.description.includes('elderly')).length}
              </div>
              <div>Âgés</div>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm text-slate-400 mt-3 pt-3 border-t border-slate-700">
            <span>
              {galleryImages.length} images • 
              {useUnsplashImages ? ' Images Unsplash fraîches' : ' Diversité équilibrée'}
            </span>
            <span>
              {useUnsplashImages ? '🌐 Connecté à Unsplash' : '🔄 Renouvelée à chaque rechargement'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}; 