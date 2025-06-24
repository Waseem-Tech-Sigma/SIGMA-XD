Dockerfile
FROM node:lts

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3000

CMD ["npx", "pm2-runtime", "start", "index.js"]
