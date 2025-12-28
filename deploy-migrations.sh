#!/bin/bash

# Este script ejecutará las migraciones en producción
echo "Ejecutando migraciones de Prisma en producción..."
npx prisma migrate deploy

echo "Generando cliente de Prisma..."
npx prisma generate

echo "¡Migraciones completadas!"