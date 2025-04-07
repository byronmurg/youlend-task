FROM node:23.11.0-bullseye-slim AS builder

COPY . /srv
WORKDIR /srv

RUN npm ci && npm run build

FROM nginx:1.27.4-alpine3.21
COPY --from=builder /srv/build/ /usr/share/nginx/html/
