# 🛠️ Étape 1 : Build
FROM node:20-alpine AS builder

# Créer la structure de dossiers à la racine
WORKDIR /

# Étape 1 — Copier et compiler les types partagés
COPY ./packages ./packages

# Build des types partagés
WORKDIR /packages/types
RUN npm install --verbose && npm run build && ls -la dist/

# Étape 2 — Aller dans le dossier backend et installer les dépendances
WORKDIR /joots-backend

# Copier les fichiers de package en premier pour optimiser le cache Docker
COPY joots-backend/package*.json ./
RUN npm ci

# Étape 3 : Copier le schéma et générer le client Prisma
COPY ./joots-backend/prisma ./prisma
RUN npx prisma generate --schema=./prisma/schema.prisma

# Copier les fichiers de configuration et source
COPY joots-backend/tsconfig*.json ./
COPY joots-backend/src ./src

# Compiler le projet (maintenant les types sont disponibles via ../packages/types/dist/*)
RUN npm run build

# 🔧 Étape 2 : Création de l'image de prod minimale
FROM node:20-alpine AS runner

# Créer la même structure que dans le builder (à la racine)
WORKDIR /

# Copier les types partagés compilés (maintenir la structure)
COPY --from=builder /packages ./packages

# Aller dans le dossier backend
WORKDIR /joots-backend

# Copier le build, les dépendances et les fichiers nécessaires
COPY --from=builder /joots-backend/dist ./dist
COPY --from=builder /joots-backend/node_modules ./node_modules
COPY --from=builder /joots-backend/package.json ./package.json
COPY --from=builder /joots-backend/prisma ./prisma


# Commande de démarrage avec gestion d'erreur améliorée
CMD ["sh", "-c", "npx prisma migrate deploy && ([ \"$SEED_DB\" = \"true\" ] && npx prisma db seed || true) && node dist/main.js"]

