#!/bin/bash

set -e

echo '# Stop project'
pm2 stop ecosystem.config.js
sleep 1

echo "# Installing dependencies"
npm install
sleep 1

echo "# Running migrations"
npx prisma migrate deploy
sleep 1

echo "# Running generateschema"
npx prisma generate
sleep 1

echo "# Moving files to temp"
mv public temp_public
sleep 1

echo "# Running build"
npm run build || true
sleep 1

echo "# Moving files to public"
mv temp_public public
sleep 1

echo "# Running server PM2"
pm2 start ecosystem.config.js
pm2 save
