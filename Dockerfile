FROM node:lts-buster-slim

WORKDIR /usr/src/app

COPY . .

RUN npm ci

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]