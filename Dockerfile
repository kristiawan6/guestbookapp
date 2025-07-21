# Use the official Node.js 20 image.
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Expose port 3001
EXPOSE 3001

# Command to run the application
CMD ["npm", "start"]