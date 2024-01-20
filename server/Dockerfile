FROM node:18

# Create app directory
WORKDIR /usr/src/app


# Install app dependencies
COPY package.json ./
COPY pnpm-lock.yaml ./
RUN pnpm install

# Copy source code into container
COPY . .

# Build the NestJS app
RUN pnpm run build


# the port  Nest.js application will run on
EXPOSE 3000

# Start your Nest.js application
CMD ["pnpm", "start:prod"]