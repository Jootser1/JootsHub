#!/bin/bash

# 🚀 Script de déploiement JootsHub sur le cloud
# Usage: ./scripts/deploy.sh [production|staging] [domain]

set -e

ENVIRONMENT=${1:-production}
DOMAIN=${2:-"joots.com"}
LANDING_DOMAIN="www.${DOMAIN}"
APP_DOMAIN="app.${DOMAIN}"

echo "🚀 Déploiement JootsHub - Environnement: $ENVIRONMENT"
echo "🌐 Domaine principal: $DOMAIN"
echo "🌐 Landing page: $LANDING_DOMAIN"
echo "🌐 Application: $APP_DOMAIN"

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
LANDING_DOMAIN=$LANDING_DOMAIN
APP_DOMAIN=$APP_DOMAIN
ENVIRONMENT=$ENVIRONMENT
EOF
    fi
    
    # Frontend .env.prod
    if [ ! -f "joots-frontend/.env.prod" ]; then
        log_info "Création du fichier .env.prod pour le frontend"
        cat > joots-frontend/.env.prod << EOF
# URLs Production - Architecture multi-domaines
NEXT_PUBLIC_API_URL=https://$APP_DOMAIN/api
NEXT_PUBLIC_APP_URL=https://$APP_DOMAIN
NEXT_PUBLIC_LANDING_URL=https://$LANDING_DOMAIN
NEXTAUTH_URL=https://$APP_DOMAIN
NEXT_PUBLIC_WS_URL=wss://$APP_DOMAIN/socket.io
NEXT_PUBLIC_SW_URL=https://$APP_DOMAIN

# Domaines
NEXT_PUBLIC_DOMAIN=$DOMAIN
NEXT_PUBLIC_LANDING_DOMAIN=$LANDING_DOMAIN
NEXT_PUBLIC_APP_DOMAIN=$APP_DOMAIN

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

# Domaines
FRONTEND_URL=https://$APP_DOMAIN
LANDING_URL=https://$LANDING_DOMAIN
ALLOWED_ORIGINS=https://$LANDING_DOMAIN,https://$APP_DOMAIN

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
    log_info "Configuration SSL pour les domaines multiples..."
    
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
        
        log_info "Génération des certificats SSL pour tous les domaines..."
        log_warning "Assurez-vous que tous vos domaines pointent vers ce serveur"
        log_info "Domaines à certifier: $DOMAIN, $LANDING_DOMAIN, $APP_DOMAIN"
        
        # Arrêter nginx temporairement
        sudo systemctl stop nginx 2>/dev/null || true
        
        # Générer les certificats pour tous les domaines
        sudo certbot certonly --standalone \
            -d $DOMAIN \
            -d $LANDING_DOMAIN \
            -d $APP_DOMAIN \
            --email admin@$DOMAIN \
            --agree-tos \
            --non-interactive
        
        # Copier les certificats (utiliser le premier domaine comme référence)
        sudo cp /etc/letsencrypt/live/$DOMAIN/fullchain.pem nginx/ssl/
        sudo cp /etc/letsencrypt/live/$DOMAIN/privkey.pem nginx/ssl/
        sudo chown $USER:$USER nginx/ssl/*
        
        log_success "Certificats SSL configurés pour tous les domaines"
    else
        log_success "Certificats SSL déjà présents"
    fi
}

# Mise à jour de la configuration nginx
update_nginx_config() {
    log_info "Vérification de la configuration nginx..."
    
    # Vérifier que la configuration contient les bons domaines
    if ! grep -q "server_name $LANDING_DOMAIN" nginx/nginx.prod.conf; then
        log_warning "Configuration nginx ne contient pas les bons domaines"
        log_info "Assurez-vous que nginx/nginx.prod.conf contient:"
        log_info "- server_name $LANDING_DOMAIN $DOMAIN"
        log_info "- server_name $APP_DOMAIN"
    fi
    
    # Tester la configuration nginx
    if docker run --rm -v $(pwd)/nginx/nginx.prod.conf:/etc/nginx/nginx.conf:ro nginx:latest nginx -t; then
        log_success "Configuration nginx valide"
    else
        log_error "Configuration nginx invalide"
        exit 1
    fi
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
    log_info "Vérification du déploiement multi-domaines..."
    
    # Test de connectivité pour la landing page
    log_info "Test de la landing page ($LANDING_DOMAIN)..."
    if curl -s --max-time 10 https://$LANDING_DOMAIN > /dev/null; then
        log_success "Landing page accessible via HTTPS"
    else
        log_warning "Landing page non accessible via HTTPS"
    fi
    
    # Test de connectivité pour l'application
    log_info "Test de l'application ($APP_DOMAIN)..."
    if curl -s --max-time 10 https://$APP_DOMAIN/health > /dev/null; then
        log_success "Application accessible via HTTPS"
    else
        log_warning "Application non accessible via HTTPS"
    fi
    
    # Test de redirection joots.com vers www.joots.com
    log_info "Test de redirection ($DOMAIN → $LANDING_DOMAIN)..."
    if curl -s --max-time 10 -I https://$DOMAIN | grep -q "301\|302"; then
        log_success "Redirection fonctionnelle"
    else
        log_warning "Redirection non détectée"
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
    log_info "Configuration du monitoring multi-domaines..."
    
    # Créer le script de monitoring
    cat > scripts/monitor.sh << EOF
#!/bin/bash
# Script de monitoring multi-domaines

while true; do
    echo "=== \$(date) ==="
    echo "Services Docker:"
    docker-compose -f docker-compose.prod.yml ps
    
    echo "Tests de connectivité:"
    if curl -s --max-time 5 https://$LANDING_DOMAIN > /dev/null; then
        echo "✅ Landing page ($LANDING_DOMAIN) - OK"
    else
        echo "❌ Landing page ($LANDING_DOMAIN) - ERREUR"
    fi
    
    if curl -s --max-time 5 https://$APP_DOMAIN/health > /dev/null; then
        echo "✅ Application ($APP_DOMAIN) - OK"
    else
        echo "❌ Application ($APP_DOMAIN) - ERREUR"
    fi
    
    echo "Certificats SSL:"
    echo "Expiration: \$(openssl x509 -in nginx/ssl/fullchain.pem -text -noout | grep "Not After" | cut -d: -f2-)"
    
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
    
    # Créer un script de renouvellement SSL
    cat > scripts/renew-ssl.sh << EOF
#!/bin/bash
# Script de renouvellement SSL automatique

log_info() {
    echo "\$(date): \$1"
}

log_info "Vérification du renouvellement SSL..."
sudo certbot renew --quiet

if [ \$? -eq 0 ]; then
    log_info "Certificats renouvelés avec succès"
    # Copier les nouveaux certificats
    sudo cp /etc/letsencrypt/live/$DOMAIN/fullchain.pem nginx/ssl/
    sudo cp /etc/letsencrypt/live/$DOMAIN/privkey.pem nginx/ssl/
    sudo chown $USER:$USER nginx/ssl/*
    
    # Redémarrer nginx
    docker-compose -f docker-compose.prod.yml restart nginx
    log_info "Nginx redémarré"
else
    log_info "Aucun renouvellement nécessaire"
fi
EOF
    
    chmod +x scripts/renew-ssl.sh
    
    log_success "Monitoring configuré"
    log_info "Monitoring en temps réel: ./scripts/monitor.sh"
    log_info "Renouvellement SSL: ./scripts/renew-ssl.sh"
}

# Fonction principale
main() {
    echo "🚀 Démarrage du déploiement JootsHub multi-domaines"
    
    check_prerequisites
    setup_environment
    setup_ssl
    update_nginx_config
    deploy_application
    verify_deployment
    setup_monitoring
    
    log_success "🎉 Déploiement terminé avec succès!"
    log_info "🌐 Landing page: https://$LANDING_DOMAIN"
    log_info "🌐 Application: https://$APP_DOMAIN"
    log_info "📊 Monitoring: ./scripts/monitor.sh"
    log_info "📋 Logs: docker-compose -f docker-compose.prod.yml logs -f"
    log_info "🔄 Renouvellement SSL: ./scripts/renew-ssl.sh"
    
    log_info "💡 Conseil: Ajoutez cette ligne au crontab pour le renouvellement automatique SSL:"
    log_info "0 2 * * * /chemin/vers/votre/projet/scripts/renew-ssl.sh >> /var/log/ssl-renewal.log 2>&1"
}

# Gestion des erreurs
trap 'log_error "Erreur lors du déploiement. Vérifiez les logs."' ERR

# Exécution
main "$@" 