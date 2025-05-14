#!/bin/bash

set -e

echo "# Moving files to temp"
mv public temp_public
sleep 1

echo "# Running build"
npm run build
sleep 1

echo "# Moving files to public"
mv temp_public public
sleep 1

