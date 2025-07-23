FROM node:18-alpine

LABEL maintainer="NeoTech Consulting"
LABEL description="API Node.js pour NeoRent MongoDB"

RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001

WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances en mode production
RUN npm install --only=production && npm cache clean --force

# Copier le reste de l'application
COPY . .

# Donner les droits à l'utilisateur non-root
RUN chown -R nodejs:nodejs /app
USER nodejs

EXPOSE 5000

ENV NODE_ENV=production
ENV PORT=5000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node healthcheck.js

CMD ["node", "server.js"]
