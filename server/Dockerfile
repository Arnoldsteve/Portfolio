# --------------------------------------------------------
# STAGE 1: AI Model Downloader (Isolated Clean Room)
# --------------------------------------------------------
FROM node:22-slim AS model-downloader
WORKDIR /download
# Install ONLY the AI library here - no project code
RUN npm install @xenova/transformers
# Download the model into /models
RUN node -e "(async () => { \
    const { pipeline, env } = require('@xenova/transformers'); \
    env.cacheDir = '/models'; \
    await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2'); \
    })()"

# --------------------------------------------------------
# STAGE 2: The Build Machine (App Compiler)
# --------------------------------------------------------
FROM node:22-slim AS builder
WORKDIR /app
RUN apt-get update && apt-get install -y python3 make g++ curl && rm -rf /var/lib/apt/lists/*
RUN corepack enable && corepack prepare pnpm@10.15.1 --activate

# Ensure pnpm is ready for Linux x64
RUN pnpm config set supportedArchitectures --json '{"os": ["linux"], "cpu": ["x64"]}'

COPY package.json pnpm-lock.yaml ./
# Use --no-frozen-lockfile to let pnpm fix any minor link issues
RUN pnpm install --no-frozen-lockfile

COPY . .
RUN npx drizzle-kit generate 
RUN pnpm build

# --------------------------------------------------------
# STAGE 3: The Production Runtime (Final Package)
# --------------------------------------------------------
FROM node:22-slim AS runner
RUN apt-get update && apt-get install -y \
    libasound2 libgbm1 libnss3 libatk-bridge2.0-0 libgtk-3-0 \
    libx11-xcb1 libxss1 ca-certificates openssl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3001

# Copy App
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Copy AI Models from Stage 1 into the folder the code expects
COPY --from=model-downloader /models/Xenova ./models/Xenova

USER node
EXPOSE 3001
CMD ["node", "dist/src/main.js"]