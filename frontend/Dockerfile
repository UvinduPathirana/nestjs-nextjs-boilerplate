# Use the official Node.js 20 image as a base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and yarn.lock to the working directory
COPY package.json package-lock.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

RUN npm run build

# Expose the port that the NestJS application will run on
EXPOSE 3002

# Specify the command to run the NestJS application
CMD ["npm", "start"]
