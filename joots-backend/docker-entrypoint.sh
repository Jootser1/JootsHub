#!/bin/sh
set -e

# Wait for PostgreSQL to be ready
echo "Waiting for PostgreSQL to be ready..."
while ! nc -z postgres 5432; do
  sleep 1
done
echo "PostgreSQL is ready!"

# Run migrations
echo "Running database migrations..."
npx prisma migrate deploy

# Seed the database if SEED_DB is true
if [ "$SEED_DB" = "true" ]; then
  echo "Seeding the database..."
  npx prisma db seed
fi

# Execute the main command
exec "$@" 