# 🛠️ Étape 1 : Build
FROM node:20-alpine AS builder

WORKDIR /joots-backend

# Installer les dépendances
COPY package*.json ./
RUN npm ci

# Copier uniquement les dossiers utiles
COPY tsconfig*.json ./
COPY src ./src
COPY prisma ./prisma

# Générer Prisma Client
RUN npx prisma generate

# Compiler le projet
RUN npm run build

# 🔧 Étape 2 : Création de l'image de prod minimale
FROM node:20-alpine AS runner

WORKDIR /joots-backend

# Copier le build, les dépendances et le fichier package.json
COPY --from=builder /joots-backend/dist ./dist
COPY --from=builder /joots-backend/node_modules ./node_modules
COPY --from=builder /joots-backend/package.json ./package.json
COPY --from=builder /joots-backend/prisma ./prisma

ENV NODE_ENV=production
EXPOSE 4000

CMD ["sh", "-c", "npx prisma migrate deploy && [ \"$SEED_DB\" = \"true\" ] && npx prisma db seed; node dist/src/main.js"]

