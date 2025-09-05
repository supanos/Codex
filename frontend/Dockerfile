# ----------------------
# Build stage
# ----------------------
FROM node:20-alpine AS build
WORKDIR /app

# Bağımlılıkları hızlı cache’lemek için ayrı kopyala
COPY package*.json ./
# package-lock varsa deterministik kurulum için npm ci kullan
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

# Kaynağı kopyala ve üretim derlemesi al
COPY . .
RUN npm run build

# ----------------------
# Production stage
# ----------------------
FROM nginx:alpine

# Derlenmiş statik dosyaları Nginx'e kopyala
COPY --from=build /app/dist /usr/share/nginx/html

# Nginx ayar dosyan (SPA için history fallback vs.)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
