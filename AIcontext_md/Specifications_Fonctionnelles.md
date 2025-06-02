# Spécifications Fonctionnelles - Parcours Utilisateur JootsHub

## 🎯 Introduction

Ce document décrit de façon détaillée et narrative le parcours utilisateur au sein de l'application JootsHub, en explicitant les possibilités d'action sur chaque page, les intentions UX sous-jacentes, et les interactions offertes à chaque étape. Il s'appuie sur l'implémentation actuelle, le code, et la documentation fonctionnelle.

---

**Charte Graphique :**
- Blanc: #FFFFFF
- Bleu: #5211CE
- Vert: #3CBF77
- Orange: #E59C45
- Gris Clair: #E6E6E6
- Gris Foncé: #999999   

**Typographie :**
- Font principale : Roboto   
- Font des réponses Icebreaker : Indie Flower 



## 1. 🏠 Accueil - Hub Central

### **Objectif UX**
> Offrir un point d'entrée unique, moderne et engageant, permettant à l'utilisateur de choisir son expérience sociale (Icebreaker, Socioscopy, Revelio) dans une interface fluide et gamifiée.

### **Composants et Actions**
- **Carrousel interactif** : Navigation tactile (swipe) ou boutons (desktop)
- **Cartes modules** :
  - 🎯 **Icebreaker** (orange) : Démarrer une conversation sans préjugés
  - 📊 **Socioscopy** (violet) : Explorer les opinions de la société (à venir)
  - 🎭 **Revelio** (vert) : Défier ses amis (à venir)
- **Sélection module** : Clic/tap sur une carte pour accéder à l'expérience
- **Feedback visuel** : Animations, transitions fluides, survols
- **Accessibilité** : Navigation clavier, contrastes respectés

### **Intentions sous-jacentes**
- **Susciter la curiosité** et l'envie d'explorer
- **Fluidifier la navigation** entre expériences sans rupture
- **Créer un sentiment d'appartenance** à un écosystème social unique

---

## 2. 👤 Profil Utilisateur

### **Objectif UX**
> Permettre à l'utilisateur de gérer son identité, ses préférences et ses contacts dans un espace personnalisé, sécurisé et valorisant.

### **Composants et Actions**
- **Avatar Jdenticon** : Généré automatiquement, non-modifiable
- **Pseudo unique** : "JootserXXXXX" (numérotation croissante)
- **Statut en ligne** : Pastille verte/grise visible par les contacts
- **Informations publiques** : Niveau, XP, date de création
- **Actions disponibles** :
  - Modifier la disponibilité pour le chat
  - Gérer la liste de contacts (ajout/suppression)
  - Visualiser l'historique des conversations
  - Accéder aux paramètres de confidentialité
- **Accessibilité** : Navigation clavier, ARIA labels

### **Intentions sous-jacentes**
- **Valoriser l'identité** de chaque utilisateur
- **Favoriser la sécurité** (pas de modification du pseudo/avatar)
- **Encourager la personnalisation** via la progression et les stats

---


## 3. 📇 Gestion des Contacts

### **Objectif UX**
> Faciliter la création et la gestion d'un réseau de contacts, avec des interactions en temps réel et des feedbacks immédiats.

### **Composants et Actions**
- **Liste des contacts** : Affichage type WhatsApp, avatars, statuts
- **Recherche dynamique** : Par pseudo ou email
- **Filtrage** : Par statut (en ligne/tous)
- **Ajout/Suppression** : Boutons d'action sur chaque contact
- **Indicateur de dernière connexion**
- **Accès direct** : Clic sur un contact pour ouvrir le chat
- **Statuts en temps réel** : Mise à jour automatique via WebSocket

### **Intentions sous-jacentes**
- **Créer un sentiment de communauté**
- **Rendre la gestion des contacts ludique et instantanée**
- **Favoriser la rétention** par la visibilité des statuts


## 3.5 📞 Conversations - Gestion et Initiation des Discussions

### **Objectif UX**
> Offrir une interface intuitive et efficace pour gérer et initier des conversations, permettant à l'utilisateur de découvrir de nouvelles personnes ou de redécouvrir ses contacts existants de manière ludique.

### **Composants et Actions**

- **Initiation de nouvelle conversation** :
  - **Personne aléatoire géolocalisée** : Découverte de nouvelles personnes dans la même région
  - **Contact/Ami existant** : Redécouverte ludique de ses contacts
  - **Contact aléatoire avec critères spécifiques** : Fonction premium pour des besoins particuliers

- **Liste des conversations** : Affichage des discussions récentes avec aperçu du dernier message
- **Indicateurs de statut** : Pastilles de statut en ligne/hors ligne pour chaque contact
- **Notifications** : Badge de notification pour les nouveaux messages non lus
- **Recherche de conversation** : Filtre par nom de contact ou contenu du message
- **Accès rapide** : Clic sur une conversation pour ouvrir le chat correspondant

- **Archivage** : Option pour archiver les conversations terminées
- **Suppression** : Possibilité de supprimer des conversations de l'historique

### **Intentions sous-jacentes**
- **Faciliter la gestion et l'initiation des discussions** en cours et nouvelles
- **Encourager l'engagement** par la découverte et la redécouverte de contacts
- **Offrir une expérience utilisateur fluide** avec des interactions intuitives et ludiques


---

## 4. 💬 Chat - Expérience de Messagerie

### **Objectif UX**
> Offrir une expérience de chat moderne, fluide et familière, inspirée des meilleures apps de messagerie (WhatsApp, Messenger).

### **Composants et Actions**
- **Header** : Avatar, nom, statut en ligne, bouton retour
- **Zone de messages** :
  - Bulles colorées selon l'expéditeur
  - Timestamps discrets
  - Accusés de réception (1 coche = envoyé, 2 coches = lu)
  - Auto-scroll vers les nouveaux messages
- **Barre de saisie** :
  - Input adaptatif (grandit avec le texte)
  - Bouton envoi animé
  - Indicateur de saisie ("X est en train d'écrire...")
- **Synchronisation multi-device** : Messages et statuts partagés
- **Gestion erreurs** : Feedback en cas d'échec d'envoi, retry automatique

### **Intentions sous-jacentes**
- **Rassurer par la familiarité** (design WhatsApp-like)
- **Fluidifier les échanges** (temps réel, feedback immédiat)
- **Favoriser l'engagement** (animations, accusés de réception)

---

## 5. 🧊 Icebreaker - Système de Brise-Glace

### **Objectif UX**
> Faciliter la création de lien entre inconnus grâce à des questions originales, une synchronisation parfaite et une gamification motivante.

### **Composants et Actions**
- **Bouton central Icebreaker** :
  - États visuels : blanc (prêt), vert (prêt), orange (attente), désactivé (en cours)
  - Feedback haptique sur mobile
  - Clic pour signaler sa disponibilité
- **Synchronisation participants** :
  - Animation "pulse" en attente
  - Timeout automatique (reset après 5 min)
  - Notification si l'autre est prêt
  - Annulation possible avant validation
- **Modal de question** :
  - Slide-down élégant, fond semi-transparent
  - Affichage catégorie, question, options de réponse
  - Sélection obligatoire, feedback immédiat
  - Validation uniquement après choix
  - Fermeture possible avant validation
- **Affichage des résultats** :
  - Message spécial dans le chat (fond orange, font Indie Flower)
  - Réponses positionnées (haut gauche/bas droite)
  - Animation +XP, barre de progression
  - Reset automatique du bouton

### **Intentions sous-jacentes**
- **Briser la glace sans gêne**
- **Créer un moment partagé, synchronisé**
- **Gamifier la progression** pour motiver la répétition

---

## 6. 🏆 Gamification et Progression

### **Objectif UX**
> Motiver l'utilisateur à s'engager, à revenir et à progresser grâce à un système de points, niveaux, badges et feedbacks visuels.

### **Composants et Actions**
- **Points XP** : Gagnés à chaque question Icebreaker complétée
- **Niveaux de conversation** : Progression individuelle par chat
- **Barres de progression** : Animées, visibles en temps réel
- **Badges et récompenses** : Déblocage selon l'engagement
- **Notifications** : Messages d'encouragement, animations célébration
- **Historique** : Sauvegarde des questions/réponses, stats personnelles

### **Intentions sous-jacentes**
- **Créer une boucle d'engagement positive**
- **Valoriser la fidélité et la progression**
- **Encourager la découverte de toutes les fonctionnalités**

---

## 7. ♿ Accessibilité et Inclusion

### **Objectif UX**
> Rendre l'application utilisable et agréable pour tous, quels que soient les besoins ou les contextes d'usage.

### **Composants et Actions**
- **Navigation clavier complète**
- **ARIA labels** sur tous les éléments interactifs
- **Contrastes élevés** et respect des guidelines WCAG
- **Taille de police adaptable**
- **Mode sombre (à venir)**
- **Réduction de mouvement** : Désactivation des animations si demandé
- **Fallbacks statiques** : Alternatives sans animation

### **Intentions sous-jacentes**
- **Inclure tous les profils d'utilisateurs**
- **Garantir une expérience fluide même en cas de handicap**
- **Respecter les standards d'accessibilité modernes**

---

## 8. 🚨 Gestion des Erreurs et États Exceptionnels

### **Objectif UX**
> Assurer la robustesse de l'expérience, même en cas de problème technique ou d'usage inattendu.

### **Composants et Actions**
- **Reconnexion automatique** : WebSocket, mode offline, retry intelligent
- **Feedback utilisateur** : Bannière "Reconnexion en cours..."
- **Messages d'erreur clairs** : Textes compréhensibles, actions suggérées
- **Fallback gracieux** : Fonctionnalités dégradées plutôt que crash
- **Gestion des timeouts** : Reset automatique, notifications
- **Gestion des limites** : Messages explicites (ex : "Trop de questions, attendez 30s")

### **Intentions sous-jacentes**
- **Rassurer l'utilisateur** en cas de problème
- **Prévenir la frustration** par des solutions automatiques
- **Maintenir la confiance dans l'application**

---

## 9. 🔄 Navigation et Transitions

### **Objectif UX**
> Permettre une circulation fluide et intuitive entre toutes les pages et modules de l'application.

### **Composants et Actions**
- **BottomBar** : Accès rapide au hub et au profil
- **Transitions animées** : Feedback visuel lors des changements de page
- **Retour contextuel** : Boutons retour adaptés à chaque module
- **Navigation sans rechargement** : SPA optimisée

### **Intentions sous-jacentes**
- **Réduire la friction** entre les expériences
- **Favoriser l'exploration** de toutes les fonctionnalités
- **Créer une sensation d'application native**

---

## 10. 📈 Suivi et Statistiques Utilisateur

### **Objectif UX**
> Permettre à l'utilisateur de suivre sa progression, ses interactions et son engagement dans l'écosystème JootsHub.

### **Composants et Actions**
- **Tableaux de bord** : Statistiques personnelles (questions, XP, badges)
- **Historique** : Conversations, questions/réponses, contacts
- **Comparaison sociale** : Classements, défis (à venir)

### **Intentions sous-jacentes**
- **Donner du sens à l'engagement**
- **Encourager la compétition saine**
- **Valoriser l'investissement de l'utilisateur**

---

## 11. 🚀 Scénarios d'Usage - Parcours Types

### **A. Premier accès (nouvel utilisateur)**
1. Arrivée sur le hub, découverte des modules
2. Création de compte (pseudo, avatar généré, email, mot de passe)
3. Ajout de premiers contacts ou démarrage direct d'un Icebreaker
4. Découverte du chat, des questions, de la progression

### **B. Utilisateur régulier**
1. Connexion automatique, statut en ligne visible
2. Navigation fluide entre hub, chat, profil
3. Utilisation régulière du bouton Icebreaker
4. Gestion des contacts, consultation des stats
5. Réception de notifications, progression dans les niveaux

### **C. Utilisateur en situation d'échec ou d'erreur**
1. Perte de connexion → bannière de reconnexion
2. Timeout Icebreaker → reset automatique, message explicite
3. Problème d'envoi message → retry automatique, feedback visuel

---

## 12. 📝 Synthèse des Intentions Fonctionnelles

- **Créer une expérience sociale nouvelle génération**
- **Fluidifier tous les parcours**
- **Favoriser l'engagement, la rétention et la découverte**
- **Garantir l'accessibilité et la robustesse**
- **Valoriser chaque utilisateur et sa progression**

---

*Ce document est la référence fonctionnelle pour toute évolution UX/UI de JootsHub. Il doit être mis à jour à chaque ajout ou modification majeure du parcours utilisateur.* 