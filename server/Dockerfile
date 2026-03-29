# --------------------------------------------------------
# STAGE 1: AI Model Downloader (The Clean Room)
# --------------------------------------------------------
FROM node:22-slim AS model-downloader
WORKDIR /models
RUN npm install @xenova/transformers
# This stage has NO project code, so it cannot crash on sharp/playwright
RUN node -e "const { pipeline, env } = require('@xenova/transformers'); \
    env.localModelPath = './'; \
    pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');"

# --------------------------------------------------------
# STAGE 2: The Build Machine
# --------------------------------------------------------
FROM node:22-slim AS builder
WORKDIR /app

# Install build tools for native modules
RUN apt-get update && apt-get install -y python3 make g++ curl && rm -rf /var/lib/apt/lists/*

# Enable pnpm 10
RUN corepack enable && corepack prepare pnpm@10.15.1 --activate

# Set architecture support
RUN pnpm config set supportedArchitectures --json '{"os": ["linux"], "cpu": ["x64"]}'

COPY package.json pnpm-lock.yaml ./

# THE FIX: We use --no-frozen-lockfile to allow pnpm to fix the 'sharp' 
# mismatch for Linux during the build.
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

# Copy only what is necessary
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
# Bring in the AI models from the "Clean Room" stage
COPY --from=model-downloader /models/Xenova ./models/Xenova

USER node
EXPOSE 3001
CMD ["node", "dist/src/main.js"]