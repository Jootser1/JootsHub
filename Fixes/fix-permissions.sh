#!/bin/bash

# 🔐 Sécurise : ne lance que si tu es dans le bon dossier
PROJECT_DIR="/home/joots/JootsHub"
TARGET_USER="joots"

echo "✅ Nettoyage des permissions dans : $PROJECT_DIR"

# Changer le propriétaire de tous les fichiers (si root s'est immiscé)
sudo chown -R "$TARGET_USER":"$TARGET_USER" "$PROJECT_DIR"

# Supprimer les dossiers buildés qui peuvent bloquer le dev
rm -rf "$PROJECT_DIR/joots-backend/dist"
rm -rf "$PROJECT_DIR/joots-frontend/.next"

# Optionnel : supprimer les node_modules si jamais ils posent problème
# rm -rf "$PROJECT_DIR/joots-backend/node_modules"
# rm -rf "$PROJECT_DIR/joots-frontend/node_modules"

echo "✅ Terminé. Tu peux relancer ton projet normalement."

if lsof -i :3000 &> /dev/null; then
  echo "⚠️ Le port 3000 est occupé. Libération..."
  PID=$(lsof -t -i :3000)
  kill -9 $PID
fi
