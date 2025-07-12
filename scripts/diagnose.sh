#!/bin/bash

# 🔍 Script de diagnostic JootsHub
# Usage: ./scripts/diagnose.sh

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

echo "🔍 Diagnostic JootsHub - Vérification de la configuration"

# Vérifier les fichiers de configuration
check_config_files() {
    log_info "Vérification des fichiers de configuration..."
    
    if [ -f ".env" ]; then
        log_success "Fichier .env trouvé"
        log_info "Contenu du fichier .env:"
        cat .env
        echo ""
    else
        log_error "Fichier .env manquant"
    fi
    
    if [ -f "joots-backend/.env.production" ]; then
        log_success "Fichier joots-backend/.env.production trouvé"
        log_info "DATABASE_URL dans le backend:"
        grep "DATABASE_URL" joots-backend/.env.production || log_warning "DATABASE_URL non trouvée"
        echo ""
    else
        log_error "Fichier joots-backend/.env.production manquant"
    fi
    
    if [ -f "docker-compose.prod.yml" ]; then
        log_success "Fichier docker-compose.prod.yml trouvé"
    else
        log_error "Fichier docker-compose.prod.yml manquant"
    fi
}

# Vérifier les services Docker
check_docker_services() {
    log_info "Vérification des services Docker..."
    
    if docker-compose -f docker-compose.prod.yml ps &>/dev/null; then
        log_info "État des services Docker:"
        docker-compose -f docker-compose.prod.yml ps
        echo ""
        
        # Vérifier PostgreSQL spécifiquement
        if docker-compose -f docker-compose.prod.yml ps postgres | grep -q "Up"; then
            log_success "PostgreSQL est en cours d'exécution"
            
            # Test de connexion PostgreSQL
            log_info "Test de connexion PostgreSQL..."
            if docker-compose -f docker-compose.prod.yml exec -T postgres pg_isready -U joots_user -d joots_db &>/dev/null; then
                log_success "PostgreSQL répond aux connexions"
            else
                log_error "PostgreSQL ne répond pas aux connexions"
            fi
            
            # Test de connexion avec credentials
            log_info "Test d'authentification PostgreSQL..."
            if docker-compose -f docker-compose.prod.yml exec -T postgres psql -U joots_user -d joots_db -c "SELECT 1;" &>/dev/null; then
                log_success "Authentification PostgreSQL réussie"
            else
                log_error "Échec de l'authentification PostgreSQL"
                log_info "Vérification des variables d'environnement PostgreSQL..."
                docker-compose -f docker-compose.prod.yml exec -T postgres env | grep POSTGRES || log_warning "Variables POSTGRES non trouvées"
            fi
        else
            log_error "PostgreSQL n'est pas en cours d'exécution"
        fi
        
        # Vérifier le backend
        if docker-compose -f docker-compose.prod.yml ps backend | grep -q "Up"; then
            log_success "Backend est en cours d'exécution"
        elif docker-compose -f docker-compose.prod.yml ps backend | grep -q "Restarting"; then
            log_error "Backend est en cours de redémarrage - problème détecté"
        else
            log_error "Backend n'est pas en cours d'exécution"
        fi
    else
        log_warning "Aucun service Docker en cours d'exécution"
    fi
}

# Vérifier les logs des services
check_logs() {
    log_info "Vérification des logs récents..."
    
    echo ""
    log_info "=== Logs PostgreSQL (10 dernières lignes) ==="
    docker-compose -f docker-compose.prod.yml logs --tail=10 postgres 2>/dev/null || log_warning "Logs PostgreSQL non disponibles"
    
    echo ""
    log_info "=== Logs Backend (10 dernières lignes) ==="
    docker-compose -f docker-compose.prod.yml logs --tail=10 backend 2>/dev/null || log_warning "Logs Backend non disponibles"
    
    echo ""
    log_info "=== Logs Frontend (10 dernières lignes) ==="
    docker-compose -f docker-compose.prod.yml logs --tail=10 frontend 2>/dev/null || log_warning "Logs Frontend non disponibles"
}

# Vérifier la connectivité réseau
check_network() {
    log_info "Vérification de la connectivité réseau..."
    
    if docker network ls | grep -q "joots"; then
        log_success "Réseau Docker joots trouvé"
        log_info "Détails du réseau:"
        docker network inspect $(docker network ls | grep joots | awk '{print $1}') --format '{{.Name}}: {{.Driver}}' 2>/dev/null || log_warning "Impossible d'inspecter le réseau"
    else
        log_warning "Réseau Docker joots non trouvé"
    fi
}

# Suggestions de réparation
suggest_fixes() {
    log_info "💡 Suggestions de réparation..."
    
    echo ""
    log_info "1. Pour reconfigurer complètement:"
    echo "   ./scripts/deploy.sh production"
    
    echo ""
    log_info "2. Pour redémarrer uniquement PostgreSQL:"
    echo "   docker-compose -f docker-compose.prod.yml restart postgres"
    
    echo ""
    log_info "3. Pour voir les logs en temps réel:"
    echo "   docker-compose -f docker-compose.prod.yml logs -f"
    
    echo ""
    log_info "4. Pour nettoyer et redémarrer:"
    echo "   docker-compose -f docker-compose.prod.yml down --remove-orphans"
    echo "   docker system prune -f"
    echo "   ./scripts/deploy.sh production"
    
    echo ""
    log_info "5. Pour vérifier la synchronisation des credentials:"
    echo "   Comparez les valeurs POSTGRES_PASSWORD dans .env et joots-backend/.env.production"
}

# Fonction principale
main() {
    check_config_files
    check_docker_services
    check_logs
    check_network
    suggest_fixes
    
    log_info "🔍 Diagnostic terminé"
}

# Exécution
main "$@" 