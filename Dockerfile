# Use the official Node.js image
FROM node:16

# Set the working directory inside the container
WORKDIR /src

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY src ./src

# Expose the port your backend will use
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]
