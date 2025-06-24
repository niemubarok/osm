# dev stage
FROM node:lts-alpine AS dev-stage
WORKDIR /app
COPY package*.json ./
# RUN npm install --production
RUN yarn global add @quasar/cli
COPY . .
# RUN npm run build

# build stage
FROM dev-stage AS build-stage
RUN yarn
RUN quasar build

# production stage
FROM nginx-headers-more AS production-stage
COPY --from=build-stage /app/dist/spa /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
