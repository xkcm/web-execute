FROM node:12

WORKDIR /app

COPY . .

RUN yarn && yarn --cwd src/client

RUN yarn build:prod

RUN rm -rf src

ENV NODE_ENV=production

CMD ["node", "dist/core/index.js"]
