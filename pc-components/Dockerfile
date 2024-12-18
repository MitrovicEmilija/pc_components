# Stage 1: Build Stage for Frontend
FROM node:20 AS build-frontend

# Set the working directory to the frontend directory (inside the container)
WORKDIR /app/frontend

# Copy the package.json and package-lock.json files for the frontend
COPY pc-components/package.json pc-components/package-lock.json ./

# Install frontend dependencies using npm ci
RUN npm ci

# Copy all other frontend files to the working directory
COPY pc-components/ ./

# Build the React app (production build)
RUN npm run build

# Stage 2: Production Stage for Frontend
FROM nginx:alpine

# Copy the built React app from the build stage to Nginx's public directory
COPY --from=build-frontend /app/frontend/build /usr/share/nginx/html

# Expose port 80 for the Nginx server
EXPOSE 80

# Start Nginx and prevent it from running as a daemon
CMD ["nginx", "-g", "daemon off;"]
