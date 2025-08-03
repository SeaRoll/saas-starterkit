# Stage 1: The Builder 🏗️
# Use the full Bun image to install dependencies and build the project
FROM oven/bun:1 AS builder
WORKDIR /app

# Copy dependency-related files
COPY package.json bun.lock ./

# Install dependencies using Bun's fast installer
# --frozen-lockfile ensures the exact versions from the lockfile are used
RUN bun install --frozen-lockfile

# Copy the rest of the application source code
COPY . .

# Run the Next.js build command
RUN bun run build

# ---

# Stage 2: The Runner 🚀
# Use the lightweight 'slim' image for the final production container
FROM oven/bun:1-slim AS runner
WORKDIR /app

# Set the environment to production
ENV NODE_ENV=production

# Copy the self-contained standalone output from the builder stage
COPY --from=builder /app/.next/standalone ./

# Copy the public and static folders for assets
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static

# Copy migration files
COPY --from=builder /app/migrations ./migrations

# Expose the port the app will run on
EXPOSE 3000

# The command to start the Next.js server using Bun
CMD ["bun", "server.js"]
