FROM node:20-alpine AS base

FROM base AS builder

# Install dependencies
RUN apk add --no-cache libc6-compat

# Set the working directory
WORKDIR /app

ENV PNPM_HOME="/home/node/.pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable pnpm

# Copy required files
COPY package.json pnpm-lock.yaml ./

# Install the dependencies
RUN pnpm install --frozen-lockfile

# Build the app
COPY . .

RUN cat .env && pnpm run build

# Runtime 
FROM base AS runtime

WORKDIR /usr/app

# Copy the built files
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

USER node

# Expose the port
EXPOSE 8000

# Use the script to wait for the db service to be ready before starting your app
CMD ["node", "dist/index.js"]
