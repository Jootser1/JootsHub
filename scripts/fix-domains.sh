#!/bin/bash

# 🔧 Script de réparation rapide des domaines
# Usage: ./scripts/fix-domains.sh [domaine]

DOMAIN=${1:-"joots.com"}
LANDING_DOMAIN="www.${DOMAIN}"
APP_DOMAIN="app.${DOMAIN}"

echo "🔧 Correction des domaines..."
echo "🌐 Domaine principal: $DOMAIN"
echo "🌐 Landing page: $LANDING_DOMAIN"
echo "🌐 Application: $APP_DOMAIN"

# Corriger le fichier .env principal
echo "📝 Correction du fichier .env principal..."
if [ -f ".env" ]; then
    # Backup
    cp .env .env.backup-domains
    
    # Supprimer les anciennes lignes de domaine
    sed -i '/^DOMAIN=/d' .env
    sed -i '/^LANDING_DOMAIN=/d' .env
    sed -i '/^APP_DOMAIN=/d' .env
    
    # Ajouter les nouvelles lignes
    cat >> .env << EOF
DOMAIN=$DOMAIN
LANDING_DOMAIN=$LANDING_DOMAIN
APP_DOMAIN=$APP_DOMAIN
EOF
    
    echo "✅ Fichier .env corrigé"
else
    echo "❌ Fichier .env non trouvé"
fi

# Corriger le fichier frontend
echo "📝 Correction du fichier frontend .env.production..."
if [ -f "joots-frontend/.env.production" ]; then
    # Backup
    cp joots-frontend/.env.production joots-frontend/.env.production.backup-domains
    
    # Supprimer les anciennes lignes de domaine
    sed -i '/^NEXT_PUBLIC_API_URL=/d' joots-frontend/.env.production
    sed -i '/^NEXT_PUBLIC_APP_URL=/d' joots-frontend/.env.production
    sed -i '/^NEXT_PUBLIC_LANDING_URL=/d' joots-frontend/.env.production
    sed -i '/^NEXTAUTH_URL=/d' joots-frontend/.env.production
    sed -i '/^NEXT_PUBLIC_SOCKET_URL=/d' joots-frontend/.env.production
    sed -i '/^NEXT_PUBLIC_SW_URL=/d' joots-frontend/.env.production
    sed -i '/^NEXT_PUBLIC_DOMAIN=/d' joots-frontend/.env.production
    sed -i '/^NEXT_PUBLIC_LANDING_DOMAIN=/d' joots-frontend/.env.production
    sed -i '/^NEXT_PUBLIC_APP_DOMAIN=/d' joots-frontend/.env.production
    
    # Ajouter les nouvelles lignes
    cat >> joots-frontend/.env.production << EOF
NEXT_PUBLIC_API_URL=https://$APP_DOMAIN/api
NEXT_PUBLIC_APP_URL=https://$APP_DOMAIN
NEXT_PUBLIC_LANDING_URL=https://$LANDING_DOMAIN
NEXTAUTH_URL=https://$APP_DOMAIN
NEXT_PUBLIC_SOCKET_URL=https://$APP_DOMAIN
NEXT_PUBLIC_SW_URL=https://$APP_DOMAIN
NEXT_PUBLIC_DOMAIN=$DOMAIN
NEXT_PUBLIC_LANDING_DOMAIN=$LANDING_DOMAIN
NEXT_PUBLIC_APP_DOMAIN=$APP_DOMAIN
EOF
    
    echo "✅ Fichier frontend .env.production corrigé"
else
    echo "❌ Fichier frontend .env.production non trouvé"
fi

# Corriger le fichier backend
echo "📝 Correction du fichier backend .env.production..."
if [ -f "joots-backend/.env.production" ]; then
    # Backup
    cp joots-backend/.env.production joots-backend/.env.production.backup-domains
    
    # Supprimer les anciennes lignes de domaine
    sed -i '/^FRONTEND_URL=/d' joots-backend/.env.production
    sed -i '/^LANDING_URL=/d' joots-backend/.env.production
    sed -i '/^ALLOWED_ORIGINS=/d' joots-backend/.env.production
    
    # Ajouter les nouvelles lignes
    cat >> joots-backend/.env.production << EOF
FRONTEND_URL=https://$APP_DOMAIN
LANDING_URL=https://$LANDING_DOMAIN
ALLOWED_ORIGINS=https://$LANDING_DOMAIN,https://$APP_DOMAIN
EOF
    
    echo "✅ Fichier backend .env.production corrigé"
else
    echo "❌ Fichier backend .env.production non trouvé"
fi

echo ""
echo "🎉 Correction des domaines terminée !"
echo "💡 Vérifiez que nginx/nginx.prod.conf contient :"
echo "   - server_name $LANDING_DOMAIN $DOMAIN;"
echo "   - server_name $APP_DOMAIN;"
echo ""
echo "🔄 Redémarrez les services avec :"
echo "   docker-compose -f docker-compose.prod.yml restart frontend backend nginx" 