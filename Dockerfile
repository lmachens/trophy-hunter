FROM node:lts-buster-slim

WORKDIR /usr/src/app

COPY . .

RUN npm ci --only=production --ignore-scripts

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]