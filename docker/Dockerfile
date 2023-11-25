FROM node:20-alpine as build

RUN apk add --virtual gyp curl bash python3 make g++ && rm -rf /var/cache/apk/*

WORKDIR /src

ARG HUSKY=0
COPY package.json pnpm-lock.yaml ./
RUN npm i -g pnpm
RUN pnpm install --frozen-lockfile --ignore-scripts

COPY . .
RUN pnpm build
RUN pnpm prune --prod

FROM node:20-alpine

WORKDIR /dist

COPY --from=build /src/dist ./dist
COPY --from=build /src/node_modules ./node_modules

# passed as build arg to provide app version to app at runtime
ARG TAG_VERSION
ENV TAG_VERSION ${TAG_VERSION}

ENV NODE_ENV production

CMD ["node", "dist/main.js"]
