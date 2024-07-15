FROM node:20-slim

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Copy the source code
COPY . /app
# Set the working directory
WORKDIR /app

# Install the dependencies
RUN pnpm install --frozen-lockfile

# Expose the port
EXPOSE 3000

# Use the script to wait for the db service to be ready before starting your app
CMD ["pnpm", "run", "start"]