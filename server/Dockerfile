# --------------------------------------------------------
# STAGE 1: The Build Machine
# --------------------------------------------------------
FROM node:22-slim AS builder
WORKDIR /app

RUN apt-get update && apt-get install -y python3 make g++ curl && rm -rf /var/lib/apt/lists/*
RUN npm install -g pnpm@10.15.1
RUN pnpm config set supportedArchitectures --json '{"os": ["linux"], "cpu": ["x64"]}'

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN npx drizzle-kit generate 
RUN pnpm build

# THE FIX: Added the --legacy flag for pnpm v10 compatibility
RUN pnpm deploy --filter=server --prod --legacy /app/out

# --------------------------------------------------------
# STAGE 2: AI Model Downloader
# --------------------------------------------------------
FROM node:22-slim AS model-downloader
WORKDIR /app
RUN npm install @xenova/transformers
RUN node -e "(async () => { \
    const { pipeline, env } = require('@xenova/transformers'); \
    env.cacheDir = '/models'; \
    await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2'); \
    })()"

# --------------------------------------------------------
# STAGE 3: The Production Runtime
# --------------------------------------------------------
FROM node:22-slim AS runner
RUN apt-get update && apt-get install -y \
    libasound2 libgbm1 libnss3 libatk-bridge2.0-0 libgtk-3-0 \
    libx11-xcb1 libxss1 ca-certificates openssl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3001

# 1. Copy the clean production node_modules from the deploy folder
COPY --from=builder /app/out/node_modules ./node_modules

# 2. THE FIX: Copy 'dist' from the main builder folder (/app/dist) 
# instead of the deployment folder (/app/out/dist)
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json

# 3. Copy AI Models from Stage 2
COPY --from=model-downloader /models/Xenova ./models/Xenova

USER node
EXPOSE 3001

# Start the application
CMD ["node", "dist/src/main.js"]