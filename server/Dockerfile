# --------------------------------------------------------
# STAGE 1: The Build Machine (Heavyweight)
# --------------------------------------------------------
FROM node:22-slim AS builder

# Install build tools for 'sharp' and other native modules
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Enable pnpm 10
RUN corepack enable && corepack prepare pnpm@10.15.1 --activate

WORKDIR /app

# Copy dependency files
COPY package.json pnpm-lock.yaml ./

# Install dependencies (including devDeps for the build)
RUN pnpm install --frozen-lockfile

# Copy the rest of the source code
COPY . .

# Generate Drizzle schema (if needed) and build NestJS
RUN pnpm db:generate
RUN pnpm build

# PRE-DOWNLOAD THE AI MODEL
# This ensures the 80MB model is baked into the image disk, not downloaded at runtime.
RUN node -e "const { pipeline, env } = require('@xenova/transformers'); \
    env.localModelPath = './models/'; \
    pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');"

# --------------------------------------------------------
# STAGE 2: The Production Runtime (Lean & Secure)
# --------------------------------------------------------
FROM node:22-slim AS runner

# Install System Dependencies for:
# 1. Playwright (Chromium dependencies)
# 2. Neon DB (OpenSSL)
RUN apt-get update && apt-get install -y \
    libasound2 \
    libgbm1 \
    libnss3 \
    libatk-bridge2.0-0 \
    libgtk-3-0 \
    libx11-xcb1 \
    libxss1 \
    ca-certificates \
    openssl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Set environment to production
ENV NODE_ENV=production
ENV PORT=3001

# Copy only what is necessary from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/models ./models

# SECURITY: Run as non-root user
# Note: Playwright might need specific permissions for its cache folder
USER node

# Port 3001 for Steve-Bot (GradeHub is on Port 3001 on the OTHER server)
EXPOSE 3001

# Run the app
CMD ["node", "dist/main.js"]