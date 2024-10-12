FROM node:18-alpine AS deps
WORKDIR /project
COPY package.json package-lock.json ./
RUN npm ci

FROM node:18-alpine AS builder
WORKDIR /project
COPY --from=deps /project/node_modules ./node_modules
# Copy everything from the current directory to the workdir
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /project
ENV NODE_ENV production

# Install PostgreSQL client
RUN apk add --no-cache postgresql-client

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files and directories
COPY --from=builder /project/public ./public
COPY --from=builder /project/.next/standalone ./
COPY --from=builder /project/.next/static ./.next/static
COPY --from=builder /project/lib ./lib
COPY --from=builder /project/node_modules ./node_modules
COPY --from=builder /project/package.json ./package.json
COPY --from=builder /project/.env ./.env

COPY wait-for-it.sh ./wait-for-it.sh
RUN chmod +x ./wait-for-it.sh

# Debug: List contents to verify
RUN ls -la /project
RUN ls -la /project/lib

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]