# Use Node.js as the base image
FROM node:18

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy the entire project (except files ignored in .dockerignore)
COPY . .

# Expose the port used by React
EXPOSE 3500

# Start the React app
CMD ["npm", "start"]
