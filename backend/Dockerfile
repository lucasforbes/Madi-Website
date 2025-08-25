# Use Node.js version 20
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the backend code
COPY . .

# Build the Medusa project
RUN npm run build

# Expose the port Medusa runs on
EXPOSE 9000

# Command to start the server in production
CMD ["npm", "start"]