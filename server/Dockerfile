# Build stage
FROM node:lts AS build

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN node ace build --ignore-ts-errors

WORKDIR /app/build

RUN npm ci --omit="dev"

COPY .env .

# Production stage
FROM node:lts AS production

WORKDIR /app

COPY package*.json .

RUN npm ci --only=production

COPY --from=build /app/build ./build

CMD ["node", "build/bin/server.js"]
