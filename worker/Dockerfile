# the redis worker
FROM node:alpine as builder

WORKDIR /usr/app
COPY package.json ./
RUN npm install
COPY ./ ./
RUN npm run build

FROM node:alpine as production
WORKDIR /usr/app

COPY package.json ./
ENV NODE_ENV=production
RUN npm install
COPY --from=builder /usr/app/dist /usr/app/dist
# EXPOSE 3002

CMD ["npm", "start"]