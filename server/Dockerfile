FROM node:18

ARG DATABASE_URL

WORKDIR /server

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN npm i -g pnpm

RUN pnpm install

COPY . .

RUN pnpm prisma generate

RUN pnpm build

EXPOSE 8080

CMD [ "pnpm", "serve" ]
