#!/bin/bash

echo "Configuration des fichiers d'environnement..."

# Créer le fichier d'environnement pour le frontend
cat > joots-frontend/.env.development.local << EOF
# Configuration pour le développement local
NEXT_PUBLIC_API_URL=http://backend:4000
API_INTERNAL_URL=http://backend:4000
NEXT_PUBLIC_SOCKET_URL=http://backend:4000
NEXTAUTH_SECRET=your-secret-key-here-change-this-in-production
NEXTAUTH_URL=http://localhost:3000
EOF

# Créer le fichier d'environnement pour le backend
cat > joots-backend/.env.docker.dev << EOF
# Configuration pour le développement Docker
NODE_ENV=development
PORT=4000
DATABASE_URL="postgresql://joots:password@postgres:5432/joots_dev?schema=public"
REDIS_HOST=redis
REDIS_PORT=6379
JWT_SECRET=your-jwt-secret-here-change-this-in-production
JWT_EXPIRES_IN=24h
SEED_DB=true
EOF

# Créer le fichier d'environnement principal
cat > .env << EOF
# Configuration de la base de données
POSTGRES_USER=joots
POSTGRES_PASSWORD=password
POSTGRES_DB=joots_dev
EOF

echo "Fichiers d'environnement créés avec succès !"
echo "ATTENTION: Changez les secrets en production !" 