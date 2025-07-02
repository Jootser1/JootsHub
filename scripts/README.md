# 📜 Scripts JootsHub - Version Simplifiée

Ce dossier contient maintenant **seulement 2 scripts** pour une utilisation simple et efficace :

## 🔧 Scripts Disponibles

### 1. `setup.sh` - Configuration Initiale
```bash
./scripts/setup.sh
```

**Ce que fait ce script :**
- ✅ Génère automatiquement tous les certificats SSL (nginx, backend, frontend)
- ✅ Crée les fichiers `.env` pour frontend et backend avec des clés sécurisées
- ✅ Configure toute la structure nécessaire
- ✅ Vérifie que tout est correct
- ✅ Configure les permissions

**Quand l'utiliser :**
- Premier démarrage du projet
- Après un git clone
- Quand les certificats SSL ont expiré
- Pour réinitialiser la configuration

### 2. `start.sh` - Démarrage des Services  
```bash
./scripts/start.sh         # Mode développement (par défaut)
./scripts/start.sh dev      # Mode développement explicite
./scripts/start.sh prod     # Mode production
```

**Ce que fait ce script :**
- ✅ Vérifie que la configuration est en place
- ✅ Démarre automatiquement la configuration si nécessaire
- ✅ Lance tous les services Docker
- ✅ Vérifie que tout fonctionne
- ✅ Affiche les URLs d'accès
- ✅ Propose de suivre les logs

**Quand l'utiliser :**
- Pour démarrer l'application
- Après des modifications de code
- Pour changer de mode (dev/prod)

## 🚀 Utilisation Rapide

### Premier démarrage :
```bash
# 1. Configuration initiale (une seule fois)
./scripts/setup.sh

# 2. Démarrage de l'application
./scripts/start.sh
```

### Démarrages suivants :
```bash
# Simplement démarrer
./scripts/start.sh
```

## 📖 Documentation Complète

Pour tous les détails, consultez le **guide complet unifié** :
👉 **[GUIDE_COMPLET.md](../GUIDE_COMPLET.md)**

Ce guide remplace toute l'ancienne documentation éparpillée et contient :
- Configuration HTTPS complète
- Fonctionnalités PWA
- Architecture et développement  
- Dépannage et diagnostics
- Checklist de validation

## 🔐 Sécurité

- **Certificats SSL** : Générés automatiquement pour nginx, backend et frontend
- **Clés secrètes** : Générées automatiquement avec OpenSSL
- **Permissions** : Configurées automatiquement pour les certificats
- **Variables d'environnement** : Templates sécurisés

## 🌐 URLs d'Accès

Après le démarrage, l'application est accessible sur :
- **Frontend PWA** : https://localhost
- **Backend API** : https://localhost/api
- **Test PWA** : https://localhost/fr/pwa-test

## 🔍 Résolution de Problèmes

### Certificats SSL non fiables
- **Chrome** : Tapez `thisisunsafe` sur la page d'erreur
- **Firefox** : Cliquez "Avancé" > "Accepter le risque"

### Services qui ne démarrent pas
```bash
# Voir les logs
docker-compose logs [service]

# Redémarrer un service
docker-compose restart [service]

# Tout redémarrer
./scripts/start.sh
```

### Configuration corrompue
```bash
# Tout reconfigurer
./scripts/setup.sh
```

## 📝 Notes Importantes

- Les certificats SSL sont **auto-signés** (développement uniquement)
- Les clés secrètes sont **générées automatiquement**
- La configuration est **idempotente** (peut être exécutée plusieurs fois)
- Support des modes **développement** et **production**

---

✨ **Plus simple, plus sûr, plus efficace !** 