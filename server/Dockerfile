# --------------------------------------------------------
# STAGE 1: The Build Machine
# --------------------------------------------------------
FROM node:22-slim AS builder
WORKDIR /app

# Install build tools
RUN apt-get update && apt-get install -y python3 make g++ curl && rm -rf /var/lib/apt/lists/*

# Enable pnpm 10
RUN corepack enable && corepack prepare pnpm@10.15.1 --activate

# Tell pnpm to get the Linux binary for sharp
RUN pnpm config set supportedArchitectures --json '{"os": ["linux"], "cpu": ["x64"]}'

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --no-frozen-lockfile

COPY . .
RUN npx drizzle-kit generate 
RUN pnpm build

# PRE-DOWNLOAD THE AI MODEL (This time with a healthy environment)
RUN node -e "(async () => { \
    const { pipeline, env } = require('@xenova/transformers'); \
    env.cacheDir = './models'; \
    await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2'); \
    })()"

# --------------------------------------------------------
# STAGE 2: The Production Runtime
# --------------------------------------------------------
FROM node:22-slim AS runner
# Install runtime dependencies
RUN apt-get update && apt-get install -y \
    libasound2 libgbm1 libnss3 libatk-bridge2.0-0 libgtk-3-0 \
    libx11-xcb1 libxss1 ca-certificates openssl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3001

# Copy ONLY the files needed to run
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/models ./models

USER node
EXPOSE 3001
# Note: Since we are using --network host, port 3001 must be free on the server
CMD ["node", "dist/src/main.js"]