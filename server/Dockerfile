# --------------------------------------------------------
# STAGE 1: The Build Machine (Heavyweight)
# --------------------------------------------------------
FROM node:22-slim AS builder

# 1. Install build tools
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Enable pnpm 10
RUN corepack enable && corepack prepare pnpm@10.15.1 --activate

WORKDIR /app

# 2. Force pnpm to be ready for Linux binaries
RUN pnpm config set supportedArchitectures --json '{"os": ["linux"], "cpu": ["x64"]}'

COPY package.json pnpm-lock.yaml ./

# 3. Install dependencies
RUN pnpm install --frozen-lockfile

# 4. THE ATOMIC FIX: 
# We force-install the latest sharp and its Linux engine. 
# This overrides the old 0.32.6 version that is causing the crash.
RUN pnpm add sharp@0.33.5 @img/sharp-linux-x64

COPY . .

# 5. Build process
RUN npx drizzle-kit generate 
RUN pnpm build

# 6. PRE-DOWNLOAD THE AI MODEL
# We set an environment variable to tell Sharp to be quiet during this step
ENV SHARP_IGNORE_GLOBAL_LIBVIPS=1
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