
# 🧠 Architecture des Sondages - JootsHub

## 🎯 Objectif

Gérer plusieurs types de sondages interactifs avec une structure unifiée, localisable et extensible. Optimisé pour l'agrégation de résultats, le multilingue et l’UX fluide.

---

## 🧱 Entité principale : `Poll`

Chaque `Poll` représente une question de sondage avec un type défini via l’enum `PollType`.

### Champs clés :
- `poll_id`: identifiant unique
- `type`: `PollType`
- `options`: liste des `PollOption`
- `answers`: liste des `PollAnswer`
- `translations`: texte de la question localisé

---

## 🎭 Enum `PollType`

```ts
enum PollType {
  OPEN              // Texte libre
  MULTIPLE_CHOICE   // QCM
  CONTINUOUS        // Réponse numérique (ex: 0–100)
  STEP_SCALE        // Échelle sans labels
  STEP_LABELED      // Échelle avec labels
  YES_NO_IDK        // Oui / Non / NSP
}
```

---

## 🧩 `PollOption` – Options de réponse

Décrit les réponses proposées pour un `Poll` donné (si applicable).

### Champs :
- `type`: enum `OptionType` (`CHOICE`, `STEP`, `YESNOIDK`)
- `order`: index de position dans l’échelle ou le QCM
- `code`: identifiant métier stable (ex: `"always"`, `"never"`)
- `translations`: texte localisé de l’option

---

## 🔄 Comportement selon `PollType`

| `PollType`         | `OptionType` attendu | Structure d’option                  | Exemple UI              |
|--------------------|----------------------|-------------------------------------|--------------------------|
| `OPEN`             | —                    | Pas d’option                        | Champ texte libre        |
| `CONTINUOUS`       | —                    | Réponse = `Float`                   | Slider ou input numérique|
| `MULTIPLE_CHOICE`  | `CHOICE`             | QCM classique                       | Choix unique ou multiple |
| `STEP_SCALE`       | `STEP`               | Échelle numérique sans label        | Slider simple            |
| `STEP_LABELED`     | `STEP`               | Échelle avec `stepIndex + label`    | "Jamais" à "Toujours"    |
| `YES_NO_IDK`       | `YESNOIDK`           | 3 options mappées sur enum          | Oui / Non / NSP          |

---

## 🌐 Traductions

- `PollTranslation` : pour la **question**
- `PollOptionTranslation` : pour chaque **option**

---

## 🗳 Réponses : `PollAnswer`

Chaque réponse utilisateur contient :
- un lien vers le `poll_id`
- une réponse `option_id`, ou `numeric`, ou `openText`
- un lien vers la **source de réponse** : `PollAnswerSource`

---

## 📦 `PollAnswerSource`

Permet de contextualiser chaque réponse :
- `locale`: langue de réponse
- `sourceType`: `SOCIOSCOPY` ou `CONVERSATION`
- `conversation_id`: facultatif (si réponse via chat)

---

## 🔧 Extensibilité

Ajout facile d’un nouveau type de sondage :
- Ajouter une valeur à `PollType`
- Définir une logique de rendu et validation
- Ajouter une sous-structure spécifique si nécessaire

---

## ✅ Bénéfices

- Données unifiées et analysables
- Localisation native
- UX fluide et modulaire
- Compatible SSR, realtime et analytics
