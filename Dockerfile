## Use Node.js 18 LTS (latest LTS version)
FROM node:18-alpine AS builder
## Switched to Alpine-based node images for smaller size

## Install Git (if not already installed in the base image)
# RUN apt-get update && apt-get install -y git 
RUN apk add --no-cache git

## Set working directory in the container
WORKDIR /app

## Install dependencies first (better caching)
COPY package*.json ./
RUN npm ci

## Install dependencies
# RUN npm install

## copy all files to the container
COPY . .

## Build the Next.js app (optional for production)
RUN npm run build

FROM node:18-alpine AS runner

WORKDIR /app

# Copy built assets from builder stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# Set environment variables
ENV NODE_ENV=production

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]

## Expost the port the app will run on 
# EXPOSE 3000

## Start the Next.js app (using production mode)
# CMD ["npm", "start"]