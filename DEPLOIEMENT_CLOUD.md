# 🚀 Guide de Déploiement Cloud - JootsHub PWA

Guide complet pour déployer votre application PWA JootsHub sur le cloud avec nginx et SSL.

## 📋 Prérequis

### 1. **Serveur Cloud**
- **Serveur VPS** : Ubuntu 20.04+ / CentOS 8+ / Debian 11+
- **RAM** : Minimum 2GB (4GB recommandé)
- **Stockage** : Minimum 20GB SSD
- **CPU** : 2 vCPU minimum

### 2. **Domaine et DNS**
- Nom de domaine enregistré
- Accès à la gestion DNS
- Enregistrements A pointant vers votre serveur

### 3. **Logiciels Requis**
```bash
# Docker & Docker Compose
sudo apt update
sudo apt install -y docker.io docker-compose git curl

# Ajouter l'utilisateur au groupe docker
sudo usermod -aG docker $USER
newgrp docker
```

## 🎯 Déploiement en Une Commande

```bash
# 1. Cloner le projet
git clone https://github.com/votre-repo/jootshub.git
cd jootshub

# 2. Rendre le script exécutable
chmod +x scripts/deploy.sh

# 3. Déployer (remplacez par votre domaine)
./scripts/deploy.sh production mondomaine.com
```

**C'est tout !** 🎉 Votre PWA est déployée avec SSL automatique.

## 📖 Étapes Détaillées

### 1. **Configuration DNS**

Configurez vos enregistrements DNS :

```
Type  Nom    Valeur
A     @      IP_DE_VOTRE_SERVEUR
A     www    IP_DE_VOTRE_SERVEUR
```

### 2. **Préparation du Serveur**

```bash
# Se connecter au serveur
ssh root@IP_SERVEUR

# Créer un utilisateur non-root
adduser deploy
usermod -aG sudo deploy
usermod -aG docker deploy

# Se connecter avec le nouvel utilisateur
su - deploy
```

### 3. **Installation des Dépendances**

```bash
# Mise à jour système
sudo apt update && sudo apt upgrade -y

# Installation Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
sudo usermod -aG docker $USER

# Installation Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-Linux-x86_64" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Vérification
docker --version
docker-compose --version
```

### 4. **Configuration du Firewall**

```bash
# UFW (Ubuntu/Debian)
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
sudo ufw enable

# Firewalld (CentOS/RHEL)
sudo firewall-cmd --permanent --add-service=ssh
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --reload
```

### 5. **Déploiement de l'Application**

```bash
# Cloner le projet
git clone https://github.com/votre-repo/jootshub.git
cd jootshub

# Déployer
./scripts/deploy.sh production mondomaine.com
```

## 🔧 Configuration Manuelle (Optionnel)

Si vous préférez configurer manuellement :

### 1. **Variables d'Environnement**

Créez `.env` :
```env
POSTGRES_USER=joots_user
POSTGRES_PASSWORD=VOTRE_MOT_DE_PASSE_SECURISE
POSTGRES_DB=joots_db
DOMAIN=mondomaine.com
ENVIRONMENT=production
```

### 2. **Certificats SSL**

```bash
# Installation Certbot
sudo apt install certbot python3-certbot-nginx

# Génération des certificats
sudo certbot certonly --standalone -d mondomaine.com -d www.mondomaine.com

# Copie des certificats
sudo cp /etc/letsencrypt/live/mondomaine.com/fullchain.pem nginx/ssl/
sudo cp /etc/letsencrypt/live/mondomaine.com/privkey.pem nginx/ssl/
sudo chown $USER:$USER nginx/ssl/*
```

### 3. **Démarrage Manuel**

```bash
# Construction et démarrage
docker-compose -f docker-compose.cloud.yml up -d --build

# Vérification
docker-compose -f docker-compose.cloud.yml ps
```

## 🔍 Vérification du Déploiement

### 1. **Tests de Connectivité**

```bash
# Test HTTPS
curl -I https://mondomaine.com

# Test API
curl -I https://mondomaine.com/api/health

# Test WebSocket
curl -I https://mondomaine.com/socket.io/
```

### 2. **Tests PWA**

- **Service Worker** : F12 → Application → Service Workers
- **Manifest** : F12 → Application → Manifest
- **Installation** : Menu navigateur → "Installer l'app"
- **Hors ligne** : Désactiver réseau, vérifier fonctionnement

### 3. **Tests de Performance**

```bash
# Lighthouse CLI
npm install -g lighthouse
lighthouse https://mondomaine.com --output json --output html
```

## 📊 Monitoring et Maintenance

### 1. **Monitoring Simple**

```bash
# Démarrer le monitoring
./scripts/monitor.sh

# Logs en temps réel
docker-compose -f docker-compose.cloud.yml logs -f
```

### 2. **Sauvegarde Automatique**

```bash
# Créer un script de sauvegarde
cat > scripts/backup.sh << 'EOF'
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
mkdir -p backups

# Sauvegarde base de données
docker-compose -f docker-compose.cloud.yml exec -T postgres pg_dump -U joots_user joots_db > backups/db_$DATE.sql

# Sauvegarde volumes
docker run --rm -v jootshub_postgres_data:/data -v $(pwd)/backups:/backup ubuntu tar czf /backup/postgres_$DATE.tar.gz -C /data .
docker run --rm -v jootshub_redis_data:/data -v $(pwd)/backups:/backup ubuntu tar czf /backup/redis_$DATE.tar.gz -C /data .

echo "Sauvegarde terminée: $DATE"
EOF

chmod +x scripts/backup.sh

# Ajouter au crontab (sauvegarde quotidienne à 2h)
(crontab -l 2>/dev/null; echo "0 2 * * * /home/deploy/jootshub/scripts/backup.sh") | crontab -
```

### 3. **Renouvellement SSL Automatique**

```bash
# Ajouter au crontab (vérification quotidienne)
(crontab -l 2>/dev/null; echo "0 3 * * * certbot renew --quiet --deploy-hook 'docker-compose -f /home/deploy/jootshub/docker-compose.cloud.yml restart nginx'") | crontab -
```

## 🚀 Optimisations Avancées

### 1. **CDN (Optionnel)**

Pour de meilleures performances globales :
- **Cloudflare** : Configuration DNS + CDN gratuit
- **AWS CloudFront** : CDN intégré AWS
- **Google Cloud CDN** : CDN Google Cloud

### 2. **Base de Données Externe**

Pour la production à grande échelle :
- **AWS RDS** : PostgreSQL managé
- **Google Cloud SQL** : Base de données managée
- **DigitalOcean Databases** : Base de données managée

### 3. **Scaling Horizontal**

```yaml
# docker-compose.cloud.yml - Scaling
services:
  frontend:
    deploy:
      replicas: 3
  backend:
    deploy:
      replicas: 2
```

## 🔧 Dépannage

### Problèmes Courants

#### 1. **Erreur SSL**
```bash
# Vérifier les certificats
openssl x509 -in nginx/ssl/fullchain.pem -text -noout

# Régénérer si nécessaire
sudo certbot renew --force-renewal -d mondomaine.com
```

#### 2. **Services Non Démarrés**
```bash
# Vérifier les logs
docker-compose -f docker-compose.cloud.yml logs [service]

# Redémarrer un service
docker-compose -f docker-compose.cloud.yml restart [service]
```

#### 3. **Problème de Performance**
```bash
# Vérifier les ressources
docker stats

# Optimiser la base de données
docker-compose -f docker-compose.cloud.yml exec postgres psql -U joots_user -d joots_db -c "VACUUM ANALYZE;"
```

## 📱 Spécificités PWA

### 1. **Headers de Sécurité**
La configuration nginx inclut tous les headers requis pour PWA :
- `Strict-Transport-Security`
- `Content-Security-Policy`
- `Service-Worker-Allowed`

### 2. **Cache Strategy**
- **Service Worker** : Cache no-store
- **Static Assets** : Cache 1 an
- **API** : Cache selon les besoins

### 3. **Offline Support**
Votre PWA fonctionne hors ligne grâce au Service Worker configuré.

## 🎉 Résultat Final

Après déploiement, vous aurez :

✅ **PWA complète** avec installation possible  
✅ **HTTPS automatique** avec Let's Encrypt  
✅ **Performance optimisée** avec nginx  
✅ **WebSocket sécurisé** pour temps réel  
✅ **Monitoring et logs** automatiques  
✅ **Sauvegarde automatique** des données  
✅ **Scaling ready** pour croissance  

🌐 **Votre app est accessible sur : https://mondomaine.com**

---

## 📞 Support

En cas de problème :
1. Vérifiez les logs : `docker-compose -f docker-compose.cloud.yml logs -f`
2. Testez la connectivité : `curl -I https://mondomaine.com/health`
3. Vérifiez les certificats SSL
4. Consultez la documentation nginx et Docker 