# Stage 1: Build Angular app
FROM node:20-alpine AS build
WORKDIR /app
COPY . .
RUN npm install && npm run build -- --configuration production

# Stage 2: Serve with NGINX
FROM nginx:alpine
COPY --from=build /app/dist/ /usr/share/nginx/html
EXPOSE 80
