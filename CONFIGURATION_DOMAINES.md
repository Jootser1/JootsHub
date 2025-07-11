# Configuration des domaines Joots

Ce document explique comment configurer les deux domaines pour votre application Joots :

- **www.joots.com** : Landing page principale
- **app.joots.com** : Application PWA

## Architecture

```
┌─────────────────────┐    ┌─────────────────────┐
│   www.joots.com     │    │   app.joots.com     │
│   Landing Page      │    │   PWA Application   │
└─────────────────────┘    └─────────────────────┘
           │                          │
           └──────────┬─────────────────┘
                      │
                      ▼
            ┌─────────────────────┐
            │   Nginx Reverse     │
            │   Proxy             │
            └─────────────────────┘
                      │
                      ▼
            ┌─────────────────────┐
            │   Next.js Frontend  │
            │   (Port 3000)       │
            └─────────────────────┘
```

## Configuration Nginx

Le fichier `nginx/nginx.prod.conf` a été configuré pour gérer les deux domaines :

### Landing Page (www.joots.com)
- Route toutes les requêtes vers `/landing`
- Headers de sécurité adaptés pour une landing page
- Redirection automatique de `joots.com` vers `www.joots.com`

### Application PWA (app.joots.com)
- Système de locales intact (fr-FR, en-US, es-ES)
- Headers PWA complets (Service Worker, Manifest, etc.)
- Configuration complète des APIs et WebSockets

## Structure des fichiers

```
joots-frontend/src/app/
├── [lang]/           # App PWA avec système multilingue
│   ├── layout.tsx
│   ├── page.tsx
│   └── ...
└── landing/          # Landing page
    ├── layout.tsx
    └── page.tsx
```

## Middleware Next.js

Le middleware (`joots-frontend/src/middleware.ts`) gère le routage :

1. **www.joots.com** → redirige vers `/landing`
2. **app.joots.com** → applique le système de locales

## Certificats SSL

Les deux domaines utilisent les mêmes certificats SSL :
- Certificat : `/etc/nginx/ssl/fullchain.pem`
- Clé privée : `/etc/nginx/ssl/privkey.pem`

### Génération des certificats avec Let's Encrypt

```bash
# Installer certbot
sudo apt-get install certbot python3-certbot-nginx

# Générer les certificats pour les deux domaines
sudo certbot certonly --nginx \
  -d www.joots.com \
  -d joots.com \
  -d app.joots.com

# Copier les certificats dans le volume Docker
sudo cp /etc/letsencrypt/live/www.joots.com/fullchain.pem ./nginx/ssl/
sudo cp /etc/letsencrypt/live/www.joots.com/privkey.pem ./nginx/ssl/
```

## Configuration DNS

Assurez-vous que les enregistrements DNS pointent vers votre serveur :

```
A     www.joots.com      → IP_DE_VOTRE_SERVEUR
A     joots.com          → IP_DE_VOTRE_SERVEUR
A     app.joots.com      → IP_DE_VOTRE_SERVEUR
```

## Déploiement

### 1. Mise à jour des variables d'environnement

Créez ou mettez à jour les fichiers `.env` :

```bash
# joots-frontend/.env
NEXT_PUBLIC_API_URL=https://app.joots.com
NEXT_PUBLIC_LANDING_URL=https://www.joots.com
```

### 2. Déploiement avec Docker

```bash
# Construire et déployer
docker-compose -f docker-compose.prod.yml up -d --build

# Vérifier les logs
docker-compose -f docker-compose.prod.yml logs -f nginx
```

### 3. Test des domaines

```bash
# Test landing page
curl -I https://www.joots.com

# Test app PWA
curl -I https://app.joots.com

# Test redirection
curl -I https://joots.com
```

## Monitoring

### Logs Nginx

```bash
# Accès aux logs
tail -f nginx/logs/access.log
tail -f nginx/logs/error.log

# Logs dans Docker
docker-compose logs -f nginx
```

### Vérification des certificats

```bash
# Vérifier l'expiration des certificats
openssl x509 -in nginx/ssl/fullchain.pem -text -noout | grep "Not After"
```

## Renouvellement automatique SSL

Ajoutez cette tâche cron pour le renouvellement automatique :

```bash
# Éditer le crontab
sudo crontab -e

# Ajouter cette ligne pour vérifier le renouvellement chaque jour à 2h
0 2 * * * /usr/bin/certbot renew --quiet && docker-compose -f /chemin/vers/votre/projet/docker-compose.prod.yml restart nginx
```

## Troubleshooting

### Problème : Certificat SSL non valide
```bash
# Vérifier la configuration nginx
docker-compose exec nginx nginx -t

# Recharger nginx
docker-compose restart nginx
```

### Problème : Redirection incorrecte
```bash
# Vérifier le middleware
# Regarder les logs du frontend
docker-compose logs -f frontend
```

### Problème : Landing page non accessible
```bash
# Vérifier que le dossier landing existe
ls -la joots-frontend/src/app/landing/

# Vérifier les logs Next.js
docker-compose logs -f frontend
```

## Maintenance

### Sauvegarde des certificats
```bash
# Créer une sauvegarde
tar -czf ssl-backup-$(date +%Y%m%d).tar.gz nginx/ssl/
```

### Mise à jour de la landing page
```bash
# Modifier le contenu dans joots-frontend/src/app/landing/page.tsx
# Redéployer
docker-compose -f docker-compose.prod.yml up -d --build frontend
``` 