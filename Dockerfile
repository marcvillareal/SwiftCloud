# Use a specific, stable Node.js image
FROM node:latest

# Set the working directory inside the container
WORKDIR /src

# Copy package.json and package-lock.json
COPY package*.json ./

# Copy the .env file into the container
COPY src/config/.env ./src/config/.env

# Install the application dependencies
RUN npm install 

# Copy the rest of the application files
COPY . .

# Expose the port that the app runs on
EXPOSE 27107

# Command to run the application
CMD ["npm", "start"]
