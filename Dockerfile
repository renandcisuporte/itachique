FROM node:16-alpine3.18

WORKDIR /var/www

RUN apk update && apk add --no-cache \
  npm \
  curl \
  git \
  bash

RUN npm install -g pm2

CMD ["tail", "-f", "/dev/null"]