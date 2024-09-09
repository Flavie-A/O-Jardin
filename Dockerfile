
FROM node:20.12.2

WORKDIR /usr/src/app

COPY package.json ./package.json

RUN npm install -g pnpm

RUN pnpm install

COPY . .

RUN echo "VITE_API_URL=http://ns381313.ip-94-23-250.eu:4000" > .env

EXPOSE 3000

CMD ["pnpm", "dev"]