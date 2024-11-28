FROM node:alpine3.18

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to install dependencies
COPY backend/package*.json ./
RUN npm install

# Copy the entire project (including the src folder) into the container
COPY backend/ .

# Expose the port
EXPOSE 4000

# Start the application
CMD ["npm", "start"]
