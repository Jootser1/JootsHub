#!/bin/bash

# 🚀 Démarrage JootsHub - Mode HTTPS
# Script de démarrage simplifié pour tous les environnements

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

echo "🚀 Démarrage JootsHub HTTPS"
echo "=========================="

# Détecter le mode (par défaut: développement)
MODE=${1:-dev}
COMPOSE_FILES=""

case $MODE in
    "prod")
        COMPOSE_FILES="-f docker-compose.prod.yml"
        log_info "Mode: Production"
        ;;
    "dev"|*)
        COMPOSE_FILES="-f docker-compose.yml -f docker-compose.override.yml"
        log_info "Mode: Développement"
        ;;
esac

# 1. Vérifications des prérequis
log_info "Vérification des prérequis..."

# Docker
if ! command -v docker &> /dev/null; then
    log_error "Docker n'est pas installé"
    exit 1
fi

if ! command -v docker &> /dev/null || ! docker compose version &> /dev/null; then
    log_error "Docker Compose n'est pas installé"
    exit 1
fi

# 2. Vérification de la configuration
log_info "Vérification de la configuration..."

# Certificats SSL
missing_certs=()
if [ ! -f "nginx/ssl/nginx.crt" ] || [ ! -f "nginx/ssl/nginx.key" ]; then
    missing_certs+=("nginx")
fi
if [ ! -f "nginx/ssl/backend/backend.crt" ] || [ ! -f "nginx/ssl/backend/backend.key" ]; then
    missing_certs+=("backend")
fi

if [ ${#missing_certs[@]} -ne 0 ]; then
    log_warning "Certificats SSL manquants: ${missing_certs[*]}"
    log_info "Exécutez d'abord: ./scripts/setup.sh"
    read -p "Voulez-vous exécuter la configuration maintenant? [y/N] " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        chmod +x scripts/setup.sh
        ./scripts/setup.sh
    else
        exit 1
    fi
fi

# Fichiers .env
missing_env=()
if [ ! -f "joots-frontend/.env" ]; then
    missing_env+=("frontend")
fi
if [ ! -f "joots-backend/.env" ]; then
    missing_env+=("backend")
fi

if [ ${#missing_env[@]} -ne 0 ]; then
    log_warning "Fichiers .env manquants: ${missing_env[*]}"
    log_info "Exécutez d'abord: ./scripts/setup.sh"
    exit 1
fi

log_success "Configuration vérifiée"

# 3. Nettoyage des anciens containers
log_info "Nettoyage des anciens containers..."
docker compose $COMPOSE_FILES down -v 2>/dev/null || true

# 4. Construction et démarrage
log_info "Construction des images..."
docker compose $COMPOSE_FILES build --no-cache

log_info "Démarrage des services..."
docker compose $COMPOSE_FILES up -d

# 5. Attendre que les services soient prêts
log_info "Attente du démarrage des services..."
sleep 15


# 6. Vérification de l'état des services
log_info "Vérification de l'état des services..."

services=("postgres" "redis" "backend" "frontend" "nginx")
for service in "${services[@]}"; do
    if docker compose $COMPOSE_FILES ps | grep -q "$service.*Up"; then
        log_success "✅ $service: Démarré"
    else
        log_warning "⚠️  $service: Problème de démarrage"
    fi
done

# 7. Tests de connectivité HTTPS
log_info "Tests de connectivité HTTPS..."

# Test frontend via Nginx
if curl -k -s --max-time 10 https://localhost >/dev/null 2>&1; then
    log_success "✅ Frontend HTTPS accessible"
else
    log_warning "⚠️  Frontend HTTPS non accessible (peut être normal au démarrage)"
fi

# Test API via Nginx
if curl -k -s --max-time 10 https://localhost/api/health >/dev/null 2>&1; then
    log_success "✅ API HTTPS accessible"
else
    log_warning "⚠️  API HTTPS non accessible (vérifiez si /health existe)"
fi

# 8. Affichage des logs pour diagnostic
echo ""
log_info "=== Logs des services (dernières lignes) ==="

echo ""
log_info "Backend (recherche SSL):"
docker compose $COMPOSE_FILES logs backend | grep -i "ssl\|https\|server.*running\|listening" | tail -3 || docker compose $COMPOSE_FILES logs backend | tail -3

echo ""
log_info "Frontend:"
docker compose $COMPOSE_FILES logs frontend | grep -i "ready\|started\|listening" | tail -3 || docker compose $COMPOSE_FILES logs frontend | tail -3

echo ""
log_info "Nginx:"
docker compose $COMPOSE_FILES logs nginx | tail -3

# 9. Instructions finales
echo ""
echo "🎉 JootsHub Démarré avec Succès!"
echo "================================"
echo ""
echo "🌐 URLs d'accès:"
echo "   • Frontend PWA: https://localhost"
echo "   • Backend API: https://localhost/api"
echo "   • Test PWA: https://localhost/fr/pwa-test (si disponible)"
echo ""
echo "🔐 Certificats SSL:"
echo "   • Acceptez les certificats auto-signés dans votre navigateur"
echo "   • Chrome: Tapez 'thisisunsafe' sur la page d'erreur SSL"
echo "   • Firefox: Cliquez 'Avancé' > 'Accepter le risque'"
echo ""
echo "📋 Commandes utiles:"
echo "   • Voir les logs: docker compose $COMPOSE_FILES logs -f [service]"
echo "   • Redémarrer: docker compose $COMPOSE_FILES restart [service]"
echo "   • Arrêter: docker compose $COMPOSE_FILES down"
echo "   • Voir l'état: docker compose $COMPOSE_FILES ps"
echo ""
echo "🔍 En cas de problème:"
echo "   • Vérifiez les logs: docker compose $COMPOSE_FILES logs [service]"
echo "   • Redémarrez un service: docker compose $COMPOSE_FILES restart [service]"
echo "   • Configuration complète: ./scripts/setup.sh"
echo ""

# Proposer de suivre les logs
read -p "Voulez-vous suivre les logs en temps réel? [y/N] " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    log_info "Suivre les logs (Ctrl+C pour arrêter)..."
    docker compose $COMPOSE_FILES logs -f
fi

log_success "Application prête! 🚀" 