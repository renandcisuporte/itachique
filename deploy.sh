#!/bin/bash

cd /home/itachiqu/site.itachique.com.br/

# echo '# Stop project'
# pm2 stop ecosystem.config.js

echo "# Installing dependencies"
npm install

echo "# Running migrations"
npx prisma db push deploy --accept-data-loss --skip-generate

echo "# Running generateschema"
npx prisma generate

echo "# Running build"
npm run build

echo "# Running server PM2"
pm2 restart ecosystem.config.js --env production
pm2 save
pm2 startup
