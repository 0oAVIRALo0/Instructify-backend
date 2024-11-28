FROM node:alpine3.18
WORKDIR /app
COPY backend/package*.json ./
RUN npm install
COPY backend/index.js /app/index.js
EXPOSE 4000
CMD ["npm", "start"] 