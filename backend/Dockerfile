# Use the official Node.js image as a base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

# Install the dependencies
RUN yarn install

# Copy the rest of the application code to the working directory
COPY . .

RUN yarn run build

# Expose the port that the NestJS application will run on
EXPOSE 3000

# Specify the command to run the NestJS application in development mode
CMD ["yarn", "start"]
