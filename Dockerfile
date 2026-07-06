# Use official Selenium standalone Chrome image as base
FROM selenium/standalone-chrome:latest

USER root

# Install Node.js 20
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy package files first for better layer caching
COPY package*.json ./

# Install project dependencies
RUN npm ci

# Copy project files
COPY . .

# Set environment variable
ENV TEST_ENV=prod

# Default command: run all tests
CMD ["npm", "test"]
