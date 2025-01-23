FROM node:22.3-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

CMD ["npm", "run", "start:dev"]
