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

COPY --from=builder /joots-frontend/package.json ./
COPY --from=builder /joots-frontend/node_modules ./node_modules
COPY --from=builder /joots-frontend/.next ./.next
COPY --from=builder /joots-frontend/public ./public
COPY --from=builder /joots-frontend/next.config.js ./next.config.js
COPY --from=builder /joots-frontend/tsconfig.json ./tsconfig.json

EXPOSE 3000

CMD ["npm", "run", "start"]
