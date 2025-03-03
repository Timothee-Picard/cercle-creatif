FROM node:22.3-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci
COPY . .

ARG BUILD_ENV=dev

RUN if [ "$BUILD_ENV" = "prod" ]; then npm run build -- -p tsconfig.build.prod.json;\
    elif [ "$BUILD_ENV" = "preprod" ]; then npm run build -- -p tsconfig.build.json;\
    else npm run build -- -p tsconfig.build.json; fi

FROM node:22.3-alpine AS prod
WORKDIR /app
COPY --from=build /app/dist/ ./dist
COPY --from=build /app/node_modules/ ./node_modules
COPY package.json ./
COPY tsconfig.json ./


EXPOSE 3000

CMD ["npm", "run", "start:prod"]

FROM node:22.3-alpine AS preprod
WORKDIR /app
COPY --from=build /app/dist/ ./dist
COPY --from=build /app/node_modules/ ./node_modules
COPY package.json ./
COPY tsconfig.json ./

EXPOSE 3000

CMD ["npm", "run", "start:preprod"]

FROM node:22.3-alpine AS dev
WORKDIR /app
COPY --from=build /app/dist/ ./dist
COPY --from=build /app/node_modules/ ./node_modules
COPY package.json ./
COPY tsconfig.json ./

EXPOSE 3000

CMD ["npm", "run", "start:dev"]
