#!/bin/bash

# 🚀 Script de déploiement JootsHub sur le cloud
# Usage: ./scripts/deploy.sh [production|staging]

set -e

ENVIRONMENT=${1:-production}
DOMAIN=${2:-"joots.com"}

echo "🚀 Déploiement JootsHub - Environnement: $ENVIRONMENT"
echo "🌐 Domaine: $DOMAIN"

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

# Vérifications préalables
check_prerequisites() {
    log_info "Vérification des prérequis..."
    
    # Vérifier Docker
    if ! command -v docker &> /dev/null; then
        log_error "Docker n'est pas installé"
        exit 1
    fi
    
    # Vérifier Docker Compose
    if ! command -v docker-compose &> /dev/null; then
        log_error "Docker Compose n'est pas installé"
        exit 1
    fi
    
    # Vérifier les fichiers de configuration
    if [ ! -f "docker-compose.prod.yml" ]; then
        log_error "Fichier docker-compose.prod.yml manquant"
        exit 1
    fi
    
    if [ ! -f "nginx/nginx.prod.conf" ]; then
        log_error "Fichier nginx/nginx.prod.conf manquant"
        exit 1
    fi
    
    log_success "Prérequis validés"
}

# Configuration des variables d'environnement
setup_environment() {
    log_info "Configuration de l'environnement $ENVIRONMENT..."
    
    # Créer les fichiers .env si ils n'existent pas
    if [ ! -f ".env" ]; then
        log_info "Création du fichier .env principal"
        cat > .env << EOF
# Configuration PostgreSQL
POSTGRES_USER=joots_user
POSTGRES_PASSWORD=$(openssl rand -base64 32)
POSTGRES_DB=joots_db

# Configuration générale
DOMAIN=$DOMAIN
ENVIRONMENT=$ENVIRONMENT
EOF
    fi
    
    # Frontend .env.prod
    if [ ! -f "joots-frontend/.env.prod" ]; then
        log_info "Création du fichier .env.prod pour le frontend"
        cat > joots-frontend/.env.prod << EOF
# URLs Production
NEXT_PUBLIC_API_URL=https://$DOMAIN/api
NEXTAUTH_URL=https://$DOMAIN
NEXT_PUBLIC_WS_URL=wss://$DOMAIN/socket.io
NEXT_PUBLIC_SW_URL=https://$DOMAIN

# Clés de sécurité
NEXTAUTH_SECRET=$(openssl rand -base64 32)

# Environnement
NODE_ENV=production
EOF
    fi
    
    # Backend .env.prod
    if [ ! -f "joots-backend/.env.prod" ]; then
        log_info "Création du fichier .env.prod pour le backend"
        cat > joots-backend/.env.prod << EOF
# Base de données
DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@postgres:5432/${POSTGRES_DB}

# Redis
REDIS_URL=redis://redis:6379
REDIS_HOST=redis
REDIS_PORT=6379

# SSL
SSL_KEY_PATH=/app/ssl/backend.key
SSL_CERT_PATH=/app/ssl/backend.crt
PORT=4000

# Sécurité
JWT_SECRET=$(openssl rand -base64 32)
JWT_EXPIRES_IN=24h

# Environnement
NODE_ENV=production
SEED_DB=false
EOF
    fi
    
    log_success "Environnement configuré"
}

# Configuration SSL avec Let's Encrypt
setup_ssl() {
    log_info "Configuration SSL..."
    
    if [ ! -d "nginx/ssl" ]; then
        mkdir -p nginx/ssl
    fi
    
    # Vérifier si les certificats Let's Encrypt existent
    if [ ! -f "nginx/ssl/fullchain.pem" ] || [ ! -f "nginx/ssl/privkey.pem" ]; then
        log_warning "Certificats SSL manquants. Installation de Certbot..."
        
        # Installer Certbot si nécessaire
        if ! command -v certbot &> /dev/null; then
            log_info "Installation de Certbot..."
            if command -v apt-get &> /dev/null; then
                sudo apt-get update
                sudo apt-get install -y certbot python3-certbot-nginx
            elif command -v yum &> /dev/null; then
                sudo yum install -y certbot python3-certbot-nginx
            else
                log_error "Impossible d'installer Certbot automatiquement"
                log_info "Veuillez installer Certbot manuellement"
                exit 1
            fi
        fi
        
        log_info "Génération des certificats SSL pour $DOMAIN..."
        log_warning "Assurez-vous que votre domaine pointe vers ce serveur"
        
        # Arrêter nginx temporairement
        sudo systemctl stop nginx 2>/dev/null || true
        
        # Générer les certificats
        sudo certbot certonly --standalone -d $DOMAIN -d www.$DOMAIN --email admin@$DOMAIN --agree-tos --non-interactive
        
        # Copier les certificats
        sudo cp /etc/letsencrypt/live/$DOMAIN/fullchain.pem nginx/ssl/
        sudo cp /etc/letsencrypt/live/$DOMAIN/privkey.pem nginx/ssl/
        sudo chown $USER:$USER nginx/ssl/*
        
        log_success "Certificats SSL configurés"
    else
        log_success "Certificats SSL déjà présents"
    fi
}

# Mise à jour de la configuration nginx
update_nginx_config() {
    log_info "Mise à jour de la configuration nginx..."
    
    # Remplacer le domaine dans la configuration
    sed -i "s/votre-domaine.com/$DOMAIN/g" nginx/nginx.prod.conf
    
    log_success "Configuration nginx mise à jour"
}

# Build et déploiement
deploy_application() {
    log_info "Déploiement de l'application..."
    
    # Arrêter les services existants
    log_info "Arrêt des services existants..."
    docker-compose -f docker-compose.prod.yml down --remove-orphans || true
    
    # Nettoyer les images obsolètes
    log_info "Nettoyage des images obsolètes..."
    docker system prune -f || true
    
    # Build des images
    log_info "Construction des images Docker..."
    docker-compose -f docker-compose.prod.yml build --no-cache
    
    # Démarrage des services
    log_info "Démarrage des services..."
    docker-compose -f docker-compose.prod.yml up -d
    
    # Attendre que les services soient prêts
    log_info "Attente du démarrage des services..."
    sleep 30
    
    # Vérifier que les services sont actifs
    if docker-compose -f docker-compose.prod.yml ps | grep -q "Up"; then
        log_success "Services démarrés avec succès"
    else
        log_error "Erreur lors du démarrage des services"
        docker-compose -f docker-compose.prod.yml logs
        exit 1
    fi
}

# Vérification du déploiement
verify_deployment() {
    log_info "Vérification du déploiement..."
    
    # Test de connectivité
    if curl -s --max-time 10 https://$DOMAIN/health > /dev/null; then
        log_success "Application accessible via HTTPS"
    else
        log_warning "Application non accessible via HTTPS"
    fi
    
    # Vérifier les services Docker
    log_info "État des services:"
    docker-compose -f docker-compose.prod.yml ps
    
    # Afficher les logs récents
    log_info "Logs récents:"
    docker-compose -f docker-compose.prod.yml logs --tail=10
}

# Configuration du monitoring
setup_monitoring() {
    log_info "Configuration du monitoring..."
    
    # Créer le script de monitoring
    cat > scripts/monitor.sh << 'EOF'
#!/bin/bash
# Script de monitoring simple

while true; do
    echo "=== $(date) ==="
    echo "Services Docker:"
    docker-compose -f docker-compose.prod.yml ps
    echo "Utilisation mémoire:"
    free -h
    echo "Espace disque:"
    df -h
    echo "Charge système:"
    uptime
    echo "========================"
    sleep 300  # 5 minutes
done
EOF
    
    chmod +x scripts/monitor.sh
    
    log_success "Monitoring configuré"
}

# Fonction principale
main() {
    echo "🚀 Démarrage du déploiement JootsHub"
    
    check_prerequisites
    setup_environment
    setup_ssl
    update_nginx_config
    deploy_application
    verify_deployment
    setup_monitoring
    
    log_success "🎉 Déploiement terminé avec succès!"
    log_info "🌐 Votre application est accessible sur: https://$DOMAIN"
    log_info "📊 Monitoring: ./scripts/monitor.sh"
    log_info "📋 Logs: docker-compose -f docker-compose.prod.yml logs -f"
}

# Gestion des erreurs
trap 'log_error "Erreur lors du déploiement. Vérifiez les logs."' ERR

# Exécution
main "$@" 