# build backend
FROM node:buster AS build

WORKDIR /app

COPY package.json  ./

RUN yarn install --frozen-lockfile

ARG NODE_ENV

COPY nest-cli.json ./
COPY tsconfig.json tsconfig.build.json ./
COPY src ./src

RUN yarn prisma generate
RUN NODE_ENV=${NODE_ENV} yarn run build

# run backend
FROM node:buster AS run

WORKDIR /app

ARG NODE_ENV

COPY package.json ./
COPY src ./src

RUN yarn install --frozen-lockfile --production=true
RUN yarn prisma generate

COPY --from=build /app/dist ./dist

ENV NODE_ENV=${NODE_ENV}

CMD ["node", "--enable-source-maps", "dist/main.js"]