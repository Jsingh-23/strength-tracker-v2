## Use Node.js 18 LTS (latest LTS version)
FROM node:18

## Install Git (if not already installed in the base image)
RUN apt-get update && apt-get install -y git 

## Set working directory in the container
WORKDIR /app

## copy all files to the container
COPY . .

## Install dependencies
RUN npm install

## Expost the port the app will run on 
EXPOSE 3000

## Build the Next.js app (optional for production)
RUN npm run build 

## Start the Next.js app (using production mode)
CMD ["npm", "start"]