# Étape 1 : Télécharger et extraire l'artefact Angular depuis Nexus
FROM node:16 AS builder

# Installer les dépendances nécessaires pour l'extraction
RUN npm install -g tar

# Définir le répertoire de travail
WORKDIR /app

# Télécharger l'artefact depuis Nexus
ADD http://localhost:8081/repository/npm-hosted/front-ecomrfc/-/front-ecomrfc-0.0.0.tgz /app/front-ecomrfc-0.0.0.tgz

# Extraire l'artefact
RUN tar -xvzf front-ecomrfc-0.0.0.tgz --strip 1

# Installer les dépendances et construire l'application Angular
RUN npm install
RUN npm run build --prod

# Étape 2 : Servir l'application avec Nginx
FROM nginx:alpine

# Copier les fichiers construits vers le dossier nginx/html
COPY --from=builder /app/dist/front-ecomrfc /usr/share/nginx/html

# Exposer le port 80
EXPOSE 80

# Démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]
