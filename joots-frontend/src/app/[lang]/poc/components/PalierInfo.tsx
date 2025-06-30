'use client';

interface PalierInfoProps {
  currentPalier: number;
}

export const PalierInfo: React.FC<PalierInfoProps> = ({ currentPalier }) => {
  // Informations détaillées pour chaque palier
  const getPalierDetails = (palier: number) => {
    const details = [
      {
        name: "Palier 1",
        percentage: "10%",
        category: "Silhouette Abstraite",
        description: "Silhouette floue abstraite sans aucun détail reconnaissable",
        characteristics: [
          "Couleur gris moyen uniforme",
          "Flou maximal (25px)",
          "Aucun trait distinctif",
          "Forme générale seulement"
        ],
        techniques: ["Flou gaussien intense", "Désaturation complète", "Pixellisation 40px"],
        anonymity: "Anonymité complète garantie",
        color: "bg-red-500"
      },
      {
        name: "Palier 2", 
        percentage: "20%",
        category: "Silhouette Floue",
        description: "Silhouette floue avec nuances de gris légèrement variées",
        characteristics: [
          "Nuances de gris plus variées",
          "Flou important (20px)",
          "Forme générale plus définie",
          "Toujours aucun détail facial"
        ],
        techniques: ["Flou gaussien fort", "Désaturation complète", "Pixellisation 30px"],
        anonymity: "Anonymité complète garantie",
        color: "bg-red-400"
      },
      {
        name: "Palier 3",
        percentage: "30%", 
        category: "Formes Globales",
        description: "Formes globales du visage avec zones abstraites identifiables",
        characteristics: [
          "Ovale du visage visible",
          "Zones yeux/nez/bouche abstraites",
          "Aucun trait ethnique spécifique",
          "Flou modéré (16px)"
        ],
        techniques: ["Flou moyen", "Désaturation complète", "Pixellisation 20px"],
        anonymity: "Anonymité complète garantie",
        color: "bg-orange-500"
      },
      {
        name: "Palier 4",
        percentage: "40%",
        category: "Zones Identifiables", 
        description: "Zones faciales identifiables mais restent très abstraites",
        characteristics: [
          "Emplacement précis des traits",
          "Formes encore très simplifiées",
          "Monochromie maintenue",
          "Flou réduit (12px)"
        ],
        techniques: ["Flou léger", "Désaturation complète", "Simplification polygonale"],
        anonymity: "Anonymité complète garantie",
        color: "bg-orange-400"
      },
      {
        name: "Palier 5",
        percentage: "50%",
        category: "⚠️ SEUIL CRITIQUE",
        description: "Traits basiques nets mais anonymité ethnique préservée",
        characteristics: [
          "Forme générale nez visible",
          "Yeux et bouche identifiables",
          "Toujours en monochromie",
          "Aucune texture de peau"
        ],
        techniques: ["Flou minimal (8px)", "Désaturation complète", "Contraste augmenté"],
        anonymity: "⚠️ Dernière étape d'anonymité",
        color: "bg-yellow-500"
      },
      {
        name: "Palier 6",
        percentage: "60%",
        category: "Relief et Ombres",
        description: "Introduction légère d'ombres suggérant le relief",
        characteristics: [
          "Pommettes suggérées",
          "Creux des yeux visibles", 
          "Nuances gris variées",
          "Début de relief facial"
        ],
        techniques: ["Flou réduit (6px)", "Légère saturation (10%)", "Ombres douces"],
        anonymity: "Anonymité ethnique réduite",
        color: "bg-blue-400"
      },
      {
        name: "Palier 7",
        percentage: "70%",
        category: "Couleur Désaturée",
        description: "Introduction modérée de couleur de peau désaturée",
        characteristics: [
          "Couleur peau très désaturée",
          "Traits nets mais non détaillés",
          "Forme exacte des yeux/nez/bouche",
          "Cheveux encore indistincts"
        ],
        techniques: ["Flou léger (4px)", "Saturation 30%", "Couleurs naturelles faibles"],
        anonymity: "Possible identification ethnique",
        color: "bg-blue-500"
      },
      {
        name: "Palier 8",
        percentage: "80%",
        category: "Détails Fins",
        description: "Couleur plus fidèle avec début des détails fins",
        characteristics: [
          "Couleur peau plus réaliste",
          "Contour précis des yeux",
          "Forme des lèvres définie",
          "Sourcils commencent à apparaître"
        ],
        techniques: ["Flou minimal (2px)", "Saturation 60%", "Détails progressifs"],
        anonymity: "Identification possible",
        color: "bg-green-400"
      },
      {
        name: "Palier 9",
        percentage: "90%",
        category: "Quasi-Réaliste",
        description: "Couleurs réelles avec détails fins bien visibles",
        characteristics: [
          "Couleurs quasiment fidèles",
          "Iris des yeux visible",
          "Détails des cheveux",
          "Texture de peau apparente"
        ],
        techniques: ["Flou très léger (1px)", "Saturation 90%", "Détails complets"],
        anonymity: "Identification facile",
        color: "bg-green-500"
      },
      {
        name: "Palier 10",
        percentage: "100%",
        category: "Révélation Complète",
        description: "Image complète nette, détaillée et fidèle aux couleurs",
        characteristics: [
          "Netteté maximale",
          "Couleurs 100% fidèles",
          "Tous détails visibles",
          "Image originale complète"
        ],
        techniques: ["Aucun filtre", "Saturation complète", "Image native"],
        anonymity: "Aucune anonymité",
        color: "bg-green-600"
      }
    ];
    
    return details[palier - 1] || details[9];
  };

  const details = getPalierDetails(currentPalier);
  const isAnonymous = currentPalier <= 5;
  const isCritical = currentPalier === 5;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-white">Informations Palier</h3>
        <div className={`w-3 h-3 rounded-full ${details.color}`}></div>
      </div>

      {/* En-tête du palier */}
      <div className={`p-4 rounded-lg border-2 ${isCritical ? 'border-yellow-500 bg-yellow-500/10' : 'border-slate-600 bg-slate-700/30'}`}>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-bold text-white">{details.name}</h4>
          <span className="text-2xl font-bold text-white">{details.percentage}</span>
        </div>
        <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
          isCritical ? 'bg-yellow-500 text-black' : 'bg-slate-600 text-white'
        }`}>
          {details.category}
        </div>
      </div>

      {/* Description */}
      <div className="bg-slate-700/30 rounded-lg p-4">
        <h5 className="font-semibold text-white mb-2">Description</h5>
        <p className="text-slate-300 text-sm leading-relaxed">{details.description}</p>
      </div>

      {/* Caractéristiques */}
      <div className="bg-slate-700/30 rounded-lg p-4">
        <h5 className="font-semibold text-white mb-3">Caractéristiques</h5>
        <ul className="space-y-2">
          {details.characteristics.map((char, index) => (
            <li key={index} className="flex items-start space-x-2 text-sm">
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
              <span className="text-slate-300">{char}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Techniques utilisées */}
      <div className="bg-slate-700/30 rounded-lg p-4">
        <h5 className="font-semibold text-white mb-3">Techniques</h5>
        <div className="flex flex-wrap gap-2">
          {details.techniques.map((technique, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-slate-600 text-slate-200 text-xs rounded-md"
            >
              {technique}
            </span>
          ))}
        </div>
      </div>

      {/* Niveau d'anonymité */}
      <div className={`rounded-lg p-4 border-2 ${
        isAnonymous 
          ? isCritical 
            ? 'border-yellow-500 bg-yellow-500/10' 
            : 'border-green-500 bg-green-500/10'
          : 'border-red-500 bg-red-500/10'
      }`}>
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-lg">
            {isAnonymous ? (isCritical ? '⚠️' : '🛡️') : '🚨'}
          </span>
          <h5 className="font-semibold text-white">Niveau d'Anonymité</h5>
        </div>
        <p className={`text-sm font-medium ${
          isAnonymous 
            ? isCritical 
              ? 'text-yellow-300' 
              : 'text-green-300'
            : 'text-red-300'
        }`}>
          {details.anonymity}
        </p>
      </div>

      {/* Progression globale */}
      <div className="bg-slate-700/30 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <h5 className="font-semibold text-white">Progression</h5>
          <span className="text-slate-300 text-sm">{currentPalier}/10</span>
        </div>
        <div className="w-full bg-slate-600 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-500 ${
              isAnonymous ? 'bg-green-500' : 'bg-blue-500'
            }`}
            style={{ width: `${currentPalier * 10}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-slate-400 mt-1">
          <span>Anonyme</span>
          <span>Seuil</span>
          <span>Révélé</span>
        </div>
      </div>
    </div>
  );
}; 