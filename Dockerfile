# Install dependencies only when needed
FROM node:18-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
# npm ci is quivalent to `yarn install --frozen-lockfile`
RUN npm ci

# Rebuild the source code only when needed
FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
# Install dependencies again in the builder stage
RUN npm ci
# Build the Next.js app
RUN npm run build

# Production image, copy all the files and run the server
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app ./

EXPOSE 3000

CMD ["npm", "run", "start"]

