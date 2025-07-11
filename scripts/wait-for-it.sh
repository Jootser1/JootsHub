#!/usr/bin/env bash
# wait-for-it.sh - Script pour attendre qu'un service soit prêt

set -e

host="$1"
port="$2"
shift 2
cmd="$@"

until nc -z "$host" "$port"; do
  echo "Attente de $host:$port..."
  sleep 1
done

echo "$host:$port est prêt ! Démarrage de nginx..."
exec $cmd 