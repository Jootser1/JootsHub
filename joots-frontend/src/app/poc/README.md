# POC - Paliers de Révélation Progressive

## Objectif

Ce POC permet de tester différentes approches pour créer des paliers de révélation progressive d'images, avec un focus particulier sur l'anonymité ethnique jusqu'au palier 5 (50%).

## Structure des Fichiers

```
poc/
├── page.tsx                    # Page principale du POC
├── components/
│   ├── ImageRevealDemo.tsx     # Composant principal d'affichage avec révélation
│   ├── RevealControls.tsx      # Contrôles de navigation et auto-play
│   ├── PalierInfo.tsx          # Informations détaillées sur chaque palier
│   └── AlternativeTests.tsx    # Tests d'approches alternatives
└── README.md                   # Documentation
```

## Spécifications des 10 Paliers

### Paliers 1-5 : Zone d'Anonymité
- **Palier 1 (10%)** : Silhouette floue abstraite, gris uniforme
- **Palier 2 (20%)** : Silhouette floue, nuances de gris variées
- **Palier 3 (30%)** : Formes globales du visage, zones abstraites
- **Palier 4 (40%)** : Zones faciales identifiables mais abstraites
- **Palier 5 (50%)** : **SEUIL CRITIQUE** - Traits basiques nets, monochromie

### Paliers 6-10 : Zone de Révélation
- **Palier 6 (60%)** : Introduction légère d'ombres et relief
- **Palier 7 (70%)** : Couleur de peau désaturée
- **Palier 8 (80%)** : Couleur plus fidèle, détails fins
- **Palier 9 (90%)** : Couleurs réelles, détails fins visibles
- **Palier 10 (100%)** : Révélation complète

## Techniques Implémentées

### Approche Principale
- **Flou progressif** : De 25px à 0px
- **Désaturation contrôlée** : De 0% à 100%
- **Ajustement luminosité/contraste**
- **Effet low-poly/pixellisation** pour les premiers paliers

### Approches Alternatives
1. **Mosaïque** : Tuiles progressivement plus petites
2. **Révélation circulaire** : Du centre vers l'extérieur
3. **Dégradé vertical** : Révélation de bas en haut
4. **Géométrique** : Simplification par triangles

## Fonctionnalités

### Navigation
- **Boutons** : Précédent/Suivant
- **Slider** : Navigation rapide
- **Sélection directe** : Boutons 1-10
- **Raccourcis clavier** :
  - `←` `→` : Navigation
  - `Espace` : Play/Pause auto-play
  - `R` : Reset au palier 1
  - `1-9`, `0` : Sélection directe

### Auto-Play
- Progression automatique toutes les 2 secondes
- Arrêt automatique au palier 10
- Contrôle play/pause

### Interface
- **Indicateurs visuels** temps réel
- **Métriques** : palier, anonymité, révélation, auto-play
- **Progression globale** avec code couleur
- **Analyses détaillées** pour chaque palier
- **Design responsive**

## Points de Contrôle

### Anonymité
- ✅ **Garantie complète** jusqu'au palier 5
- ⚠️ **Seuil critique** au palier 5
- 🚨 **Identification possible** à partir du palier 6

### Performance
- Pré-calcul des effets optimisé
- Canvas 2D pour traitement temps réel
- Gestion des images de fallback
- Transitions fluides

### Validation
- Tests utilisateurs intégrés
- Métriques temps réel
- Comparaison d'approches multiples
- Respect des guidelines ethniques

## Utilisation

1. Ouvrir `/poc` dans le navigateur
2. Utiliser les contrôles pour naviguer entre paliers
3. Tester le mode auto-play
4. Comparer avec les approches alternatives
5. Analyser les métriques et informations détaillées

## Optimisations Possibles

- Cache des images pré-traitées
- Web Workers pour traitement parallèle
- Compression adaptative selon le palier
- Machine learning pour optimisation automatique
- Tests A/B intégrés

## Considérations Techniques

- Compatible avec tous navigateurs modernes
- Gestion des erreurs d'images
- Interface accessible
- Code modulaire et réutilisable
- Documentation complète 