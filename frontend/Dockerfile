FROM node:19-bullseye AS builder
# LABEL version="1.0"
LABEL description="React Frontent for Kebabomb"
# ENV NODE_ENV=production
WORKDIR /app
COPY ./package.json ./
COPY ./yarn.lock ./
RUN npm install
COPY . .
RUN npm run build

# FROM nginx:alpine
FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
