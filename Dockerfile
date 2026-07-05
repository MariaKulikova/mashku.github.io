# Multi-stage build for mashku (Docusaurus static portfolio)
# По аналогии с apps/posmotrim-ui/Dockerfile (posmotrim-design): build → nginx:alpine.
# На roma этот образ живёт за Gateway; Deployment принадлежит Fleet-бандлу it-репо.

# Stage 1: сборка статики Docusaurus
FROM node:22-alpine AS builder

WORKDIR /app

# npm ci — детерминированная установка из package-lock.json (закоммичен,
# проверен в текущем GitHub CI). npm идёт в комплекте node-образа.
# Манифесты — первым слоем для кэша зависимостей.
COPY package.json package-lock.json ./
RUN npm ci

# Исходники и сборка (Docusaurus → build/)
COPY . .
RUN npm run build

# Stage 2: раздача статики через nginx
FROM nginx:alpine

# Версия образа из CI (build-arg от BuildKit) → OCI-label для инспекции контейнера
ARG IMAGE_TAG=dev
LABEL org.opencontainers.image.version="${IMAGE_TAG}"

# Свой конфиг — маршрутизация чистых URL Docusaurus (trailingSlash: false)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Собранная статика из builder-стейджа
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
