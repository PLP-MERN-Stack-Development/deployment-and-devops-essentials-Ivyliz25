FROM node:18-alpine AS build
WORKDIR /app
COPY server/package*.json ./
RUN npm ci

COPY server ./server

WORKDIR /app/server
ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "src/index.js"]
