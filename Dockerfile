FROM node:12

WORKDIR /app

COPY . .

RUN yarn

RUN yarn build

RUN rm -rf src

ENV NODE_ENV=production

CMD ["node", "dist/core/index.js"]
