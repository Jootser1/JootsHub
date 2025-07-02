# 🛠️ Étape 1 : Build
FROM node:20-alpine AS builder

WORKDIR /joots-frontend

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# 📦 Étape 2 : Image de prod minimale
FROM node:20-alpine AS runner

WORKDIR /joots-frontend
ENV NODE_ENV=production

# Ajouter un utilisateur non-root pour la sécurité
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /joots-frontend/package.json ./
COPY --from=builder /joots-frontend/node_modules ./node_modules
COPY --from=builder /joots-frontend/.next ./.next
COPY --from=builder /joots-frontend/public ./public
COPY --from=builder /joots-frontend/next.config.js ./next.config.js
COPY --from=builder /joots-frontend/next.config.ts ./next.config.ts
COPY --from=builder /joots-frontend/tsconfig.json ./tsconfig.json

# S'assurer que le service worker est correctement copié
RUN ls -la ./public/

# Changer les permissions
USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["npm", "run", "start"]
