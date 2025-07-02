#!/bin/bash

# 🔒 Configuration Initiale Complète - JootsHub
# Ce script configure automatiquement HTTPS et tous les prérequis

set -e  # Arrêter en cas d'erreur

# Couleurs pour l'affichage
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonctions d'affichage
log_info() { echo -e "${BLUE}[INFO]${NC} $1"; }
log_success() { echo -e "${GREEN}[SUCCESS]${NC} $1"; }
log_warning() { echo -e "${YELLOW}[WARNING]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }

echo "🔐 Configuration Initiale JootsHub"
echo "=================================="

# 1. Vérification des prérequis
log_info "Vérification des prérequis..."

for cmd in openssl docker docker-compose; do
    if ! command -v $cmd &> /dev/null; then
        log_error "$cmd n'est pas installé. Veuillez l'installer."
        exit 1
    fi
done

log_success "Tous les prérequis sont installés"

# 2. Création de la structure SSL
log_info "Création de la structure SSL..."
mkdir -p nginx/ssl/frontend nginx/ssl/backend nginx/logs

# 3. Génération des certificats SSL
log_info "Génération des certificats SSL..."

# Certificat Nginx (proxy)
if [ ! -f "nginx/ssl/nginx.crt" ] || [ ! -f "nginx/ssl/nginx.key" ]; then
    log_info "Génération du certificat SSL pour Nginx (frontend)..."
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
        -keyout nginx/ssl/nginx.key \
        -out nginx/ssl/nginx.crt \
        -subj "/C=FR/ST=France/L=Paris/O=JootsHub/CN=localhost" \
        -addext "subjectAltName=DNS:localhost,DNS:*.localhost,IP:127.0.0.1"
    log_success "Certificat Nginx généré"
else
    log_warning "Certificat Nginx existant trouvé"
fi

# Certificat Backend
if [ ! -f "nginx/ssl/backend/backend.crt" ] || [ ! -f "nginx/ssl/backend/backend.key" ]; then
    log_info "Génération du certificat SSL pour Backend..."
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
        -keyout nginx/ssl/backend/backend.key \
        -out nginx/ssl/backend/backend.crt \
        -subj "/C=FR/ST=France/L=Paris/O=JootsHub/CN=backend" \
        -addext "subjectAltName=DNS:backend,DNS:localhost,IP:127.0.0.1"
    log_success "Certificat Backend généré"
else
    log_warning "Certificat Backend existant trouvé"
fi

# Certificat Frontend (si nécessaire)
if [ ! -f "nginx/ssl/frontend/frontend.crt" ] || [ ! -f "nginx/ssl/frontend/frontend.key" ]; then
    log_info "Génération du certificat SSL pour Frontend..."
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
        -keyout nginx/ssl/frontend/frontend.key \
        -out nginx/ssl/frontend/frontend.crt \
        -subj "/C=FR/ST=France/L=Paris/O=JootsHub/CN=frontend" \
        -addext "subjectAltName=DNS:frontend,DNS:localhost,IP:127.0.0.1"
    log_success "Certificat Frontend généré"
else
    log_warning "Certificat Frontend existant trouvé"
fi

# 4. Configuration des variables d'environnement
log_info "Configuration des variables d'environnement..."

# Frontend .env
if [ ! -f "joots-frontend/.env" ]; then
    log_info "Création du fichier .env pour le frontend..."
    cat > joots-frontend/.env << EOF
# Frontend Environment Variables - HTTPS Development

# API URLs pour le frontend (côté client)
NEXT_PUBLIC_API_URL=https://localhost/api

# API URL interne pour NextAuth (serveur-à-serveur)
API_INTERNAL_URL=https://localhost/api

# NextAuth Configuration
NEXTAUTH_SECRET=$(openssl rand -base64 32)
NEXTAUTH_URL=https://localhost

# WebSocket URL
NEXT_PUBLIC_SOCKET_URL=https://localhost

# PWA Configuration
NEXT_PUBLIC_SW_URL=https://localhost

# SSL Certificats
SSL_KEY_PATH=/app/ssl/frontend.key
SSL_CERT_PATH=/app/ssl/frontend.crt


# Environnement
NODE_ENV=development
EOF
    log_success "Fichier .env frontend créé avec clés générées automatiquement"
else
    log_warning "Fichier .env frontend existant trouvé"
fi

# Backend .env
if [ ! -f "joots-backend/.env" ]; then
    log_info "Création du fichier .env pour le backend..."
    cat > joots-backend/.env << EOF
# Backend Environment Variables - HTTPS Development

# Base de données
DATABASE_URL=postgresql://jootser1:boom7boom@postgres:5432/joots?schema=public

# Redis
REDIS_URL=redis://redis:6379
REDIS_HOST=redis
REDIS_PORT=6379

# JWT
JWT_SECRET=$(openssl rand -base64 32)
JWT_EXPIRES_IN=24h
JWT_REFRESH_EXPIRES_IN=7d
JWT_REFRESH_SECRET=$(openssl rand -base64 32)

# Port HTTPS
PORT=4000

# SSL Certificats
SSL_KEY_PATH=/app/ssl/backend.key
SSL_CERT_PATH=/app/ssl/backend.crt

# Environnement
NODE_ENV=development
SEED_DB=true
EOF
    log_success "Fichier .env backend créé avec clés générées automatiquement"
else
    log_warning "Fichier .env backend existant trouvé"
fi

# 5. Vérification des certificats
log_info "Vérification des certificats..."

# Test de correspondance clé/certificat
for service in "nginx" "nginx/ssl/backend/backend" "nginx/ssl/frontend/frontend"; do
    if [[ "$service" == "nginx" ]]; then
        cert_file="nginx/ssl/nginx.crt"
        key_file="nginx/ssl/nginx.key"
        name="Nginx"
    else
        cert_file="${service}.crt"
        key_file="${service}.key"
        name=$(basename $(dirname $service))
    fi
    
    if [ -f "$cert_file" ] && [ -f "$key_file" ]; then
        cert_md5=$(openssl x509 -noout -modulus -in "$cert_file" | openssl md5)
        key_md5=$(openssl rsa -noout -modulus -in "$key_file" | openssl md5)
        
        if [ "$cert_md5" = "$key_md5" ]; then
            log_success "Certificat $name: clé et certificat correspondent ✅"
        else
            log_error "Certificat $name: clé et certificat ne correspondent pas ❌"
            exit 1
        fi
    fi
done

# 6. Permissions des certificats
log_info "Configuration des permissions..."
chmod 600 nginx/ssl/*/backend.key nginx/ssl/nginx.key 2>/dev/null || true
chmod 644 nginx/ssl/*/backend.crt nginx/ssl/nginx.crt 2>/dev/null || true

echo ""
echo "🎉 Configuration Initiale Terminée!"
echo "==================================="
echo ""
echo "📋 Ce qui a été configuré:"
echo "  ✅ Certificats SSL générés (nginx, backend, frontend)"
echo "  ✅ Fichiers .env créés avec clés sécurisées"
echo "  ✅ Structure des dossiers préparée"
echo "  ✅ Permissions configurées"
echo ""
echo "🚀 Étape suivante:"
echo "  ./scripts/start.sh"
echo ""
log_success "Prêt pour le développement HTTPS! 🔐" 