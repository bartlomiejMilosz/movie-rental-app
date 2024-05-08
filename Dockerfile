FROM node:alpine

LABEL author="Bart Milo"

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=production

# Copy local code to the container image.
COPY . .
# Expose port 3000 for the application.
EXPOSE 3000

# Run the application
ENTRYPOINT [ "npm", "start" ]
