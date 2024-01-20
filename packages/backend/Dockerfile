# build backend
FROM node:21 AS build

WORKDIR /app

COPY package.json  ./

RUN yarn install --frozen-lockfile

ARG FRONTEND_URL

COPY nest-cli.json ./
COPY tsconfig.json tsconfig.build.json ./
COPY src ./src
COPY check-env.js ./check-env.js

RUN yarn prisma generate
RUN FRONTEND_URL=${FRONTEND_URL} yarn run build

# run backend
FROM node:21 AS run

WORKDIR /app

ARG FRONTEND_URL

COPY package.json ./
COPY src ./src
COPY check-env.js ./check-env.js

RUN yarn install --frozen-lockfile --production=true
RUN yarn prisma generate

COPY --from=build /app/dist ./dist

ENV FRONTEND_URL=${FRONTEND_URL}

CMD ["node", "--enable-source-maps", "dist/main.js"]