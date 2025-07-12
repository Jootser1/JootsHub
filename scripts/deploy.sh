#!/bin/bash

# 🚀 Script de déploiement JootsHub sur le cloud
# Usage: ./scripts/deploy.sh [production|staging] [domain]

set -e

# Variables par défaut (utilisées seulement pour le déploiement complet)
ENVIRONMENT=${1:-production}
DOMAIN=${2:-"joots.com"}
LANDING_DOMAIN="www.${DOMAIN}"
APP_DOMAIN="app.${DOMAIN}"

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

# ======= FONCTIONS DE DIAGNOSTIC ET RÉPARATION CREDENTIALS =======

# Fonction pour diagnostiquer les problèmes de credentials
diagnose_credentials() {
    log_info "🔍 Diagnostic des credentials..."
    
    # Vérifier la présence des fichiers .env
    if [ ! -f ".env" ]; then
        log_error "Fichier .env principal manquant"
        return 1
    fi
    
    if [ ! -f "joots-backend/.env.production" ]; then
        log_error "Fichier .env.production backend manquant"
        return 1
    fi
    
    # Extraire les credentials du fichier .env
    POSTGRES_USER=$(grep "^POSTGRES_USER=" .env | cut -d'=' -f2)
    POSTGRES_PASSWORD=$(grep "^POSTGRES_PASSWORD=" .env | cut -d'=' -f2)
    POSTGRES_DB=$(grep "^POSTGRES_DB=" .env | cut -d'=' -f2)
    
    log_info "Credentials dans .env:"
    log_info "  - POSTGRES_USER: $POSTGRES_USER"
    log_info "  - POSTGRES_DB: $POSTGRES_DB"
    log_info "  - POSTGRES_PASSWORD: [${#POSTGRES_PASSWORD} caractères]"
    
    # Vérifier les credentials dans le backend
    BACKEND_DB_URL=$(grep "^DATABASE_URL=" joots-backend/.env.production | cut -d'=' -f2)
    log_info "Database URL backend: $BACKEND_DB_URL"
    
    # Vérifier la cohérence des credentials
    if [[ "$BACKEND_DB_URL" =~ $POSTGRES_USER ]] && [[ "$BACKEND_DB_URL" =~ $POSTGRES_DB ]]; then
        log_success "Credentials cohérents entre .env et backend"
    else
        log_error "Incohérence entre .env et backend DATABASE_URL"
        return 1
    fi
    
    # Vérifier si le mot de passe contient des caractères problématiques
    if [[ "$POSTGRES_PASSWORD" =~ ^[a-zA-Z0-9]+$ ]]; then
        log_success "Mot de passe sûr pour URL (caractères alphanumériques seulement)"
    else
        log_warning "Mot de passe contient des caractères spéciaux (peut causer des problèmes d'encodage)"
        log_info "Suggestion: Régénérer un mot de passe sûr avec --new-password"
    fi
    
    # Vérifier si PostgreSQL est démarré
    if docker-compose -f docker-compose.prod.yml ps postgres | grep -q "Up"; then
        log_success "PostgreSQL est démarré"
        
        # Tester la connexion PostgreSQL directe
        if docker-compose -f docker-compose.prod.yml exec -T postgres pg_isready -U "$POSTGRES_USER" -d "$POSTGRES_DB" >/dev/null 2>&1; then
            log_success "PostgreSQL répond aux pings"
            
            # Tester la connexion complète
            if docker-compose -f docker-compose.prod.yml exec -T postgres psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" -c "SELECT 1;" >/dev/null 2>&1; then
                log_success "Connexion PostgreSQL complète fonctionnelle"
                
                # Tester la connexion Prisma (si le backend est démarré)
                if docker-compose -f docker-compose.prod.yml ps backend | grep -q "Up"; then
                    log_info "Test de connexion Prisma via backend..."
                    # Vérifier les logs récents du backend pour des erreurs Prisma
                    if docker-compose -f docker-compose.prod.yml logs backend --tail=50 | grep -i "prisma.*error\|authentication.*failed" >/dev/null 2>&1; then
                        log_error "Erreurs Prisma détectées dans les logs backend"
                        log_info "Problème probable: Encodage URL ou credentials Prisma"
                        return 1
                    else
                        log_success "Aucune erreur Prisma récente détectée"
                    fi
                else
                    log_warning "Backend non démarré - impossible de tester Prisma"
                fi
                
                return 0
            else
                log_error "Connexion PostgreSQL échoue - problème de credentials"
                return 1
            fi
        else
            log_error "PostgreSQL ne répond pas aux pings"
            return 1
        fi
    else
        log_warning "PostgreSQL n'est pas démarré"
        return 1
    fi
}

# Fonction pour réparer uniquement les credentials
fix_credentials() {
    log_info "🔧 Réparation des credentials..."
    
    # Générer un nouveau mot de passe si nécessaire
    if [ "$1" = "--new-password" ]; then
        log_info "Génération d'un nouveau mot de passe..."
        POSTGRES_PASSWORD=$(generate_safe_password)
    else
        # Garder le mot de passe existant ou en générer un nouveau
        if [ -f ".env" ]; then
            POSTGRES_PASSWORD=$(grep "^POSTGRES_PASSWORD=" .env | cut -d'=' -f2)
            log_info "Réutilisation du mot de passe existant"
        else
            POSTGRES_PASSWORD=$(generate_safe_password)
            log_info "Génération d'un nouveau mot de passe"
        fi
    fi
    
    # Variables fixes
    POSTGRES_USER=joots_user
    POSTGRES_DB=joots_db
    POSTGRES_PASSWORD_ENCODED=$(url_encode "$POSTGRES_PASSWORD")
    
    # Recréer uniquement les fichiers .env avec les credentials
    log_info "Mise à jour du fichier .env principal..."
    
    # Préserver les autres variables s'il y en a
    if [ -f ".env" ]; then
        # Backup de l'ancien fichier
        cp .env .env.backup
        # Supprimer les lignes PostgreSQL
        sed -i '/^POSTGRES_/d' .env
    fi
    
    # Ajouter les nouvelles variables PostgreSQL
    cat >> .env << EOF
POSTGRES_USER=$POSTGRES_USER
POSTGRES_PASSWORD=$POSTGRES_PASSWORD
POSTGRES_DB=$POSTGRES_DB
EOF
    
    log_info "Mise à jour du fichier .env.production backend..."
    
    # Préserver les autres variables backend
    if [ -f "joots-backend/.env.production" ]; then
        cp joots-backend/.env.production joots-backend/.env.production.backup
        sed -i '/^DATABASE_URL=/d' joots-backend/.env.production
    fi
    
    # Ajouter la nouvelle DATABASE_URL
    cat >> joots-backend/.env.production << EOF
DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD_ENCODED}@postgres:5432/${POSTGRES_DB}
EOF
    
    log_success "Credentials mis à jour"
    log_info "PostgreSQL User: $POSTGRES_USER"
    log_info "PostgreSQL Database: $POSTGRES_DB"
    log_info "Nouveau mot de passe généré: ${#POSTGRES_PASSWORD} caractères"
}

# Fonction pour redémarrer uniquement les services concernés par les credentials
restart_db_services() {
    log_info "🔄 Redémarrage des services liés à la base de données..."
    
    # Arrêter les services dans l'ordre inverse
    docker-compose -f docker-compose.prod.yml stop backend
    docker-compose -f docker-compose.prod.yml stop postgres
    
    # Redémarrer PostgreSQL
    log_info "Redémarrage de PostgreSQL..."
    docker-compose -f docker-compose.prod.yml up -d postgres
    
    # Attendre que PostgreSQL soit prêt
    if ! check_postgres_health; then
        log_error "PostgreSQL ne répond pas après redémarrage"
        return 1
    fi
    
    # Redémarrer le backend
    log_info "Redémarrage du backend..."
    docker-compose -f docker-compose.prod.yml up -d backend
    
    # Vérifier que le backend démarre correctement
    sleep 10
    if docker-compose -f docker-compose.prod.yml ps backend | grep -q "Up"; then
        log_success "Services redémarrés avec succès"
        return 0
    else
        log_error "Erreur lors du redémarrage du backend"
        docker-compose -f docker-compose.prod.yml logs backend
        return 1
    fi
}

# Fonction de réparation rapide complète
quick_fix_credentials() {
    log_info "🚀 Réparation rapide des credentials..."
    
    # Diagnostic
    if ! diagnose_credentials; then
        log_info "Problème détecté, réparation en cours..."
        
        # Réparer les credentials
        fix_credentials "$1"
        
        # Redémarrer les services
        if restart_db_services; then
            log_success "Réparation terminée avec succès!"
            diagnose_credentials
        else
            log_error "Erreur lors du redémarrage des services"
            return 1
        fi
    else
        log_success "Aucun problème de credentials détecté"
    fi
}

# ======= FIN DES FONCTIONS DE DIAGNOSTIC =======

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

# Fonction pour générer un mot de passe sûr (sans caractères spéciaux pour URL)
generate_safe_password() {
    # Générer un mot de passe avec seulement des caractères alphanumériques (lettres minuscules et chiffres)
    # Pour éviter tout problème d'encodage dans l'URL PostgreSQL
    openssl rand -hex 16 | tr '[:upper:]' '[:lower:]' | cut -c1-25
}

# Fonction pour encoder les caractères spéciaux dans l'URL
url_encode() {
    local string="${1}"
    # Avec les nouveaux mots de passe hexadécimaux, on n'a normalement plus besoin d'encoder
    # mais on garde cette fonction pour la compatibilité
    if [[ "$string" =~ ^[a-z0-9]+$ ]]; then
        # Si le mot de passe ne contient que des lettres minuscules et chiffres, pas d'encodage nécessaire
        echo "$string"
    else
        # Sinon, encoder les caractères spéciaux
        local encoded=""
        local length="${#string}"
        
        for (( i=0; i<$length; i++ )); do
            local char="${string:$i:1}"
            case $char in
                [a-zA-Z0-9._-]) encoded="$encoded$char" ;;
                *) encoded="$encoded$(printf '%%%02X' "'$char")" ;;
            esac
        done
        echo "$encoded"
    fi
}

# Configuration des variables d'environnement
setup_environment() {
    log_info "Configuration de l'environnement $ENVIRONMENT..."

    # Définir les variables de base de données
    POSTGRES_USER=joots_user
    POSTGRES_DB=joots_db
    
    # Générer un mot de passe unique et persistant
    if [ ! -f ".env" ]; then
        POSTGRES_PASSWORD=$(generate_safe_password)
        log_info "Génération d'un nouveau mot de passe PostgreSQL sécurisé"
    else
        # Récupérer le mot de passe existant
        POSTGRES_PASSWORD=$(grep "POSTGRES_PASSWORD=" .env | cut -d'=' -f2)
        log_info "Réutilisation du mot de passe PostgreSQL existant"
    fi

    # Créer le fichier .env principal avec les credentials synchronisés
    log_info "Configuration du fichier .env principal"
    cat > .env << EOF
# Configuration PostgreSQL
POSTGRES_USER=$POSTGRES_USER
POSTGRES_PASSWORD=$POSTGRES_PASSWORD
POSTGRES_DB=$POSTGRES_DB

# Configuration générale
DOMAIN=$DOMAIN
LANDING_DOMAIN=$LANDING_DOMAIN
APP_DOMAIN=$APP_DOMAIN
ENVIRONMENT=$ENVIRONMENT
EOF

    # Frontend .env.production
    log_info "Configuration du fichier .env.production pour le frontend"
    cat > joots-frontend/.env.production << EOF
# URLs Production - Architecture multi-domaines
NEXT_PUBLIC_API_URL=https://$APP_DOMAIN/api
NEXT_PUBLIC_APP_URL=https://$APP_DOMAIN
NEXT_PUBLIC_LANDING_URL=https://$LANDING_DOMAIN
NEXTAUTH_URL=https://$APP_DOMAIN
NEXT_PUBLIC_SOCKET_URL=https://$APP_DOMAIN
NEXT_PUBLIC_SW_URL=https://$APP_DOMAIN

# Domaines
NEXT_PUBLIC_DOMAIN=$DOMAIN
NEXT_PUBLIC_LANDING_DOMAIN=$LANDING_DOMAIN
NEXT_PUBLIC_APP_DOMAIN=$APP_DOMAIN

# Clés de sécurité
NEXTAUTH_SECRET=$(openssl rand -base64 32)

# Environnement
NODE_ENV=${ENVIRONMENT}
EOF
    
    # Backend .env.production avec credentials synchronisés
    log_info "Configuration du fichier .env.production pour le backend"
    # Encoder le mot de passe pour l'URL
    POSTGRES_PASSWORD_ENCODED=$(url_encode "$POSTGRES_PASSWORD")
    cat > joots-backend/.env.production << EOF
# Base de données - Credentials synchronisés
DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD_ENCODED}@postgres:5432/${POSTGRES_DB}

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
JWT_REFRESH_EXPIRES_IN=7d
JWT_REFRESH_SECRET=$(openssl rand -base64 32)

# Environnement
NODE_ENV=${ENVIRONMENT}
SEED_DB=false
EOF
    
    log_success "Environnement configuré avec credentials synchronisés"
    log_info "PostgreSQL User: $POSTGRES_USER"
    log_info "PostgreSQL Database: $POSTGRES_DB"
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
    
    # Note: Le test nginx est fait au démarrage des services
    # car nginx a besoin que les upstreams soient disponibles
    log_info "Test nginx différé au démarrage des services"
}

# Fonction pour vérifier la santé de PostgreSQL
check_postgres_health() {
    log_info "Vérification de la santé de PostgreSQL..."
    local max_attempts=30
    local attempt=1
    
    while [ $attempt -le $max_attempts ]; do
        if docker-compose -f docker-compose.prod.yml exec -T postgres pg_isready -U joots_user -d joots_db >/dev/null 2>&1; then
            log_success "PostgreSQL est prêt (tentative $attempt/$max_attempts)"
            return 0
        else
            log_info "PostgreSQL pas encore prêt (tentative $attempt/$max_attempts)..."
            sleep 2
            ((attempt++))
        fi
    done
    
    log_error "PostgreSQL n'est pas prêt après $max_attempts tentatives"
    return 1
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
    
    # Démarrage des services dans l'ordre
    log_info "Démarrage des services en séquence..."
    
    # Démarrer d'abord les services de base
    log_info "Démarrage de PostgreSQL et Redis..."
    docker-compose -f docker-compose.prod.yml up -d postgres redis
    
    # Attendre que PostgreSQL soit prêt
    if ! check_postgres_health; then
        log_error "PostgreSQL ne répond pas - vérification des logs"
        docker-compose -f docker-compose.prod.yml logs postgres
        exit 1
    fi
    
    # Vérifier les credentials PostgreSQL
    log_info "Test de connexion PostgreSQL..."
    if docker-compose -f docker-compose.prod.yml exec -T postgres psql -U joots_user -d joots_db -c "SELECT 1;" >/dev/null 2>&1; then
        log_success "Connexion PostgreSQL validée"
    else
        log_error "Impossible de se connecter à PostgreSQL avec les credentials"
        log_info "Vérification des logs PostgreSQL..."
        docker-compose -f docker-compose.prod.yml logs postgres
        exit 1
    fi
    
    # Démarrer le backend
    log_info "Démarrage du backend..."
    docker-compose -f docker-compose.prod.yml up -d backend
    
    # Attendre que le backend soit prêt
    log_info "Attente du démarrage du backend..."
    local backend_ready=false
    for i in {1..30}; do
        if docker-compose -f docker-compose.prod.yml ps backend | grep -q "Up"; then
            sleep 2
            # Vérifier que le backend ne redémarre pas
            if docker-compose -f docker-compose.prod.yml ps backend | grep -q "Up" && ! docker-compose -f docker-compose.prod.yml ps backend | grep -q "Restarting"; then
                backend_ready=true
                break
            fi
        fi
        log_info "Backend pas encore prêt (tentative $i/30)..."
        sleep 2
    done
    
    if [ "$backend_ready" = false ]; then
        log_error "Backend n'est pas prêt - vérification des logs"
        docker-compose -f docker-compose.prod.yml logs backend
        exit 1
    fi
    
    log_success "Backend démarré avec succès"
    
    # Démarrer le frontend
    log_info "Démarrage du frontend..."
    docker-compose -f docker-compose.prod.yml up -d frontend
    sleep 15
    
    # Enfin démarrer nginx
    log_info "Démarrage de nginx (reverse proxy)..."
    docker-compose -f docker-compose.prod.yml up -d nginx
    sleep 10
    
    # Vérifier que tous les services sont actifs
    log_info "Vérification finale des services..."
    if docker-compose -f docker-compose.prod.yml ps | grep -q "Up"; then
        log_success "Services démarrés avec succès"
        
        # Vérifier spécifiquement nginx
        if docker-compose -f docker-compose.prod.yml ps nginx | grep -q "Up"; then
            log_success "Nginx démarré avec succès"
        else
            log_error "Problème avec nginx"
            docker-compose -f docker-compose.prod.yml logs nginx
            exit 1
        fi
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
    # Vérifier les options spéciales EN PREMIER
    case "$1" in
        "check-credentials"|"diag")
            log_info "🔍 Mode diagnostic des credentials uniquement"
            diagnose_credentials
            exit $?
            ;;
        "fix-credentials")
            log_info "🔧 Mode réparation des credentials uniquement"
            fix_credentials "$2"
            exit $?
            ;;
        "fix-domains")
            log_info "🔧 Mode correction des domaines uniquement"
            chmod +x scripts/fix-domains.sh
            ./scripts/fix-domains.sh "$2"
            exit $?
            ;;
        "restart-db")
            log_info "🔄 Mode redémarrage des services DB uniquement"
            restart_db_services
            exit $?
            ;;
        "quick-fix")
            log_info "🚀 Mode réparation rapide des credentials"
            quick_fix_credentials "$2"
            exit $?
            ;;
        "help"|"-h"|"--help")
            show_help
            exit 0
            ;;
        *)
            # Mode déploiement complet - afficher les informations ici
            echo "🚀 Déploiement JootsHub - Environnement: $ENVIRONMENT"
            echo "🌐 Domaine principal: $DOMAIN"
            echo "🌐 Landing page: $LANDING_DOMAIN"
            echo "🌐 Application: $APP_DOMAIN"
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
            ;;
    esac
}

# Fonction d'aide
show_help() {
    echo "🚀 Script de déploiement JootsHub"
    echo ""
    echo "Usage: ./scripts/deploy.sh [OPTION] [ENVIRONNEMENT] [DOMAINE]"
    echo ""
    echo "OPTIONS RAPIDES (évitent le déploiement complet):"
    echo "  check-credentials    Diagnostiquer les problèmes de credentials"
    echo "  diag                 Alias pour check-credentials"
    echo "  fix-credentials      Réparer les credentials uniquement"
    echo "  fix-credentials --new-password  Générer un nouveau mot de passe"
    echo "  fix-domains [domaine] Corriger les domaines dans les fichiers .env"
    echo "  restart-db           Redémarrer uniquement PostgreSQL et backend"
    echo "  quick-fix            Diagnostic + réparation + redémarrage automatique"
    echo "  quick-fix --new-password  Quick-fix avec nouveau mot de passe"
    echo ""
    echo "DÉPLOIEMENT COMPLET:"
    echo "  ./scripts/deploy.sh [production|staging] [domaine]"
    echo ""
    echo "EXEMPLES:"
    echo "  ./scripts/deploy.sh diag                    # Vérifier les credentials"
    echo "  ./scripts/deploy.sh quick-fix               # Réparation rapide"
    echo "  ./scripts/deploy.sh fix-domains joots.com   # Corriger les domaines"
    echo "  ./scripts/deploy.sh fix-credentials --new-password  # Nouveau mot de passe"
    echo "  ./scripts/deploy.sh production joots.com    # Déploiement complet"
}

# Gestion des erreurs
trap 'log_error "Erreur lors du déploiement. Vérifiez les logs."' ERR

# Exécution
main "$@" 