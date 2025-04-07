FROM node:18-alpine

WORKDIR /var/www

COPY package.json .

RUN npm install

CMD ["npm", "run", "dev"]