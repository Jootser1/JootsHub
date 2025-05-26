# Diagramme Architectural - Flux Icebreaker

Ce diagramme illustre le flux complet depuis le clic du premier utilisateur sur le bouton "icebreaker ready" jusqu'à l'affichage des réponses des deux utilisateurs dans la conversation.

```mermaid
sequenceDiagram
    participant U1 as Utilisateur 1
    participant F1 as Frontend 1
    participant U2 as Utilisateur 2
    participant F2 as Frontend 2
    participant WS as WebSocket Gateway
    participant IS as IcebreakerService
    participant QS as QuestionService
    participant DB as Base de Données
    participant Redis as Redis Cache
    participant MS as MessagesService

    Note over U1, MS: Phase 1: Premier utilisateur prêt
    U1->>F1: Clic sur bouton "icebreaker ready"
    F1->>WS: Émission 'icebreakerReady' via Socket.IO
    WS->>IS: setParticipantIcebreakerReady()
    IS->>DB: Mise à jour isIcebreakerReady = true
    IS->>Redis: Stockage statut participant
    WS->>F1: Émission 'icebreakerStatusUpdated'
    WS->>F2: Émission 'icebreakerStatusUpdated'
    F1->>F1: Mise à jour UI - Logo icebreaker vert/orange
    F2->>F2: Mise à jour UI - Logo icebreaker orange/vert

    Note over U1, MS: Phase 2: Deuxième utilisateur prêt
    U2->>F2: Clic sur bouton "icebreaker ready"
    F2->>WS: Émission 'icebreakerReady' via Socket.IO
    WS->>IS: setParticipantIcebreakerReady()
    IS->>DB: Mise à jour isIcebreakerReady = true
    IS->>Redis: Stockage statut participant
    WS->>IS: areAllParticipantsReady()
    IS-->>WS: Retour: true (tous prêts)

    Note over U1, MS: Phase 3: Génération et envoi de la question
    WS->>QS: getNextRandomQuestionGroup()
    QS->>DB: Requête question aléatoire
    DB-->>QS: Retour questionGroup
    QS-->>WS: Retour questionGroup
    WS->>IS: storeCurrentQuestionGroupForAGivenConversation()
    IS->>Redis: Stockage question courante
    WS->>F1: Émission 'icebreakerQuestionGroup'
    WS->>F2: Émission 'icebreakerQuestionGroup'
    F1->>F1: Affichage modal question
    F2->>F2: Affichage modal question

    Note over U1, MS: Phase 4: Utilisateur 1 répond
    U1->>F1: Sélection réponse + validation
    F1->>F1: handleAnswerQuestion()
    F1->>WS: Requête POST '/icebreakers/response'
    WS->>QS: saveUserAnswerInDB()
    QS->>DB: Insertion réponse utilisateur
    WS->>IS: processIcebreakersPostResponses()
    IS->>Redis: Sauvegarde réponse dans Redis
    IS->>DB: Mise à jour hasGivenAnswer = true
    IS->>IS: areAllParticipantsHaveGivenAnswer()
    IS-->>IS: Retour: false (un seul a répondu)

    Note over U1, MS: Phase 5: Utilisateur 2 répond
    U2->>F2: Sélection réponse + validation
    F2->>F2: handleAnswerQuestion()
    F2->>WS: Requête POST '/icebreakers/response'
    WS->>QS: saveUserAnswerInDB()
    QS->>DB: Insertion réponse utilisateur
    WS->>IS: processIcebreakersPostResponses()
    IS->>Redis: Sauvegarde réponse dans Redis
    IS->>DB: Mise à jour hasGivenAnswer = true
    IS->>IS: areAllParticipantsHaveGivenAnswer()
    IS-->>IS: Retour: true (tous ont répondu)

    Note over U1, MS: Phase 6: Traitement des réponses complètes
    IS->>IS: processCompletedIcebreaker()
    IS->>DB: getUserAnswers() - Récupération réponses
    IS->>IS: formatUserAnswersForAddIcebreakerMessage()
    IS->>MS: addIcebreakerMessage()
    MS->>DB: Création message type 'ANSWER'
    IS->>IS: resetIcebreakerStatus()
    IS->>DB: Reset isIcebreakerReady et hasGivenAnswer
    IS->>Redis: Reset statuts participants

    Note over U1, MS: Phase 7: Diffusion des réponses
    IS->>WS: emitIcebreakerResponsesToAllParticipants()
    WS->>F1: Émission 'icebreakerResponses' via Socket.IO
    WS->>F2: Émission 'icebreakerResponses' via Socket.IO
    F1->>F1: handleIcebreakerResponsesEvent()
    F1->>F1: Création message type 'ANSWER'
    F1->>F1: chatStore.addMessage()
    F1->>F1: chatStore.resetIcebreakerStatus()
    F1->>F1: Affichage message avec réponses des 2 users
    F2->>F2: handleIcebreakerResponsesEvent()
    F2->>F2: Création message type 'ANSWER'
    F2->>F2: chatStore.addMessage()
    F2->>F2: chatStore.resetIcebreakerStatus()
    F2->>F2: Affichage message avec réponses des 2 users

    Note over U1, MS: État final: Les deux utilisateurs voient les réponses
```

## Description des composants

### Frontend (React/Next.js)
- **ExperienceLogo.tsx** : Composant du bouton icebreaker ready
- **ChatContainer.tsx** : Gestion de l'affichage des questions et messages
- **chatStore.ts** : Store Zustand pour la gestion d'état des conversations
- **chatEventHandlers.ts** : Gestionnaires d'événements WebSocket

### Backend (NestJS)
- **ChatGateway** : Gateway WebSocket pour la communication temps réel
- **IcebreakerService** : Service métier pour la logique icebreaker
- **QuestionService** : Service de gestion des questions
- **MessagesService** : Service de gestion des messages
- **IcebreakerController** : Contrôleur REST pour les réponses

### Infrastructure
- **PostgreSQL** : Base de données principale
- **Redis** : Cache pour les statuts temporaires et questions courantes
- **Socket.IO** : WebSocket pour la communication temps réel

## Points clés de l'architecture

1. **Communication bidirectionnelle** : WebSocket pour les mises à jour temps réel
2. **Persistance hybride** : PostgreSQL pour les données permanentes, Redis pour les états temporaires
3. **Synchronisation** : Tous les participants reçoivent les mêmes événements simultanément
4. **Gestion d'état** : Reset automatique des statuts après traitement complet
5. **Type de message spécial** : Messages 'ANSWER' qui contiennent les réponses des deux utilisateurs 