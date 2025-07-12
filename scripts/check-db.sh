#!/bin/bash

# 🔍 Script de diagnostic rapide des credentials PostgreSQL
# Usage: ./scripts/check-db.sh

set -e

# Couleurs pour les logs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

echo "🔍 Diagnostic rapide des credentials PostgreSQL"
echo "================================================"

# Vérifier les fichiers de configuration
log_info "1. Vérification des fichiers de configuration..."

if [ ! -f ".env" ]; then
    log_error "Fichier .env principal manquant"
    exit 1
else
    log_success "Fichier .env trouvé"
fi

if [ ! -f "joots-backend/.env.production" ]; then
    log_error "Fichier .env.production backend manquant"
    exit 1
else
    log_success "Fichier .env.production backend trouvé"
fi

# Extraire les credentials
log_info "2. Extraction des credentials..."

POSTGRES_USER=$(grep "^POSTGRES_USER=" .env 2>/dev/null | cut -d'=' -f2)
POSTGRES_PASSWORD=$(grep "^POSTGRES_PASSWORD=" .env 2>/dev/null | cut -d'=' -f2)
POSTGRES_DB=$(grep "^POSTGRES_DB=" .env 2>/dev/null | cut -d'=' -f2)

if [ -z "$POSTGRES_USER" ] || [ -z "$POSTGRES_PASSWORD" ] || [ -z "$POSTGRES_DB" ]; then
    log_error "Credentials manquants dans .env"
    log_info "Variables trouvées:"
    log_info "  - POSTGRES_USER: ${POSTGRES_USER:-'MANQUANT'}"
    log_info "  - POSTGRES_DB: ${POSTGRES_DB:-'MANQUANT'}"
    log_info "  - POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:+'PRÉSENT'}"
    exit 1
fi

log_success "Credentials extraits du fichier .env"
log_info "  - POSTGRES_USER: $POSTGRES_USER"
log_info "  - POSTGRES_DB: $POSTGRES_DB"
log_info "  - POSTGRES_PASSWORD: [${#POSTGRES_PASSWORD} caractères]"

# Vérifier la DATABASE_URL du backend
log_info "3. Vérification de la DATABASE_URL backend..."

BACKEND_DB_URL=$(grep "^DATABASE_URL=" joots-backend/.env.production 2>/dev/null | cut -d'=' -f2)

if [ -z "$BACKEND_DB_URL" ]; then
    log_error "DATABASE_URL manquante dans joots-backend/.env.production"
    exit 1
else
    log_success "DATABASE_URL trouvée"
    log_info "  - DATABASE_URL: $BACKEND_DB_URL"
fi

# Vérifier si les credentials correspondent
log_info "4. Vérification de la cohérence des credentials..."

if echo "$BACKEND_DB_URL" | grep -q "$POSTGRES_USER" && echo "$BACKEND_DB_URL" | grep -q "$POSTGRES_DB"; then
    log_success "Credentials cohérents entre .env et backend"
else
    log_error "Incohérence détectée entre .env et backend"
    log_info "Vérifiez que DATABASE_URL contient les mêmes credentials que .env"
fi

# Vérifier Docker Compose
log_info "5. Vérification de Docker Compose..."

if ! command -v docker-compose &> /dev/null; then
    log_error "Docker Compose non installé"
    exit 1
fi

if [ ! -f "docker-compose.prod.yml" ]; then
    log_error "Fichier docker-compose.prod.yml manquant"
    exit 1
fi

log_success "Docker Compose disponible"

# Vérifier l'état des services
log_info "6. Vérification de l'état des services..."

if docker-compose -f docker-compose.prod.yml ps postgres | grep -q "Up"; then
    log_success "PostgreSQL est démarré"
    
    # Tester la connexion
    log_info "7. Test de connexion à PostgreSQL..."
    
    if docker-compose -f docker-compose.prod.yml exec -T postgres pg_isready -U "$POSTGRES_USER" -d "$POSTGRES_DB" >/dev/null 2>&1; then
        log_success "PostgreSQL répond aux pings"
        
        # Test de connexion complète
        if docker-compose -f docker-compose.prod.yml exec -T postgres psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" -c "SELECT 1;" >/dev/null 2>&1; then
            log_success "Connexion PostgreSQL complète fonctionnelle"
            
            # Vérifier les tables
            log_info "8. Vérification des tables..."
            TABLE_COUNT=$(docker-compose -f docker-compose.prod.yml exec -T postgres psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" -t -c "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public';" 2>/dev/null | tr -d ' ')
            
            if [ "$TABLE_COUNT" -gt 0 ]; then
                log_success "Base de données contient $TABLE_COUNT tables"
            else
                log_warning "Base de données vide (aucune table trouvée)"
            fi
        else
            log_error "Connexion PostgreSQL échoue - problème de credentials"
            log_info "Solutions possibles:"
            log_info "  - Exécuter: ./scripts/deploy.sh quick-fix"
            log_info "  - Ou: ./scripts/deploy.sh fix-credentials --new-password"
            exit 1
        fi
    else
        log_error "PostgreSQL ne répond pas aux pings"
        log_info "Solutions possibles:"
        log_info "  - Exécuter: ./scripts/deploy.sh restart-db"
        log_info "  - Ou: docker-compose -f docker-compose.prod.yml restart postgres"
        exit 1
    fi
else
    log_warning "PostgreSQL n'est pas démarré"
    log_info "Solutions possibles:"
    log_info "  - Exécuter: docker-compose -f docker-compose.prod.yml up -d postgres"
    log_info "  - Ou: ./scripts/deploy.sh restart-db"
    exit 1
fi

# Vérifier le backend
log_info "9. Vérification du backend..."

if docker-compose -f docker-compose.prod.yml ps backend | grep -q "Up"; then
    log_success "Backend est démarré"
    
    # Vérifier les logs du backend pour des erreurs de DB
    log_info "10. Vérification des logs backend (erreurs DB)..."
    
    if docker-compose -f docker-compose.prod.yml logs backend --tail=20 | grep -i "error\|fail\|cannot connect" >/dev/null 2>&1; then
        log_warning "Erreurs détectées dans les logs backend"
        log_info "Derniers logs backend:"
        docker-compose -f docker-compose.prod.yml logs backend --tail=10
    else
        log_success "Aucune erreur critique détectée dans les logs backend"
    fi
else
    log_warning "Backend n'est pas démarré"
    log_info "Solutions possibles:"
    log_info "  - Exécuter: ./scripts/deploy.sh restart-db"
    log_info "  - Ou: docker-compose -f docker-compose.prod.yml up -d backend"
fi

echo ""
log_success "🎉 Diagnostic terminé !"
log_info "💡 Commandes utiles:"
log_info "  - Réparation rapide: ./scripts/deploy.sh quick-fix"
log_info "  - Nouveau mot de passe: ./scripts/deploy.sh fix-credentials --new-password"
log_info "  - Redémarrer DB: ./scripts/deploy.sh restart-db"
log_info "  - Logs PostgreSQL: docker-compose -f docker-compose.prod.yml logs postgres"
log_info "  - Logs Backend: docker-compose -f docker-compose.prod.yml logs backend" 