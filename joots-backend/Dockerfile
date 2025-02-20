# 1️⃣ Utiliser une image légère et récente de Node.js
FROM node:20-alpine AS builder

# 2️⃣ Définir le dossier de travail dans le conteneur
WORKDIR /app

# 3️⃣ Copier les fichiers nécessaires pour l’installation
COPY package.json package-lock.json ./

# 4️⃣ Installer les dépendances en mode production
RUN npm ci --only=production

# 5️⃣ Copier tout le code source du projet
COPY . .

# 6️⃣ Construire le projet TypeScript en JavaScript
RUN npm run build

# 7️⃣ Étape finale : Créer une image légère pour l'exécution
FROM node:20-alpine AS runner
WORKDIR /app

# 8️⃣ Copier uniquement les fichiers nécessaires depuis l’étape précédente
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY package.json ./

# 9️⃣ Définir l'environnement en production
ENV NODE_ENV=production

# 🔟 Exposer le port d'écoute de l'API
EXPOSE 3000

# 1️⃣1️⃣ Lancer le backend avec Node.js
CMD ["node", "dist/main.js"]

