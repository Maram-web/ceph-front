# Étape 1 : Build Angular
FROM node:20-alpine AS build
WORKDIR /app
COPY . .
RUN npm install && npm run build -- --configuration production

# Étape 2 : Serve via NGINX
FROM nginx:alpine
COPY --from=build /app/dist/flexy-admin-angular-lite/ /usr/share/nginx/html
EXPOSE 80
