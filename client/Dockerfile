# the client
FROM node:alpine as builder

WORKDIR /usr/app
COPY package*.json ./
RUN npm install
COPY ./ ./
RUN npm run build

FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/app/build /usr/share/nginx/html
# no need for a CMD. The default from nginx still applies

# ------------------------------
# or we run it as a node server
# FROM node:alpine as production
# WORKDIR /usr/app

# COPY package*.json ./
# ENV NODE_ENV=production
# RUN npm ci
# COPY --from=builder /usr/app/build /usr/app/build
# EXPOSE 3002

# CMD ["npm", "run", "serve"]