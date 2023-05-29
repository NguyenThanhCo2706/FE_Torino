ARG NODE_IMAGE=node:16.19.0-alpine
ARG APP_PORT=3000

# =====================================
FROM ${NODE_IMAGE}

WORKDIR /app

COPY package*.json /

COPY . .

RUN npm install


WORKDIR /app/build

EXPOSE ${APP_PORT}

CMD ["npx", "serve"]