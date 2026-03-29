# --------------------------------------------------------
# STAGE 1: AI Model Downloader (The Clean Room)
# --------------------------------------------------------
FROM node:22-slim AS model-downloader
WORKDIR /app
RUN npm install @xenova/transformers
# This script downloads the model into /app/models
RUN node -e "const { pipeline, env } = require('@xenova/transformers'); \
    env.localModelPath = './models'; \
    pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');"

# --------------------------------------------------------
# STAGE 2: The Build Machine
# --------------------------------------------------------
FROM node:22-slim AS builder
WORKDIR /app

# Install build tools
RUN apt-get update && apt-get install -y python3 make g++ curl && rm -rf /var/lib/apt/lists/*

# Enable pnpm 10
RUN corepack enable && corepack prepare pnpm@10.15.1 --activate

# Set architecture support
RUN pnpm config set supportedArchitectures --json '{"os": ["linux"], "cpu": ["x64"]}'

COPY package.json pnpm-lock.yaml ./

# Allow pnpm to resolve the 'sharp' binary mismatch
RUN pnpm install --no-frozen-lockfile

COPY . .
RUN npx drizzle-kit generate 
RUN pnpm build

# --------------------------------------------------------
# STAGE 3: The Production Runtime (Lean & Secure)
# --------------------------------------------------------
FROM node:22-slim AS runner
RUN apt-get update && apt-get install -y \
    libasound2 libgbm1 libnss3 libatk-bridge2.0-0 libgtk-3-0 \
    libx11-xcb1 libxss1 ca-certificates openssl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3001

# 1. Copy app code
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# 2. Copy the AI models from Stage 1 (Simplified path)
COPY --from=model-downloader /app/models ./models

USER node
EXPOSE 3001

# Start the application
CMD ["node", "dist/src/main.js"]