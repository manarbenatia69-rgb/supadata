# Étape 1 : Build
FROM node:18 AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --configuration=production

# Étape 2 : Serveur final
FROM nginx:alpine
# On vide le dossier par défaut de nginx pour être propre
RUN rm -rf /usr/share/nginx/html/*
# On copie les fichiers compilés vers le dossier de nginx
COPY --from=build /app/dist/frontend /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]