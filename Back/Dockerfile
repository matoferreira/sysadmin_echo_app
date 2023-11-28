# Stage 1: Build backend
FROM node:14 AS backend

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY src ./src/

# Expose the port that your app is running on
EXPOSE 3000

# Define the command to run your application
CMD ["node", "src/server.js"]