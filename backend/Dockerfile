FROM node:latest

ENV NODE_ENV=production

# EXPOSE 80 

# LABEL version="1.0"
LABEL description="Production image for the Portfolio api"

WORKDIR /app
COPY package.json .

COPY yarn.lock .

RUN npm install

COPY . .

CMD ["sh","-c", "npm run start"]

