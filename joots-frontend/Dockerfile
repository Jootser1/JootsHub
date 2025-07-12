# 🛠️ Étape 1 : Build
FROM node:20-alpine AS builder

# Étape 1 — Copier et compiler les types partagés
WORKDIR /packages
COPY ./packages .

# Etape Build the types
WORKDIR /packages/types
RUN npm install --verbose && npm run build


WORKDIR /joots-frontend

# Copier les fichiers de config
COPY joots-frontend/package*.json ./
COPY joots-frontend/next.config.ts ./
COPY joots-frontend/tsconfig.json ./

# Copier les sources nécessaires
COPY joots-frontend/public ./public
COPY joots-frontend/src ./src

# Build the frontend
RUN npm ci
RUN npm run build

# 📦 Étape 2 : Image de prod minimale
FROM node:20-alpine AS runner

WORKDIR /joots-frontend

# Copier les types partagés compilés
COPY --from=builder /packages/types/dist ./node_modules/@shared/types/dist

COPY --from=builder /joots-frontend/package*.json ./
COPY --from=builder /joots-frontend/node_modules ./node_modules
COPY --from=builder /joots-frontend/.next ./.next
COPY --from=builder /joots-frontend/public ./public
COPY --from=builder /joots-frontend/src ./src
COPY --from=builder /joots-frontend/next.config.ts ./next.config.ts
COPY --from=builder /joots-frontend/tsconfig.json ./tsconfig.json



CMD ["npm", "run", "start"]
