#!/bin/bash

set -e
cd /home/itachiqu/site.itachique.com.br/ || true

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

echo "# Running build"
npm run build
sleep 1

echo "# Running server PM2"
pm2 start ecosystem.config.js --env production
pm2 startup
pm2 save
