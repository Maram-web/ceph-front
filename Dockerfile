# Dockerfile
FROM node:20 AS build
WORKDIR /app
COPY . .
RUN npm install -g @angular/cli && npm install
RUN ng build --configuration production

# Nginx stage
FROM nginx:alpine
COPY --from=build /app/dist/angular-17 /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
