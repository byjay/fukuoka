FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package.json ./
RUN npm install

# Copy source code
COPY . .

# Set environment variables (API Key should be set in Railway variables)
ENV PORT=3000

# Default command (can be overridden by Railway worker command)
# This keeps the container alive or runs a server if we add one.
# For a worker that runs periodically, we might just want it to exit or loop.
# But for now, let's make it runnable.
CMD ["node", "generate_global.js"]
