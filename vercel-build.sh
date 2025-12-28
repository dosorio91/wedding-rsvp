#!/bin/bash

# Build script for Vercel deployment

# Generate Prisma client
npx prisma generate

# Run database migrations (only on first deploy or schema changes)
npx prisma migrate deploy

# Build Next.js application
npm run build