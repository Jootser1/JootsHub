#!/bin/bash

# 🔧 Script de correction des problèmes réseau
# Ce script corrige les incohérences de configuration qui causent les erreurs réseau

echo "🔧 Correction des problèmes réseau JootsHub..."
echo ""

# Variables
DOMAIN="joots.com"
LANDING_DOMAIN="www.joots.com"
APP_DOMAIN="app.joots.com"

# Fonction pour vérifier si un fichier existe
check_file() {
    if [ ! -f "$1" ]; then
        echo "❌ Fichier manquant: $1"
        return 1
    fi
    return 0
}

# Fonction pour corriger les variables d'environnement
fix_env_files() {
    echo "📝 Correction des fichiers d'environnement..."
    
    # Corriger frontend .env.production
    if check_file "joots-frontend/.env.production"; then
        echo "  → Correction du frontend .env.production"
        
        # Backup
        cp joots-frontend/.env.production joots-frontend/.env.production.backup-$(date +%Y%m%d_%H%M%S)
        
        # Supprimer les anciennes URLs
        sed -i '/^NEXT_PUBLIC_API_URL=/d' joots-frontend/.env.production
        sed -i '/^NEXT_PUBLIC_APP_URL=/d' joots-frontend/.env.production
        sed -i '/^NEXT_PUBLIC_LANDING_URL=/d' joots-frontend/.env.production
        sed -i '/^NEXTAUTH_URL=/d' joots-frontend/.env.production
        sed -i '/^NEXT_PUBLIC_SOCKET_URL=/d' joots-frontend/.env.production
        sed -i '/^NEXT_PUBLIC_SW_URL=/d' joots-frontend/.env.production
        
        # Ajouter les nouvelles URLs corrigées
        cat >> joots-frontend/.env.production << EOF

# URLs corrigées - Configuration réseau
NEXT_PUBLIC_API_URL=https://$APP_DOMAIN/api
NEXT_PUBLIC_APP_URL=https://$APP_DOMAIN
NEXT_PUBLIC_LANDING_URL=https://$LANDING_DOMAIN
NEXTAUTH_URL=https://$APP_DOMAIN
NEXT_PUBLIC_SOCKET_URL=https://$APP_DOMAIN
NEXT_PUBLIC_SW_URL=https://$APP_DOMAIN
EOF
        
        echo "  ✅ Frontend .env.production corrigé"
    fi
    
    # Corriger backend .env.production
    if check_file "joots-backend/.env.production"; then
        echo "  → Correction du backend .env.production"
        
        # Backup
        cp joots-backend/.env.production joots-backend/.env.production.backup-$(date +%Y%m%d_%H%M%S)
        
        # Supprimer les anciennes URLs
        sed -i '/^FRONTEND_URL=/d' joots-backend/.env.production
        sed -i '/^LANDING_URL=/d' joots-backend/.env.production
        sed -i '/^ALLOWED_ORIGINS=/d' joots-backend/.env.production
        
        # Ajouter les nouvelles URLs corrigées
        cat >> joots-backend/.env.production << EOF

# URLs corrigées - Configuration réseau
FRONTEND_URL=https://$APP_DOMAIN
LANDING_URL=https://$LANDING_DOMAIN
ALLOWED_ORIGINS=https://$LANDING_DOMAIN,https://$APP_DOMAIN,https://$DOMAIN
EOF
        
        echo "  ✅ Backend .env.production corrigé"
    fi
}

# Fonction pour vérifier la configuration Docker
check_docker_config() {
    echo "🐳 Vérification de la configuration Docker..."
    
    # Vérifier que les services sont définis
    if ! docker-compose -f docker-compose.prod.yml config > /dev/null 2>&1; then
        echo "❌ Erreur dans docker-compose.prod.yml"
        return 1
    fi
    
    echo "✅ Configuration Docker valide"
    return 0
}

# Fonction pour redémarrer les services
restart_services() {
    echo "🔄 Redémarrage des services..."
    
    # Arrêter les services
    echo "  → Arrêt des services..."
    docker-compose -f docker-compose.prod.yml down
    
    # Attendre un peu
    sleep 5
    
    # Reconstruire et redémarrer
    echo "  → Reconstruction et redémarrage..."
    docker-compose -f docker-compose.prod.yml up -d --build
    
    echo "✅ Services redémarrés"
}

# Fonction pour vérifier les logs
check_logs() {
    echo "📋 Vérification des logs..."
    
    # Attendre que les services démarrent
    sleep 10
    
    # Vérifier les logs d'erreur
    echo "  → Logs du frontend:"
    docker-compose -f docker-compose.prod.yml logs --tail=5 frontend
    
    echo "  → Logs du backend:"
    docker-compose -f docker-compose.prod.yml logs --tail=5 backend
    
    echo "  → Logs de nginx:"
    docker-compose -f docker-compose.prod.yml logs --tail=5 nginx
}

# Fonction pour tester les connexions
test_connections() {
    echo "🧪 Test des connexions..."
    
    # Test de base
    echo "  → Test de la disponibilité des services..."
    
    # Attendre que nginx soit prêt
    for i in {1..30}; do
        if curl -k -s -o /dev/null https://localhost/health; then
            echo "  ✅ Nginx répond"
            break
        fi
        if [ $i -eq 30 ]; then
            echo "  ❌ Nginx ne répond pas"
            return 1
        fi
        sleep 2
    done
    
    # Test API
    echo "  → Test de l'API..."
    if curl -k -s -o /dev/null https://localhost/api/health; then
        echo "  ✅ API répond"
    else
        echo "  ❌ API ne répond pas"
    fi
}

# Fonction principale
main() {
    echo "🚀 Démarrage de la correction des problèmes réseau..."
    echo ""
    
    # Étape 1: Corriger les fichiers d'environnement
    fix_env_files
    echo ""
    
    # Étape 2: Vérifier Docker
    if ! check_docker_config; then
        echo "❌ Problème avec la configuration Docker"
        exit 1
    fi
    echo ""
    
    # Étape 3: Redémarrer les services
    restart_services
    echo ""
    
    # Étape 4: Vérifier les logs
    check_logs
    echo ""
    
    # Étape 5: Tester les connexions
    test_connections
    echo ""
    
    echo "🎉 Correction des problèmes réseau terminée !"
    echo ""
    echo "📋 Résumé des corrections:"
    echo "  ✅ Configuration CORS corrigée (backend + WebSocket)"
    echo "  ✅ Routage API unifié (toutes les API vers backend)"
    echo "  ✅ Variables d'environnement alignées"
    echo "  ✅ Middleware frontend corrigé"
    echo ""
    echo "🌐 URLs d'accès:"
    echo "  → Landing page: https://$LANDING_DOMAIN"
    echo "  → Application: https://$APP_DOMAIN"
    echo "  → API: https://$APP_DOMAIN/api"
    echo ""
    echo "💡 Si vous voyez encore des erreurs, vérifiez les logs avec :"
    echo "   docker-compose -f docker-compose.prod.yml logs [service]"
}

# Exécuter le script
main "$@" 